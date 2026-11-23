import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Globe } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface CurrencyOption {
  countryCode: string;
  country: string;
  currencyCode: string;
  currencyName: string;
  /** Tasa referencial de respaldo por 1 USD (se actualiza en vivo si la API responde). */
  fallbackRate: number;
  decimals: number;
}

const SPANISH_SPEAKING_CURRENCIES: CurrencyOption[] = [
  {
    countryCode: 'AR',
    country: 'Argentina',
    currencyCode: 'ARS',
    currencyName: 'Peso argentino',
    fallbackRate: 1060,
    decimals: 2,
  },
  {
    countryCode: 'BO',
    country: 'Bolivia',
    currencyCode: 'BOB',
    currencyName: 'Boliviano',
    fallbackRate: 6.91,
    decimals: 2,
  },
  {
    countryCode: 'CL',
    country: 'Chile',
    currencyCode: 'CLP',
    currencyName: 'Peso chileno',
    fallbackRate: 950,
    decimals: 0,
  },
  {
    countryCode: 'CO',
    country: 'Colombia',
    currencyCode: 'COP',
    currencyName: 'Peso colombiano',
    fallbackRate: 4150,
    decimals: 0,
  },
  {
    countryCode: 'CR',
    country: 'Costa Rica',
    currencyCode: 'CRC',
    currencyName: 'Colón costarricense',
    fallbackRate: 510,
    decimals: 0,
  },
  {
    countryCode: 'CU',
    country: 'Cuba',
    currencyCode: 'CUP',
    currencyName: 'Peso cubano',
    fallbackRate: 24,
    decimals: 2,
  },
  {
    countryCode: 'EC',
    country: 'Ecuador',
    currencyCode: 'USD',
    currencyName: 'Dólar estadounidense',
    fallbackRate: 1,
    decimals: 2,
  },
  {
    countryCode: 'SV',
    country: 'El Salvador',
    currencyCode: 'USD',
    currencyName: 'Dólar estadounidense',
    fallbackRate: 1,
    decimals: 2,
  },
  {
    countryCode: 'ES',
    country: 'España',
    currencyCode: 'EUR',
    currencyName: 'Euro',
    fallbackRate: 0.92,
    decimals: 2,
  },
  {
    countryCode: 'US',
    country: 'Estados Unidos',
    currencyCode: 'USD',
    currencyName: 'Dólar estadounidense',
    fallbackRate: 1,
    decimals: 2,
  },
  {
    countryCode: 'GT',
    country: 'Guatemala',
    currencyCode: 'GTQ',
    currencyName: 'Quetzal guatemalteco',
    fallbackRate: 7.72,
    decimals: 2,
  },
  {
    countryCode: 'GQ',
    country: 'Guinea Ecuatorial',
    currencyCode: 'XAF',
    currencyName: 'Franco CFA',
    fallbackRate: 605,
    decimals: 0,
  },
  {
    countryCode: 'HN',
    country: 'Honduras',
    currencyCode: 'HNL',
    currencyName: 'Lempira hondureño',
    fallbackRate: 25.4,
    decimals: 2,
  },
  {
    countryCode: 'MX',
    country: 'México',
    currencyCode: 'MXN',
    currencyName: 'Peso mexicano',
    fallbackRate: 20.1,
    decimals: 2,
  },
  {
    countryCode: 'NI',
    country: 'Nicaragua',
    currencyCode: 'NIO',
    currencyName: 'Córdoba nicaragüense',
    fallbackRate: 36.8,
    decimals: 2,
  },
  {
    countryCode: 'PA',
    country: 'Panamá',
    currencyCode: 'PAB',
    currencyName: 'Balboa / Dólar',
    fallbackRate: 1,
    decimals: 2,
  },
  {
    countryCode: 'PY',
    country: 'Paraguay',
    currencyCode: 'PYG',
    currencyName: 'Guaraní paraguayo',
    fallbackRate: 7850,
    decimals: 0,
  },
  {
    countryCode: 'PE',
    country: 'Perú',
    currencyCode: 'PEN',
    currencyName: 'Sol peruano',
    fallbackRate: 3.74,
    decimals: 2,
  },
  {
    countryCode: 'PR',
    country: 'Puerto Rico',
    currencyCode: 'USD',
    currencyName: 'Dólar estadounidense',
    fallbackRate: 1,
    decimals: 2,
  },
  {
    countryCode: 'DO',
    country: 'República Dominicana',
    currencyCode: 'DOP',
    currencyName: 'Peso dominicano',
    fallbackRate: 60.5,
    decimals: 2,
  },
  {
    countryCode: 'UY',
    country: 'Uruguay',
    currencyCode: 'UYU',
    currencyName: 'Peso uruguayo',
    fallbackRate: 42.8,
    decimals: 2,
  },
  {
    countryCode: 'VE',
    country: 'Venezuela',
    currencyCode: 'VES',
    currencyName: 'Bolívar venezolano',
    fallbackRate: 58,
    decimals: 2,
  },
];

