import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getAvailability = (userId: string) => 
  api.get(`/availability/${userId}`).then(res => res.data.data);

export const updateAvailability = (userId: string, data: any) =>
  api.put(`/availability/${userId}`, data).then(res => res.data.data);

export const getMeetings = (userId?: string) =>
  api.get('/meetings', { params: userId ? { userId } : {} }).then(res => res.data.data);


export const getUserProfile = (username: string) =>
  api.get(`/users/profile/${username}`).then(res => res.data.data);

export const createBooking = (data: any) =>
  api.post('/bookings', data).then(res => res.data.data);

export const getHostBookings = (hostId: string) =>
  api.get(`/bookings/host/${hostId}`).then(res => res.data.data);

export const createMeeting = (data: any) =>
  api.post('/meetings', data).then(res => res.data.data);

export const sendTargetedInvite = (data: any) =>
  api.post('/invites/send', data).then(res => res.data);

export const getInvite = (id: string) =>
  api.get(`/invites/${id}`).then(res => res.data.data);

export const bookInviteSlot = (data: { slotId: string, guestName: string, guestEmail: string }) =>
  api.post('/invites/book', data).then(res => res.data);
