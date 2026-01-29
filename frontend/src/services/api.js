const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

// ============= USER APIs =============
export const syncUserProfile = async (user) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firebaseUid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoUrl: user.photoURL || null,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to sync user profile');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error syncing user profile:', error);
    throw error;
  }
};

// ============= PROJECT APIs =============
export const createProject = async (name, description, firebaseUid) => {
  const response = await fetch(`${API_BASE_URL}/project?firebaseUid=${firebaseUid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, description }),
  });

  if (!response.ok) {
    throw new Error('Failed to create project');
  }

  return response.json();
};

export const getUserProjects = async (firebaseUid) => {
  const response = await fetch(`${API_BASE_URL}/project/user/${firebaseUid}`);

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
};

export const getProject = async (projectId, firebaseUid) => {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}?firebaseUid=${firebaseUid}`);

  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }

  return response.json();
};

export const deleteProject = async (projectId, firebaseUid) => {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}?firebaseUid=${firebaseUid}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
};

// ============= TASK APIs =============
export const createTask = async (title, description, projectId, firebaseUid) => {
  const response = await fetch(`${API_BASE_URL}/task?firebaseUid=${firebaseUid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, projectId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
};

export const getProjectTasks = async (projectId, firebaseUid) => {
  const response = await fetch(`${API_BASE_URL}/task/project/${projectId}?firebaseUid=${firebaseUid}`);

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
};

export const updateTaskStatus = async (taskId, status, firebaseUid) => {
  const response = await fetch(`${API_BASE_URL}/task/${taskId}/status?status=${status}&firebaseUid=${firebaseUid}`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('Failed to update task status');
  }

  return response.json();
};

export const deleteTask = async (taskId, firebaseUid) => {
  const response = await fetch(`${API_BASE_URL}/task/${taskId}?firebaseUid=${firebaseUid}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};

// ============= PROJECT MEMBER APIs =============
export const getProjectMembers = async (projectId) => {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}/members`);

  if (!response.ok) {
    throw new Error('Failed to fetch members');
  }

  return response.json();
};

export const addProjectMember = async (projectId, userEmail, role, requestorFirebaseUid) => {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}/members?requestorFirebaseUid=${requestorFirebaseUid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userEmail, role }),
  });

  if (!response.ok) {
    throw new Error('Failed to add member');
  }

  return response.json();
};

export const removeProjectMember = async (projectId, userId, requestorFirebaseUid) => {
  const response = await fetch(`${API_BASE_URL}/project/${projectId}/members/${userId}?requestorFirebaseUid=${requestorFirebaseUid}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to remove member');
  }
};