/**
 * Mapeo de zonas horarias IANA a código de país para detección instantánea sin retraso.
 */
const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  // España
  'Europe/Madrid': 'ES',
  'Atlantic/Canary': 'ES',
  'Africa/Ceuta': 'ES',
  // México
  'America/Mexico_City': 'MX',
  'America/Cancun': 'MX',
  'America/Merida': 'MX',
  'America/Monterrey': 'MX',
  'America/Matamoros': 'MX',
  'America/Chihuahua': 'MX',
  'America/Ciudad_Juarez': 'MX',
  'America/Ojinaga': 'MX',
  'America/Mazatlan': 'MX',
  'America/Bahia_Banderas': 'MX',
  'America/Hermosillo': 'MX',
  'America/Tijuana': 'MX',
  // Colombia, Perú, Ecuador, Bolivia, Chile, Uruguay, Paraguay, Venezuela
  'America/Bogota': 'CO',
  'America/Lima': 'PE',
  'America/Guayaquil': 'EC',
  'Pacific/Galapagos': 'EC',
  'America/La_Paz': 'BO',
  'America/Santiago': 'CL',
  'America/Punta_Arenas': 'CL',
  'Pacific/Easter': 'CL',
  'America/Montevideo': 'UY',
  'America/Asuncion': 'PY',
  'America/Caracas': 'VE',
  // Argentina
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Buenos_Aires': 'AR',
  'America/Argentina/Cordoba': 'AR',
  'America/Argentina/Salta': 'AR',
  'America/Argentina/Jujuy': 'AR',
  'America/Argentina/Tucuman': 'AR',
  'America/Argentina/Catamarca': 'AR',
  'America/Argentina/La_Rioja': 'AR',
  'America/Argentina/San_Juan': 'AR',
  'America/Argentina/Mendoza': 'AR',
  'America/Argentina/San_Luis': 'AR',
  'America/Argentina/Rio_Gallegos': 'AR',
  'America/Argentina/Ushuaia': 'AR',
  // Centroamérica y Caribe
  'America/Costa_Rica': 'CR',
  'America/Guatemala': 'GT',
  'America/Tegucigalpa': 'HN',
  'America/Managua': 'NI',
  'America/Panama': 'PA',
  'America/El_Salvador': 'SV',
  'America/Santo_Domingo': 'DO',
  'America/Havana': 'CU',
  'America/Puerto_Rico': 'PR',
  // Guinea Ecuatorial
  'Africa/Malabo': 'GQ',
  // Estados Unidos
  'America/New_York': 'US',
  'America/Chicago': 'US',
  'America/Denver': 'US',
  'America/Los_Angeles': 'US',
  'America/Phoenix': 'US',
  'America/Anchorage': 'US',
  'Pacific/Honolulu': 'US',
};

