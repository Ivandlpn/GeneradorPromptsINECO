import React, { useState, useRef, useEffect } from 'react';

// --- Icon Components ---
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
const MicrophoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 016 0v8.25a3 3 0 01-3 3z" />
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

// Extend window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const categories = [
  { name: 'Presentación', icon: PresentationIcon, placeholder: "Ej: 'Una presentación de 10 páginas sobre los resultados del T3 para la reunión del consejo.'" },
  { name: 'Informe Técnico', icon: ReportIcon, placeholder: "Ej: 'Un informe técnico detallado sobre la viabilidad de un nuevo sistema de señalización ferroviaria.'" },
  { name: 'Comunicación Interna', icon: CommsIcon, placeholder: "Ej: 'Un email para toda la empresa anunciando la nueva política de teletrabajo.'" },
  { name: 'Redes Sociales', icon: SocialIcon, placeholder: "Ej: 'Una serie de 3 posts para LinkedIn sobre nuestro último hito en sostenibilidad.'" },
  { name: 'Propuesta Comercial', icon: ProposalIcon, placeholder: "Ej: 'Una propuesta de 15 páginas para un cliente del sector aeroportuario sobre nuestros servicios de digitalización.'" },
  { name: 'Guion de Vídeo', icon: VideoIcon, placeholder: "Ej: 'Un guion para un vídeo de 2 minutos para redes sociales mostrando la cultura de la empresa.'" },
  { name: 'Caso de Éxito', icon: AwardIcon, placeholder: "Ej: 'Un caso de éxito de una página sobre el proyecto de alta velocidad en el corredor mediterráneo.'" },
  { name: 'Artículo para Blog', icon: ArticleIcon, placeholder: "Ej: 'Un artículo de 800 palabras para el blog sobre el futuro de la movilidad urbana sostenible.'" },
  { name: 'Nota de Prensa', icon: MicrophoneIcon, placeholder: "Ej: 'Una nota de prensa anunciando la adjudicación de un nuevo contrato de consultoría en LATAM.'" },
];

const tones = ['Formal', 'Creativo', 'Técnico', 'Urgente'];
const lengths = ['Breve', 'Normal', 'Detallado'];

interface PromptInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isDocumentAttached: boolean;
  onDocumentAttachedChange: (isChecked: boolean) => void;
  tone: string;
  onToneChange: (tone: string) => void;
  length: string;
  onLengthChange: (length: string) => void;
}

const ButtonGroup: React.FC<{
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}> = ({ label, options, selectedValue, onSelect }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{label}</label>
    <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-lg">
      {options.map(option => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`w-full text-center px-3 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A4488] dark:focus:ring-offset-slate-800 dark:focus:ring-blue-400 ${
            selectedValue === option
              ? 'bg-white dark:bg-slate-700 text-[#1A4488] dark:text-white shadow'
              : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-700/60'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export const PromptInput: React.FC<PromptInputProps> = ({ 
    value, onChange, onSubmit, isLoading, 
    selectedCategory, onCategoryChange, 
    isDocumentAttached, onDocumentAttachedChange,
    tone, onToneChange,
    length, onLengthChange
}) => {
  const currentPlaceholder = categories.find(c => c.name === selectedCategory)?.placeholder || '';
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsVoiceSupported(true);
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.interimResults = true;
      recognition.continuous = false; // Stops automatically when the user pauses
      
      recognition.onend = () => setIsRecording(false);
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleVoiceInput = () => {
    if (isRecording || !recognitionRef.current) {
        if(recognitionRef.current) recognitionRef.current.stop();
        return;
    }
    
    const recognition = recognitionRef.current;
    const initialText = value;

    recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        const separator = initialText.trim().length > 0 ? ' ' : '';
        const syntheticEvent = {
            target: { value: initialText + separator + transcript }
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(syntheticEvent);
    };

    setIsRecording(true);
    recognition.start();
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 relative pt-8">
      <div className="absolute -top-5 -left-4 w-12 h-12 bg-[#1A4488] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md border-4 border-slate-50 dark:border-slate-900">
          1
      </div>
      <div className="ml-10">
        <label className="block text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
          Elige el tipo de contenido
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-5">
            {categories.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => onCategoryChange(name)}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A4488] dark:focus:ring-offset-slate-800 dark:focus:ring-blue-400 ${
                  selectedCategory === name 
                    ? 'bg-[#1A4488] text-white border-[#1A4488] shadow-md' 
                    : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:border-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600 dark:hover:bg-slate-600 dark:hover:border-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold text-sm text-center">{name}</span>
              </button>
            ))}
        </div>
        
        <label htmlFor="user-need" className="block text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
          Describe tu necesidad
        </label>
        <div className="relative">
            <textarea
              id="user-need"
              value={value}
              onChange={onChange}
              placeholder={isRecording ? "Escuchando..." : currentPlaceholder}
              className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1A4488] focus:border-[#1A4488] transition-shadow resize-y pr-14 dark:bg-slate-900/50 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-200 dark:focus:border-blue-400 dark:focus:ring-blue-400"
              disabled={isLoading}
            />
            {isVoiceSupported && (
                 <button
                    onClick={handleVoiceInput}
                    disabled={isLoading}
                    className={`absolute right-3 top-3 p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1A4488] dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed ${
                        isRecording 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                    }`}
                    aria-label="Dictar por voz"
                    title="Dictar por voz"
                    >
                    <MicrophoneIcon className="w-5 h-5" />
                </button>
            )}
        </div>
         <div className="mt-4">
            <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isDocumentAttached}
                onChange={(e) => onDocumentAttachedChange(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#1A4488] focus:ring-[#1A4488]/50 dark:border-slate-600 dark:bg-slate-700 dark:focus:ring-blue-400/50"
              />
              <span className="font-medium text-sm">Basarse en un documento adjunto</span>
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-6">
                Marca esta opción si vas a adjuntar un documento (informe, norma, etc.) al usar este prompt en otra IA.
            </p>
        </div>

        <div className="mt-6 border-t border-slate-200 dark:border-slate-700/50 pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ButtonGroup label="Tono" options={tones} selectedValue={tone} onSelect={onToneChange} />
                <ButtonGroup label="Extensión" options={lengths} selectedValue={length} onSelect={onLengthChange} />
            </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onSubmit}
            disabled={isLoading || !value.trim()}
            className="bg-[#CB1823] text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generando...
              </>
            ) : (
              'Generar Prompt'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
