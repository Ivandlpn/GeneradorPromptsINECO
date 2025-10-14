import React, { useState, useEffect, forwardRef, useRef } from 'react';

// Extend window interface for jsPDF, html2canvas and highlight.js
declare global {
    interface Window {
        jspdf: any;
        html2canvas: any;
    }
    const hljs: any;
}

// --- Icon Components ---

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);

const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 19.5a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897l8.93-8.94zM15 5.25l2.25 2.25" />
    </svg>
);

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const ExportIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.195.025.39.042.582.042h10.448c.192 0 .387-.017.582-.042M7.217 10.907a2.25 2.25 0 012.248-2.23c.195.025.39.042.582.042h10.448c.192 0 .387-.017.582-.042a2.25 2.25 0 012.248 2.23M7.217 10.907a2.25 2.25 0 000 2.186m0-2.186c.195.025.39.042.582.042h10.448c.192 0 .387-.017.582-.042m0 0a2.25 2.25 0 002.248-2.23m-15.532 4.416a2.25 2.25 0 010-2.186m0 2.186c-.195-.025-.39-.042-.582-.042H3.468c-.192 0-.387.017-.582.042m7.332 0a2.25 2.25 0 012.248 2.23c-.195-.025-.39-.042-.582-.042H3.468c-.192 0-.387.017-.582-.042a2.25 2.25 0 01-2.248-2.23" />
    </svg>
);

interface PromptOutputProps {
    prompt: string;
    isLoading: boolean;
    onPromptUpdate: (newPrompt: string) => void;
}

