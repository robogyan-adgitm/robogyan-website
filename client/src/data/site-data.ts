/**
 * Site-wide settings (PocketBase `site_settings`, single record `sitesettings0001`).
 * This is the bundled snapshot used for first paint and when PocketBase is unreachable.
 * `address` lines are separated by "\n" (the footer shows one per line).
 */
export interface SiteSettings {
  tagline: string;
  contactEmail: string;
  address: string;
  instagram: string;
  linkedin: string;
  github: string;
  youtube: string;
  /** The community chat invite (WhatsApp group). */
  joinUrl: string;
  /** Shows the SIH results showcase and the "Results Out" nav badge. */
  sihResultsOut: boolean;
}

export const siteSettings: SiteSettings = {
  tagline: "Experience Engineering!",
  contactEmail: "robogyan.contact@gmail.com",
  address: "Basement, 5th Block\nDr. Akhilesh Das Gupta Institute of Professional Studies\nShastri Park, Delhi-110053",
  instagram: "https://www.instagram.com/robogyan",
  linkedin: "https://www.linkedin.com/company/robogyan/",
  github: "https://github.com/robogyan-adgitm",
  youtube: "https://www.youtube.com/@robogyan_official",
  joinUrl: "https://chat.whatsapp.com/GP8hZUbEV8G2b3jb0uIBWY?mode=r_c",
  sihResultsOut: true,
};
