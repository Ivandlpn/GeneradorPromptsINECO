import React, { useState, useEffect, useCallback } from 'react';

// --- Icon Components ---

const PresentationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h.008v.015h-.008v-.015zm17.25 0h.008v.015h-.008v-.015zM9.75 7.5h4.5m-4.5 3h4.5m-4.5 3h4.5m3-12v15m4.125-15h.008v.015h-.008V4.5z" />
    </svg>
);
const DocumentIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625a1.875 1.875 0 00-1.875 1.875v17.25a1.875 1.875 0 001.875 1.875h12.75a1.875 1.875 0 001.875-1.875V11.25a9 9 0 00-9-9z" />
    </svg>
);
const SocialIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632zM12 9.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
    </svg>
);
const VideoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const InfographicIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
);
const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);
const StandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
);
const WebsiteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

const RefreshIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.18-3.185m-3.181-4.994v4.992m0 0h-4.992m4.992 0l-3.182-3.182a8.25 8.25 0 00-11.664 0l-3.18 3.185" />
    </svg>
);

const icons = {
  presentation: PresentationIcon,
  document: DocumentIcon,
  social: SocialIcon,
  video: VideoIcon,
  infographic: InfographicIcon,
  mail: MailIcon,
  stand: StandIcon,
  website: WebsiteIcon,
};

const examples: { text: string; icon: keyof typeof icons }[] = [
  { text: "Una presentación para la junta directiva sobre los resultados trimestrales.", icon: 'presentation' },
  { text: "Un informe técnico sobre la implementación de IA en la gestión de infraestructuras.", icon: 'document' },
  { text: "Una serie de 3 posts para LinkedIn anunciando nuestra nueva oficina en México.", icon: 'social' },
  { text: "Un guion para un vídeo corporativo de 2 minutos sobre la cultura de Ineco.", icon: 'video' },
  { text: "Un folleto de dos caras para una feria de empleo, dirigido a talentos de ingeniería.", icon: 'document' },
  { text: "Una infografía para la intranet resumiendo los hitos de seguridad del último año.", icon: 'infographic' },
  { text: "Un email de comunicación interna sobre el nuevo plan de formación.", icon: 'mail' },
  { text: "Un caso de éxito de una página sobre el proyecto de digitalización de la justicia.", icon: 'document' },
  { text: "El diseño de un stand para el 'World Rail Congress' destacando proyectos de alta velocidad.", icon: 'stand' },
  { text: "Un post para el blog corporativo sobre las tendencias futuras en la aviación sostenible.", icon: 'website' },
  { text: "Una newsletter mensual para clientes con las últimas novedades y proyectos.", icon: 'mail' },
  { text: "Un 'one-pager' que resuma nuestros servicios de consultoría BIM para clientes.", icon: 'document' },
  { text: "Un hilo para Twitter/X explicando de forma sencilla los beneficios de la movilidad como servicio (MaaS).", icon: 'social' },
  { text: "Un guion para un 'reel' de 30 segundos sobre 'un día en la vida de un ingeniero'.", icon: 'video' },
  { text: "Una presentación comercial para un nuevo servicio de consultoría en movilidad urbana.", icon: 'presentation' },
  { text: "Un documento de 'preguntas frecuentes' (FAQ) sobre nuestro compromiso con la sostenibilidad.", icon: 'document' },
  { text: "Un banner para la web anunciando nuestra participación en un evento internacional.", icon: 'website' },
  { text: "Una nota de prensa anunciando un gran contrato ferroviario en el extranjero.", icon: 'document' },
  { text: "Un discurso de 5 minutos para nuestro CEO en la conferencia anual de innovación.", icon: 'presentation' },
  { text: "Una cabecera y fondo de pantalla corporativos para nuestro perfil de LinkedIn.", icon: 'social' },
  { text: "Una presentación interna sobre las lecciones aprendidas de un proyecto clave.", icon: 'presentation' },
  { text: "Un post para LinkedIn sobre nuestra colaboración con ANI Colombia para impulsar el ferrocarril sostenible.", icon: 'social' },
  { text: "Una infografía para redes sociales sobre la oferta de empleo de ingeniería civil en Ciudad Real.", icon: 'infographic' },
  { text: "Una presentación interna resumiendo los resultados récord del informe anual 2024.", icon: 'presentation' },
  { text: "Un artículo para el blog corporativo sobre nuestras soluciones de movilidad aérea presentadas en la Semana de la Ingeniería Civil.", icon: 'website' },
  { text: "Un hilo para Twitter/X resumiendo nuestra participación en la mesa redonda sobre regulación de drones urbanos.", icon: 'social' },
  { text: "Una nota de prensa anunciando nuestra incorporación a la plataforma de innovación in-move by Railgrup.", icon: 'document' },
  { text: "Un caso de éxito de una página sobre nuestro proyecto de inspección de vías con drones junto a Adif.", icon: 'document' },
  { text: "Un 'one-pager' resumiendo nuestras prácticas ESG, incluyendo el uso de IA para análisis de sesgos.", icon: 'document' },
  { text: "Una infografía para la intranet mostrando el crecimiento de nuestra cartera a 1.000 millones de euros.", icon: 'infographic' },
  { text: "Un post para LinkedIn destacando nuestro rol como asesores técnicos para la alta velocidad en Polonia.", icon: 'social' },
  { text: "Una presentación para clientes sobre nuestra experiencia en consultoría ferroviaria internacional, usando el caso de Polonia.", icon: 'presentation' },
  { text: "Un informe técnico breve explicando cómo usamos la tecnología inSAR para el monitoreo de infraestructuras.", icon: 'document' },
  { text: "Un guion para un vídeo corto para redes sociales sobre nuestra iniciativa 'Por qué la ingeniería' para atraer a jóvenes talentos.", icon: 'video' },
  { text: "Una nota de prensa sobre la adjudicación del estudio del tren Valparaíso-Santiago en Chile.", icon: 'document' },
  { text: "Una infografía comparando la eficiencia de costes del AVE en España frente a otros países, basada en nuestro informe.", icon: 'infographic' },
  { text: "Una campaña de posts para LinkedIn para atraer talento a nuestras más de 70 vacantes en la Comunidad Valenciana.", icon: 'social' },
  { text: "Un email de comunicación interna celebrando el éxito del programa 'Entrena-T' con estudiantes de la ESO.", icon: 'mail' },
  { text: "Una presentación comercial destacando nuestras capacidades para gestionar la obra civil del AVE en Marruecos.", icon: 'presentation' },
  { text: "Un caso de éxito detallando nuestro asesoramiento en el proyecto ferroviario Sídney-Newcastle en Australia.", icon: 'document' },
  { text: "Un comunicado interno para toda la empresa presentando a MAI, nuestro nuevo asistente de IA, y sus beneficios.", icon: 'mail' },
];

