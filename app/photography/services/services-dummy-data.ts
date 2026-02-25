import { PhotographyServicePage } from "@/models/templates/photography/photography-services-model";

export const servicesDummyData: PhotographyServicePage = {
  color: {
    primary: "#BC4C37",
    secondary: "#4F2910",
    neutral: "#fcf6e8",
  },
  templateId: "photography",
  pageName: "services",
  sections: [
    {
      sectionName: "heroSection",
      content: {
        image:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-6.jpg",
        title: "What We Offer",
        heading: "Our Services",
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "serviceSection",
      content: {
        services: [
          {
            title: "Candid Photography",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-1.jpg",
            description:
              "Authentic, unscripted moments captured as they unfold — preserving the genuine emotions and spontaneous joy of your celebration.",
          },
          {
            title: "Traditional Photography",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-4.jpg",
            description:
              "Elegantly composed portraits and group photographs that document every ritual, ceremony, and milestone with classic sophistication.",
          },
          {
            title: "Cinematography",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-6.jpg",
            description:
              "Cinematic wedding films crafted with professional storytelling, seamlessly blending visuals, music, and emotion into a timeless narrative.",
          },
          {
            title: "Drone Photography",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-2.jpg",
            description:
              "Stunning aerial perspectives that showcase the scale and beauty of your venue, décor, and celebrations from breathtaking vantage points.",
          },
          {
            title: "Pre-Wedding Shoots",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-1.jpg",
            description:
              "Romantic photo and video sessions at handpicked locations, designed to capture the essence of your love story before the big day.",
          },
          {
            title: "LED Wall Setup",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-2.jpg",
            description:
              "Professional large-format LED display installations that create an immersive visual backdrop for your reception and special events.",
          },
        ],
      },
      order: 1,
      isActive: true,
    },
  ],
  status: "published",
  __v: 0,
};
