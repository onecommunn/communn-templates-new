import { CollectionsHomePage } from "@/models/templates/collections/collections-home-model";

export const HomedummyData: CollectionsHomePage = {
  templateId: "collections",
  pageName: "home",
  color: {
    primary: "#C09932",
  },
  status: "published",
  __v: 0,
  sections: [
    // header
    {
      sectionName: "headerSection",
      content: {
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group1.svg",
        ],
      },
      isActive: true,
      order: 0,
    },
    // hero
    {
      sectionName: "heroSection",
      content: {
        carouse: [
          {
            heading:
              "Gorgeous designs that perfectly express your romantic stories",
            description:
              "Vinutha Saree Verse began as a passionate dream woven from tradition, creativity and a deep love for Indian textiles.",
            buttons: {
              label: "View Collections",
              url: "/collections",
            },
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/683ba737053456d91557ffd06ed132feb734ff4d.jpg",
          },
          {
            heading: "Timeless traditions woven into every single thread",
            description:
              "Experience the elegance of handcrafted silk sarees that celebrate the heritage of Indian craftsmanship and modern style.",
            buttons: {
              label: "View Collections",
              url: "/collections",
            },
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/e8d2b17c3c74b1c59171a29835110696cf358944.jpg",
          },
        ],
      },
      isActive: true,
      order: 1,
    },
    // scrollSection
    {
      sectionName: "scrollSection",
      isActive: true,
      content: {
        items: [
          "Silk Saree",
          "Wedding Saree",
          "Embroidered Saree",
          "Casual Wear",
          "Engagement Saree",
        ],
      },
      order: 2,
    },
    // collectionsSection
    {
      sectionName: "collectionsSection",
      content: {
        heading: "Enhance Your Look",
        description:
          "Each look highlights detailed drapes, subtle jewelry, and composed expressions.. The styling reflects grace, confidence, and cultural depth.",
      },
      isActive: true,
      order: 3,
    },
    // featuresSection
    {
      sectionName: "featuresSection",
      content: {
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/89fd1eac478d56fd174ddb3ea12e310db720fa06.jpg",
        points: [
          "Curated Collections with a Modern Eye",
          "Personalized Styling & Storytelling",
          "Blend of Heritage & Contemporary Aesthetics",
        ],
      },
      isActive: true,
      order: 4,
    },
    // GallerySection
    {
      sectionName: "gallerySection",
      content: {
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/b32f303be02e4ae712e911ed15536d84a3325369.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/ac20c5a29535b4242ec0cdcbc2d211542665e37c.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/28683a34ce4fec00a49cec22115dbb7f426257d7.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/650f35bcb3082d5821188c7ea7ad65bbbbb6caaf.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/9b5e9e2c9a4ab8ec97112aed7b072acba46a197a.png",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/330b6b3b09b00a2723d6dfc435eb9f2eeb0f0370.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/7ed8c4ddc9ff11584127fbc7d3687648301cfef9.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/58a0acf7987d0c5fea87ef30f5aafb16729065e7.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/a125603cb16bf58d39bc761d5a4361da4f00ad2b.jpg",
        ],
      },
      isActive: true,
      order: 5,
    },
    // featureStripSection
    {
      sectionName: "featureStripSection",
      content: {
        chips: [
          {
            text: "Safe & Secure Payment",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/SecurePaymentIcon.svg",
          },
          {
            text: "Free Shipping",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/FreeShippingIcon.svg",
          },
          {
            text: "Live Shopping",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/LiveShoppingIcon.svg",
          },
          {
            text: "Customer Care Service",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/CustomerCareIcon.svg",
          },
          {
            text: "Stitching Service",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/StitchingIcon.svg",
          },
        ],
      },
      isActive: true,
      order: 6,
    },
    // ctaSection
    {
      sectionName: "ctaSection",
      content: {
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/683ba737053456d91557ffd06ed132feb734ff4d.jpg",
        heading:
          "Discover sarees curated for timeless style and everyday elegance.",
        description:
          "Explore a wide range of handpicked saree designs, from classic weaves to modern drapes. Each piece reflects refined craftsmanship, rich fabrics, and thoughtful detailing.",
        buttons: {
          label: "Get in touch",
          url: "/",
        },
      },
      isActive: true,
      order: 7,
    },
    // testimoniesSection
    {
      sectionName: "testimoniesSection",
      content: {
        heading: "Reviews From Our Clients",
        description:
          "Real stories from women who chose our sarees for meaningful moments.",
        testimonies: [
          {
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/a667f5b5ab637abb7b14f094693a6673a9e5a184.jpg",
            quote:
              "Perfect for festive occasions. The saree looked royal and felt extremely comfortable all day.",
            name: "Priya",
            country: "India",
          },
          {
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/ff6155a7c370f9b1c7bb8fd89c143e191175fb00.jpg",
            quote:
              "It feels special knowing this saree supports traditional artisans.",
            name: "Nithya",
            country: "India",
          },
          {
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/9d53821c68fee3c1e58e11b5892e3724b2210106.jpg",
            quote:
              "The saree quality exceeded my expectations. The fabric, color and finish were exactly as shown. Truly elegant.",
            name: "Ananya",
            country: "Malaysia",
          },
          {
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/9c13dbbf6c883c9709971ad364209b4983a67b37.jpg",
            quote: "It feels special. The handloom work is stunning.",
            name: "Andreya",
            country: "Canada",
          },
        ],
      },
      isActive: true,
      order: 8,
    },
    // FAQ section
    {
      sectionName: "faqSection",
      content: {
        heading: "Frequently Asked Questions",
        description:
          "Quick answers about fabric, weave, and design details.This helps you understand material quality, craftsmanship, and styling so you choose the right saree with clarity and ease.",
        faqItem: [
          {
            question: "Do the sarees match the photos shown on website ?",
            answer:
              "Yes. Product images show true colors, texture, and detailing. Minor variation may occur due to handwoven nature and screen settings.",
          },
          {
            question: "Are these sarees suitable for weddings ?",
            answer:
              "Yes. The collection includes designs suited for weddings, festivals, rituals, and special occasions, along with elegant everyday options.",
          },
          {
            question: "Do you offer customization or blouse stitching ?",
            answer:
              "Customization depends on the saree type. Blouse stitching and design guidance are available on request through support.",
          },
          {
            question: "Where are the sarees sourced from ?",
            answer:
              "Our sarees come directly from trusted weavers and artisan clusters across India. Each piece reflects authentic handloom and regional craft.",
          },
          {
            question: "Are the designs traditional, contemporary, or mixed ?",
            answer:
              "The collection includes classic traditional motifs, modern minimal patterns, and designs that blend both styles.",
          },
          {
            question: "Do the fabrics feel comfortable for long wear ?",
            answer:
              "Yes. Fabrics are chosen for breathability, softness, and ease of movement, suitable for extended wear.",
          },
          {
            question: "How durable are the fabrics with regular use ?",
            answer:
              "With proper care, the fabrics retain color, texture, and structure over time.",
          },
        ],
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Container.png",
      },
      isActive: true,
      order: 9,
    },
    // FooterSection
    {
      sectionName: "footerSection",
      content: {
        logo: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Group 1.svg",
        description:
          " Vinutha Saree Verse began as a passionate dream woven from tradition, creativity and a deep love for Indian textiles.",
        contact: {
          email: "vinuthaprajwalco@gmail.com",
          location:
            " 840, 6th main road, opposite to Sallapuradamma temple, D Group Society, Srigandada Kaval, Bengaluru, Karnataka.",
          phoneNumber: "+91 7259253666",
          timing: "Mon-Fri 09:00 – 09:00",
        },
        copyrightText: "© Vinutha verse all rights Reserved",
        socialMedia: [
          {
            platform: "Instagram",
            url: "/",
          },
          {
            platform: "Facebook",
            url: "/",
          },
          {
            platform: "Threads",
            url: "/",
          },
          {
            platform: "Youtube",
            url: "/",
          },
        ],
      },
      order: 10,
      isActive: true,
    },
  ],
};
