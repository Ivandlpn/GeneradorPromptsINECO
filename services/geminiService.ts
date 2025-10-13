import { GoogleGenAI } from "@google/genai";

const getCategoryContext = (category: string): string => {
  switch (category) {
    case 'Presentación':
      return 'El resultado es para una presentación. Debe ser visual, conciso y con puntos clave claros. El contenido de cada diapositiva debe ser breve, favoreciendo un estilo de "cartel" (billboard).';
    case 'Informe Técnico':
      return 'El resultado es un informe técnico. Debe ser detallado, preciso, bien estructurado y formal. La claridad de los datos, metodologías y conclusiones es prioritaria.';
    case 'Comunicación Interna':
      return 'El resultado es para una comunicación interna (email, noticia en intranet, etc.). El tono debe ser cercano pero profesional, claro y directo, buscando informar eficazmente o motivar a la acción.';
    case 'Redes Sociales':
      return 'El contenido es para redes sociales (LinkedIn, Twitter/X, etc.). Debe ser breve, impactante y optimizado para la interacción (engagement). Considera el uso de hashtags relevantes y un tono adaptado a la plataforma.';
    case 'Propuesta Comercial':
      return 'El resultado es una propuesta comercial para un cliente. Debe ser persuasiva, centrada en los beneficios para el cliente y estructurada para guiar hacia una decisión de compra. La profesionalidad y la claridad son clave.';
    case 'Guion de Vídeo':
      return 'El resultado es un guion para un vídeo. Debe estructurarse en escenas o secuencias, describiendo tanto los diálogos/voz en off como las acciones visuales clave. El ritmo y la duración son importantes.';
    case 'Caso de Éxito':
      return 'El resultado es un caso de éxito o "case study". Debe estructurarse en Reto, Solución y Resultados. El tono debe ser factual, persuasivo y centrado en demostrar el valor aportado por Ineco.';
    case 'Artículo para Blog':
      return 'El resultado es un artículo para el blog corporativo. El tono debe ser de "liderazgo de opinión" (thought leadership), informativo y accesible. Debe estar optimizado para SEO, sugiriendo palabras clave relevantes.';
    case 'Nota de Prensa':
      return 'El resultado es una nota de prensa oficial. Debe seguir el formato estándar (titular, entradilla, cuerpo, sobre Ineco, contacto). El lenguaje debe ser formal, objetivo y noticiable.';
    default:
      return 'El tipo de contenido es de propósito general.';
  }
}

