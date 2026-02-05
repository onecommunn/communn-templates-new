import { ConsultingoContactPage } from "@/models/templates/consultingo/consultingo-contact.model";

export const contactUsDummyData: ConsultingoContactPage = {
  color: {
    primary: "#BC4C37",
    secondary: "#4F2910",
    neutral: "#fcf6e8",
  },
  templateId: "consultingo",
  pageName: "contact",
  sections: [
    {
      sectionName: "contactSection",
      content: {
        heading: "Get in touch with us",
        description:
          "We're here to answer any questions you have and help you get started on your journey to success. Reach out to us through any of the following methods, and a member of our team will be in touch shortly.",
        contactDetails: {
          phone: "(123) 456-7890",
          email: "hello@example.com",
          address: "Chicago HQ Estica Cop. Macomb, MI 48042",
        },
        availableTimings: [
          {
            day: "Monday-Friday",
            time: "08:00 - 18:00",
          },
          {
            day: "Sunday",
            time: "08:00 - 18:00",
          },
        ],
        socialLinks: [
          {
            platform: "facebook",
            url: "#",
          },
          {
            platform: "instagram",
            url: "#",
          },
          {
            platform: "twitter",
            url: "#",
          },
        ],
      },
      order: 0,
      isActive: true,
    },
  ],
  status: "published",
};