const otherAIs = [
  { name: 'Gemini', url: 'https://gemini.google.com', color: 'bg-[#4285F4]', logoUrl: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/gemini-color.png', textColor: 'text-white' },
  { name: 'Claude', url: 'https://claude.ai', color: 'bg-[#D97757]', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/2048px-Claude_AI_symbol.svg.png', textColor: 'text-white' },
  { name: 'Grok', url: 'https://grok.com', color: 'bg-black dark:bg-gray-800', logoUrl: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/grok.png', textColor: 'text-white' },
  { name: 'DeepSeek', url: 'https://chat.deepseek.com', color: 'bg-[#00B4D8]', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/DeepSeek-icon.svg/1200px-DeepSeek-icon.svg.png', textColor: 'text-white' },
  { name: 'GenSpark', url: 'https://www.genspark.ai', color: 'bg-[#FF8C00]', logoUrl: 'https://www.genspark.ai/favicon.ico', textColor: 'text-white' },
  { name: 'Perplexity', url: 'https://www.perplexity.ai', color: 'bg-white border border-slate-300 dark:bg-slate-700 dark:border-slate-600', logoUrl: 'https://waryhub.com/files/preview/960x960/117569823318v2argol6iaznrvriti8czrt2hi3yxzm9gzdt09wzw31y0zrm7kxj3yso8h2fsizqmut2k0wjya47actzy3l0rw7wotfx0ret9fw.png', textColor: 'text-black dark:text-white' },
  { name: 'Manus AI', url: 'https://manus.im', color: 'bg-[#4A00E0]', logoUrl: 'https://manus.im/favicon.ico', textColor: 'text-white' },
  { name: 'Qwen', url: 'https://chat.qwen.ai/', color: 'bg-purple-600', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Qwen_logo.svg/2048px-Qwen_logo.svg.png', textColor: 'text-white' },
];

export const PromptOutput = forwardRef<HTMLDivElement, PromptOutputProps>(({ prompt, isLoading, onPromptUpdate }, ref) => {
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(prompt);
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const codeRef = useRef<HTMLElement>(null);
  const exportContainerRef = useRef<HTMLDivElement>(null);
  const [displayedPrompt, setDisplayedPrompt] = useState("");

  // Effect for the typewriter animation
  useEffect(() => {
    if (isLoading && prompt === '') {
        setDisplayedPrompt('');
    }
  }, [isLoading, prompt]);
  
  useEffect(() => {
    if (!isLoading) {
        setDisplayedPrompt(prompt);
        return;
    }

    if (prompt.length > displayedPrompt.length) {
        const timeout = setTimeout(() => {
            setDisplayedPrompt(prompt.slice(0, displayedPrompt.length + 1));
        }, 10); // Typewriter speed
        return () => clearTimeout(timeout);
    }
  }, [prompt, displayedPrompt, isLoading]);
  
  // Effect for editing state
  useEffect(() => {
    if (prompt) {
        if (!isEditing) {
            setEditedPrompt(prompt);
        }
    }
  }, [prompt, isEditing]);
  
  // Effect to reset copy button
  useEffect(() => {
      setCopied(false);
      setShareCopied(false);
  }, [prompt]);

  // Effect to highlight syntax as text is being "typed"
  useEffect(() => {
    if (codeRef.current) {
        try {
            const highlighted = hljs.highlight(displayedPrompt, { language: 'markdown', ignoreIllegals: true }).value;
            codeRef.current.innerHTML = highlighted;
        } catch (e) {
            console.error("Highlight.js failed, falling back to plain text. Error:", e);
            codeRef.current.textContent = displayedPrompt;
        }
    }
  }, [displayedPrompt]);

  // Effect for the instruction modal and redirect
  useEffect(() => {
    if (showInstructionModal && redirectUrl) {
        const timer = setTimeout(() => {
            window.open(redirectUrl, '_blank', 'noopener,noreferrer');
            setShowInstructionModal(false);
            setRedirectUrl(null);
        }, 3500); // Wait 3.5 seconds

        return () => clearTimeout(timer);
    }
  }, [showInstructionModal, redirectUrl]);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = async () => {
    if (!prompt) return;
    
    const shareUrl = `${window.location.origin}${window.location.pathname}?prompt=${encodeURIComponent(prompt)}`;
    const shareData = {
        title: 'Prompt Generado por Ineco',
        text: prompt,
        url: shareUrl,
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        try {
            navigator.clipboard.writeText(shareUrl);
            setShareCopied(true);
            setTimeout(() => setShareCopied(false), 2500);
        } catch (error) {
            console.error("Failed to copy share link:", error);
            alert("No se pudo copiar el enlace para compartir. Tu navegador puede que no sea compatible.");
        }
    }
  };

  const handleRedirectClick = (url: string) => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setRedirectUrl(url);
    setShowInstructionModal(true);
  };

  const handleEdit = () => {
    setEditedPrompt(prompt);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedPrompt(prompt);
  };

  const handleSave = () => {
    if (window.confirm('¿Estás seguro de que quieres guardar los cambios?')) {
      onPromptUpdate(editedPrompt);
      setIsEditing(false);
    }
  };

  const handleExportPDF = () => {
    const input = exportContainerRef.current;
    if (!input || !window.jspdf || !window.html2canvas) {
        console.error("PDF generation libraries not found or target element is missing.");
        return;
    }

    const { jsPDF } = window.jspdf;
    
    window.html2canvas(input, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const margin = 15;
        const contentWidth = pdfWidth - margin * 2;
        
        const logoUrl = 'https://www.ineco.com/ineco/sites/default/files/2022-12/Logo%20Ineco.png';
        const logoHeight = 12;
        const logoWidth = (logoHeight / 35) * 135; 
        pdf.addImage(logoUrl, 'PNG', margin, margin, logoWidth, logoHeight);
        
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(18);
        pdf.setTextColor('#1A4488');
        pdf.text('Prompt Generado', margin, margin + logoHeight + 10);
        
        const ratio = imgWidth / imgHeight;
        const finalImgWidth = contentWidth;
        const finalImgHeight = finalImgWidth / ratio;

        pdf.addImage(imgData, 'PNG', margin, margin + logoHeight + 15, finalImgWidth, finalImgHeight);
        
        pdf.save('prompt-ineco.pdf');
    });
  };

  const actionButtonClass = "flex items-center space-x-2 text-sm text-slate-600 hover:text-[#1A4488] hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-all duration-200 dark:text-slate-400 dark:hover:text-blue-300 dark:hover:bg-slate-700";

  return (
    <>
        {showInstructionModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in" style={{ animationDuration: '0.3s' }}>
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-scale-in" style={{ animationDuration: '0.4s' }}>
                    <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center border-4 border-green-200 dark:border-green-500/50">
                        <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-5">¡Prompt Copiado!</h3>
                    <p className="text-slate-600 dark:text-slate-300 mt-2">
                        Ahora solo tienes que pegarlo con <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Ctrl</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">V</kbd> en la nueva pestaña.
                    </p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-6">
                        Serás redirigido en unos segundos...
                    </p>
                </div>
            </div>
        )}
        <div ref={ref} className="min-h-[1rem]">
            {isLoading && !prompt ? (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 animate-pulse">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
                    </div>
                </div>
            ) : prompt ? (
            <>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/50 relative pt-8 animate-fade-in">
                    <div className="absolute -top-5 -left-4 w-12 h-12 bg-[#CB1823] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md border-4 border-slate-50 dark:border-slate-900">
                        2
                    </div>
                    <div className="flex justify-between items-center mb-4 ml-10">
                        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">{isEditing ? 'Editando Prompt' : 'Tu Prompt Generado'}</h2>
                        {isEditing ? (
                            <div className="flex items-center space-x-4">
                                <button onClick={handleCancel} className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Cancelar</button>
                                <button onClick={handleSave} className="bg-[#1A4488] text-white font-bold py-1.5 px-4 rounded-lg hover:bg-blue-900 transition-all text-sm">Guardar</button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 flex-wrap">
                                <button onClick={handleExportPDF} className={actionButtonClass}>
                                    <ExportIcon className="w-5 h-5" />
                                    <span>Exportar</span>
                                </button>
                                <button onClick={handleShare} className={`${actionButtonClass} ${shareCopied ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50' : ''}`}>
                                     {shareCopied ? (
                                        <>
                                            <CheckIcon className="w-5 h-5 animate-scale-in" />
                                            <span className="animate-scale-in">¡Enlace copiado!</span>
                                        </>
                                    ) : (
                                        <>
                                            <ShareIcon className="w-5 h-5" />
                                            <span>Compartir</span>
                                        </>
                                    )}
                                </button>
                                <button onClick={handleEdit} className={actionButtonClass}>
                                    <EditIcon className="w-5 h-5" />
                                    <span>Editar</span>
                                </button>
                                <button 
                                    onClick={handleCopy} 
                                    className={`${actionButtonClass} ${copied ? 'bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50' : ''}`}
                                >
                                    {copied ? (
                                        <>
                                            <CheckIcon className="w-5 h-5 animate-scale-in" />
                                            <span className="animate-scale-in">¡Copiado!</span>
                                        </>
                                    ) : (
                                        <>
                                            <CopyIcon className="w-5 h-5" />
                                            <span>Copiar</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                    <div ref={exportContainerRef} className="p-4 bg-slate-50 dark:bg-slate-900/70 rounded-lg">
                        {isEditing ? (
                            <textarea
                                value={editedPrompt}
                                onChange={(e) => setEditedPrompt(e.target.value)}
                                className="w-full h-64 p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-[#1A4488] dark:focus:ring-blue-400 transition-shadow resize-y text-sm font-mono"
                                aria-label="Editor de prompt"
                            />
                        ) : (
                            <pre className="text-sm overflow-x-auto whitespace-pre-wrap break-words relative">
                                <code ref={codeRef} className="language-markdown">
                                    {/* This will be populated by the useEffect hook */}
                                </code>
                            </pre>
                        )}
                    </div>
                </div>
                {!isEditing && (
                    <div className="mt-8 flex flex-col items-center gap-4 animate-fade-in w-full max-w-2xl mx-auto" style={{animationDelay: '100ms'}}>
                        <button
                            onClick={() => handleRedirectClick('https://m365.cloud.microsoft/chat/')}
                            className="w-full inline-flex items-center justify-center gap-4 group bg-slate-800 hover:bg-black text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-400/50"
                        >
                            <img src="https://academy.office365atwork.com/wp-content/uploads/2025/02/copilot-logo.png" alt="Copilot Logo" className="w-8 h-8" />
                            <span className="text-lg tracking-wide group-hover:tracking-wider transition-all">
                                Usar en Copilot Chat
                            </span>
                            <ArrowRightIcon className="w-6 h-6 transform transition-transform group-hover:translate-x-2" />
                        </button>
                        
                        <div className="mt-6 w-full text-center">
                          <div className="flex items-center gap-4 my-4">
                              <hr className="flex-grow border-slate-300 dark:border-slate-700" />
                              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">O prueba con otras plataformas</span>
                              <hr className="flex-grow border-slate-300 dark:border-slate-700" />
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                              {otherAIs.map((ai) => (
                                  <button
                                      key={ai.name}
                                      onClick={() => handleRedirectClick(ai.url)}
                                      className={`inline-flex items-center justify-center gap-2 group ${ai.color} ${ai.textColor} font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-current`}
                                  >
                                      {ai.logoUrl && <img src={ai.logoUrl} alt={`${ai.name} Logo`} className="w-5 h-5" />}
                                      <span className="text-sm">{ai.name}</span>
                                  </button>
                              ))}
                          </div>
                        </div>

                    </div>
                )}
            </>
            ) : null}
        </div>
    </>
  );
});