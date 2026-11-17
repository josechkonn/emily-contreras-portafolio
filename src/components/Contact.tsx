import { useState, type FormEvent } from 'react';
import { Sparkle } from '@/components/Top';
import { useSite } from '@/lib/i18n';
import { socials } from '@/site';

export const socialLinks = [
  { id: 'instagram', label: 'Instagram', href: socials.instagram },
  { id: 'linkedin', label: 'LinkedIn', href: socials.linkedin },
];

/** Botón de WhatsApp con el icono del teléfono de la marca. */
export function WhatsAppButton({ className = '' }: { className?: string }) {
  return (
    <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer"
      className={`label inline-flex items-center gap-2.5 rounded-full bg-pearl px-5 py-3 text-[10.5px] text-plum transition-transform hover:-translate-y-0.5 ${className}`}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.3 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.3 4.2c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.8 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.3-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4Z" />
      </svg>
      WhatsApp
    </a>
  );
}

/** Sin servidor: el formulario arma el correo y lo abre en la app de correo de la persona. */
export function Contact() {
  const { contact } = useSite();
  const [type, setType] = useState(contact.types[0]);
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})\n${contact.type} ${type}`;
    window.location.href = `mailto:${socials.email}?subject=${encodeURIComponent(`${contact.subject}: ${type}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contacto" aria-labelledby="contact-title" className="contact-band relative overflow-hidden px-4 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="lg:pt-6">
          <p className="label flex items-center gap-2.5 text-mist"><Sparkle className="h-2.5 w-2.5 text-lilac" />{contact.kicker}</p>
          <p className="mt-6 -rotate-3 font-script text-[clamp(2.4rem,4vw,3.6rem)] leading-none text-lilac">{contact.script}</p>
          <h2 id="contact-title" className="mt-4 font-display text-[clamp(3rem,6vw,5.4rem)] uppercase leading-[0.88] [font-stretch:62.5%]">{contact.title}</h2>
          <p className="mt-6 max-w-[420px] text-[15px] font-light leading-relaxed text-pearl/80">{contact.body}</p>

          <p className="label mt-12 text-[10px] text-mist">{contact.or}</p>
          <a href={`mailto:${socials.email}`} className="contact-mail mt-3 inline-block font-display text-[clamp(1.5rem,2.6vw,2.2rem)] [font-stretch:62.5%]">{socials.email}</a>
          <p className="mt-6 text-[14px] font-light text-pearl/75">Tel. {socials.phone}</p>
          <ul className="mt-6 flex flex-wrap items-center gap-3">
            <li><WhatsAppButton /></li>
            {socialLinks.map((social) => (
              <li key={social.id}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className="label inline-flex rounded-full border border-pearl/25 px-4 py-2.5 text-[10px] transition-colors hover:border-lilac hover:text-lilac">{social.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} className="intro-paper relative grid gap-6 rounded-[28px] px-6 py-9 text-night sm:px-10 sm:py-11">
          <span className="pointer-events-none absolute inset-3 rounded-[20px] border border-violet/25" aria-hidden="true" />
          <div className="relative grid gap-6 sm:grid-cols-2">
            <label className="field"><span className="label text-[10px] text-violet">{contact.name}</span>
              <input name="name" required autoComplete="name" /></label>
            <label className="field"><span className="label text-[10px] text-violet">{contact.email}</span>
              <input name="email" type="email" required autoComplete="email" /></label>
          </div>
          <fieldset className="relative">
            <legend className="label text-[10px] text-violet">{contact.type}</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {contact.types.map((option) => (
                <label key={option} className="chip">
                  <input type="radio" name="type" value={option} checked={type === option} onChange={() => setType(option)} className="sr-only" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="field relative"><span className="label text-[10px] text-violet">{contact.message}</span>
            <textarea name="message" required rows={4} /></label>
          <div className="relative flex flex-wrap items-center gap-4">
            <button type="submit" className="contact-send">
              <span className="label pl-1 text-pearl">{contact.send}</span>
              <span className="cta-knob"><svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg></span>
            </button>
            <p role="status" className="text-[13px] font-light text-plum">{sent ? contact.sent : ''}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
