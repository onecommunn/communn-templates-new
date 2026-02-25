import { PhotograpyContactPage } from "@/models/templates/photography/photography-contact-model";

export const contactDummyData: PhotograpyContactPage = {
  color: {
    primary: "#BC4C37",
    secondary: "#4F2910",
    neutral: "#fcf6e8",
  },
  templateId: "photography",
  pageName: "contact",
  sections: [
    {
      sectionName: "heroSection",
      content: {
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80",
        title: "Contact Us",
        heading: "Get in Touch",
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "contactSection",
      content: {
        phoneNumbers: ["7022779616", "9606177802"],
        whatsappNumber: ["7022779616"],
        email: ["Vipulvikki07@gmail.com"],
        branches: [
          {
            title: "Main Branch – Chitradurga",
            address:
              "Dharmashala Road, Near Megha Lodge, Chitradurga, Karnataka 577501",
            mapUrl:
              "https://www.google.com/maps?q=14.222463607788086,76.4011459350586&z=17&hl=en",
            embedUrl:
              "https://maps.google.com/maps?q=14.222463607788086,76.4011459350586&z=17&output=embed",
          },
          {
            title: "Branch – Davanagere",
            address:
              " Near Ayyappa Swamy Temple, B.I.E.T College Road, 13th Main, 5th Cross, M.C.C. 'B' Block, Davanagere 577004",
            mapUrl:
              "https://www.google.com/maps?q=14.451021194458008,75.90921783447266&z=17&hl=en",
            embedUrl:
              "https://maps.google.com/maps?q=14.451021194458008,75.90921783447266&z=17&output=embed",
          },
        ],
      },
      order: 0,
      isActive: true,
    },
  ],
  status: "published",
  __v: 1,
};
