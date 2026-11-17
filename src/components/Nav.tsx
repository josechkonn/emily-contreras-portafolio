import { useEffect, useState } from 'react';
import { Sparkle } from '@/components/Top';
import { LangSwitch, useSite } from '@/lib/i18n';

/** Sección visible ahora mismo, para marcar su enlace. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach((id) => { const node = document.querySelector(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [ids.join()]);
  return active;
}

/** Barra superior fija: transparente sobre el hero y de cristal ciruela al bajar. */
export function Nav() {
  const { nav, brand, identity, ui } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(nav.links.map((link) => link.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header data-scrolled={scrolled || open} className="nav fixed inset-x-0 top-0 z-[100]">
      <div className="nav-bar mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <a href="#inicio" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="nav-mark grid h-10 w-10 place-items-center rounded-full border border-pearl/40 font-display text-[13px] font-medium tracking-[0.14em] [font-stretch:62.5%]">
            {identity.monogram}
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-[17px] uppercase tracking-[0.08em] [font-stretch:62.5%]">{brand.fullName}</span>
            <span className="label mt-1 block text-[9px] text-mist">{ui.kicker}</span>
          </span>
        </a>

        <nav aria-label={nav.label} className="hidden lg:block">
          <ul className="nav-pill flex items-center gap-1 rounded-full p-1">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} aria-current={active === link.href ? 'location' : undefined}
                  className="nav-link label block rounded-full px-4 py-2.5 text-[10.5px]">{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <LangSwitch className="hidden sm:flex" />
          <a href="#contacto" className="nav-cta label hidden items-center gap-2 rounded-full px-5 py-3 text-[10.5px] text-pearl md:inline-flex">
            <Sparkle className="h-2.5 w-2.5 text-pearl" />{nav.cta}
          </a>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="nav-menu"
            aria-label={open ? nav.close : nav.open} className="nav-burger grid h-11 w-11 place-items-center rounded-full border border-pearl/30 lg:hidden">
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span className="burger-line top-0" /><span className="burger-line bottom-0" />
            </span>
          </button>
        </div>
      </div>

      {/* Menú móvil a pantalla completa. */}
      <div id="nav-menu" data-open={open} inert={!open} className="nav-menu fixed inset-0 top-16 flex flex-col justify-between px-6 pb-10 pt-8 lg:hidden">
        <ul className="space-y-1">
          {nav.links.map((link, index) => (
            <li key={link.href} style={{ transitionDelay: open ? `${0.08 + index * 0.06}s` : '0s' }} className="nav-menu-item">
              <a href={link.href} onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-pearl/10 py-4 font-display text-[clamp(2.4rem,11vw,3.6rem)] uppercase leading-none [font-stretch:62.5%]">
                <span className="label text-[10px] text-lilac">{String(index + 1).padStart(2, '0')}</span>{link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <LangSwitch />
          <a href="#contacto" onClick={() => setOpen(false)} className="nav-cta label inline-flex items-center gap-2 rounded-full px-5 py-3 text-[10.5px]">
            <Sparkle className="h-2.5 w-2.5" />{nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
