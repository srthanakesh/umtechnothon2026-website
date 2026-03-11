import React from 'react'
import IndividualProfile from '../../components/IndividualProfile/IndividualProfile'
import IndividualTeamDashboard from '../../components/IndividualTeamDashboard/IndividualTeamDashboard'
import Leaderboard from '../../components/Leaderboard/Leaderboard'

const Team = () => {
  return (
    <div className="min-h-screen bg-[#0a0c1b] p-4 md:p-8">
      {/* Removed the flex-row split. 
          The dashboard will now take up the full container width.
      */}
      <div className="max-w-7xl mx-auto">
        {/* Hiding IndividualProfile*/}
        {/* <div className="w-full md:w-1/2">
          <IndividualProfile />
        </div> */}

        <div className="w-full">
          <IndividualTeamDashboard />
        </div>
      </div>

      {/* Leaderboard remains commented out as per your original file */}
      {/* <Leaderboard /> */}
    </div>
  )
}

export default Team;