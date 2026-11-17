import { useEffect, useRef, useState, type ReactElement } from 'react';
import { Sparkle } from '@/components/Top';
import { useSite } from '@/lib/i18n';

/** Logos dibujados a mano para no depender de archivos externos. */
const logos: Record<string, ReactElement> = {
  canva: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="canva-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#7D2AE8" /><stop offset="1" stopColor="#00C4CC" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill="url(#canva-g)" />
      <text x="32" y="39" textAnchor="middle" fill="#fff" style={{ font: '400 20px "Pinyon Script", cursive' }}>Canva</text>
    </svg>
  ),
  figma: (
    <svg viewBox="-9 -2 56 61" aria-hidden="true">
      <path d="M19 0H9.5a9.5 9.5 0 0 0 0 19H19z" fill="#F24E1E" />
      <path d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19z" fill="#FF7262" />
      <path d="M19 19H9.5a9.5 9.5 0 0 0 0 19H19z" fill="#A259FF" />
      <circle cx="28.5" cy="28.5" r="9.5" fill="#1ABCFE" />
      <path d="M9.5 57A9.5 9.5 0 0 0 19 47.5V38H9.5a9.5 9.5 0 0 0 0 19z" fill="#0ACF83" />
    </svg>
  ),
  illustrator: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="12" fill="#330000" stroke="#FF9A00" strokeWidth="2" />
      <text x="32" y="43" textAnchor="middle" fill="#FF9A00" style={{ font: '700 30px Jost, sans-serif' }}>Ai</text>
    </svg>
  ),
  photoshop: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="12" fill="#001E36" stroke="#31A8FF" strokeWidth="2" />
      <text x="32" y="43" textAnchor="middle" fill="#31A8FF" style={{ font: '700 30px Jost, sans-serif' }}>Ps</text>
    </svg>
  ),
};

function Check() {
  return (
    <span className="absolute -top-4 -right-3 sm:-right-4 grid place-items-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-pearl text-plum shadow-[0_6px_16px_rgba(18,4,26,0.45)]" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
    </span>
  );
}

function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={back ? 'M20 12H5M11 6l-6 6 6 6' : 'M4 12h15M13 6l6 6-6 6'} />
    </svg>
  );
}

/** En móvil las herramientas viven en un panel aparte que entra con un barrido diagonal. */
function useMobile() {
  const query = '(max-width: 767px)';
  const [mobile, setMobile] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMobile(list.matches);
    list.addEventListener('change', update);
    return () => list.removeEventListener('change', update);
  }, []);
  return mobile;
}

