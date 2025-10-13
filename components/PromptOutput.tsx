import React, { useState, useEffect, forwardRef, useRef } from 'react';

// Extend window interface for jsPDF, html2canvas and highlight.js
declare global {
    interface Window {
        jspdf: any;
        html2canvas: any;
    }
    const hljs: any;
}

interface PromptOutputProps {
  prompt: string;
  isLoading: boolean;
  onPromptUpdate: (newPrompt: string) => void;
}

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

export const PromptOutput = forwardRef<HTMLDivElement, PromptOutputProps>(({ prompt, isLoading, onPromptUpdate }, ref) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(prompt);
  const codeRef = useRef<HTMLElement>(null);
  const preContainerRef = useRef<HTMLPreElement>(null);
  const exportContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prompt) {
        if (!isEditing) {
            setEditedPrompt(prompt);
        }
    }
  }, [prompt, isEditing]);
  
  useEffect(() => {
      setCopied(false);
  }, [prompt])

  useEffect(() => {
    if (!isLoading && prompt && codeRef.current) {
        try {
            hljs.highlightElement(codeRef.current);
        } catch (e) {
            console.error("Failed to highlight syntax", e);
        }
    }
  }, [isLoading, prompt]);

  const handleCopy = () => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    onPromptUpdate(editedPrompt);
    setIsEditing(false);
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
                        <div className="flex items-center space-x-2">
                            <button onClick={handleExportPDF} className={actionButtonClass}>
                                <ExportIcon className="w-5 h-5" />
                                <span>Exportar</span>
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
                        <pre ref={preContainerRef} className="text-sm overflow-x-auto whitespace-pre-wrap break-words relative">
                            <code ref={codeRef} className="language-markdown">
                                {prompt}
                            </code>
                        </pre>
                    )}
                </div>
            </div>
        ) : null}
    </div>
  );
});