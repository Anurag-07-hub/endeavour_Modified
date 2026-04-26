import { FadeIn } from '../components/FadeIn';
import { BookOpen, Cpu, Wrench, FileText, ExternalLink, ChevronRight } from 'lucide-react';

const sections = [
  {
    icon: Cpu,
    title: 'Projects',
    description: 'Detailed documentation of all major robotics projects built by Endeavour — from line followers to autonomous drones.',
    links: [
      { label: 'MicroMouse', href: '#' },
      { label: 'Line Follower Robot', href: '#' },
      { label: 'Autonomous Rover', href: '#' },
    ],
  },
  {
    icon: Wrench,
    title: 'Guides & Tutorials',
    description: 'Step-by-step guides covering electronics, programming, mechanical design, and more for beginners and advanced members.',
    links: [
      { label: 'Getting Started with Arduino', href: '#' },
      { label: 'PCB Design Basics', href: '#' },
      { label: 'ROS Introduction', href: '#' },
    ],
  },
  {
    icon: FileText,
    title: 'Resources',
    description: 'Curated datasheets, reference manuals, component libraries, and competition problem statements.',
    links: [
      { label: 'Component Datasheets', href: '#' },
      { label: 'Competition Problem Statements', href: '#' },
      { label: 'Eagle / KiCad Libraries', href: '#' },
    ],
  },
  {
    icon: BookOpen,
    title: 'Club Handbook',
    description: 'Everything you need to know about joining Endeavour, our internal processes, meeting schedules, and code of conduct.',
    links: [
      { label: 'Membership Guidelines', href: '#' },
      { label: 'Project Proposal Template', href: '#' },
      { label: 'Meeting Minutes Archive', href: '#' },
    ],
  },
];

// Split a word roughly in half: first half black, second half brand-accent
function SplitColorWord({ word, className = '' }: { word: string; className?: string }) {
  const mid = Math.ceil(word.length / 2);
  return (
    <span className={className}>
      <span className="text-brand-muted">{word.slice(0, mid)}</span>
      <span className="text-brand-accent">{word.slice(mid)}</span>
    </span>
  );
}

export function DocumentationPage() {
  const titleWords = 'DOCUMENTATION'.split('');
  const mid = Math.ceil(titleWords.length / 2);

  return (
    <div className="min-h-screen pt-[140px] pb-[50px]">
      <div className="max-w-[1024px] mx-auto px-[40px]">

        {/* Hero */}
        <FadeIn direction="up" delay={0.1}>
          <div className="mb-[32px] text-center">
            <p className="font-sans text-brand-accent text-[10px] uppercase tracking-[4px] mb-3">
              Knowledge Base
            </p>
            <h1 className="font-sans font-black text-[40px] md:text-[52px] uppercase leading-[1.05] mb-4">
              <span className="text-brand-muted">{('DOCUMENTATION').slice(0, Math.ceil('DOCUMENTATION'.length / 2))}</span><span className="text-brand-accent">{('DOCUMENTATION').slice(Math.ceil('DOCUMENTATION'.length / 2))}</span>
            </h1>
            <div className="relative inline-block max-w-[480px] mx-auto">
              {/* Blurred backdrop behind the text */}
              <div className="absolute inset-0 rounded-xl bg-brand-bg/30 backdrop-blur-sm -mx-3 -my-2 pointer-events-none" />
              <p className="relative font-sans font-extrabold text-brand-muted text-[13px] leading-[1.7] px-3 py-2">
                Technical documentation, project guides, and resources for Endeavour members and the wider robotics community.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-[28px]" />

        {/* Sections Grid — equal height cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] items-stretch">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="
                  flex flex-col h-full
                  relative overflow-hidden
                  rounded-2xl
                  border border-brand-accent/25
                  bg-brand-bg/30 backdrop-blur-xl
                  shadow-[0_0_0_1px_rgba(164,5,5,0.08),0_4px_24px_rgba(164,5,5,0.10)]
                  hover:border-brand-accent/60
                  hover:shadow-[0_0_0_2px_rgba(164,5,5,0.18),0_8px_32px_rgba(164,5,5,0.18)]
                  transition-all duration-300
                  group
                  p-[24px]
                "
              >
                {/* Subtle glow ring top-right */}
                <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-accent/10 blur-2xl" />

                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full border border-brand-accent/40 flex items-center justify-center bg-brand-accent/5 group-hover:bg-brand-accent/15 transition-colors shrink-0">
                    <Icon className="w-4 h-4 text-brand-accent" />
                  </div>
                  <h2 className="font-sans font-bold text-[13px] uppercase tracking-[2px]">
                    <span className="text-brand-muted">{section.title.slice(0, Math.ceil(section.title.length / 2))}</span>
                    <span className="text-brand-accent">{section.title.slice(Math.ceil(section.title.length / 2))}</span>
                  </h2>
                </div>

                {/* Description */}
                <p className="font-sans text-brand-muted text-[12px] leading-[1.65] mb-4">
                  {section.description}
                </p>

                {/* Links */}
                <ul className="space-y-[8px] mt-auto">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="flex items-center gap-2 text-[11px] font-sans font-medium text-brand-muted hover:text-brand-accent transition-colors uppercase tracking-[1px]"
                      >
                        <ChevronRight className="w-3 h-3 text-brand-accent shrink-0" />
                        {link.label}
                        <ExternalLink className="w-2.5 h-2.5 ml-auto opacity-40" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-[28px] rounded-2xl border border-brand-accent/25 bg-brand-bg/40 backdrop-blur-xl p-[28px] text-center shadow-[0_0_0_1px_rgba(164,5,5,0.08),0_4px_24px_rgba(164,5,5,0.10)]">
          <p className="font-sans text-brand-muted text-[11px] uppercase tracking-[2px] mb-2">
            Can't find what you're looking for?
          </p>
          <p className="font-sans text-[16px] font-bold mb-5">
            <span className="text-brand-muted">Reach out to the </span>
            <span className="text-brand-accent">Endeavour team</span>
            <span className="text-brand-muted"> directly.</span>
          </p>
          <a
            href="#contact"
            className="inline-block px-[28px] py-[10px] rounded-full border border-brand-accent text-brand-accent text-[11px] uppercase tracking-[2px] font-bold hover:bg-brand-accent hover:text-brand-bg transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>

      </div>
    </div>
  );
}
