export interface CourseModule {
  number: string;
  title: string;
  description: string;
}

export interface ComparisonRow {
  aspect: string;
  fullCanvas: string;
  semiArtisanal: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const HERO_BENEFITS: string[] = [
  '2 especialidades completas.',
  '24 módulos técnicos en total.',
  'Libro de Sastrería de cortesía.',
  'Acceso de por vida.',
  'Clases 100 % en español.',
];

export const BEGINNER_PATHS = [
  {
    index: '01',
    title: 'Si comienzas desde cero',
    description:
      'Aprenderás los fundamentos de las medidas, el patronaje, el corte y la confección de sacos.',
  },
  {
    index: '02',
    title: 'Si ya sabes coser',
    description:
      'Podrás ampliar tus conocimientos hacia la confección de prendas masculinas estructuradas y sus acabados.',
  },
  {
    index: '03',
    title: 'Si ya eres sastre',
    description:
      'Podrás profundizar en técnicas tradicionales, construcción Full Canvas y procedimientos semiartesanales.',
  },
];

export const FULL_CANVAS_MODULES: CourseModule[] = [
  {
    number: '01',
    title: 'Toma de medidas y análisis corporal',
    description:
      'Procedimientos para obtener medidas y comprender la relación entre las proporciones del cuerpo y la construcción de la prenda.',
  },
  {
    number: '02',
    title: 'Patronaje y trazado',
    description: 'Elaboración de patrones o moldes de las piezas principales.',
  },
  {
    number: '03',
    title: 'Corte y preparación del tejido',
    description: 'Marcado, distribución, corte y preparación de los materiales.',
  },
  {
    number: '04',
    title: 'Construcción Full Canvas',
    description:
      'Preparación y ensamblaje de entretelas, refuerzos y componentes de la estructura interna.',
  },
  {
    number: '05',
    title: 'Picado artesanal del pecho',
    description: 'Técnicas de puntadas y modelado de las capas estructurales.',
  },
  {
    number: '06',
    title: 'Picado y construcción de solapas',
    description: 'Procedimientos para formar las solapas y conseguir un giro natural.',
  },
  {
    number: '07',
    title: 'Confección de delanteros y espalda',
    description: 'Armado del cuerpo, bolsillos y piezas complementarias.',
  },
  {
    number: '08',
    title: 'Confección y colocación del cuello',
    description:
      'Preparación del cuello inferior y superior, modelado, asentamiento y montaje.',
  },
  {
    number: '09',
    title: 'Confección de mangas',
    description:
      'Trazado de mangas de dos piezas, construcción de copa y montaje en la sisa.',
  },
  {
    number: '10',
    title: 'Ojales artesanales',
    description: 'Elaboración y acabado manual de ojales.',
  },
  {
    number: '11',
    title: 'Colocación de botones',
    description: 'Técnicas de cosido, formación de pie de hilo y remates.',
  },
  {
    number: '12',
    title: 'Planchado y acabados',
    description: 'Conformación del tejido, asentamiento de costuras y terminaciones.',
  },
];

export const SEMI_ARTISANAL_MODULES: CourseModule[] = [
  {
    number: '01',
    title: 'Toma de medidas',
    description: 'Procedimientos para registrar las dimensiones necesarias del cliente.',
  },
  {
    number: '02',
    title: 'Patronaje y trazado',
    description: 'Elaboración y adaptación de patrones o moldes.',
  },
  {
    number: '03',
    title: 'Corte de tejidos',
    description: 'Preparación, marcado, distribución y corte.',
  },
  {
    number: '04',
    title: 'Entretelas',
    description: 'Selección, preparación y colocación de los elementos de soporte.',
  },
  {
    number: '05',
    title: 'Construcción del delantero',
    description: 'Preparación y ensamblaje de la parte frontal del saco.',
  },
  {
    number: '06',
    title: 'Confección de bolsillos y vistas',
    description: 'Técnicas de construcción y terminación.',
  },
  {
    number: '07',
    title: 'Armado del cuerpo',
    description: 'Unión de delanteros, espalda, costados y hombros.',
  },
  {
    number: '08',
    title: 'Confección del cuello',
    description: 'Trazado, preparación, montaje y terminación.',
  },
  {
    number: '09',
    title: 'Confección y montaje de mangas',
    description: 'Elaboración de mangas de dos piezas, embebido de copa y colocación.',
  },
  {
    number: '10',
    title: 'Costura a máquina',
    description: 'Procedimientos mecanizados de ensamblaje.',
  },
  {
    number: '11',
    title: 'Ojales y botones',
    description: 'Confección mecanizada de ojales y técnicas de fijación de botones.',
  },
  {
    number: '12',
    title: 'Forrado y terminación',
    description: 'Confección interior, planchado y revisión final de la prenda.',
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    aspect: 'Construcción interna',
    fullCanvas: 'Entretela flotante completa.',
    semiArtisanal: 'Sistemas simplificados o parciales según el método.',
  },
  {
    aspect: 'Trabajo del pecho',
    fullCanvas: 'Modelado artesanal.',
    semiArtisanal: 'Preparación y montaje con procedimientos combinados.',
  },
  {
    aspect: 'Solapas',
    fullCanvas: 'Picado tradicional.',
    semiArtisanal: 'Tratamiento manual o mecanizado.',
  },
  {
    aspect: 'Confección',
    fullCanvas: 'Mayor intervención artesanal.',
    semiArtisanal: 'Combinación de trabajo manual y a máquina.',
  },
  {
    aspect: 'Cuello',
    fullCanvas: 'Técnicas de construcción tradicional.',
    semiArtisanal: 'Montaje semimecanizado.',
  },
  {
    aspect: 'Mangas',
    fullCanvas: 'Construcción y ajuste especializado.',
    semiArtisanal: 'Confección y colocación mecanizada.',
  },
  {
    aspect: 'Ojales',
    fullCanvas: 'Técnicas manuales.',
    semiArtisanal: 'Métodos mecanizados.',
  },
  {
    aspect: 'Finalidad',
    fullCanvas: 'Profundizar en la tradición artesanal.',
    semiArtisanal: 'Conocer un método eficiente de confección.',
  },
];

export const VIDEO_PROCESS_LIST: string[] = [
  'Toma de medidas.',
  'Trazo de patrones.',
  'Corte de tejidos.',
  'Construcción de entretelas.',
  'Picado Full Canvas.',
  'Confección del cuello.',
  'Montaje de mangas.',
  'Ojales y botones.',
  'Planchado y resultados finales.',
];

export interface VideoTechniqueItem {
  id: string;
  title: string;
  description: string;
}

export const VIDEO_TECHNIQUES: VideoTechniqueItem[] = [
  {
    id: 'medidas-patronaje',
    title: 'Toma de medidas y patronaje.',
    description:
      'Proporciones corporales y trazado preciso de los moldes del saco.',
  },
  {
    id: 'corte-tejidos',
    title: 'Corte y preparación de tejidos.',
    description:
      'Marcado sobre la tela, distribución y preparación ordenada de piezas.',
  },
  {
    id: 'entretelas-full-canvas',
    title: 'Construcción de entretelas Full Canvas.',
    description:
      'Estructura interna flotante y picado artesanal para una caída natural.',
  },
  {
    id: 'cuello-solapas',
    title: 'Confección del cuello y las solapas.',
    description:
      'Modelado del quiebre, giro de solapa y asentamiento firme sobre la nuca.',
  },
  {
    id: 'montaje-mangas',
    title: 'Montaje y colocación de mangas.',
    description:
      'Distribución del embebido en la copa y aplomo exacto en la sisa.',
  },
  {
    id: 'ojales-acabados',
    title: 'Elaboración de ojales y acabados profesionales.',
    description:
      'Ojales precisos, fijación de botones, forrería y planchado final.',
  },
];

export const LIFETIME_BENEFITS: string[] = [
  'Estudia desde casa o desde tu taller.',
  'Organiza las clases según tus horarios.',
  'Repite las explicaciones cuando lo necesites.',
  'Detén los videos mientras realizas tus prácticas.',
  'Vuelve a consultar un procedimiento durante la confección.',
  'Avanza a tu propio ritmo.',
  'Sin mensualidades ni pagos recurrentes.',
];

export const AUDIENCE_PROFILES = [
  {
    number: '01',
    title: 'Principiantes',
    description:
      'Para quienes desean comenzar desde cero, incluso sin conocimientos previos de sastrería.',
  },
  {
    number: '02',
    title: 'Personas que ya saben coser',
    description:
      'Para quienes buscan ampliar sus conocimientos hacia la confección de sacos y chaquetas.',
  },
  {
    number: '03',
    title: 'Sastres y confeccionistas',
    description:
      'Para profesionales que desean estudiar otros métodos de construcción y perfeccionar procedimientos.',
  },
  {
    number: '04',
    title: 'Estudiantes de moda y diseño',
    description:
      'Para personas interesadas en el patronaje, la estructura interna y la confección.',
  },
  {
    number: '05',
    title: 'Emprendedores',
    description:
      'Para quienes desean desarrollar conocimientos que puedan aplicar en proyectos de confección especializada.',
  },
];

export const PRICING_BENEFITS: string[] = [
  'Aprendizaje desde cero.',
  'No requiere experiencia previa.',
  'Clases completas en video.',
  'Acceso de por vida.',
  'Estudio a tu propio ritmo.',
  'Formación en español.',
  'Pago único.',
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-incluye',
    question: '¿Qué incluye exactamente la formación?',
    answer:
      'Incluye las dos especialidades completas: Sastrería Artesanal Full Canvas (12 módulos) y Sastrería Semiartesanal (12 módulos), clases completas en video, acceso de por vida y un Libro de Sastrería de cortesía.',
  },
  {
    id: 'faq-mensualidades',
    question: '¿Debo pagar mensualidades o es un pago único?',
    answer:
      'Es un pago único de US$25 por las dos especialidades y el Libro de Sastrería de cortesía. No existen mensualidades ni pagos recurrentes.',
  },
  {
    id: 'faq-como-pagar',
    question: '¿Cómo puedo pagar?',
    answer:
      'El proceso de inscripción se realiza a través de Whop. Al continuar hacia el checkout podrás revisar el importe final y los métodos de pago disponibles para tu país antes de confirmar la compra.',
  },
  {
    id: 'faq-dificultades-pago',
    question: '¿Qué hago si tengo dificultades para pagar?',
    answer:
      'Si tu tarjeta o método de pago no es aceptado en Whop, verifica que tengas habilitadas las compras internacionales o en línea con tu banco, comprueba los datos ingresados o intenta con otro método de pago disponible dentro del mismo checkout de Whop.',
  },
  {
    id: 'faq-entrega',
    question: '¿Cómo recibo el acceso después de comprar?',
    answer:
      'Una vez completada tu inscripción en Whop, sigue las instrucciones proporcionadas por Whop y la plataforma del curso para ingresar a las clases en video y al Libro de Sastrería de cortesía.',
  },
  {
    id: 'faq-tiempo-acceso',
    question: '¿Por cuánto tiempo tendré acceso?',
    answer:
      'El acceso a las clases en video es de por vida, de acuerdo con las condiciones de disponibilidad de la plataforma, para que puedas consultar y repasar los procedimientos cuando lo necesites.',
  },
  {
    id: 'faq-experiencia',
    question: '¿Necesito tener experiencia previa en sastrería?',
    answer:
      'No necesitas experiencia previa. La formación está estructurada paso a paso para comenzar desde cero, y también es útil para personas que ya cosen o trabajan en confección y desean estudiar ambos métodos.',
  },
  {
    id: 'faq-celular',
    question: '¿Puedo estudiar desde mi celular?',
    answer:
      'Sí. Las clases son en video y se estudian de manera online, por lo que puedes verlas a tu propio ritmo desde tu celular, tableta o computadora con conexión a internet.',
  },
  {
    id: 'faq-repetir',
    question: '¿Puedo repetir las clases?',
    answer:
      'Sí. Puedes pausar, retroceder y repetir las explicaciones en video tantas veces como necesites mientras realizas tus prácticas.',
  },
  {
    id: 'faq-idioma',
    question: '¿En qué idioma están las clases?',
    answer: 'Todas las clases de la formación están en español.',
  },
  {
    id: 'faq-paises',
    question: '¿Puedo estudiar desde España o Latinoamérica?',
    answer:
      'Sí. La formación está dirigida al público hispanohablante y puede estudiarse de forma virtual desde cualquier país donde estén disponibles la plataforma y Whop.',
  },
];