const EXTRA_COUNTRY_CURRENCIES: Record<string, CurrencyOption> = {
  BR: {
    countryCode: 'BR',
    country: 'Brasil',
    currencyCode: 'BRL',
    currencyName: 'Real brasileño',
    fallbackRate: 5.75,
    decimals: 2,
  },
  CA: {
    countryCode: 'CA',
    country: 'Canadá',
    currencyCode: 'CAD',
    currencyName: 'Dólar canadiense',
    fallbackRate: 1.4,
    decimals: 2,
  },
  GB: {
    countryCode: 'GB',
    country: 'Reino Unido',
    currencyCode: 'GBP',
    currencyName: 'Libra esterlina',
    fallbackRate: 0.79,
    decimals: 2,
  },
  FR: {
    countryCode: 'FR',
    country: 'Francia',
    currencyCode: 'EUR',
    currencyName: 'Euro',
    fallbackRate: 0.92,
    decimals: 2,
  },
  IT: {
    countryCode: 'IT',
    country: 'Italia',
    currencyCode: 'EUR',
    currencyName: 'Euro',
    fallbackRate: 0.92,
    decimals: 2,
  },
  DE: {
    countryCode: 'DE',
    country: 'Alemania',
    currencyCode: 'EUR',
    currencyName: 'Euro',
    fallbackRate: 0.92,
    decimals: 2,
  },
  PT: {
    countryCode: 'PT',
    country: 'Portugal',
    currencyCode: 'EUR',
    currencyName: 'Euro',
    fallbackRate: 0.92,
    decimals: 2,
  },
};

function isKnownSpanishCountry(code: string): boolean {
  return SPANISH_SPEAKING_CURRENCIES.some((c) => c.countryCode === code);
}

function detectInitialCountryFromDevice(): string {
  // 1. Detección por zona horaria del dispositivo (muy precisa incluso con navegador en inglés)
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) {
      if (TIMEZONE_TO_COUNTRY[tz]) {
        return TIMEZONE_TO_COUNTRY[tz];
      }
      if (tz.startsWith('America/Argentina/')) {
        return 'AR';
      }
    }
  } catch {
    // Continuar con respaldo por idioma
  }

  // 2. Detección por idiomas configurados en el navegador
  if (typeof navigator !== 'undefined') {
    const langs =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language || ''];

    for (const lang of langs) {
      const parts = lang.split('-');
      if (parts.length >= 2) {
        const region = parts[parts.length - 1].toUpperCase();
        if (isKnownSpanishCountry(region)) {
          return region;
        }
      }
    }
  }

  return 'US';
}

