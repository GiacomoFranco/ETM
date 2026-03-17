export interface IGalleryResponseImage {
  id: number;
  title: string;
  alt: string;
  caption: string;
  url: string;
  width: number;
  height: number;
}

export type TGalleryResponse = IGalleryResponseImage[];
