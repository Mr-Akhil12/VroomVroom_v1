import React from 'react';
import { Home, Map, PlusCircle, Car, User } from 'lucide-react';
import { AppScreen } from '../types';

interface NavigationProps {
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, setScreen }) => {
  const navItems = [
    { id: AppScreen.HOME, icon: Home, label: 'Social' },
    { id: AppScreen.MAP, icon: Map, label: 'Events' },
    { id: AppScreen.ADD_CAR, icon: PlusCircle, label: 'Add', special: true },
    { id: AppScreen.GARAGE, icon: Car, label: 'Garage' },
    { id: AppScreen.LOGIN, icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-brand-surface border-t border-gray-700 pb-safe pt-2 px-6 flex justify-between items-center z-50 h-16 sm:h-20">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        const Icon = item.icon;
        
        if (item.special) {
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className="relative -top-5 bg-brand-accent p-4 rounded-full shadow-lg shadow-red-900/50 hover:scale-105 transition-transform"
            >
              <Icon size={28} color="white" />
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`flex flex-col items-center gap-1 ${isActive ? 'text-brand-accent' : 'text-gray-400'}`}
          >
            <Icon size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};