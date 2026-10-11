import { Accordion } from "@/components";
import { sihFaqs } from "@/content/sih";
import type { Faq } from "@/content/schemas";

const groups: { id: string; category: Faq["category"]; label: string }[] = [
  { id: "eligibility", category: "Eligibility", label: "Eligibility" },
  { id: "registration", category: "Registration", label: "Registration" },
  { id: "ppt", category: "PPT & Submission", label: "PPT and submission" },
  { id: "internal", category: "Internal Hackathon", label: "Internal hackathon" },
];

/** FAQs grouped by category; each group is an exclusive accordion. */
export function FaqGroups() {
  return (
    <div className="grid gap-y-8 md:grid-cols-[12rem_1fr] md:gap-x-12 md:gap-y-12">
      {groups.map((g) => {
        const items = sihFaqs.filter((f) => f.category === g.category);
        if (items.length === 0) return null;
        return (
          <section key={g.id} aria-labelledby={`faq-${g.id}`} className="contents">
            <h3 id={`faq-${g.id}`} className="text-lg font-semibold md:pt-5">
              {g.label}
            </h3>
            <Accordion
              name={`faq-${g.id}`}
              items={items.map((f) => ({ id: f.id, title: f.question, content: f.answer }))}
            />
          </section>
        );
      })}
    </div>
  );
}
