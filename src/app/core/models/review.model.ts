export type ReviewClient = {
  name: string;
  image: string;
  role: string;
};

export type Review = {
  client: ReviewClient;
  rating: number;
  review: string;
};

export type Reviews = Review[];
