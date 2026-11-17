import type { CSSProperties } from 'react';
import { FitLine } from '@/lib/fit';
import { useSite } from '@/lib/i18n';

const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties;

/** El destello de la marca: estrella de cuatro puntas. */
export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 0c.6 6.4 3.6 9.4 12 12-8.4 2.6-11.4 5.6-12 12-.6-6.4-3.6-9.4-12-12C8.4 9.4 11.4 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

/** Sello circular que gira, con el destello quieto en el centro. */
function Seal({ text }: { text: string }) {
  const ring = `${text} ✦ ${text} ✦ `.toUpperCase();
  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-24 lg:h-24 xl:w-32 xl:h-32 text-pearl" role="img" aria-label={text}>
      <svg viewBox="0 0 120 120" className="spin absolute inset-0" aria-hidden="true">
        <defs><path id="seal-ring" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs>
        <text className="fill-current" style={{ font: '500 8.2px Jost, sans-serif', letterSpacing: '0.24em' }}>
          <textPath href="#seal-ring" textLength="285">{ring}</textPath>
        </text>
      </svg>
      <Sparkle className="absolute inset-0 m-auto w-4 h-4 text-lilac" />
    </div>
  );
}

export function Hero() {
  const site = useSite();

  return (
    <section id="inicio" className="hero-light relative overflow-hidden text-pearl lg:h-[100svh] lg:min-h-[680px]">
      {/* Hueco para la barra fija. */}
      <div className="h-16 lg:h-[72px]" aria-hidden="true" />

      {/* La palabra enorme queda detrás de la foto. */}
      <h2 className="sr-only">{site.ui.word}</h2>
      <div className="relative z-0 px-4 sm:px-6 pt-3 lg:pt-1 rise" style={delay(0.25)} aria-hidden="true">
        <FitLine text={site.ui.word} className="headline leading-[0.78] tracking-[-0.01em] text-pearl/95 [&>span]:origin-top [&>span]:scale-y-[1.6]" />
      </div>

      {/* La posición y el degradado van en el contenedor: la animación usa transform en la foto,
          y un contenedor más ancho que la foto no recorta su sombra en un rectángulo. */}
      <div className="pointer-events-none relative z-10 flex justify-center mt-[16vw] [mask-image:linear-gradient(to_top,transparent_0%,#000_30%)] lg:absolute lg:mt-0 lg:-bottom-[7svh] lg:left-1/2 lg:-translate-x-1/2 lg:px-24">
        <img
          src="/hero/emily.webp" alt={site.brand.fullName} width={806} height={1519} fetchPriority="high" draggable={false}
          className="hero-photo rise select-none h-[70svh] w-auto max-w-none lg:h-[90svh]"
          style={delay(0.45)} />
      </div>

      <div className="hero-floor absolute inset-x-0 bottom-0 h-[16%] z-[15] pointer-events-none" aria-hidden="true" />

      <div className="relative z-20 px-5 sm:px-8 pb-10 -mt-28 md:grid md:grid-cols-2 md:items-end md:gap-x-10 lg:mt-0 lg:block lg:static">
        {/* Nombre y rol, abajo a la izquierda. */}
        <div className="rise lg:absolute lg:z-20 lg:left-8 lg:bottom-10 lg:w-[30vw] lg:max-w-[420px]" style={delay(0.65)}>
          <div className="font-display font-light uppercase text-[clamp(1.4rem,2vw,2rem)] leading-none text-mist [font-stretch:62.5%]">{site.ui.hello}</div>
          <h1 className="font-display font-light uppercase leading-[0.9] tracking-[0.01em] [font-stretch:62.5%] text-[clamp(3.2rem,5.6vw,6rem)]">
            <span className="block">{site.brand.first}</span>
            <span className="block">{site.brand.last}</span>
          </h1>
          <p className="label mt-4 text-mist leading-relaxed">{site.role}</p>
          <span className="block w-12 h-px bg-lilac/70 my-5" aria-hidden="true" />
          <p className="max-w-[300px] text-[15px] font-light leading-relaxed text-pearl/85">{site.bio}</p>
        </div>

        {/* Firma, servicios y sello, a la derecha. */}
        <div className="mt-12 md:mt-0 lg:absolute lg:right-8 lg:top-[46%] lg:w-[21vw] xl:right-[12vw] xl:top-[60%] lg:max-w-[320px] rise" style={delay(0.8)}>
          <p className="font-script text-lilac text-[clamp(2.2rem,3vw,3.2rem)] leading-[1.05] -rotate-6 origin-left">{site.statement}</p>
          <Sparkle className="w-3 h-3 text-pearl mt-8 mb-4" />
          <ul className="space-y-2.5">
            {site.services.map((service) => (
              <li key={service} className="label text-pearl/90">{service}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex justify-end md:col-span-2 md:mt-4 lg:mt-0 lg:absolute lg:right-8 lg:bottom-8 rise" style={delay(1)}>
          <Seal text={site.ui.available} />
        </div>
      </div>
    </section>
  );
}
