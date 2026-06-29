export interface Product {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  /** Sector label shown on the card and in the detail view. */
  sector: string;
  /** Feature chips shown in the detail info panel. */
  features: string[];
  /** Headline shown in the detail info panel. */
  title: string;
  /** Body copy — one entry per paragraph. */
  description: string[];
  /** Key outcomes / benefits — bullet list in the detail info panel. */
  highlights: string[];
  /** Who / what the product is best suited for — bullet list in the info panel. */
  bestFor: string[];
  /** Cover image used in the index grid. */
  thumbnail: string;
  /**
   * Optional looping product video (served from /public). When set it becomes
   * the first, full-screen frame of the detail slideshow.
   */
  video?: string;
  /** Still images shown in the fullscreen detail slideshow. */
  gallery: string[];
}
