import { PhotographyHomePage } from "@/models/templates/photography/photography-home-model";

export const homedummyData: PhotographyHomePage = {
  color: {
    primary: "#BC4C37",
    secondary: "#4F2910",
    neutral: "#fcf6e8",
  },
  templateId: "photography",
  pageName: "home",
  sections: [
    {
      sectionName: "headerSection",
      content: {
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/vijju-logo (1).png",
        ],
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "heroSection",
      content: {
        images: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/hero-ceremony.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/hero-haldi.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-3.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/hero-portrait.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-10.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-1.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-5.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-14.jpg",
        ],
        branding: " Vijay Photography",
        heading: {
          main: "Your Legacy,",
          highlight: "Through Our Lens",
        },
        subtitle: "Specialized in Wedding Photography | Chitradurga",
        buttons: {
          primary: {
            label: "View Portfolio",
            href: "/portfolio",
          },
          secondary: {
            label: "Get in Touch",
            href: "/contact",
          },
        },
      },
      order: 1,
      isActive: true,
    },
    {
      sectionName: "movingcollagesection",
      content: {
        badgeText: "Gallery",
        heading: "A Glimpse of Our Work",
        images: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-3.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-2.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-3.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-7.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-1.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-3.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-8.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-5.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-5.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-9.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-3.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-10.jpg",
        ],
      },
      order: 3,
      isActive: true,
    },
    {
      sectionName: "youTubeShowreelSection",
      content: {
        badgeText: "Showreel",
        heading: "Watch Our Work",
        videos: [
          {
            embedUrl: "https://www.youtube.com/embed/O3pi2sh-P9I",
            title: "Vijay Photography Showreel",
          },
          {
            embedUrl: "https://www.youtube.com/embed/h91fzO8U5cg",
            title: "Vijay Photography Highlights 1",
          },
          {
            embedUrl: "https://www.youtube.com/embed/ALQifuEXI_A",
            title: "Vijay Photography Highlights 1",
          },
        ],
      },
      order: 4,
      isActive: true,
    },
    {
      sectionName: "statscounterSection",
      content: {
        stats: [
          {
            icon: "Camera",
            value: "1200+",
            label: "Photo Sessions",
          },
          {
            icon: "Users",
            value: "300+",
            label: "Happy Clients",
          },
          {
            icon: "Image",
            value: "50K+",
            label: "Photos Delivered",
          },
        ],
      },
      order: 5,
      isActive: true,
    },
    {
      sectionName: "servicespreviewSection",
      content: {
        badgeText: "What We Do",
        heading: "Our Services",
        services: [
          {
            title: "Candid & Traditional Photography",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-3.jpg",
            description:
              "Timeless portraits and authentic moments from your celebration",
          },
          {
            title: "Cinematography & Drone",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-3.jpg",
            description:
              "Cinematic wedding films captured from every perspective",
          },
          {
            title: "Pre-Wedding Shoots",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-2.jpg",
            description:
              "Romantic sessions that beautifully narrate your love story",
          },
        ],
      },
      order: 6,
      isActive: true,
    },
    {
      sectionName: "featuredworkSection",
      content: {
        badgeText: "Featured",
        heading: {
          main: "Where Art Meets",
          highlight: "Emotion",
        },
        description:
          "We believe every photograph should evoke feeling. Our approach combines technical mastery with an intuitive sense for the decisive moment.  From the soft glow of golden hour to the raw energy of celebration, we craft images that transcend the ordinary.",
        button: {
          label: "Learn More",
          link: "/about",
        },
        images: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/wedding-7.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-7.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/haldi-5.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/other-3.jpg",
        ],
        bgImage:
          "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80",
      },
      order: 7,
      isActive: true,
    },
    {
      sectionName: "testimonialsSection",
      content: {
        badgeText: "Testimonials",
        heading: "What Our Clients Say",
        testimonials: [
          {
            name: "Manu Y T",
            text: "An absolutely fantastic experience from start to finish. Vijay and his team were incredibly patient, guiding us through every shot without ever making us feel rushed. They were also very flexible with our schedule and special requests. Our pre-wedding and wedding photos turned out absolutely stunning — we couldn't have asked for anything better.",
            rating: 5,
          },
          {
            name: "Pooja & Family",
            text: "A heartfelt thank you to the entire Vijay Photography team! Their patience and energy throughout our wedding celebrations were remarkable. Every member of the team was professional, creative, and made us feel completely at ease in front of the camera. The quality of our wedding photos exceeded all expectations — truly beautiful memories we'll cherish forever.",
            rating: 5,
          },
          {
            name: "Harshitha",
            text: "Every single moment was captured with such beauty and grace — the team truly has an incredible eye for detail. Our wedding day went seamlessly thanks to their coordination, and the final photos were nothing short of breathtaking. Without a doubt, the best photography team in town.",
            rating: 5,
          },
          {
            name: "Akshay",
            text: "A special thanks to the Vijay Photography team for capturing our most cherished moments so beautifully. Their dedication, effort, and attention to detail throughout the entire event were truly commendable. Highly recommended for anyone looking for exceptional wedding photography.",
            rating: 5,
          },
        ],
      },
      order: 8,
      isActive: true,
    },
    {
      sectionName: "ctaSection",
      content: {
        heading: "Ready to Create Something Beautiful?",
        description:
          "Let's discuss your vision and bring it to life through stunning photography.",
        bgImage:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/prewedding-1.jpg",
        button: {
          label: "Book a Session",
          link: "/contact",
        },
      },
      order: 9,
      isActive: true,
    },
    {
      sectionName: "footerSection",
      content: {
        logo: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/vijju-logo (1).png",
        description: " Your Legacy, Through Our Lens",
        addresses: [
          "Main Branch: Dharmashala Road, Near Megha Lodge, Chitradurga 577501",
          "Branch: Near Ayyappa Swamy Temple, B.I.E.T College Road,Davanagere 577004",
        ],
        socialMedia: [
          {
            platform: "facebook",
            url: "https://facebook.com",
          },
          {
            platform: "instagram",
            url: "https://instagram.com",
          },
        ],
        copyRightText: "2026 Vijay Photography. All rights reserved.",
        phoneNumbers: ["7022779616", "9606177802"],
      },
      order: 10,
      isActive: true,
    },
    {
      sectionName: "whatsappWidgetSection",
      content: {
        callNumber: "7022779616",
        predefinedMessage:
          "Hi, I am interested in your photography services. Can we discuss?",
        whatsappNumber: "7022779616",
      },
      order: 11,
      isActive: true,
    },
  ],
  status: "published",
  __v: 0,
};
