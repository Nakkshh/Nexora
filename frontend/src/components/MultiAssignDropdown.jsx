import { useState } from 'react';

export default function MultiAssignDropdown({ task, members, onAssign, onClose, assigningTask }) {
  const [selectedMembers, setSelectedMembers] = useState(
    task.assignees?.map(a => a.firebaseUid) || []
  );

  const toggleMember = (firebaseUid) => {
    setSelectedMembers(prev =>
      prev.includes(firebaseUid)
        ? prev.filter(id => id !== firebaseUid)
        : [...prev, firebaseUid]
    );
  };

  const handleSave = () => {
    const selected = members.filter(m => selectedMembers.includes(m.firebaseUid));
    onAssign(selected);
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl shadow-2xl z-50 max-w-sm sm:max-w-md mx-auto">
      {/* Header */}
      <div className="p-2.5 sm:p-3 border-b border-gray-200 flex items-center justify-between">
        <span className="text-xs sm:text-sm font-bold text-gray-900">
          Assign Members ({selectedMembers.length})
        </span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Member List with Checkboxes */}
      <div className="max-h-48 sm:max-h-64 overflow-y-auto">
        {members.length === 0 ? (
          <div className="p-3 sm:p-4 text-center text-gray-500 text-xs sm:text-sm">
            No members available
          </div>
        ) : (
          members.map((member) => {
            const isSelected = selectedMembers.includes(member.firebaseUid);
            return (
              <label
                key={member.id}
                className="flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleMember(member.firebaseUid)}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                />
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {(member.displayName || member.userEmail)?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                    {member.displayName || member.userEmail}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-500">{member.role}</div>
                </div>
                {isSelected && (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </label>
            );
          })
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-2.5 sm:p-3 border-t border-gray-200 flex gap-2">
        <button
          onClick={() => setSelectedMembers([])}
          disabled={selectedMembers.length === 0}
          className="flex-1 px-2.5 sm:px-3 py-2 text-[10px] sm:text-xs font-semibold text-gray-600 hover:bg-gray-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear All
        </button>
        <button
          onClick={handleSave}
          disabled={assigningTask}
          className="flex-1 px-2.5 sm:px-3 py-2 text-[10px] sm:text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {assigningTask ? (
            <span className="flex items-center justify-center gap-1.5 sm:gap-2">
              <svg className="animate-spin h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            `Save (${selectedMembers.length})`
          )}
        </button>
      </div>
    </div>
  );
}