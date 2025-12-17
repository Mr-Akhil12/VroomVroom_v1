import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Showroom3D } from './components/Showroom3D';
import { AppScreen, Car, User } from './types';
import { supabase, MOCK_CARS, MOCK_GROUPS, MOCK_EVENTS } from './services/supabaseService';
import { Camera, Upload, Layers, MapPin, CheckCircle, XCircle, Share2, MessageSquare } from 'lucide-react';

// --- Screen Components ---

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <div className="p-8 flex flex-col justify-center h-full max-w-md mx-auto">
    <div className="mb-10 text-center">
      <h1 className="text-4xl font-black italic tracking-tighter text-brand-accent">CAR<span className="text-white">SHOWROOM</span></h1>
      <p className="text-gray-400 mt-2">Build. Show. Connect.</p>
    </div>
    <div className="space-y-4">
      <input type="email" placeholder="Email" className="w-full bg-brand-surface border border-gray-700 rounded-lg p-4 text-white focus:border-brand-accent outline-none transition-colors" />
      <input type="password" placeholder="Password" className="w-full bg-brand-surface border border-gray-700 rounded-lg p-4 text-white focus:border-brand-accent outline-none transition-colors" />
      <button 
        onClick={onLogin}
        className="w-full bg-brand-accent text-white font-bold py-4 rounded-lg shadow-lg shadow-red-900/40 hover:bg-red-500 transition-colors"
      >
        Sign In
      </button>
    </div>
    <p className="mt-6 text-center text-sm text-gray-500">Don't have an account? <span className="text-white font-semibold cursor-pointer">Sign up</span></p>
  </div>
);

