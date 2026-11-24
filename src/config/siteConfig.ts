import heroBespokeJacket from '../assets/images/hero_bespoke_jacket_1795385785435.jpg';
import fullCanvasCraft from '../assets/images/full_canvas_craft_1795385786833.jpg';
import semiArtisanalCraft from '../assets/images/semi_artisanal_craft_1795385785400.jpg';
import tailoringPatternLapel from '../assets/images/tailoring_pattern_lapel_1795385794038.jpg';
import handButtonholeCollar from '../assets/images/hand_buttonhole_collar_1795385787211.jpg';
import finalAtelierBackdrop from '../assets/images/final_atelier_backdrop_1795385784926.jpg';

/**
 * URL externa de pago (Hotmart, Whop, Stripe Checkout, PayPal, etc.).
 */
export const CHECKOUT_URL: string = 'https://whop.com/checkout/plan_7us2MBr81tJjU';

export interface TestimonialItem {
  id: string;
  studentName: string;
  country: string;
  quote: string;
  photoUrl?: string;
  garmentPhotoUrl?: string;
}

export interface WorkGalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  /** Reemplaza con la URL de la fotografía real del instructor o taller. */
  imageUrl: string;
  plateCode: string;
}

export interface LegalDocument {
  id: 'terms' | 'privacy' | 'refunds' | 'lifetime';
  label: string;
  title: string;
  statusNote: string;
  sections: { heading: string; body: string }[];
}

