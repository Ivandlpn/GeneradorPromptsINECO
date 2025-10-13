import React, { useState } from 'react';

const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 4.811 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const PresentationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h.008v.015h-.008v-.015zm17.25 0h.008v.015h-.008v-.015zM9.75 7.5h4.5m-4.5 3h4.5m-4.5 3h4.5m3-12v15m4.125-15h.008v.015h-.008V4.5z" />
    </svg>
);
const ReportIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625a1.875 1.875 0 00-1.875 1.875v17.25a1.875 1.875 0 001.875 1.875h12.75a1.875 1.875 0 001.875-1.875V11.25a9 9 0 00-9-9z" />
    </svg>
);
const CommsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.056 3 12c0 4.556 4.03 8.25 9 8.25z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3.375 3.375 0 100-6.75 3.375 3.375 0 000 6.75z" />
    </svg>
);
const SocialIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632zM12 9.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
    </svg>
);
const ProposalIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
);
const VideoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const AwardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const ArticleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
    </svg>
);
const PressIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" />
    </svg>
);
const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => ( // Generic icon
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625a1.875 1.875 0 00-1.875 1.875v17.25a1.875 1.875 0 001.875 1.875h12.75a1.875 1.875 0 001.875-1.875V11.25a9 9 0 00-9-9z" />
    </svg>
);

const categoryIcons: { [key: string]: React.FC<{ className?: string }> } = {
  'Presentación': PresentationIcon,
  'Informe Técnico': ReportIcon,
  'Comunicación Interna': CommsIcon,
  'Redes Sociales': SocialIcon,
  'Propuesta Comercial': ProposalIcon,
  'Guion de Vídeo': VideoIcon,
  'Caso de Éxito': AwardIcon,
  'Artículo para Blog': ArticleIcon,
  'Nota de Prensa': PressIcon,
  'default': DocumentIcon
};

interface HistoryItem {
  prompt: string;
  category: string;
}

interface HistoryProps {
  history: HistoryItem[];
  onSelect: (prompt: string) => void;
  onClear: () => void;
}

export const History: React.FC<HistoryProps> = ({ history, onSelect, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (history.length === 0) return null;

  const getIconForCategory = (category: string) => {
    return categoryIcons[category] || categoryIcons['default'];
  };

  const handleClear = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todo el historial? Esta acción no se puede deshacer.')) {
      onClear();
      setIsOpen(false);
    }
  };

  return (
    <div className="bg-slate-100/80 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-3 text-left focus:outline-none">
          <div className="flex items-center gap-3">
            <HistoryIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Historial de Prompts</span>
            <span className="text-xs bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 font-bold px-2 py-0.5 rounded-full">{history.length}</span>
          </div>
          <ChevronDownIcon className={`w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="pb-3 animate-fade-in" style={{animationDuration: '0.2s'}}>
            <ul className="max-h-60 overflow-y-auto space-y-2 pr-2">
              {history.map((item, index) => {
                  const Icon = getIconForCategory(item.category);
                  return (
                    <li key={index}>
                      <button 
                        onClick={() => { onSelect(item.prompt); setIsOpen(false); }} 
                        className="w-full text-left p-3 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 flex items-start gap-3 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-blue-900/30 dark:hover:border-blue-600 dark:focus:ring-offset-slate-900"
                      >
                        <Icon className="w-5 h-5 text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-grow overflow-hidden">
                            <p className="truncate text-slate-700 dark:text-slate-200 font-medium text-sm">{item.prompt.split('\n')[0]}</p>
                            <p className="truncate text-slate-500 dark:text-slate-400 text-xs mt-1">{item.prompt.substring(item.prompt.indexOf('\n') + 1)}</p>
                        </div>
                      </button>
                    </li>
                  );
              })}
            </ul>
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button onClick={handleClear} className="text-sm flex items-center gap-2 text-red-600 hover:text-red-800 font-medium bg-red-100/70 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors dark:text-red-400 dark:bg-red-900/30 dark:hover:text-red-300 dark:hover:bg-red-900/50">
                <TrashIcon className="w-4 h-4" />
                Limpiar historial
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};