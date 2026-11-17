import { socialLinks } from '@/components/Contact';
import { Sparkle } from '@/components/Top';
import { FitLine } from '@/lib/fit';
import { useSite } from '@/lib/i18n';
import { socials } from '@/site';

export function Footer() {
  const { footer, nav, brand, identity, services } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="footer relative overflow-hidden px-5 pt-16 text-pearl sm:px-8 lg:pt-20">
      <div className="mx-auto grid max-w-[1180px] gap-12 border-b border-pearl/10 pb-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <span className="grid h-12 w-12 place-items-center rounded-full border border-pearl/40 font-display text-sm tracking-[0.14em] [font-stretch:62.5%]">{identity.monogram}</span>
          <p className="mt-5 -rotate-2 font-script text-[2.2rem] leading-none text-lilac">{footer.tagline}</p>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {services.map((service) => <li key={service} className="label text-[10px] text-mist">{service}</li>)}
          </ul>
        </div>
        <nav aria-label={footer.explore}>
          <p className="label text-[10px] text-lilac">{footer.explore}</p>
          <ul className="mt-5 space-y-3">
            {nav.links.map((link) => (
              <li key={link.href}><a href={link.href} className="footer-link text-[15px] font-light">{link.label}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="label text-[10px] text-lilac">{footer.follow}</p>
          <ul className="mt-5 space-y-3">
            <li><a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className="footer-link text-[15px] font-light">WhatsApp · {socials.phone}</a></li>
            {socialLinks.map((social) => (
              <li key={social.id}><a href={social.href} target="_blank" rel="noopener noreferrer" className="footer-link text-[15px] font-light">{social.label}</a></li>
            ))}
            <li><a href={`mailto:${socials.email}`} className="footer-link break-all text-[15px] font-light">{socials.email}</a></li>
          </ul>
        </div>
      </div>

      {/* El nombre enorme, en contorno, cierra la página como el pie de una revista. */}
      <div className="mx-auto max-w-[1400px] pb-[5vw] pt-8" aria-hidden="true">
        <FitLine text={brand.fullName.toUpperCase()} className="footer-word headline leading-[0.8] [&>span]:origin-top [&>span]:scale-y-[1.4]" />
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left">
        <p className="text-[12px] font-light text-mist">© {year} {brand.fullName}. {footer.rights}</p>
        <p className="label flex items-center gap-2 text-[9.5px] text-mist/80"><Sparkle className="h-2 w-2 text-lilac" />{footer.made}</p>
        <a href="#inicio" className="label inline-flex items-center gap-2 text-[10px] transition-colors hover:text-lilac">
          {footer.top}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
        </a>
      </div>
    </footer>
  );
}
