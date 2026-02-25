import { PhotographyAboutPage } from "@/models/templates/photography/photography-about-model";

export const aboutDummyData: PhotographyAboutPage = {
  color: {
    primary: "#BC4C37",
    secondary: "#4F2910",
    neutral: "#fcf6e8",
  },
  templateId: "photography",
  pageName: "about",
  sections: [
    {
      sectionName: "heroSection",
      content: {
        image:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-2.jpg",
        title: "About Us",
        heading: "Our Story",
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "bioSection",
      content: {
        badgeText: "The Photographer",
        name: "Vijaykumar",
        designation: "Founder & Director, Vijay Photography",
        description:
          "I'm a visual storyteller who perceives the world through light, shadow, and emotion. For me, photography goes far beyond capturing images — it's about preserving feelings, energy, and the connections between people. I find joy in transforming everyday moments into timeless works of art. With a deep specialisation in wedding photography, we deliver our finest services across India from our studio in Chitradurga, Karnataka Every celebration we cover is an opportunity to tell a unique love story through our lens.",
        image:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/vijay-portrait.png",
        contacts: [
          {
            type: "location",
            value: "Chitradurga, Karnataka, India",
          },
          {
            type: "phone",
            value: "7022779616",
          },
          {
            type: "phone",
            value: "9606177802",
          },
        ],
      },
      order: 1,
      isActive: true,
    },
    {
      sectionName: "highlightsSection",
      content: {
        highlights: [
          {
            icon: "Camera",
            title: "Wedding Specialists",
            description:
              "Comprehensive wedding coverage including candid, traditional, cinematic, and aerial drone photography to capture every moment.",
          },
          {
            icon: "MapPin",
            title: "Pan-India Coverage",
            description:
              "Headquartered in Chitradurga, Karnataka — proudly serving clients with premium photography services across the country.",
          },
          {
            icon: "Phone",
            title: "Always Accessible",
            description:
              "Get in touch anytime on 7022779616 or 9606177802 to discuss your upcoming celebration.",
          },
        ],
      },
      order: 2,
      isActive: true,
    },
  ],
  status: "published",
  __v: 0,
};
