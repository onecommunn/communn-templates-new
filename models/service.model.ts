export interface Service {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string; // Use `Date` if you prefer parsed dates
  updatedAt: string; // Use `Date` if you prefer parsed dates
  images: string[];  // Assuming `images` is an array of image URLs
}
