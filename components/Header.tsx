import React from 'react';
import { InecoLogo } from './InecoLogo';

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.95-4.243l-1.59-1.59M3 12h2.25m.386-6.364l1.59 1.59M12 12a4.5 4.5 0 014.5 4.5v.001a4.5 4.5 0 01-9 0v-.001a4.5 4.5 0 014.5-4.5z" />
    </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);


interface HeaderProps {
    theme: string;
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';

  return (
    <header className={`w-full shadow-md transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-[#1A4488]'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <InecoLogo className="h-8" variant={isLight ? 'color' : 'white'} />
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 ${
                isLight 
                ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-800 focus:ring-slate-400' 
                : 'text-white/80 hover:text-white hover:bg-white/20 focus:ring-white/50'
            }`}
            aria-label={`Activar modo ${isLight ? 'oscuro' : 'claro'}`}
            title={`Activar modo ${isLight ? 'oscuro' : 'claro'}`}
        >
            {isLight ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};
