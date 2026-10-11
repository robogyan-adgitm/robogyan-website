import { useState } from "react";
import { Frame, Lightbox, lightboxLayoutId } from "@/components";
import { sihJudgeImages } from "@/content/sihResults";

const PREFIX = "sih-judge";

/** 12 judge graphics (4:5 Instagram posts) in a grid; click opens the shared-element Lightbox. */
export function JudgesGrid() {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {sihJudgeImages.map((judge, i) => (
          <li key={judge.id}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open ${judge.alt}`}
              className="chamfer-hover relative block w-full cursor-pointer chamfer"
            >
              <Frame
                src={judge.src}
                alt={judge.alt}
                ratio="4 / 5"
                layoutId={lightboxLayoutId(PREFIX, judge.id)}
                sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw"
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        images={sihJudgeImages}
        index={index}
        onIndexChange={setIndex}
        layoutIdPrefix={PREFIX}
        label="Judge graphics"
      />
    </>
  );
}