export const siteConfig = {
  brand: {
    name: 'Alta Sastrería Masculina',
    concept: 'El Arte de la Confección Bespoke',
    eyebrow: 'Formación Especializada en Alta Sastrería Masculina',
    logoUrl: '', // Opcional: URL de isotipo/logotipo propio
    motto: 'El arte está en la técnica. La excelencia, en cada detalle.',
    copyrightYear: new Date().getFullYear(),
  },

  offer: {
    price: 25,
    currency: 'USD',
    formattedPrice: 'US$25',
    checkoutUrl: CHECKOUT_URL,
  },

  tracking: {
    metaPixelId: '983079787006620',
  },

  contact: {
    /** Configura aquí tu correo real de soporte cuando publiques la página. */
    supportEmail: '',
    /** Opcional: URL externa a tu centro de ayuda o formulario de soporte. */
    supportUrl: '',
  },

  media: {
    heroImage: heroBespokeJacket,
    heroImageAlt:
      'Saco masculino de alta sastrería en lana gris marengo sobre maniquí de taller con puntadas de hilván artesanal',
    fullCanvasImage: fullCanvasCraft,
    fullCanvasImageAlt:
      'Construcción artesanal Full Canvas mostrando entretela flotante de crin de caballo y picado manual de solapa',
    semiArtisanalImage: semiArtisanalCraft,
    semiArtisanalImageAlt:
      'Confección semiartesanal de saco masculino en taller combinando precisión mecánica y acabados cuidados',
    patternImage: tailoringPatternLapel,
    patternImageAlt:
      'Trazado de patrón de saco masculino y manga de dos piezas con escuadra de madera, tiza y tijeras de sastre',
    buttonholeImage: handButtonholeCollar,
    buttonholeImageAlt:
      'Detalle de ojal artesanal cosido a mano en solapa de lana, cuello modelado y botón de asta',
    finalBackdropImage: finalAtelierBackdrop,
    finalBackdropImageAlt:
      'Taller tradicional de alta sastrería masculina con sacos confeccionados en lana fina',
  },

  demoVideo: {
    /**
     * Acepta URLs de YouTube (youtube.com/watch?v=... o youtu.be/...),
     * Vimeo (vimeo.com/... o player.vimeo.com/video/...) o un archivo MP4 alojado de forma segura (.mp4).
     * Si permanece vacío, se muestra una portada identificada como demostración pendiente.
     */
    url: 'https://player.vimeo.com/video/1249189761?h=7e854eb55c&autopause=0&player_id=0&app_id=58479',
    posterUrl: finalAtelierBackdrop,
    title: 'Curso por dentro',
  },

  complimentaryBook: {
    /** Configura aquí la URL de la portada auténtica del Libro de Sastrería. */
    coverImageUrl: '/assets/aistudio/Gu_a_de_Sastrer_a_Masculina_Elegante_52e9981e.png',
    /** Campos opcionales — déjalos vacíos si no deseas publicar datos adicionales aún. */
    specificTitle: '',
    format: '',
    pageCount: '',
  },

  /**
   * Testimonios reales y verificados.
   * Por política de integridad, la sección se oculta automáticamente mientras este arreglo esté vacío.
   */
  testimonials: [] as TestimonialItem[],

  /**
   * Galería de trabajos reales del curso.
   * No se muestran fotos genéricas como resultados del taller: incorpora aquí tus fotografías auténticas.
   */
  workGallery: [
    {
      id: 'work-full-canvas',
      title: 'Saco Full Canvas terminado',
      category: 'Especialidad I · Artesanal',
      caption: 'Caída natural del frente, equilibrio de hombros y volumen orgánico del pecho.',
      imageUrl: '/assets/aistudio/Traje_azul_marino_en_estudio_de_sastrer_a_397b28a4.png',
      plateCode: 'Lámina 01',
    },
    {
      id: 'work-semi-artisanal',
      title: 'Saco semiartesanal terminado',
      category: 'Especialidad II · Semiartesanal',
      caption: 'Aplomo limpio, costuras precisas y estructura equilibrada mediante proceso combinado.',
      imageUrl: '/assets/aistudio/Maniqu__con_traje_gris_y_corbata_burdeos_468a80f7.png',
      plateCode: 'Lámina 02',
    },
    {
      id: 'work-chest-structure',
      title: 'Interior y estructura del pecho',
      category: 'Arquitectura interna',
      caption: 'Ensamblaje de entretela flotante, plastrón y refuerzos antes del cierre del forro.',
      imageUrl: '/assets/aistudio/Construcci_n_artesanal_de_chaqueta_sastre_b91cd8bc.png',
      plateCode: 'Lámina 03',
    },
    {
      id: 'work-lapel-padding',
      title: 'Picado de solapas',
      category: 'Trabajo manual',
      caption: 'Puntadas de picado artesanal para moldear el quiebre y el giro natural de la solapa.',
      imageUrl: '/assets/aistudio/Costura_artesanal_de_solapa_azul_marino_5e0f7a0d.png',
      plateCode: 'Lámina 04',
    },
    {
      id: 'work-collar',
      title: 'Confección del cuello',
      category: 'Ajuste y asentamiento',
      caption: 'Modelado de cuello inferior y superior para un apoyo firme sobre la nuca.',
      imageUrl: '/assets/aistudio/Artesano_trabajando_cuello_de_traje_navy_99e720ae.png',
      plateCode: 'Lámina 05',
    },
    {
      id: 'work-sleeve',
      title: 'Montaje de manga',
      category: 'Manga de dos piezas',
      caption: 'Distribución del embebido en la copa y orientación correcta en la sisa.',
      imageUrl: '/assets/aistudio/Sastrer_a_artesanal__montaje_de_manga_azul_marino_80ae4f5b.png',
      plateCode: 'Lámina 06',
    },
    {
      id: 'work-buttonholes',
      title: 'Elaboración de ojales',
      category: 'Terminación fina',
      caption: 'Ojales trabajados con precisión en solapa y frente del saco.',
      imageUrl: '/assets/aistudio/Costura_Detallada_de_Ojal_Sastre_3a65a3c5.png',
      plateCode: 'Lámina 07',
    },
    {
      id: 'work-buttons',
      title: 'Terminaciones y botones',
      category: 'Acabado final',
      caption: 'Fijación de botones con pie de hilo, remates interiores y planchado de conformación.',
      imageUrl: '/assets/aistudio/Costura_artesanal_de_traje_azul_marino_39a4f17a.png',
      plateCode: 'Lámina 08',
    },
  ] as WorkGalleryItem[],

  legalDocuments: {
    terms: {
      id: 'terms',
      label: 'Términos y condiciones',
      title: 'Términos y Condiciones de Uso',
      statusNote:
        'Documento base preparado para publicación. Incorpora aquí los datos del titular responsable y las condiciones comerciales vigentes antes de activar ventas.',
      sections: [
        {
          heading: '1. Objeto de la formación',
          body: 'Esta formación proporciona acceso digital a clases en video de Sastrería Artesanal Full Canvas y Sastrería Semiartesanal, junto con un Libro de Sastrería de cortesía, destinado exclusivamente al estudio personal del estudiante.',
        },
        {
          heading: '2. Alcance educativo',
          body: 'Los contenidos tienen finalidad formativa en técnicas de patronaje y confección. Los resultados dependen de la práctica, dedicación y aplicación individual de cada estudiante. Esta formación no constituye una titulación oficial universitaria ni acreditación gubernamental.',
        },
        {
          heading: '3. Propiedad intelectual',
          body: 'Queda prohibida la reproducción, distribución, retransmisión o comercialización total o parcial de los videos, patrones mostrados o material complementario sin autorización escrita del titular.',
        },
      ],
    },
    privacy: {
      id: 'privacy',
      label: 'Política de privacidad',
      title: 'Política de Privacidad',
      statusNote:
        'Documento base preparado para publicación. Completa con el responsable del tratamiento de datos y los canales de contacto correspondientes.',
      sections: [
        {
          heading: '1. Gestión de pagos externos',
          body: 'Esta página informativa no recopila ni almacena datos de tarjetas bancarias. El proceso de compra se gestiona íntegramente a través de la plataforma externa de pago configurada en CHECKOUT_URL.',
        },
        {
          heading: '2. Uso de datos de acceso',
          body: 'Los datos proporcionados en la plataforma de pago se utilizan únicamente para emitir el comprobante de compra y habilitar las credenciales de acceso a las clases en video.',
        },
      ],
    },
    refunds: {
      id: 'refunds',
      label: 'Política de devoluciones',
      title: 'Política de Devoluciones y Garantía',
      statusNote:
        'Configura aquí el plazo exacto y el procedimiento de reembolso según la plataforma externa de pago que utilices.',
      sections: [
        {
          heading: '1. Solicitud de reembolso',
          body: 'Las condiciones, plazos y gestión de eventuales devoluciones se rigen por la política vigente de la plataforma externa de pago empleada al momento de la compra y la normativa aplicable.',
        },
        {
          heading: '2. Canal de atención',
          body: 'Para consultas relacionadas con tu inscripción o acceso, utiliza el correo electrónico o enlace de soporte configurado en el pie de página.',
        },
      ],
    },
    lifetime: {
      id: 'lifetime',
      label: 'Condiciones del acceso de por vida',
      title: 'Condiciones del Acceso de por Vida',
      statusNote:
        'Aclaración transparente sobre el alcance del acceso continuo a la formación.',
      sections: [
        {
          heading: '1. Modalidad de pago único',
          body: 'El pago único de US$25 otorga acceso continuo a las clases en video incluidas en las dos especialidades sin cuotas mensuales ni cargos recurrentes.',
        },
        {
          heading: '2. Disponibilidad del servicio',
          body: 'El acceso de por vida se mantiene vigente durante toda la vida operativa de la plataforma de alojamiento y disponibilidad del programa formativo, permitiendo repetir y consultar las lecciones tantas veces como el estudiante lo necesite.',
        },
      ],
    },
  } as Record<LegalDocument['id'], LegalDocument>,
};
