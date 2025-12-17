import { createClient } from '@supabase/supabase-js';

// NOTE: In a real app, use process.env.SUPABASE_URL and process.env.SUPABASE_KEY
// For this demo, we will mock the interactions if keys are missing to ensure the UI is runnable.
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Mock Data for MVP visualization
export const MOCK_CARS = [
  { id: '1', ownerId: 'user1', make: 'Nissan', model: 'GT-R', year: 2017, color: '#silver', trim: 'Facelift', thumbnailUrl: 'https://picsum.photos/400/200' },
  { id: '2', ownerId: 'user1', make: 'BMW', model: 'M3', year: 2021, color: '#blue', trim: 'Facelift', thumbnailUrl: 'https://picsum.photos/400/201' },
];

export const MOCK_GROUPS = [
  { id: '1', name: 'JDM Legends', description: 'Japanese Domestic Market enthusiasts.', memberCount: 1240, imageUrl: 'https://picsum.photos/100/100' },
  { id: '2', name: 'Euro Tuners', description: 'BMW, Audi, Mercedes builds.', memberCount: 850, imageUrl: 'https://picsum.photos/100/101' },
];

export const MOCK_EVENTS = [
  { id: '1', title: 'Midnight Meet', date: 'Tonight, 10 PM', location: 'Downtown Plaza', coordinates: { lat: 34.0522, lng: -118.2437 }, attendees: 45, isRsvp: false },
  { id: '2', title: 'Track Day', date: 'Sat, 9 AM', location: 'Laguna Seca', coordinates: { lat: 36.5841, lng: -121.7535 }, attendees: 120, isRsvp: true },
];
