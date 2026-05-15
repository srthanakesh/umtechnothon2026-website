import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "../../context/UserProvider";
import envConfig from '../../config/envConfig';

const FormAndSubmission = () => {
  const [task, setTask] = useState(null); 
  const [criteria, setCriteria] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClosed, setIsClosed] = useState(false);

  const API_URL = envConfig.serverBaseApi;

  // Countdown to May 3, 2026 11:59 PM (GMT+8)
  useEffect(() => {
    const deadline = new Date('2026-05-03T23:59:00+08:00').getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, deadline - now);
      
      setIsClosed(diff === 0);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fetchTaskAndCriteria = async () => {
      setIsLoading(true);
      try {
        // Fetch all tasks and use the latest one
        const allTasksResponse = await axios.get(`${API_URL}/tasks`);
        const allTasks = allTasksResponse.data;

        if (!allTasks || allTasks.length === 0) {
          setTask(null);
          setCriteria([]);
          setIsLoading(false);
          return;
        }

        const latestTask = allTasks[allTasks.length - 1];
        setTask(latestTask);
        const currentTaskId = latestTask.task_id;

        const rubricResponse = await axios.get(`${API_URL}/rubrics?task_id=${currentTaskId}`);
        if (rubricResponse.data && rubricResponse.data.length > 0) {
          const rubricId = rubricResponse.data[0].rubric_id;
          const criteriaResponse = await axios.get(`${API_URL}/criteria?rubric_id=${rubricId}`);
          setCriteria(criteriaResponse.data);
        } else {
          console.log('No rubrics found for this task');
          setCriteria([]);
        }
      } catch (error) {
        console.error('Error fetching task or criteria:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTaskAndCriteria();
  }, [API_URL]);



  // FIX 2: Early return if user context isn't ready
  if (!user) return <div className="p-8 text-center text-white">Loading session...</div>;

  return (
    <div className="bg-[#0a0c1b] min-h-screen p-4 md:p-8 text-center relative text-white">
      {/* Submission Period — Minimal */}
      <div className="my-6 md:my-8 mx-auto max-w-2xl">

        {/* Live indicator */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {!isClosed ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase">Submission Open</span>
            </>
          ) : (
            <>
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="text-red-500 text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase">Submission Closed</span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl md:text-3xl font-black text-white tracking-tight mb-5 uppercase">
          Preliminary Round
        </h2>

        {/* Date Range */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-6">
          <div className="text-center">
            <p className="text-3xl md:text-5xl font-black text-white leading-none">1</p>
            <p className="text-[10px] md:text-xs text-cyan-400 font-semibold tracking-wider uppercase mt-1">May</p>
            <p className="text-[10px] md:text-xs text-slate-400 font-mono mt-0.5">12:00 AM</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-10 md:w-16 h-px bg-cyan-400/30" />
            <span className="text-[10px] text-slate-400 font-mono tracking-widest">TO</span>
            <div className="w-10 md:w-16 h-px bg-cyan-400/30" />
          </div>

          <div className="text-center">
            <p className="text-3xl md:text-5xl font-black text-white leading-none">3</p>
            <p className="text-[10px] md:text-xs text-cyan-400 font-semibold tracking-wider uppercase mt-1">May</p>
            <p className="text-[10px] md:text-xs text-slate-400 font-mono mt-0.5">11:59 PM</p>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-3 md:gap-4">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hrs' },
            { value: timeLeft.minutes, label: 'Min' },
            { value: timeLeft.seconds, label: 'Sec' },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-3 md:gap-4">
              <div className="text-center">
                <p className="text-2xl md:text-4xl font-sans font-extrabold text-[#FFF8E7] leading-none tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </p>
                <p className="text-[9px] md:text-[10px] text-slate-400 font-sans uppercase tracking-wider mt-1">{item.label}</p>
              </div>
              {i < 3 && <span className="text-slate-400 text-lg md:text-2xl font-light -mt-3">:</span>}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mt-4 text-left">
        
        {/* LEFT COLUMN - BLURRED OVERLAY */}
        <div className="relative isolate w-full md:w-2/3 order-2 md:order-1">
          
          <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[#0a0c1b]/60 backdrop-blur-xl pointer-events-none" />
            
            <div className="relative z-50 bg-[#050914]/95 border border-cyan-500/30 p-10 md:p-14 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.2)] pointer-events-auto text-center flex flex-col items-center transform hover:scale-105 transition-transform duration-500">
               <span className="text-cyan-400 text-xs md:text-sm font-mono tracking-[0.4em] uppercase mb-4 block">Mentorship</span>
               <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                SLOT OPENING <br/> 
                <span className="text-cyan-400 animate-pulse">SOON</span>
              </h3>
              <div className="mt-6 w-16 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            </div>
          </div>

          {/* ORIGINAL TASKS CONTENT (Blurred) */}
          <div 
            className="w-full h-full bg-[#161b33] border border-white/10 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col pointer-events-none select-none opacity-80"
            style={{ overflow: 'hidden' }}
          >
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <p className="text-xl text-cyan-400 animate-pulse">Loading task details...</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4 md:mb-6 uppercase tracking-tighter">Dashboard</h2>
              
              <div className="mb-4 md:mb-6">
                <p className="text-base md:text-lg text-cyan-400 font-semibold mb-2">Task Name:</p>
                <div className="p-2 md:p-3 bg-black/40 border border-white/10 rounded-lg w-full min-h-10 text-gray-200">
                  {task ? task.task_name : 'No task found'}
                </div>
              </div>
              
              <div className="mb-6 md:mb-8">
                <p className="text-base md:text-lg text-cyan-400 font-semibold mb-2">Task Description:</p>
                <div className="p-2 md:p-3 bg-black/40 border border-white/10 rounded-lg w-full min-h-20 text-gray-200 leading-relaxed">
                  {task ? task.task_description : 'No description available'}
                </div>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4 md:mb-6 uppercase tracking-tighter">Criteria</h2>
              
              {Array.isArray(criteria) && criteria.length > 0 ? (
                <div className="space-y-6 md:space-y-8">
                  {criteria.map((item, index) => (
                    <div key={item.criteria_id || index} className="p-3 md:p-4 bg-white/5 border border-white/5 rounded-lg">
                      <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-purple-400">
                        Criteria {index + 1}
                      </h3>
                      <div className="mb-3">
                        <p className="text-gray-400 font-medium mb-2 text-sm uppercase">Name:</p>
                        <div className="p-2 bg-black/20 border border-white/5 rounded-lg">{item.criteria_name}</div>
                      </div>
                      {item.criteria_description && (
                        <div>
                          <p className="text-gray-400 font-medium mb-2 text-sm uppercase">Description:</p>
                          <div className="p-2 bg-black/20 border border-white/5 rounded-lg min-h-16 text-gray-300">{item.criteria_description}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 md:p-6 bg-white/5 rounded-lg">
                  <p className="text-gray-500 italic">No criteria available for this task</p>
                </div>
              )}
            </>
          )}
        </div>
        </div>
        
        <div className="md:mt-0 w-full md:w-1/3 order-1 md:order-2">
          <div className="w-full transition-all duration-300 ease-in-out bg-[#161b33] border border-cyan-500/30 rounded-2xl shadow-lg p-4 md:p-6 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 mt-2">Submission</h3>
            <p className="text-gray-400 mb-6 text-sm">
              Task submissions are handled via Google Forms. Click the button below to submit your deliverables.
            </p>
            <button 
              onClick={() => window.open('https://forms.gle/YLDYMktXTdN86bZf7', '_blank')} 
              className="w-full text-lg font-bold px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white transition-all uppercase tracking-tight"
            >
              Ready to Submit?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAndSubmission;