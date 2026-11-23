import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { EditorialImage } from './EditorialImage';
import { Reveal } from './Reveal';

const CRAFT_DETAIL_BLOCKS = [
  {
    number: '01',
    title: 'Patronaje',
    description:
      'La precisión comienza con las medidas y la construcción del patrón.',
    image: siteConfig.media.patternImage,
    alt: 'Trazado de patrón de saco masculino sobre papel de sastrería',
    imgPos: 'object-center',
  },
  {
    number: '02',
    title: 'Estructura interna',
    description:
      'Comprende cómo las entretelas y los refuerzos contribuyen a la forma del saco.',
    image: siteConfig.media.fullCanvasImage,
    alt: 'Entretela flotante de crin de caballo y estructura interna Full Canvas',
    imgPos: 'object-center',
  },
  {
    number: '03',
    title: 'Solapas',
    description: 'Conoce las técnicas de construcción, picado y modelado.',
    image: siteConfig.media.fullCanvasImage,
    alt: 'Picado artesanal en el revés de una solapa de lana',
    imgPos: 'object-right',
  },
  {
    number: '04',
    title: 'Cuello',
    description: 'Estudia los procedimientos para lograr un montaje correcto.',
    image: siteConfig.media.heroImage,
    alt: 'Asentamiento del cuello y línea de hombros en saco masculino',
    imgPos: 'object-top',
  },
  {
    number: '05',
    title: 'Mangas',
    description:
      'Comprende la forma de la copa, el aplomo y las técnicas de colocación.',
    image: siteConfig.media.semiArtisanalImage,
    alt: 'Montaje y costura de manga de dos piezas en chaqueta de lana',
    imgPos: 'object-left',
  },
  {
    number: '06',
    title: 'Ojales y acabados',
    description:
      'Observa los procedimientos de terminación que completan la prenda.',
    image: siteConfig.media.buttonholeImage,
    alt: 'Ojal artesanal cosido a mano y botón en puño de saco',
    imgPos: 'object-center',
  },
];

export const CraftDetailsGallery: React.FC = () => {
  return (
    <section
      id="detalles"
      className="bg-[#FCF6EC] text-[#342C30] py-14 sm:py-18"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-2">
            Anatomía de la prenda
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold leading-[1.16] text-[#64162D]">
            Los detalles que marcan la diferencia.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CRAFT_DETAIL_BLOCKS.map((item, idx) => (
            <Reveal key={item.number} delay={(idx % 3) * 0.05}>
              <article className="group h-full flex flex-col bg-[#FFFDF9] border border-[#DEC9A8] rounded-lg overflow-hidden shadow-xs">
                <EditorialImage
                  src={item.image}
                  alt={item.alt}
                  fallbackTitle={item.title}
                  className="aspect-[4/3] w-full"
                  imgClassName={`${item.imgPos} transition-transform duration-500 group-hover:scale-[1.03]`}
                />
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <div className="flex items-baseline gap-2.5 mb-1.5">
                    <span className="text-xs font-extrabold text-[#9A7A4C] tabular-nums">
                      {item.number}
                    </span>
                    <h3 className="text-lg font-bold text-[#64162D]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-[1.68] text-[#5A4F54]">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
