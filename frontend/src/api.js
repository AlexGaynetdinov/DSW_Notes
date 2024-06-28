import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username, password) => {
  const response = await api.post('/users/login', { username, password });
  return response.data;
};

// Function to get user data
export const getUserData = async (token) => {
  const response = await api.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserCollections = async () => {
  const response = await api.get('/collections/user');
  return response.data;
};

export const getCollectionNotes = async (collectionId) => {
  const response = await api.get(`/collections/${collectionId}/notes`);
  return response.data;
};

export const updateCollectionName = async (collectionId, newName) => {
  try {
    const response = await api.put(`/collections/${collectionId}`, {
      name: newName,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating collection name:', error);
    throw error; // Propagate error for handling in component
  }
};

export const createCollection = async (name) => {
  try {
    const response = await api.post('/collections', { name });
    return response.data;
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error; // Propagate error for handling in component
  }
};

export const deleteCollection = async (collectionId) => {
  const response = await api.delete(`/collections/${collectionId}`);
  return response.data;
}

export const updateNote = async (noteId, updatedNote) => {
  const response = await api.put(`/notes/${noteId}`, updatedNote);
  return response.data;
};

export const createNote = async (title, content) => {
  try {
    const response = await api.post('/notes', {
      title,
      content,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error; // Propagate error for handling in component
  }
};

export const deleteNote = async (noteId) => {
  const response = await api.delete(`/notes/${noteId}`);
  return response.data;
};

export const addNoteToCollection = async (collectionId, noteId) => {
  try {
    const response = await api.post(`/collections/${collectionId}/notes`, {
      noteId,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding note to collection:', error);
    throw error; // Propagate error for handling in component
  }
};

export default api;
