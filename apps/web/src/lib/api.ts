import axios from 'axios';

function getApiUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL || 'https://api.schedulers.app';
  const trimmedUrl = configuredUrl.replace(/\/+$/, '');

  return trimmedUrl.endsWith('/api/v1') ? trimmedUrl : `${trimmedUrl}/api/v1`;
}

const API_URL = getApiUrl();

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

export const getAvailableSlots = (params: {
  hostId: string;
  date: string;
  timeZone: string;
  duration?: number;
}) => api.get('/bookings/slots', { params }).then(res => res.data.data);

export const getHostBookings = (hostId: string) =>
  api.get(`/bookings/host/${hostId}`).then(res => res.data.data);

export const createMeeting = (data: any) =>
  api.post('/meetings', data).then(res => res.data.data);

export const sendTargetedInvite = (data: any) =>
  api.post('/invites/send', data).then(res => res.data);

export const getInvite = (id: string) =>
  api.get(`/invites/${id}`).then(res => res.data.data);

export const getHostInvites = (hostId: string) =>
  api.get(`/invites/host/${hostId}`).then(res => res.data.data);

export const bookInviteSlot = (data: { slotId: string, guestName: string, guestEmail: string }) =>
  api.post('/invites/book', data).then(res => res.data);

export const getNotificationSettings = () =>
  api.get('/notifications/settings').then(res => res.data);

export const updateNotificationSettings = (data: any) =>
  api.patch('/notifications/settings', data).then(res => res.data);

export const getIntegrations = () =>
  api.get('/integrations').then(res => res.data.data);

export const getGoogleCalendarConnectUrl = () =>
  api.get('/integrations/google/connect').then(res => res.data.data.url);

export const disconnectGoogleCalendar = () =>
  api.delete('/integrations/google').then(res => res.data);
