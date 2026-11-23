import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface CountdownTimerProps {
  durationSeconds?: number;
  label?: string;
}

function padTwo(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * Cuenta regresiva por sesión de visita:
 * - Comienza desde la duración configurada cada vez que el visitante ingresa a la página.
 * - Corre en regresiva segundo a segundo y se reinicia automáticamente al llegar a cero.
 */
export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  durationSeconds = siteConfig.countdown.durationSeconds,
  label = siteConfig.countdown.label,
}) => {
  const safeDuration = Math.max(1, Math.floor(durationSeconds));
  const [secondsLeft, setSecondsLeft] = useState<number>(safeDuration);

  useEffect(() => {
    setSecondsLeft(safeDuration);

    const intervalId = window.setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? safeDuration : prev - 1));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [safeDuration]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const units = [
    { value: padTwo(hours), label: 'Horas' },
    { value: padTwo(minutes), label: 'Min' },
    { value: padTwo(seconds), label: 'Seg' },
  ];

  return (
    <div
      role="timer"
      aria-live="off"
      aria-label={`${label}: ${padTwo(hours)} horas, ${padTwo(minutes)} minutos y ${padTwo(seconds)} segundos`}
      className="mt-5 rounded-md border border-[#DEC9A8] bg-[#FFFDF9] px-4 py-3.5 text-center"
    >
      <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-[0.06em] uppercase text-[#64162D] mb-2.5">
        <Clock className="w-3.5 h-3.5 text-[#F05D3D] shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-2.5">
        {units.map((unit, idx) => (
          <React.Fragment key={unit.label}>
            <div className="min-w-[62px] sm:min-w-[68px] rounded-md bg-[#FCF6EC] border border-[#DEC9A8] px-2 py-2">
              <span className="block text-xl sm:text-2xl font-extrabold leading-none text-[#64162D] tabular-nums">
                {unit.value}
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#5A4F54] mt-1">
                {unit.label}
              </span>
            </div>
            {idx < units.length - 1 && (
              <span
                className="text-lg font-extrabold text-[#9A7A4C] pb-3.5"
                aria-hidden="true"
              >
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