export function Toolkit() {
  const { toolkit } = useSite();
  const mobile = useMobile();
  const [open, setOpen] = useState(false);
  // Cada cambio vuelve a montar la línea de luz para que su animación arranque de nuevo.
  const [sweeps, setSweeps] = useState(0);
  const showButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);

  const toggle = (next: boolean) => {
    setOpen(next);
    setSweeps((count) => count + 1);
    // El foco sigue al panel visible.
    window.setTimeout(() => (next ? backButton : showButton).current?.focus({ preventScroll: true }), 450);
  };

  const hiddenOnMobile = (panel: 'person' | 'tools') => mobile && (panel === 'tools' ? !open : open);

  return (
    <section id="herramientas" data-open={open}
      className="group relative h-[100svh] min-h-[640px] overflow-hidden bg-plum text-pearl md:h-auto md:min-h-0 lg:flex lg:h-[100svh] lg:min-h-[720px] lg:items-center">
      {/* Lado lila. En móvil es una pantalla partida lila / morado; en PC ocupa el 38 % izquierdo y la foto cruza al morado. */}
      <div inert={hiddenOnMobile('person')}
        className="toolkit-lilac toolkit-person absolute inset-0 flex flex-col justify-end px-3 pt-10 md:relative md:inset-auto md:block md:px-4 lg:static lg:p-0 lg:bg-none">
        <div className="toolkit-lilac absolute inset-y-0 left-0 hidden w-[38%] lg:block" aria-hidden="true" />

        {/* Curva y foto comparten lienzo (600 × 800): escalan juntas y la curva siempre abraza a Emily. */}
        <div className="relative z-10 aspect-[3/4] h-[74%] w-auto md:mx-auto md:h-auto md:w-full md:max-w-[560px] lg:absolute lg:bottom-0 lg:left-[36%] lg:mx-0 lg:h-[94%] lg:w-auto lg:max-w-none lg:-translate-x-[65%]">
          <svg viewBox="0 0 600 800" className="absolute inset-0 h-full w-full overflow-visible text-plum" aria-hidden="true">
            <defs><path id="toolkit-arc" d="M218 715.7 A300 300 0 0 1 287.4 188.1" /></defs>
            <text className="fill-current" style={{ font: '700 76px "Noto Serif Display", Didot, serif', fontStretch: '62.5%', fontVariationSettings: "'wdth' 62.5, 'wght' 700" }}>
              <textPath href="#toolkit-arc" startOffset="8" textLength="640" lengthAdjust="spacing">{toolkit.title}</textPath>
            </text>
          </svg>
          <img
            src="/hero/emily-toolkit.webp" alt={toolkit.photoAlt} width={455} height={1119} loading="lazy" draggable={false}
            className="absolute bottom-0 left-[39.25%] h-[95%] w-auto max-w-none select-none drop-shadow-[0_18px_30px_rgba(37,10,51,0.35)]" />
        </div>

        {/* Solo móvil: el título corto arriba y el botón que abre las herramientas. */}
        <p className="label absolute left-5 top-8 flex items-center gap-2.5 text-plum md:hidden">
          <Sparkle className="h-2.5 w-2.5 text-violet" />{toolkit.kicker}
        </p>
        <button ref={showButton} type="button" onClick={() => toggle(true)} aria-expanded={open} aria-controls="toolkit-tools"
          className="cta absolute right-4 top-[14%] z-20 md:hidden">
          <span className="label pl-1 text-pearl">{toolkit.show}</span>
          <span className="cta-knob"><Arrow /></span>
        </button>
      </div>

      {/* Lado morado: las herramientas. En móvil es el panel que entra con el barrido. */}
      <div id="toolkit-tools" inert={hiddenOnMobile('tools')}
        className="toolkit-tools absolute inset-0 z-30 flex flex-col overflow-y-auto bg-plum px-6 pb-10 pt-8 sm:px-10 md:relative md:inset-auto md:z-auto md:block md:overflow-visible md:px-14 md:py-16 lg:ml-[50%] lg:w-[42%] lg:max-w-[640px] lg:px-0 lg:py-0">
        <button ref={backButton} type="button" onClick={() => toggle(false)} aria-controls="toolkit-tools"
          className="cta cta-back mb-8 self-start md:hidden">
          <span className="cta-knob"><Arrow back /></span>
          <span className="label pr-1 text-pearl">{toolkit.back}</span>
        </button>
        <p className="label mb-9 flex items-center gap-2.5 text-mist">
          <Sparkle className="h-2.5 w-2.5 text-lilac" />{toolkit.kicker}
        </p>
        <ul className="grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-1 lg:gap-y-[4.2vh]">
          {toolkit.tools.map((tool) => (
            <li key={tool.id} className="relative flex items-center gap-4 border-[1.5px] border-pearl/80 px-5 py-4 sm:gap-5 sm:px-7 sm:py-5">
              <span className="h-12 w-12 shrink-0 sm:h-14 sm:w-14 [&>svg]:h-full [&>svg]:w-full">{logos[tool.id]}</span>
              <span className="min-w-0 pr-4">
                <span className="block text-[15px] font-bold uppercase tracking-[0.1em] sm:text-base">{tool.name}</span>
                <span className="mt-1 block text-[13px] font-light leading-snug text-mist sm:text-sm">{tool.detail}</span>
              </span>
              <Check />
            </li>
          ))}
        </ul>
      </div>

      {/* La línea de luz que acompaña al borde del barrido. */}
      {sweeps > 0 && <span key={sweeps} className={`slash-line md:hidden ${open ? 'slash-in' : 'slash-out'}`} aria-hidden="true" />}
    </section>
  );
}
