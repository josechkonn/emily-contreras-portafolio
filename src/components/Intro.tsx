import { useEffect, useRef, useState, type CSSProperties, type ReactElement } from 'react';
import { Sparkle } from '@/components/Top';
import { useSite } from '@/lib/i18n';

/** Iconos de línea para cada cosa que hace Emily. */
const icons: Record<string, ReactElement> = {
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4" width="19" height="16" rx="2" /><path d="M2.5 8.5h19M6 6.3h.01M8.5 6.3h.01M6.5 12.5h6M6.5 15.5h4M15 12h3v4.5h-3z" />
    </svg>
  ),
  illustration: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21.5 7 12l5-9.5L17 12z" /><path d="M12 2.5V10M7 12h10" /><circle cx="12" cy="12" r="1.6" />
    </svg>
  ),
  brand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" /><path d="M12 6.5c.3 3.2 1.8 4.7 5.5 5.5-3.7.8-5.2 2.3-5.5 5.5-.3-3.2-1.8-4.7-5.5-5.5 3.7-.8 5.2-2.3 5.5-5.5Z" />
    </svg>
  ),
};

/** Entra una sola vez, cuando la tarjeta aparece en pantalla. */
function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, inView] as const;
}

/** Tarjeta de presentación que flota entre el hero y el toolkit, como una carta pegada en la revista. */
export function Intro() {
  const { intro, brand, identity } = useSite();
  const [card, inView] = useInView<HTMLDivElement>();
  const ticker = intro.items.map((item) => item.title).join(' ✦ ');

  return (
    <section id="presentacion" aria-labelledby="intro-title" className="intro-band relative z-[45] px-4 pb-14 sm:px-8 md:pb-16 lg:pb-0">
      {/* Cinta de texto que corre detrás de la tarjeta. */}
      <div className="intro-ticker" aria-hidden="true">
        <div className="intro-ticker-track">
          {[0, 1].map((copy) => <span key={copy}>{ticker} ✦ {ticker} ✦&nbsp;</span>)}
        </div>
      </div>

      <div ref={card} data-in={inView} className="intro-card relative mx-auto max-w-[760px] lg:w-[90vw] lg:max-w-[1500px]">
        <div className="intro-float relative">
          {/* Cinta adhesiva y sticker: la carta está pegada sobre la página. */}
          <span className="intro-tape" aria-hidden="true" />
          <div className="intro-sticker" aria-hidden="true">
            <span className="font-script text-[1.9rem] leading-none text-pearl sm:text-[2.3rem]">{intro.sticker}</span>
          </div>

          {/* Carta apaisada: quién soy a la izquierda, lo que hago en tres columnas a la derecha. */}
          <div className="intro-paper relative grid gap-9 px-6 pb-10 pt-11 text-night sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:gap-0 lg:px-12 lg:py-10 xl:px-14">
            <span className="pointer-events-none absolute inset-3 border border-violet/25 sm:inset-4" aria-hidden="true" />

            {/* Quién soy: el saludo manda; la frase y la bio son texto de apoyo. */}
            <div className="relative lg:pr-10 xl:pr-14">
              <p className="label flex items-center gap-2.5 text-violet">
                <Sparkle className="h-2.5 w-2.5" />{intro.kicker}
              </p>
              <p id="intro-title" className="mt-3 -rotate-2 font-script text-[clamp(3rem,4.6vw,4.6rem)] leading-none text-plum">{intro.hello}</p>
              <p className="mt-5 text-[clamp(1.05rem,1.4vw,1.3rem)] font-normal leading-snug text-violet">{intro.title}</p>
              <p className="mt-3 text-[15px] font-light leading-relaxed text-night/80">{intro.body}</p>
            </div>

            {/* Lo que hago: tres columnas con la firma arriba a la derecha. */}
            <div className="relative lg:flex lg:flex-col lg:border-l lg:border-violet/20 lg:pl-10 xl:pl-14">
              <div className="flex items-end justify-between gap-4 border-b border-violet/20 pb-4">
                <p className="label text-violet">{intro.doing}</p>
                <div className="flex items-center gap-3">
                  <span className="text-right">
                    <span className="block font-script text-[1.7rem] leading-none text-plum">{brand.first}</span>
                    <span className="label mt-0.5 block text-[9px] text-violet">{intro.signature}</span>
                  </span>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-plum/40 font-display text-sm font-medium tracking-[0.12em] text-plum [font-stretch:62.5%]" aria-hidden="true">
                    {identity.monogram}
                  </span>
                </div>
              </div>
              <ol className="grid sm:grid-cols-3 lg:flex-1 lg:items-center">
                {intro.items.map((item, index) => (
                  <li key={item.id} style={{ '--i': index } as CSSProperties}
                    className="intro-item group border-b border-violet/20 py-6 last:border-b-0 sm:border-b-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0 sm:last:pr-0 lg:self-stretch lg:pb-0 xl:px-8">
                    <span className="flex items-center justify-between">
                      <span className="headline text-[2.6rem] leading-none text-violet/70" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-plum text-pearl transition-transform duration-500 group-hover:-rotate-12 [&>svg]:h-5 [&>svg]:w-5">{icons[item.id]}</span>
                    </span>
                    <span className="mt-4 block text-[14px] font-bold uppercase tracking-[0.12em] text-plum">{item.title}</span>
                    <span className="mt-1.5 block text-[14px] font-light leading-snug text-night/75">{item.detail}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
