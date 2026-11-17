import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { sites, type Content, type Lang } from '@/site';

const STORAGE_KEY = 'lang';
const SPANISH_ZONES = /^(America\/(Caracas|Bogota|Lima|Santiago|Guayaquil|La_Paz|Asuncion|Montevideo|Buenos_Aires|Argentina\/.*|Mexico_City|Monterrey|Merida|Cancun|Chihuahua|Hermosillo|Mazatlan|Tijuana|Guatemala|El_Salvador|Tegucigalpa|Managua|Costa_Rica|Panama|Havana|Santo_Domingo|Puerto_Rico)|Europe\/Madrid|Atlantic\/Canary|Africa\/(Ceuta|Malabo))$/;

/** Primero lo que eligió la persona; si no, su región; si no, el idioma de su navegador. */
function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    // Sin localStorage se sigue con la detección.
  }
  if (SPANISH_ZONES.test(Intl.DateTimeFormat().resolvedOptions().timeZone)) return 'es';
  return navigator.languages.some((language) => language.toLowerCase().startsWith('es')) ? 'es' : 'en';
}

type LangState = { lang: Lang; site: Content; choose: (lang: Lang) => void };
const LangContext = createContext<LangState | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState(detectLang);

  const choose = useCallback((next: Lang) => {
    setLang(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // La elección vale para esta visita aunque no se pueda guardar.
    }
  }, []);

  useLayoutEffect(() => {
    const { meta } = sites[lang].ui;
    document.documentElement.lang = lang;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [lang]);

  const value = useMemo(() => ({ lang, site: sites[lang], choose }), [lang, choose]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const state = useContext(LangContext);
  if (!state) throw new Error('useLang necesita LangProvider');
  return state;
}

export const useSite = () => useLang().site;

/** Versión compacta para pantallas estrechas: muestra el idioma al que se cambia. */
export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, choose } = useLang();
  const next = lang === 'es' ? 'en' : 'es';
  return (
    <button type="button" data-lang-toggle lang={next} onClick={() => choose(next)}
      aria-label={next === 'en' ? 'EN: switch to English' : 'ES: cambiar a español'}
      className={`min-w-11 self-stretch flex items-center justify-center font-sans text-[11px] font-medium tracking-[0.2em] ${className}`}>
      <span className="border border-pearl/50 px-1.5 py-1">{next.toUpperCase()}</span>
    </button>
  );
}

export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, choose } = useLang();
  return (
    <div role="group" aria-label="Idioma / Language" className={`flex items-stretch font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.2em] ${className}`}>
      {(['es', 'en'] as const).map((option) => (
        <button key={option} type="button" lang={option} aria-pressed={lang === option} onClick={() => choose(option)}
          className={`min-w-9 px-2 min-h-8 transition-colors ${lang === option ? 'bg-pearl text-night' : 'text-mist hover:text-pearl'}`}>
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
