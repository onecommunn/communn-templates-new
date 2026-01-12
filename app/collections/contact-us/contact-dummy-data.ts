import { CollectionsContactPage } from "@/models/templates/collections/collections-contact-model";

export const ContactdummyData: CollectionsContactPage = {
  templateId: "collections",
  pageName: "contactUs",
  color: {
    primary: "#C09932",
  },
  sections: [
    {
      sectionName: "heroSection",
      content: {
        heading: "Contact Us",
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/89fd1eac478d56fd174ddb3ea12e310db720fa06.jpg",
      },
      isActive: true,
      order: 0,
    },
    {
      sectionName: "contactInfoSection",
      content: {
        heading: "Speak With Us",
        description:
          " Visit us at our studio in Bengaluru for a closer look at our collections.Call or WhatsApp us for quick assistance during business hours.",
        contact: {
          email: "vinuthaprajwalco@gmail.com",
          googleMapLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.96863716412!2d77.49488397531978!3d12.973857787341696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d8fc2f3820b%3A0xbdf67a52213e35be!2sVinutha%20saree%20verse!5e0!3m2!1sen!2sus!4v1767679232427!5m2!1sen!2sus",
          location:
            "840, 6th Main Road, Opposite To Sallapuradamma Temple, D Group Society, Bengaluru.",
          phoneNumber: "+91 7259253666",
          website: "vinuthaverse.com",
        },
      },
      isActive: true,
      order: 1,
    },
    {
      sectionName: "contactFormSection",
      content: {
        heading: "24/7 Support",
        description:
          "Whether you need help choosing a design, understanding fabric details, tracking an order, or custom requirements, our team responds with care and clarity.",
      },
      isActive: true,
      order: 2,
    },
    {
      sectionName: "ctaSection",
      content: {
        heading: "We Make Shopping Easier.",
        description:
          "Browse effortlessly, view clear visuals, and choose designs suited for weddings, festive moments, or daily wear. Shopping stays simple, clear, and focused on what matters, the saree.",
        buttons: {
          label: "View Collections",
          url: "/collections",
        },
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/e8d2b17c3c74b1c59171a29835110696cf358944.jpg",
      },
      isActive: true,
      order: 3,
    },
  ],
  status: "published",
  __v: 0,
};
