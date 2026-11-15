import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/site.config";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/layout/section-header";
import { Button } from "@/components/ui/button";

/** 마무리 안내(CTA) 섹션. 글자와 버튼은 site.config.ts 의 contact 에서 바꿉니다. */
export function Contact() {
  const { contact } = siteConfig;

  return (
    <section id="contact" className="scroll-mt-20 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-10 rounded-[2rem] bg-accent px-8 py-14 sm:px-16 sm:py-20 md:flex-row md:items-center md:justify-between lg:px-24">
          <SectionHeader
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
          />
          <Button asChild size="lg" className="h-16 shrink-0 self-start rounded-xl px-8 text-lg md:self-center">
            <a
              href={contact.button.href}
              target={/^https?:\/\//.test(contact.button.href) ? "_blank" : undefined}
              rel={/^https?:\/\//.test(contact.button.href) ? "noreferrer" : undefined}
            >
              {contact.button.label}
              <ArrowUpRight className="size-5" />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
