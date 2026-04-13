import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// We use the dummy x-user-id header we set up in the backend
const DEFAULT_USER_ID = 'cm9lndj6y0000ux3v8x9r9fzb'; // Placeholder ID

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-user-id': DEFAULT_USER_ID
  }
});

export const getAvailability = (userId: string) => 
  api.get(`/availability/${userId}`).then(res => res.data.data);

export const updateAvailability = (userId: string, data: any) =>
  api.put(`/availability/${userId}`, data).then(res => res.data.data);

export const getMeetings = () =>
  api.get('/meetings').then(res => res.data.data);