const HomeScreen = () => (
  <div className="p-4 pb-24 space-y-6">
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Community</h1>
      <div className="w-10 h-10 bg-brand-surface rounded-full flex items-center justify-center border border-gray-700">
        <MessageSquare size={20} />
      </div>
    </header>

    {/* Groups Horizontal Scroll */}
    <section>
      <h2 className="text-lg font-semibold mb-3 text-gray-300">Your Groups</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {MOCK_GROUPS.map(group => (
          <div key={group.id} className="min-w-[200px] bg-brand-surface rounded-xl p-4 border border-gray-700 flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-gray-600 mb-3 bg-cover" style={{ backgroundImage: `url(${group.imageUrl})` }} />
            <h3 className="font-bold text-white">{group.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{group.memberCount} members</p>
            <button className="mt-3 w-full py-1.5 bg-brand-dark rounded text-xs text-gray-300 border border-gray-600">Open Chat</button>
          </div>
        ))}
        <div className="min-w-[100px] flex items-center justify-center bg-brand-surface/50 rounded-xl border border-dashed border-gray-600">
          <p className="text-xs text-gray-400">Join Group</p>
        </div>
      </div>
    </section>

    {/* Feed */}
    <section>
      <h2 className="text-lg font-semibold mb-3 text-gray-300">Latest Builds</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-brand-surface rounded-xl overflow-hidden border border-gray-700">
            <div className="h-48 bg-gray-800 bg-cover bg-center relative" style={{ backgroundImage: `url(https://picsum.photos/600/40${i})` }}>
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur px-2 py-1 rounded text-xs font-mono">GLB READY</div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">Toyota Supra MK4</h3>
                  <p className="text-sm text-gray-400">@turbo_tom • 2h ago</p>
                </div>
                <Share2 size={20} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-300 mt-2">Just finished the widebody scan. Check out the 3D model!</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const AddCarScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);

  // Simulation of camera capture
  const handleCapture = () => {
    // In a real app, interact with navigator.mediaDevices
    const mockPhoto = `https://picsum.photos/200/300?random=${Date.now()}`;
    setPhotos([...photos, mockPhoto]);
  };

  return (
    <div className="h-full flex flex-col p-4 pb-24">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold flex-1">Add New Ride</h1>
        <span className="text-xs bg-brand-surface px-2 py-1 rounded border border-gray-600">Step {step}/3</span>
      </div>

      {step === 1 && (
        <div className="space-y-4 flex-1">
          <label className="block text-sm text-gray-400 mb-1">Make</label>
          <input className="w-full bg-brand-surface border border-gray-700 rounded-lg p-3 text-white" placeholder="e.g. Mazda" />
          
          <label className="block text-sm text-gray-400 mb-1">Model</label>
          <input className="w-full bg-brand-surface border border-gray-700 rounded-lg p-3 text-white" placeholder="e.g. RX-7" />
          
          <label className="block text-sm text-gray-400 mb-1">Year</label>
          <input type="number" className="w-full bg-brand-surface border border-gray-700 rounded-lg p-3 text-white" placeholder="2002" />

          <div className="pt-4">
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-brand-accent py-3 rounded-lg font-bold shadow-lg"
            >
              Next: Scan Car
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col">
          <div className="bg-black rounded-xl overflow-hidden relative flex-1 mb-4 border border-gray-800 flex items-center justify-center">
            {/* Camera Viewport Placeholder */}
            <div className="text-center p-6">
              <Camera size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">Align guide with vehicle</p>
              <p className="text-xs text-gray-500 mt-2">Take photos from 8 angles</p>
            </div>
            {/* Grid Overlay */}
            <div className="absolute inset-0 border-2 border-dashed border-white/20 pointer-events-none m-8 rounded-lg"></div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto mb-4 h-20">
            {photos.map((p, i) => (
              <img key={i} src={p} alt="scan" className="h-full w-20 object-cover rounded-md border border-gray-600" />
            ))}
            {photos.length < 8 && (
               <div className="h-full w-20 bg-brand-surface rounded-md border border-gray-600 flex items-center justify-center">
                 <span className="text-xs text-gray-500">{photos.length}/8</span>
               </div>
            )}
          </div>

          <button 
            onClick={handleCapture} 
            className="w-16 h-16 rounded-full bg-white self-center mb-4 border-4 border-gray-400 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          />
          
          {photos.length > 0 && (
             <button 
             onClick={() => setStep(3)}
             className="w-full bg-brand-accent py-3 rounded-lg font-bold shadow-lg"
           >
             Next: Generate 3D
           </button>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
           <Layers size={64} className="text-brand-accent animate-pulse" />
           <div className="text-center">
             <h3 className="text-xl font-bold">Generate 3D Model</h3>
             <p className="text-sm text-gray-400 mt-2 px-8">
               We use Hugging Face Trellis to convert your photos into a GLB file.
             </p>
           </div>
           
           <div className="w-full bg-brand-surface p-4 rounded-xl border border-gray-700">
             <p className="text-xs text-gray-400 mb-2 font-mono uppercase">Steps</p>
             <ol className="list-decimal list-inside text-sm space-y-2 text-gray-300">
               <li>Click "Open Generator" below.</li>
               <li>Upload your captured photos.</li>
               <li>Download the .GLB file.</li>
               <li>Come back here and upload it.</li>
             </ol>
           </div>

           <a 
            href="https://huggingface.co/spaces/trellis-community/TRELLIS" 
            target="_blank" 
            rel="noreferrer"
            className="w-full bg-indigo-600 py-3 rounded-lg font-bold shadow-lg text-center block"
           >
             Open Generator (External)
           </a>

           <div className="w-full pt-4 border-t border-gray-800">
             <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-brand-surface/50 hover:bg-brand-surface">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload GLB</span></p>
                </div>
                <input type="file" className="hidden" accept=".glb,.gltf" onChange={onComplete} />
             </label>
           </div>
        </div>
      )}
    </div>
  );
};

const GarageScreen = ({ onSelectCar }: { onSelectCar: (car: Car) => void }) => (
  <div className="p-4 pb-24">
    <h1 className="text-2xl font-bold mb-6">My Garage</h1>
    <div className="grid grid-cols-1 gap-6">
      {MOCK_CARS.map((car) => (
        <div 
          key={car.id} 
          onClick={() => onSelectCar(car as Car)}
          className="bg-brand-surface rounded-2xl overflow-hidden shadow-lg border border-gray-700 group cursor-pointer"
        >
          <div className="h-40 bg-gray-800 relative overflow-hidden">
             <img src={car.thumbnailUrl} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-surface to-transparent opacity-80" />
             <div className="absolute bottom-4 left-4">
               <h2 className="text-2xl font-black italic">{car.make.toUpperCase()}</h2>
               <p className="font-medium text-brand-accent">{car.model}</p>
             </div>
             <div className="absolute top-4 right-4 bg-white/10 backdrop-blur rounded-full p-2">
               <Layers size={20} className="text-white" />
             </div>
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-sm text-gray-400">{car.year} • {car.trim}</span>
            <span className="text-xs font-bold text-brand-accent border border-brand-accent px-2 py-1 rounded">VIEW 3D</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EventsScreen = () => {
  // Simple Mock Map UI
  return (
    <div className="h-full relative">
      <div className="absolute inset-0 bg-gray-800">
        <div className="w-full h-full opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center" />
        {/* Mock Pins */}
        {MOCK_EVENTS.map(event => (
          <div 
            key={event.id}
            className="absolute p-2 bg-brand-surface/90 rounded-xl shadow-xl border border-brand-accent transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 w-32"
            style={{ 
              top: `${50 + (event.coordinates.lat - 34) * 5}%`, 
              left: `${50 + (event.coordinates.lng + 118) * 5}%` 
            }}
          >
            <MapPin size={20} className="text-brand-accent" />
            <span className="text-[10px] font-bold text-center leading-tight">{event.title}</span>
            <div className="flex gap-2 mt-1">
               {event.isRsvp ? <CheckCircle size={12} className="text-green-500"/> : <div className="w-3 h-3 rounded-full border border-gray-500" />}
            </div>
          </div>
        ))}
      </div>
      
      {/* Event List Overlay */}
      <div className="absolute bottom-20 left-4 right-4 max-h-[40%] overflow-y-auto space-y-3">
        {MOCK_EVENTS.map(event => (
          <div key={event.id} className="bg-brand-surface/90 backdrop-blur-md p-4 rounded-xl border border-gray-700 shadow-xl">
             <div className="flex justify-between items-start">
               <div>
                 <h3 className="font-bold text-white">{event.title}</h3>
                 <p className="text-sm text-brand-accent">{event.date}</p>
                 <p className="text-xs text-gray-400 mt-1">{event.location}</p>
               </div>
               <div className="flex flex-col items-end gap-2">
                 <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">{event.attendees} going</span>
                 <button className={`px-3 py-1 rounded text-xs font-bold ${event.isRsvp ? 'bg-green-600' : 'bg-brand-accent'}`}>
                   {event.isRsvp ? 'Going' : 'RSVP'}
                 </button>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.LOGIN);
  const [activeCar, setActiveCar] = useState<Car | null>(null);

  const handleLogin = () => {
    setScreen(AppScreen.HOME);
  };

  const handleCarSelect = (car: Car) => {
    setActiveCar(car);
  };

  const handleCloseShowroom = () => {
    setActiveCar(null);
  };

  const renderScreen = () => {
    switch (screen) {
      case AppScreen.LOGIN: return <LoginScreen onLogin={handleLogin} />;
      case AppScreen.HOME: return <HomeScreen />;
      case AppScreen.GARAGE: return <GarageScreen onSelectCar={handleCarSelect} />;
      case AppScreen.ADD_CAR: return <AddCarScreen onComplete={() => setScreen(AppScreen.GARAGE)} />;
      case AppScreen.MAP: return <EventsScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans overflow-hidden relative">
      {/* 3D Viewer Overlay */}
      {activeCar && <Showroom3D car={activeCar} onClose={handleCloseShowroom} />}

      {/* Main Content Area */}
      <main className="h-screen w-full overflow-y-auto">
        {renderScreen()}
      </main>

      {/* Navigation (Only show if logged in and not in full screen mode like Add Car process usually is, but for simplicity showing always unless login) */}
      {screen !== AppScreen.LOGIN && (
        <Navigation currentScreen={screen} setScreen={setScreen} />
      )}
    </div>
  );
};

export default App;