import React, { useState, useCallback, useRef, useEffect } from 'react';
import { PromptInput } from './components/PromptInput';
import { PromptOutput } from './components/PromptOutput';
import { generateBrandedPromptStream } from './services/geminiService';
import { InecoLogo } from './components/InecoLogo';
import { PromptExamples } from './components/PromptExamples';
import { History } from './components/History';

interface HistoryItem {
  name: string;
  prompt: string;
  category: string;
}

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


const App: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [category, setCategory] = useState<string>('Presentación');
  const [isDocumentAttached, setIsDocumentAttached] = useState<boolean>(false);
  const [tone, setTone] = useState<string>('Formal');
  const [length, setLength] = useState<string>('Normal');
  const outputRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        return storedTheme === 'dark' ? 'dark' : 'light';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  // Effect to handle shared prompts from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedPrompt = urlParams.get('prompt');
    if (sharedPrompt) {
      try {
        const decodedPrompt = decodeURIComponent(sharedPrompt);
        setGeneratedPrompt(decodedPrompt);
        // Clean the URL to avoid re-triggering on reload
        window.history.replaceState({}, '', window.location.pathname);
        // Scroll to the output section
        setTimeout(() => {
          outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } catch (e) {
        console.error('Error decoding prompt from URL:', e);
        setError('No se pudo cargar el prompt compartido desde el enlace.');
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
      setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('promptHistory');
      if (storedHistory) {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory) && (parsedHistory.length === 0 || (typeof parsedHistory[0] === 'object' && 'name' in parsedHistory[0] && 'prompt' in parsedHistory[0] && 'category' in parsedHistory[0]))) {
          setHistory(parsedHistory);
        } else {
            localStorage.removeItem('promptHistory');
        }
      }
    } catch (e) {
      console.error("Failed to parse history from localStorage", e);
      localStorage.removeItem('promptHistory');
    }
  }, []);

  const handleGeneratePrompt = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Por favor, introduce una descripción de tu necesidad.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const stream = await generateBrandedPromptStream(userInput, category, isDocumentAttached, tone, length);
      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk.text;
        setGeneratedPrompt(fullText);
      }

      const newHistoryItem: HistoryItem = { name: userInput, prompt: fullText, category };
      const newHistory = [newHistoryItem, ...history.filter(item => item.prompt !== fullText)].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('promptHistory', JSON.stringify(newHistory));

      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Ha ocurrido un error inesperado.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, history, category, isDocumentAttached, tone, length]);

  const handleExampleClick = (exampleText: string) => {
    setUserInput(exampleText);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('promptHistory');
  };

  const handleSelectHistory = (prompt: string) => {
    setUserInput('');
    setGeneratedPrompt(prompt);
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative isolate">
       <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <InecoLogo 
                    variant="grey" 
                    className="h-[800px] w-auto transform -rotate-12 blur-3xl opacity-5 dark:opacity-[0.02]" 
                />
            </div>
        </div>
      <div className="fixed top-4 right-4 z-50">
          <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 backdrop-blur-sm ${
                  theme === 'light'
                  ? 'bg-white/60 text-slate-600 hover:bg-slate-200 hover:text-slate-800 focus:ring-slate-400 shadow' 
                  : 'bg-slate-800/60 text-white/80 hover:text-white hover:bg-slate-700 focus:ring-white/50 shadow-lg'
              }`}
              aria-label={`Activar modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
              title={`Activar modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
          >
              {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
      </div>
      <History 
        history={history}
        onSelect={handleSelectHistory}
        onClear={handleClearHistory}
      />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-12">
           <div className="text-center flex flex-col items-center gap-4 pt-8">
              <InecoLogo className="h-16" variant="color"/>
              <h1 className="text-4xl md:text-6xl font-bold text-[#1A4488] dark:text-blue-300">Generador de Prompts</h1>
              <p className="mt-2 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                  Genera prompts detallados y alineados con la identidad de Ineco para ser usado en Copilot Chat
              </p>
          </div>

          <PromptExamples onExampleClick={handleExampleClick} />
          
          <PromptInput 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onSubmit={handleGeneratePrompt}
            isLoading={isLoading}
            selectedCategory={category}
            onCategoryChange={setCategory}
            isDocumentAttached={isDocumentAttached}
            onDocumentAttachedChange={setIsDocumentAttached}
            tone={tone}
            onToneChange={setTone}
            length={length}
            onLengthChange={setLength}
          />
          
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg dark:bg-red-900/50 dark:border-red-500/50 dark:text-red-300" role="alert">{error}</div>}

          <PromptOutput 
            ref={outputRef}
            prompt={generatedPrompt} 
            isLoading={isLoading} 
            onPromptUpdate={setGeneratedPrompt}
          />
        </div>
      </main>
      <footer className="w-full text-center p-4 text-slate-500 dark:text-slate-400 text-sm bg-slate-100/80 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 mt-12">
        <p>© 2025 Ineco. Creado por Iván de la Paz para uso interno de INECO</p>
      </footer>
    </div>
  );
};

export default App;