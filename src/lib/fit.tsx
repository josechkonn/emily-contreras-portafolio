import { useLayoutEffect, useRef } from 'react';

/** Una línea que ocupa todo el ancho de su contenedor, como el titular de una portada. */
export function FitLine({ text, className = '' }: { text: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const fit = () => {
      if (!box.current || !line.current) return;
      line.current.style.fontSize = '100px';
      const ratio = box.current.clientWidth / line.current.scrollWidth;
      line.current.style.fontSize = `${(100 * ratio).toFixed(2)}px`;
    };
    fit();
    document.fonts.ready.then(fit);
    // Una fuente que empieza a cargar tarde cambia el ancho después de fonts.ready.
    document.fonts.addEventListener('loadingdone', fit);
    const observer = new ResizeObserver(fit);
    if (box.current) observer.observe(box.current);
    return () => { observer.disconnect(); document.fonts.removeEventListener('loadingdone', fit); };
  }, [text]);

  return (
    <div ref={box} className={className}>
      <span ref={line} className="block w-max whitespace-nowrap">{text}</span>
    </div>
  );
}
