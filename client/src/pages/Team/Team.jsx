import React from 'react'
import IndividualProfile from '../../components/IndividualProfile/IndividualProfile'
import IndividualTeamDashboard from '../../components/IndividualTeamDashboard/IndividualTeamDashboard'
import Leaderboard from '../../components/Leaderboard/Leaderboard'

const Team = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#696ea5] to-[#f8f7f7]">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <IndividualProfile />
        </div>
        <div className="w-full md:w-1/2">
          <IndividualTeamDashboard />
        </div>
      </div>
{/*       <Leaderboard /> */}
    </div>
  )
}

export default Team;