export const CurrencyConverter: React.FC = () => {
  const baseUsd = siteConfig.offer.price;
  const userHasSelectedRef = useRef(false);

  const [selectedCountry, setSelectedCountry] = useState<string>(() =>
    detectInitialCountryFromDevice()
  );
  const [detectedExtraOption, setDetectedExtraOption] =
    useState<CurrencyOption | null>(null);
  const [detectedCountryName, setDetectedCountryName] = useState<string>('');
  const [liveRates, setLiveRates] = useState<Record<string, number> | null>(
    null
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadLiveRates() {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD', {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = (await res.json()) as {
          result?: string;
          rates?: Record<string, number>;
        };
        if (data.result === 'success' && data.rates) {
          setLiveRates(data.rates);
        }
      } catch {
        // Mantiene silenciosamente las tasas referenciales de respaldo
      }
    }

    async function detectVisitorCountryByIp() {
      try {
        const res = await fetch('https://get.geojs.io/v1/ip/country.json', {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = (await res.json()) as {
          country?: string;
          name?: string;
        };

        const code = data.country?.trim().toUpperCase();
        if (!code || userHasSelectedRef.current) return;

        if (isKnownSpanishCountry(code)) {
          const match = SPANISH_SPEAKING_CURRENCIES.find(
            (c) => c.countryCode === code
          );
          setSelectedCountry(code);
          if (match) setDetectedCountryName(match.country);
          return;
        }

        if (EXTRA_COUNTRY_CURRENCIES[code]) {
          const extra = EXTRA_COUNTRY_CURRENCIES[code];
          setDetectedExtraOption(extra);
          setSelectedCountry(extra.countryCode);
          setDetectedCountryName(extra.country);
        }
      } catch {
        // Mantiene la detección local por zona horaria/idioma del dispositivo
      }
    }

    loadLiveRates();
    detectVisitorCountryByIp();

    return () => controller.abort();
  }, []);

  const allOptions = useMemo(() => {
    if (
      detectedExtraOption &&
      !isKnownSpanishCountry(detectedExtraOption.countryCode)
    ) {
      return [detectedExtraOption, ...SPANISH_SPEAKING_CURRENCIES];
    }
    return SPANISH_SPEAKING_CURRENCIES;
  }, [detectedExtraOption]);

  const currentItem = useMemo(() => {
    return (
      allOptions.find((item) => item.countryCode === selectedCountry) ||
      SPANISH_SPEAKING_CURRENCIES[0]
    );
  }, [allOptions, selectedCountry]);

  const effectiveRate =
    liveRates && typeof liveRates[currentItem.currencyCode] === 'number'
      ? liveRates[currentItem.currencyCode]
      : currentItem.fallbackRate;

  const convertedAmount = baseUsd * effectiveRate;

  const formattedConverted = useMemo(() => {
    try {
      return new Intl.NumberFormat('es-419', {
        style: 'currency',
        currency: currentItem.currencyCode,
        minimumFractionDigits: currentItem.decimals,
        maximumFractionDigits: currentItem.decimals,
      }).format(convertedAmount);
    } catch {
      return `${currentItem.currencyCode} ${convertedAmount.toFixed(
        currentItem.decimals
      )}`;
    }
  }, [convertedAmount, currentItem]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    userHasSelectedRef.current = true;
    setSelectedCountry(e.target.value);
  };

  return (
    <div className="mt-4 rounded-md border border-[#DEC9A8] bg-[#FFFDF9] px-4 py-4 text-left">
      <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-[0.06em] uppercase text-[#64162D] mb-1.5">
        <Globe className="w-3.5 h-3.5 text-[#9A7A4C] shrink-0" aria-hidden="true" />
        <label htmlFor="currency-converter-select">
          Convertir {siteConfig.offer.formattedPrice} a tu moneda
        </label>
      </div>

      <p className="text-[11px] text-[#5A4F54] text-center mb-2.5">
        {detectedCountryName && !userHasSelectedRef.current
          ? `Detectado automáticamente (${detectedCountryName}) · Cambia de país cuando quieras:`
          : 'Mostrando tu moneda local · Cambia a otro país hispanohablante:'}
      </p>

      <select
        id="currency-converter-select"
        value={selectedCountry}
        onChange={handleCountryChange}
        className="w-full min-h-[44px] rounded-md border border-[#DEC9A8] bg-[#FCF6EC] px-3 py-2 text-sm font-semibold text-[#342C30] focus:border-[#64162D] focus:outline-none cursor-pointer"
      >
        {allOptions.map((item) => (
          <option key={item.countryCode} value={item.countryCode}>
            {item.country} — {item.currencyName} ({item.currencyCode})
          </option>
        ))}
      </select>

      <div className="mt-3 rounded-md bg-[#FCF6EC] border border-[#DEC9A8]/80 px-3.5 py-2.5 text-center">
        <p className="text-[11px] font-medium text-[#5A4F54]">
          Equivalente aproximado en {currentItem.country}:
        </p>
        <p className="text-xl sm:text-2xl font-extrabold text-[#64162D] tabular-nums mt-0.5">
          {formattedConverted}{' '}
          <span className="text-xs font-bold uppercase text-[#9A7A4C]">
            {currentItem.currencyCode}
          </span>
        </p>
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-[#5A4F54] text-center">
        Valor orientativo basado en tipo de cambio referencial
        {liveRates ? ' actualizado' : ''}. El importe final se calcula al cambio
        vigente de tu banco o plataforma de pago.
      </p>
    </div>
  );
};