const getSystemPromptTemplate = (userRequest: string, category: string, isDocumentAttached: boolean): string => {
  let documentContextInstruction = '';
  if (isDocumentAttached) {
    documentContextInstruction = `
## Directiva de Documento Adjunto:
Es CRÍTICO y OBLIGATORIO que el prompt generado instruya a la IA final a basar su respuesta PRINCIPALMENTE en el contenido del documento que el usuario adjuntará. El prompt debe incluir una frase explícita como: "Basa tu respuesta y análisis exclusivamente en el contenido del documento adjunto." o "Analiza el siguiente documento adjunto y, basándote en él, realiza la siguiente tarea:".
`;
  }

  return `
Eres un experto en crear prompts detallados para IA generativa. Tu tarea es tomar la solicitud de un usuario y expandirla en un prompt completo y accionable que se adquiera estrictamente a las directrices de la marca corporativa de Ineco que se proporcionan a continuación. El resultado final debe ser ÚNICAMENTE el prompt generado, sin introducciones ni texto conversacional.

## Necesidad Principal del Usuario:
"${userRequest}"

## Contexto/Categoría del Contenido:
${getCategoryContext(category)}
${documentContextInstruction}
---
## Directrices de Marca Corporativa de Ineco (A aplicar en el Prompt de salida)

### 1. Estilo y Tono General:
- **Profesional, Moderno, Limpio, Innovador:** El resultado final debe reflejar estos valores.
- **Claridad y Concisión:** Enfatiza ir directo al grano. Usa un lenguaje claro y directo.

### 2. Paleta de Colores:
- **Color Principal:** "Azul Ineco" (Hex: #1A4488). Usar para elementos dominantes como fondos, títulos principales y formas clave.
- **Color de Acento:** "Rojo Ineco" (Hex: #CB1823). Usar con moderación para resaltados críticos, llamadas a la acción o acentos específicos. Nunca debe dominar el diseño.
- **Colores Neutrales:** Blanco, gris claro y negro son para texto y fondos.
- **Regla de Degradado:** Si se utiliza un degradado, el color azul primario debe ocupar más del 70% del área.
- **Adherencia Estricta:** No se permiten colores fuera de esta paleta especificada.

### 3. Tipografía:
- **Familia de Fuentes:** Debe ser 'Poppins'. Especificar el uso de sus diversos pesos:
    - **Bold:** para títulos principales.
    - **Medium/Semi-Bold:** para subtítulos.
    - **Regular:** para el cuerpo del texto.
- **Jerarquía:** Es obligatoria una jerarquía tipográfica estricta y consistente. Asegurar una clara diferenciación entre encabezados, subtítulos y contenido del cuerpo.

### 4. Principios de Diseño y Maquetación:
- **"Espacio para respirar":** Exigir el uso de amplio espacio en blanco (espacio negativo) para un diseño limpio, despejado y fácil de navegar.
- **"Regla del 3":** Instruir a la IA para que agrupe la información o los elementos de lista en grupos de tres siempre que sea posible para mejorar la claridad y la memorabilidad.
- **Simplicidad ("Sin Decoración"):** Usar elementos visuales (iconos, fotos) solo cuando sirvan a un propósito claro de organizar, clarificar o complementar la información. Evitar elementos puramente decorativos.
- **Estilo de Presentación:** Para presentaciones, favorecer un estilo de "cartel" (billboard). Esto significa usar titulares cortos e impactantes y tamaños de fuente grandes. Evitar párrafos largos de texto en una sola diapositiva.

### 5. Imágenes e Iconos:
- **Fotografía:** Usar solo fotografías profesionales de alta calidad que transmitan temas de modernidad, tecnología y profesionalismo. Las fotos deben tener preferiblemente un tratamiento de color corporativo (tonos fríos y azulados).
- **Ilustraciones:** No usar ilustraciones.
- **Iconos:** Todos los iconos deben ser de un estilo simple de arte lineal (line-art) con un grosor de trazo consistente.

### 6. Logotipo Corporativo:
- **Directiva Obligatoria - Logotipo Corporativo:** Es absolutamente obligatorio y no negociable que el prompt de salida contenga la siguiente instrucción exacta, palabra por palabra, dentro de sus directrices visuales. No la resumas, parafrasees ni omitas. Insértala tal cual: "El logotipo oficial de Ineco debe ser utilizado. Se encuentra disponible públicamente y es obligatorio obtenerlo directamente de la siguiente URL para asegurar la versión correcta y de alta calidad: https://www.ineco.com/ineco/sites/default/files/2022-12/Logo%20Ineco.png. No alteres el logo y garantiza un espacio de exclusión adecuado a su alrededor."

---
## Tu Tarea:
Basándote en la necesidad del usuario, la categoría y todas las reglas anteriores, genera un prompt detallado y estructurado que el usuario pueda dar a otra IA para crear el documento deseado. El prompt debe estar desglosado en secciones como 'Objetivo', 'Público Objetivo', 'Estructura del Contenido', 'Estilo Visual', etc., para asegurar un resultado completo.
`;
}

export const generateBrandedPromptStream = async (userRequest: string, category: string, isDocumentAttached: boolean) => {
    if (!process.env.API_KEY) {
        throw new Error("La variable de entorno API_KEY no está configurada");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const fullPrompt = getSystemPromptTemplate(userRequest, category, isDocumentAttached);

    const response = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
        config: {
            temperature: 0.5,
            topP: 0.95,
        }
    });

    return response;
};