export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
}

export interface Car {
  id: string;
  ownerId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  trim: 'Facelift' | 'Pre-Facelift';
  modelUrl?: string; // URL to GLB
  thumbnailUrl?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  imageUrl: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  coordinates: { lat: number; lng: number };
  attendees: number;
  isRsvp?: boolean;
}

export enum AppScreen {
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  GARAGE = 'GARAGE',
  ADD_CAR = 'ADD_CAR',
  MAP = 'MAP',
  SHOWROOM = 'SHOWROOM',
}
