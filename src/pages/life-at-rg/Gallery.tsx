import { useState } from "react";
import { Frame, Lightbox, lightboxLayoutId } from "@/components";
import { gallery } from "@/content/lifeAtRg";

const PREFIX = "life-gallery";

/**
 * The 23 lab photos in a CSS-columns masonry (3 / 2 / 1 columns). Each photo is a
 * button that opens the Lightbox with a shared-element morph. Hover or focus scales
 * the photo 1.03 and raises a flat ink caption bar.
 */
export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <ul className="columns-2 gap-3 md:gap-4 lg:columns-3" aria-label="Gallery">
        {gallery.map((photo, i) => (
          <li key={photo.id} className="mb-3 break-inside-avoid md:mb-4">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open photo ${i + 1} of ${gallery.length}`}
              className="hover-tile chamfer-hover relative block w-full cursor-pointer"
            >
              <Frame
                src={photo.src}
                alt={photo.alt}
                layoutId={lightboxLayoutId(PREFIX, photo.id)}
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              >
                {/* Hover / focus caption; the button's label already names the photo. */}
                <span aria-hidden="true" className="tile-caption">
                  {photo.alt}
                </span>
              </Frame>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        images={gallery}
        index={index}
        onIndexChange={setIndex}
        layoutIdPrefix={PREFIX}
        label="Gallery viewer"
      />
    </>
  );
}
