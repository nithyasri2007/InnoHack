import React from 'react';
import HackathonCard from '../components/HackathonCard.jsx';
import { myHackathons } from '../data/mockData';
import './MyHackathons.css';

const MyHackathons = () => {
  return (
    <div className="my-hackathons-page">
      <div className="page-header">
        <h1>My Hackathons</h1>
        <p>Track your hackathon applications</p>
      </div>
      <div className="hackathons-grid">
        {myHackathons.length > 0 ? (
          myHackathons.map(hackathon => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))
        ) : (
          <p className="no-results">You haven't applied to any hackathons yet</p>
        )}
      </div>
    </div>
  );
};

export default MyHackathons;
