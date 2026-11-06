import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";

/** 회사소개 섹션 (어두운 배경). 글자는 site.config.ts 의 about 에서 바꿉니다. */
export function About() {
  const { about } = siteConfig;

  return (
    <section id="about" className="scroll-mt-20 bg-foreground py-24 text-background sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeader dark eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-8 text-base leading-loose text-background/70 sm:text-lg">
            {about.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>

        <ol className="border-t border-background/15">
          {about.values.map((value, i) => (
            <li key={value.title} className="flex gap-6 border-b border-background/15 py-10">
              <span className="pt-1 text-sm font-medium text-highlight">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{value.title}</h3>
                <p className="mt-2 text-background/70">{value.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
