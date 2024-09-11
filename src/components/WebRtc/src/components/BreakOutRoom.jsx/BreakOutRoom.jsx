import React, { useState } from 'react';

const BreakoutRoomPopup = ({ participants, onClose, onCreateRoom }) => {
  const [selectedParticipants, setSelectedParticipants] = useState([]);

  const handleParticipantToggle = (participantId) => {
    setSelectedParticipants(prev => 
      prev.includes(participantId)
        ? prev.filter(id => id !== participantId)
        : [...prev, participantId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateRoom(selectedParticipants);
  };

  return (
    <div className="popup">
      <h2>Create Breakout Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {participants.map(participant => (
            <label key={participant.id}>
              <input
                type="checkbox"
                checked={selectedParticipants.includes(participant.id)}
                onChange={() => handleParticipantToggle(participant.id)}
              />
              {participant.name}
            </label>
          ))}
        </div>
        <button type="submit">Create Room</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default BreakoutRoomPopup;