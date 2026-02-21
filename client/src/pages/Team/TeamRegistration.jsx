import React from 'react';
import TeamRegistration from '../../components/TeamRegistration/TeamRegistration';
import TeamRoute from '../Team/TeamRoute';

const TeamRegistrationPage = () => {
  return (
    <TeamRoute>
      <TeamRegistration />
    </TeamRoute>
  );
};

export default TeamRegistrationPage;