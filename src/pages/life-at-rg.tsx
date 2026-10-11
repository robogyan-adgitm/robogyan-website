import { useEffect, useState } from "react";
import { Button, PageHead, Section, Tabs } from "@/components";
import { joinReasons, lifeAtRgIntro } from "@/content/lifeAtRg";
import { heroVideo } from "@/content/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Activities } from "./life-at-rg/Activities";
import { Gallery } from "./life-at-rg/Gallery";
import { Moments } from "./life-at-rg/Moments";

const TAB_IDS = ["gallery", "moments", "activities"] as const;
type TabId = (typeof TAB_IDS)[number];

function isTabId(v: string): v is TabId {
  return (TAB_IDS as readonly string[]).includes(v);
}

/** The tab named in the URL hash (`#moments`), or the first tab. */
function tabFromHash(): TabId {
  const h = window.location.hash.replace(/^#/, "");
  return isTabId(h) ? h : "gallery";
}

/**
 * Life at RG: the lab video, then Gallery / Moments / Activities tabs (selection kept
 * in the URL hash so `/life-at-rg#moments` deep-links), and why people join.
 */
export default function LifeAtRgPage() {
  const reduced = useReducedMotion();
  const [tab, setTab] = useState<TabId>(tabFromHash);

  // Back/forward between hashes keeps the tabs in sync.
  useEffect(() => {
    const onHash = () => setTab(tabFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const select = (id: string) => {
    if (!isTabId(id)) return;
    setTab(id);
    // replaceState: no history entry per tab, and no scroll jump (ScrollManager only
    // reacts to pushState / hashchange).
    window.history.replaceState(window.history.state, "", `#${id}`);
  };

  return (
    <>
      <PageHead title="Life at RG" description={lifeAtRgIntro.description} />

      <Section compact className="pb-0 md:pb-0">
        <div className="overflow-hidden bg-panel chamfer-lg">
          {/* Lab b-roll: no speech, so no captions track; static poster + controls with reduced motion. */}
          <video
            src={heroVideo.src}
            poster={heroVideo.poster}
            muted
            loop
            playsInline
            autoPlay={!reduced}
            controls={reduced}
            preload="metadata"
            aria-label="Inside the Robogyan lab"
            className="aspect-video w-full object-cover md:aspect-[21/9]"
          />
        </div>
      </Section>

      <Section id={tab} aria-label="Life at RG sections">
        <Tabs
          label="Life at RG sections"
          value={tab}
          onValueChange={select}
          tabs={[
            { id: "gallery", label: "Gallery", content: <Gallery /> },
            { id: "moments", label: "Moments", content: <Moments /> },
            { id: "activities", label: "Activities", content: <Activities /> },
          ]}
        />
      </Section>

      <Section surface="paper">
        <h2 className="text-3xl font-display">Why people join</h2>
        <ul className="mt-8 grid gap-8 border-t border-paper-line pt-8 sm:grid-cols-3">
          {joinReasons.map((r) => (
            <li key={r.id}>
              <h3 className="text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-muted-on-paper">{r.body}</p>
            </li>
          ))}
        </ul>
        <Button href="/contact" size="lg" className="mt-10">
          Join the lab
        </Button>
      </Section>
    </>
  );
}
