import React, { useState } from 'react';
import HackathonCard from '../components/HackathonCard.jsx';
import { hackathons } from '../data/mockData';

const styles = {
  page: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    minHeight: 'calc(100vh - 140px)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  h1: {
    color: '#1a1a2e',
    fontSize: '2.5rem',
    margin: '0 0 0.5rem 0'
  },
  p: {
    color: '#7f8c8d',
    fontSize: '1.1rem'
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  searchBar: {
    flex: 1,
    minWidth: '250px',
    padding: '0.8rem 1rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem'
  },
  select: {
    padding: '0.8rem 1rem',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    background: '#fff',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem'
  },
  noResults: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '1.2rem',
    gridColumn: '1 / -1',
    padding: '3rem'
  }
};

const Hackathons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  const domains = ['All', ...new Set(hackathons.map(h => h.domain))];

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hackathon.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'All' || hackathon.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Discover Hackathons</h1>
        <p style={styles.p}>Find and participate in exciting hackathons</p>
      </div>
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search hackathons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchBar}
        />
        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          style={styles.select}
        >
          {domains.map(domain => (
            <option key={domain} value={domain}>{domain}</option>
          ))}
        </select>
      </div>
      <div style={styles.grid}>
        {filteredHackathons.length > 0 ? (
          filteredHackathons.map(hackathon => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))
        ) : (
          <p style={styles.noResults}>No hackathons found</p>
        )}
      </div>
    </div>
  );
};

export default Hackathons;
