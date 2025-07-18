import React from 'react';

const BugList = ({ bugs }) => {
  if (bugs.length === 0) return <p>No bugs reported yet.</p>;

  return (
    <div>
      <h2>Reported Bugs</h2>
      <ul>
        {bugs.map((bug) => (
          <li key={bug._id}>
            <strong>{bug.title}</strong>: {bug.description} [{bug.status}]
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BugList;