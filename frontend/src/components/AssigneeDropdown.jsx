import React from 'react';

const AssigneeDropdown = ({ 
  members, 
  selectedAssignee, 
  onAssigneeChange,
  disabled = false 
}) => {
  return (
    <div className="w-full">
      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
        Assign To (Optional)
      </label>
      <select
        value={selectedAssignee || ''}
        onChange={(e) => onAssigneeChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="">Unassigned</option>
        {members.map((member) => {
          // Handle different member data structures
          const firebaseUid = member.user?.firebaseUid || member.firebaseUid;
          const displayName = member.user?.displayName || member.displayName || member.userEmail;
          const userId = member.user?.id || member.userId || member.id;
          
          return (
            <option key={userId} value={firebaseUid}>
              {displayName} ({member.role})
            </option>
          );
        })}
      </select>
      {selectedAssignee && (
        <p className="mt-1 text-xs sm:text-sm text-gray-500">
          Selected: {members.find(m => (m.user?.firebaseUid || m.firebaseUid) === selectedAssignee)?.user?.displayName || 
                    members.find(m => (m.user?.firebaseUid || m.firebaseUid) === selectedAssignee)?.displayName || 
                    members.find(m => (m.user?.firebaseUid || m.firebaseUid) === selectedAssignee)?.userEmail}
        </p>
      )}
    </div>
  );
};

export default AssigneeDropdown;