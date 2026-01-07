import { CollectionsAboutPage } from "@/models/templates/collections/collections-about-model";
export const AboutusdummyData: CollectionsAboutPage = {
  templateId: "collections",
  pageName: "aboutUs",
  color: {
    primary: "#C09932",
  },
  sections: [
    {
      sectionName: "heroSection",
      content: {
        heading: "About Us",
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Background2323.png",
      },
      isActive: true,
      order: 0,
    },
    {
      sectionName: "twoColumnSection",
      content: {
        columnData: [
          {
            heading: "Woven with culture and care",
            description:
              "We curate handcrafted sarees that reflect India’s rich textile heritage while embracing contemporary style.",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/683ba737053456d91557ffd06ed132feb734ff4d.jpg",
            points: [
              "Celebrate the legacy of Indian handlooms and regional traditions",
              "Every saree should feel like a verse — lyrical, expressive, and uniquely yours",
            ],
            buttons: {
              label: "View Collections",
              url: "/",
            },
          },
          {
            heading: "Community-Focused & Local",
            description:
              "A small, community-centric boutique that emphasizes relationships over transactions — reflected in its excellent local reviews and loyal repeat clientele.",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/330b6b3b09b00a2723d6dfc435eb9f2eeb0f0370.jpg",
            buttons: {
              label: "Shop Now",
              url: "/",
            },
          },
        ],
      },
      isActive: true,
      order: 1,
    },
    {
      sectionName: "personalizationSection",
      content: {
        heading: "Personalized styling and storytelling",
        description:
          "We personally engage with customers, helping them find the saree that matches their personality, body type, and occasion — turning shopping into a personalized experience.",
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/89fd1eac478d56fd174ddb3ea12e310db720fa06.jpg",
        image:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/b9a822240f19a1f79aa75b67f7b6ec33608b409a.png",
        buttons: {
          label: "Learn More",
          url: "/",
        },
      },
      isActive: true,
      order: 2,
    },
    {
      sectionName: "testimoniesSection",
      content: {
        heading: "Here's Our Clients Honest Review",
        testimonies: [
          {
            rating: 5,
            quote:
              "The saree quality exceeded my expectations. The fabric, color and finish were exactly as shown. Truly elegant.\nPerfect for festive occasions. The saree looked royal and felt extremely comfortable all day.\nIt feels special knowing this saree supports traditional artisans. The handloom work is stunning.\nIt feels special knowing this saree supports traditional artisans. The handloom work is stunning.",
            designation: "Architect",
            name: "Mehwish Nihal",
          },
          {
            rating: 4,
            quote:
              "Loved the drape and detailing. The weave is premium and the finish looks even better in person.\nCustomer support helped me choose the right shade for my occasion—super smooth experience.",
            designation: "Product Designer",
            name: "Ananya Rao",
          },
          {
            rating: 3,
            quote:
              "Beautiful saree and delivery was on time. The blouse piece is also high quality.\nWould definitely recommend for weddings and celebrations.",
            designation: "Consultant",
            name: "Shreya Menon",
          },
        ],
      },
      isActive: true,
      order: 3,
    },
  ],
  status: "published",
  __v: 0,
};
