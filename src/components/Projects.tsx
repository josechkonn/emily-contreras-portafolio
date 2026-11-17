import type { CSSProperties, ReactElement } from 'react';
import { Sparkle } from '@/components/Top';
import { useSite } from '@/lib/i18n';

type Project = ReturnType<typeof useSite>['projects']['items'][number];

/** Iconos de pestaña: cada carpeta lleva el suyo. */
const icons: Record<string, ReactElement> = {
  web: <path d="M3 5.5h18v13H3zM3 9h18M6 7.3h.01M8.3 7.3h.01" />,
  figma: <path d="M12 3H9a3 3 0 0 0 0 6h3zM12 3h3a3 3 0 0 1 0 6h-3zM12 9H9a3 3 0 0 0 0 6h3zM15 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM9 21a3 3 0 0 0 3-3v-3H9a3 3 0 0 0 0 6z" />,
  pdf: <path d="M6 3h8l4 4v14H6zM14 3v4h4M12 10.5v6M9.5 14l2.5 2.5 2.5-2.5" />,
  folder: <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2h8.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z" />,
  bookmark: <path d="M6.5 3.5h11v17L12 16.5l-5.5 4z" />,
  doc: <path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h3" />,
};

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      {icons[name]}
    </svg>
  );
}

/** La vista previa: navegador para webs y Figma, libro inclinado para el PDF. */
function Preview({ project }: { project: Project }) {
  if (project.kind === 'pdf') {
    return (
      <div className="project-book-stage relative grid h-full w-full place-items-center overflow-hidden rounded-[20px]">
        <div className="project-book relative w-[46%] max-w-[260px]">
          <span className="project-book-pages" aria-hidden="true" />
          <img src={project.image} alt={project.alt} width={900} height={1186} loading="lazy" className="relative block w-full rounded-[6px]" />
        </div>
        <span className="label absolute bottom-4 right-4 rounded-full bg-night/70 px-3 py-1.5 text-[9px] text-mist backdrop-blur">PDF</span>
      </div>
    );
  }
  const host = project.kind === 'figma' ? 'figma.com · To-do list' : new URL(project.href).host;
  return (
    <div className="project-browser overflow-hidden rounded-[18px]">
      <div className="flex items-center gap-3 border-b border-pearl/10 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-pearl/25" /><i className="h-2.5 w-2.5 rounded-full bg-pearl/25" /><i className="h-2.5 w-2.5 rounded-full bg-pearl/25" />
        </span>
        <span className="truncate rounded-full bg-night/60 px-3 py-1 text-[11px] font-light text-mist">{host}</span>
      </div>
      <img src={project.image} alt={project.alt} width={1600} height={900} loading="lazy" className="block aspect-[16/9] w-full object-cover object-top" />
    </div>
  );
}

/** Carpetas apiladas: al bajar, cada una se queda pegada y la siguiente se monta encima dejando ver su pestaña. */
export function Projects() {
  const { projects } = useSite();

  return (
    <section id="proyectos" aria-labelledby="projects-title" className="projects-band relative px-4 pb-24 pt-24 sm:px-8 lg:pb-32 lg:pt-32">
      <header className="mx-auto max-w-[1180px] text-center">
        <div className="flex justify-center gap-4 text-lilac/70" aria-hidden="true">
          {['folder', 'bookmark', 'doc'].map((name) => <Icon key={name} name={name} className="h-5 w-5" />)}
        </div>
        <p className="label mt-6 flex items-center justify-center gap-2.5 text-mist">
          <Sparkle className="h-2.5 w-2.5 text-lilac" />{projects.kicker}
        </p>
        <h2 id="projects-title" className="mt-4 font-display text-[clamp(2.6rem,6.5vw,5.6rem)] uppercase leading-[0.9] [font-stretch:62.5%]">
          <span className="projects-glow">{projects.titleA}</span>{' '}
          <span className="font-light text-mist/80">{projects.titleB}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-[520px] text-[15px] font-light leading-relaxed text-pearl/75">{projects.intro}</p>
      </header>

      <ol className="mx-auto mt-14 max-w-[1180px] lg:mt-20">
        {projects.items.map((project, index) => {
          const external = project.kind !== 'pdf';
          return (
            <li key={project.id} className="project-card" style={{ '--i': index } as CSSProperties}>
              <article className="project-folder relative rounded-[28px] p-3 sm:p-4" aria-labelledby={`project-${project.id}`}>
                {/* Pestaña de la carpeta: icono, título y botón brillante. */}
                <div className="flex min-h-[64px] items-center gap-4 px-2 sm:px-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-violet/40 text-mist">
                    <Icon name={project.kind} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="label truncate text-[9.5px] text-lilac">{project.category}</p>
                    <h3 id={`project-${project.id}`} className="mt-1 truncate text-[17px] font-medium leading-tight sm:text-xl">{project.title}</h3>
                  </div>
                  <span className="headline hidden text-[2.4rem] leading-none text-pearl/15 md:block" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <a href={project.href} className="project-btn shrink-0"
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : { download: projects.download })}>
                    <span className="hidden sm:inline">{project.cta}</span>
                    <Icon name={external ? 'web' : 'pdf'} className="h-4 w-4 sm:hidden" />
                    <span className="sr-only sm:hidden">{project.cta}</span>
                    {external && <span className="sr-only">{projects.newTab}</span>}
                  </a>
                </div>

                {/* Contenido de la carpeta. */}
                <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-6 rounded-[20px] bg-night/45 p-4 sm:p-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-10 lg:p-8">
                  <div className="flex flex-col justify-between gap-6 lg:py-2">
                    <p className="text-[15px] font-light leading-relaxed text-pearl/85 lg:text-base">{project.detail}</p>
                    <ul className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li key={tag} className="label rounded-full border border-pearl/20 px-3 py-1.5 text-[9.5px] text-mist">{tag}</li>
                      ))}
                    </ul>
                  </div>
                  <a href={project.href} tabIndex={-1} aria-hidden="true" className="project-preview block"
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : { download: projects.download })}>
                    <Preview project={project} />
                  </a>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
