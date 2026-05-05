export interface IReviewPhotoResponse {
  url: string;
  alt?: string;
}

export interface IReviewResponse {
  id: number;
  slug: string;
  client: string;
  client_position: string;
  client_review: string;
  rating: number;
  photo: IReviewPhotoResponse[];
}

export type TReviewsResponse = IReviewResponse[];
