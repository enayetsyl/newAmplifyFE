import React from 'react';

const RepositoryTab = ({ repositories, selectedRepositoryMeetingTab, selectedDocAndMediaTab }) => {
  const filteredRepositories = selectedRepositoryMeetingTab
    ? repositories.filter(repo => repo.meetingId === selectedRepositoryMeetingTab._id)
    : [];

  const displayRepositories = filteredRepositories.filter(repo => {
    if (selectedDocAndMediaTab === "Documents") {
      return repo.type === "application/pdf";
    } else if (selectedDocAndMediaTab === "Media") {
      return repo.type !== "application/pdf";
    }
    return true;
  });

  const renderContent = () => {
    if (displayRepositories.length === 0) {
      return <p className='text-center pt-5 font-bold text-custom-orange-1'>No {selectedDocAndMediaTab.toLowerCase()} found for this meeting.</p>;
    }

    return (
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">File Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {displayRepositories.map(repo => (
            <tr key={repo._id}>
              <td className="border p-2">{repo.fileName}</td>
              <td className="border p-2">{repo.type}</td>
              <td className="border p-2">{new Date(repo.addedDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {selectedRepositoryMeetingTab && selectedDocAndMediaTab ? (
        renderContent()
      ) : (
        <p className="text-center pt-5 font-bold text-custom-orange-1">Please select a meeting and a tab (Documents or Media) to view repository items.</p>
      )}
    </div>
  );
};

export default RepositoryTab;