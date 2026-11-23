import React from 'react';
import { COMPARISON_ROWS } from '../data/courseContent';
import { Reveal } from './Reveal';

export const ComparisonSection: React.FC = () => {
  return (
    <section
      id="comparativa"
      className="bg-[#FCF6EC] text-[#342C30] py-14 sm:py-18"
    >
      <div className="max-w-[1150px] mx-auto px-5 sm:px-8">
        <Reveal className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-[#9A7A4C] mb-2">
            Comparativa técnica
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold leading-[1.16] text-[#64162D]">
            Dos métodos que amplían tu conocimiento del oficio.
          </h2>
        </Reveal>

        {/* Desktop & Tablet Comparison Table */}
        <Reveal className="hidden md:block border border-[#DEC9A8] rounded-lg overflow-hidden bg-[#FFFDF9] shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#64162D] text-[#FFFFFF]">
                <th
                  scope="col"
                  className="py-4 px-6 text-xs font-bold tracking-[0.1em] uppercase text-[#DEC9A8] w-[24%]"
                >
                  Aspecto
                </th>
                <th
                  scope="col"
                  className="py-4 px-6 text-sm font-bold text-[#FFFFFF] w-[38%] border-l border-[#DEC9A8]/25"
                >
                  Artesanal Full Canvas
                </th>
                <th
                  scope="col"
                  className="py-4 px-6 text-sm font-bold text-[#FFFFFF] w-[38%] border-l border-[#DEC9A8]/25"
                >
                  Semiartesanal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEC9A8]/70 text-sm leading-relaxed">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr
                  key={row.aspect}
                  className={idx % 2 === 1 ? 'bg-[#FCF6EC]/70' : 'bg-[#FFFDF9]'}
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-semibold text-[#64162D]"
                  >
                    {row.aspect}
                  </th>
                  <td className="py-4 px-6 text-[#342C30] border-l border-[#DEC9A8]/55">
                    {row.fullCanvas}
                  </td>
                  <td className="py-4 px-6 text-[#342C30] border-l border-[#DEC9A8]/55">
                    {row.semiArtisanal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile Stacked Cards */}
        <div className="md:hidden space-y-3.5">
          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.aspect}
              className="border border-[#DEC9A8] rounded-md bg-[#FFFDF9] p-5 shadow-xs"
            >
              <h3 className="text-base font-bold text-[#64162D] pb-2.5 mb-3 border-b border-[#DEC9A8]/60">
                {row.aspect}
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#9A7A4C] mb-0.5">
                    Artesanal Full Canvas
                  </dt>
                  <dd className="text-[#342C30] leading-relaxed">
                    {row.fullCanvas}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#9A7A4C] mb-0.5">
                    Semiartesanal
                  </dt>
                  <dd className="text-[#342C30] leading-relaxed">
                    {row.semiArtisanal}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <Reveal className="max-w-3xl mx-auto text-center mt-8">
          <p className="text-sm sm:text-base font-semibold text-[#64162D] leading-snug">
            Ambos métodos tienen algo en común: la importancia de un buen
            patronaje, un montaje preciso y acabados cuidados.
          </p>
        </Reveal>
      </div>
    </section>
  );
};
