import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserProvider';
import axiosInstance from "../../lib/AxiosInstance";
import SubmissionViewer from '../../components/Admin/SubmissionViewer';
import SubmissionMarker from '../../components/Admin/SubmissionMarker';

const ViewSubmission = () => {
  // State for dropdown selections
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  // State for fetched data
  const [teams, setTeams] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [submission, setSubmission] = useState(null);
  const [rubric, setRubric] = useState(null);
  const [criteria, setCriteria] = useState([]);

  // State for marks
  const [criteriaScores, setCriteriaScores] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  const { user } = useUser();

  // Fetch teams and tasks on component mount
  useEffect(() => {
    const fetchTeamsAndTasks = async () => {
      // Fetch teams independently
      try {
        const teamsResponse = await axiosInstance.get(`/teams`);
        setTeams(teamsResponse.data || []);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }

      // Fetch tasks independently
      try {
        const tasksResponse = await axiosInstance.get(`/tasks/getAll`);
        setTasks(tasksResponse.data || []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTeamsAndTasks();
  }, []);

  // Fetch submission when team and task are selected
  useEffect(() => {
    if (selectedTeam && selectedTask) {
      const fetchSubmission = async () => {
        try {
          const response = await axiosInstance.get(
            `/deliverables/team/${selectedTeam}/task/${selectedTask}`
          );
          setSubmission(response.data);
        } catch (error) {
          console.error('Error fetching submission:', error);
          setSubmission(null);
        }
      };

      fetchSubmission();
    }
  }, [selectedTeam, selectedTask]);

  // Fetch rubric and criteria when task is selected
  useEffect(() => {
    if (selectedTask) {
      const fetchRubricAndCriteria = async () => {
        try {
          // Fetch rubric
          const rubricResponse = await axiosInstance.get(
            `/rubrics?task_id=${selectedTask}`
          );

          const rubricData = await rubricResponse.data;

          // Check if we got an array (multiple rubrics) or single object
          const firstRubric = Array.isArray(rubricData) ? rubricData[0] : rubricData;
          setRubric(firstRubric);

          if (firstRubric && firstRubric.rubric_id) {
            // Fetch criteria
            const criteriaResponse = await axiosInstance.get(
              `/criteria?rubric_id=${firstRubric.rubric_id}`
            );

            const criteriaData = await criteriaResponse.data;
            setCriteria(criteriaData);

            // Initialize criteria scores
            const initialScores = criteriaData.map(criterion => ({
              criteria_id: criterion.criteria_id,
              points_awarded: 0,
              justification: '',
              max_points: criterion.max_points
            }));

            setCriteriaScores(initialScores);
          }
        } catch (error) {
          console.error('Error fetching rubric and criteria:', error);
          setRubric(null);
          setCriteria([]);
        }
      };

      fetchRubricAndCriteria();
    }
  }, [selectedTask]);

  // Calculate total score whenever criteria scores change
  useEffect(() => {
    const calculatedTotal = criteriaScores.reduce(
      (total, score) => total + (Number(score.points_awarded) || 0), 0
    );
    setTotalScore(calculatedTotal);
  }, [criteriaScores]);

  // Handle changing the points for a criterion
  const handlePointsChange = (criteriaId, points) => {
    setCriteriaScores(prevScores =>
      prevScores.map(score =>
        score.criteria_id === criteriaId
          ? {
            ...score,
            points_awarded: Math.min(
              Math.max(0, Number(points) || 0),
              score.max_points
            )
          }
          : score
      )
    );
  };

  // Handle changing the justification for a criterion
  const handleJustificationChange = (criteriaId, justification) => {
    setCriteriaScores(prevScores =>
      prevScores.map(score =>
        score.criteria_id === criteriaId
          ? { ...score, justification }
          : score
      )
    );
  };

  const handleSubmit = async () => {
    if (!selectedTeam || !selectedTask || !submission) {
      alert('Please select a team, task, and ensure there is a submission to mark.');
      return;
    }

    try {
      const scoreData = {
        deliverable_id: submission.deliverable_id,
        admin_id: user._id,
        criteria_scores: criteriaScores.map(score => ({
          criteria_id: score.criteria_id,
          points_awarded: score.points_awarded,
          justification: score.justification
        }))
      };

      await axiosInstance.post('/scores', scoreData);
      alert('Marking submitted successfully!');
    } catch (error) {
      console.error('Error submitting marks:', error);
      const errorMessage = error.response?.data?.error || 'An error occurred while submitting marks. Please try again.';
      alert(`Error submitting marks: ${errorMessage}`);
    }
  };

  return (
    <div className="bg-[#0b0e14] min-h-screen p-6 text-[#fafdff]">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#fafdff]">Submission Marking</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section - View Submission */}
        <SubmissionViewer
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          teams={teams}
          tasks={tasks}
          submission={submission}
        />

        {/* Right Section - Marking Interface */}
        <SubmissionMarker
          selectedTask={selectedTask}
          submission={submission}
          rubric={rubric}
          criteria={criteria}
          criteriaScores={criteriaScores}
          totalScore={totalScore}
          handlePointsChange={handlePointsChange}
          handleJustificationChange={handleJustificationChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ViewSubmission;