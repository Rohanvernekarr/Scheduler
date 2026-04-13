import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// We use the dummy x-user-id header we set up in the backend
export const DEFAULT_USER_ID = 'cm9lndj6y0000ux3v8x9r9fzb'; // Placeholder ID

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

export const getMeetings = (userId: string = DEFAULT_USER_ID) =>
  api.get('/meetings', { params: { userId } }).then(res => res.data.data);


export const getUserProfile = (username: string) =>
  api.get(`/users/profile/${username}`).then(res => res.data.data);

export const createBooking = (data: any) =>
  api.post('/bookings', data).then(res => res.data.data);

export const getHostBookings = (hostId: string) =>
  api.get(`/bookings/host/${hostId}`).then(res => res.data.data);

export const createMeeting = (data: any) =>
  api.post('/meetings', data).then(res => res.data.data);

