export interface Recommendation {
  _id: string;
  community: string;
  placeName: string;
  imageUrl: string[];
  videoUrl: string[];
  category: string;
  description: string;
  address: string;
  city: string;
  googleMapLink: string;
  tags: string;
  priceRange: string;
  reservationLink: string;
  phoneNumber: string;
  website: string;
  location: {
    type: string;
    latitude: string;
    longitude: string;
  };
  time: {
    openingTime: string;
    closingTime: string;
  };
  socialLink: {
    facebookLink: string;
    instagramLink: string;
  };
  isPublished?: boolean;
}

export type Category = {
  community: string;
  createdAt: string;
  name: string;
  updatedAt: string;
  __v: number;
  _id: string;
};