interface PromptExamplesProps {
  onExampleClick: (example: string) => void;
}

export const PromptExamples: React.FC<PromptExamplesProps> = ({ onExampleClick }) => {
  const [currentExamples, setCurrentExamples] = useState<{ text: string; icon: keyof typeof icons }[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const selectRandomExamples = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
        const shuffled = [...examples].sort(() => 0.5 - Math.random());
        setCurrentExamples(shuffled.slice(0, 3));
        setIsRefreshing(false);
    }, 300);
  }, []);

  useEffect(() => {
    selectRandomExamples();
  }, [selectRandomExamples]);

  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
        ¿No sabes por dónde empezar? Prueba con un ejemplo:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentExamples.map((example, index) => (
          <button
            key={index}
            onClick={() => onExampleClick(example.text)}
            className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 hover:border-[#1A4488] dark:hover:border-blue-400 hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-[#1A4488] h-full flex flex-col items-center justify-start space-y-3 min-h-[180px] transform hover:-translate-y-1 hover:scale-[1.02]"
            aria-label={`Usar ejemplo: ${example.text}`}
          >
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-inner">
                {React.createElement(icons[example.icon], { className: 'w-8 h-8 text-[#1A4488] dark:text-blue-300' })}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex-grow pt-2">"{example.text}"</p>
          </button>
        ))}
      </div>
       <div className="mt-6 flex justify-center">
        <button
          onClick={selectRandomExamples}
          className="flex items-center gap-2 text-sm font-medium text-[#1A4488] dark:text-blue-300 bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-400/30 rounded-full px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:border-blue-300 dark:hover:border-blue-400/50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-[#1A4488]"
        >
          <RefreshIcon className={`w-4 h-4 transition-transform duration-300 ${isRefreshing ? 'rotate-180' : ''}`} />
          Cambiar ejemplos
        </button>
      </div>
    </div>
  );
};