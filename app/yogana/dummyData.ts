import { YoganaHomePage } from "@/models/templates/yogana/yogana-home-model";

export const dummyData: YoganaHomePage = {
  color: {
    primary: "#7E1D53",
    secondary: "#1E5285",
    neutral: "#2D2D2D",
  },
  templateId: "yogana",
  pageName: "home",
  sections: [
    {
      sectionName: "headerSection",
      content: {
        media: [
          "https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2Faf41e301c5b247df80bb6243baf910cd",
        ],
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "heroSection",
      heading: "Yogana",
      subHeading: "Studio",
      tagLine: "You Looking For Yoga Studio",
      description:
        "Yoga encompasses various styles, including hatha vinyasa ashtanga bikram kundalini restorative each with its unique approach movement and mindfulness.",
      order: 1,
      isActive: true,
      media: [
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogona-hero-image.jpg",
      ],
      buttons: [
        {
          label: "BOOK A CLASS",
          url: "/class",
        },
        {
          label: "JOIN A PLAN",
          url: "/plans",
        },
      ],
    },
    {
      sectionName: "aboutSection",
      heading: "Get to know us",
      subHeading: "About Our Studio",
      description:
        "Yoga is an ancient practice that combines physical postures, breathing techniques, meditation, and mindfulness to promote overall well-being It aims to create harmony between the body",
      order: 2,
      isActive: true,
      media: [
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-about-image-1.jpg",
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-about-image-2.jpg",
      ],
      bulletes: [
        "Velit orci consectetur ligula, eget egestas magner time over",
        "Pelit orci consectetur ligula time of money of you.",
        "Eget egestas magn over the year of time.",
        "Eget egestas magn over the year of time.",
        "Eget egestas magn over the year of time.",
      ],
      buttons: [
        {
          label: "Know more",
          url: "/",
        },
      ],
    },
    {
      sectionName: "serviceSection",
      heading: "Services list",
      subHeading: "Our Yoga Programs",
      order: 3,
      isActive: true,
      services: [
        {
          serviceName: "Mindful Meditation",
          description:
            "Calm the mind with guided breathwork and mindfulness practices designed to reduce stress and improve focus.",
          media:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-service-image-1.jpg",
        },
        {
          serviceName: "Detox Twists",
          description:
            "Boost digestion and spinal mobility with a sequence of twists that gently detox the body.",
          media:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-service-image-2.jpg",
        },
        {
          serviceName: "Pranayama Breath",
          description:
            "Learn foundational and advanced breathing techniques to expand lung capacity and energize the body.",
          media:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-service-image-3.jpg",
        },
        {
          serviceName: "Deep Stretch",
          description:
            "Target tight hips, hamstrings, and shoulders with a restorative flow that lengthens and releases.",
          media:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-service-image-4.jpg",
        },
      ],
    },
    {
      sectionName: "plansSection",
      heading: "Price",
      subHeading: "Choose Your Yoga Journey",
      order: 4,
      isActive: true,
    },
    {
      sectionName: "eventsSection",
      heading: "Events",
      subHeading: "Upcoming Events & Retreats",
      order: 5,
      isActive: true,
    },
    {
      sectionName: "clientsSection",
      heading: "Our Clients",
      order: 6,
      isActive: true,
      media: [
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/CollaborationLogo1.svg",
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/CollaborationLogo2.svg",
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/CollaborationLogo3.svg",
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/CollaborationLogo4.svg",
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/CollaborationLogo5.svg",
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/CollaborationLogo6.svg",
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/CollaborationLogo7.svg",
      ],
    },
    {
      sectionName: "testimoniesSection",
      heading: "Success Stories",
      subHeading:
        "Real transformations from real people who've taken action on their growth journey.",
      order: 7,
      isActive: true,
      testimonies: [
        {
          name: "Cora Stiedemann",
          designation: "Customer Integration 🇬🇧",
          rating: 5,
          avatar:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-about-image-1.jpg",
          message:
            "The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. The instructors are amazing, and the platform is so easy to use. Truly life-changing!",
        },
        {
          name: "Leland Kshlerin III",
          designation: "Chief Marketing Consultant 🇬🇧",
          rating: 5,
          avatar:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-about-image-2.jpg",
          message:
            "Edupro’s UX/UI bootcamp gave me the tools and knowledge to feel confident diving into the world of UX.",
        },
        {
          name: "Dr. Erik Collins",
          designation: "Legacy Markets Agent 🇬🇧",
          rating: 5,
          avatar:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-1.jpg",
          message:
            "The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. The instructors are amazing, and the platform is so easy to use. Truly life-changing!",
        },
        {
          name: "Casey Wisoky",
          designation: "Future Infrastructure Manager 🇬🇧",
          rating: 5,
          avatar:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-2.jpg",
          message:
            "The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. The instructors are amazing, and the platform is so easy to use. Truly life-changing!",
        },
        {
          name: "Erick Gutmann",
          designation: "Senior Configuration Manager 🇬🇧",
          rating: 5,
          avatar:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-3.jpg",
          message:
            "The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. The instructors are amazing, and the platform is so easy to use. Truly life-changing!",
        },
        {
          name: "Luz Medhurst",
          designation: "Principal Program Designer 🇬🇧",
          rating: 5,
          avatar:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-4.jpg",
          message:
            "The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. The instructors are amazing, and the platform is so easy to use. Truly life-changing!",
        },
        {
          name: "Francisco Wolf",
          designation: "Forward Intranet Strategist 🇬🇧",
          rating: 5,
          avatar:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-5.jpg",
          message:
            "The courses on Learly are incredible. I learned digital marketing from scratch and landed a job in just three months. The instructors are amazing, and the platform is so easy to use. Truly life-changing!",
        },
        {
          name: "Wendy Quitzon",
          designation: "Customer Metrics Technician 🇬🇧",
          rating: 5,
          avatar:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-6.jpg",
          message:
            "Edupro’s UX/UI bootcamp gave me the tools and knowledge to feel confident diving into the world of UX.",
        },
        {
          name: "Alice Johnson",
          designation: "Travel Blogger 🇬🇧",
          rating: 5,
          avatar:
            "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-5.jpg",
          message:
            "An inspiring group that motivates me to keep exploring. The workshops are top-notch!",
        },
      ],
    },
    {
      sectionName: "gallerySection",
      heading: "Studio Moments",
      order: 8,
      isActive: true,
      media: [
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-1.jpg",
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-2.jpg",
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-3.jpg",
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-4.jpg",
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-5.jpg",
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogana-gallery-image-6.jpg",
      ],
    },
    {
      email: {
        heading: "Write email",
        subHeading:
          "Our community has been the heart of our journey from the start, their unwavering support means the world to us",
        value: "needhelp@company.com",
      },
      call: {
        heading: "Have any question?",
        subHeading:
          "The strength of our community has been pivotal since day one, and their encouragement is priceless.",
        value: "+91 9882438734",
      },
      address: {
        heading: "Visit anytime",
        subHeading:
          "The strength of our community has been pivotal since day one, and their encouragement is priceless.",
        value: "66 broklyn golden street. New York",
      },
      sectionName: "contactSection",
      heading: "Get in touch",
      subHeading:
        "Ready to start your transformation journey? Have questions about my programs? I'd love to hear from you and help you take the next step.",
      order: 9,
      isActive: true,
    },
    {
      sectionName: "whatsappSection",
      heading: "Join Our Yoga Family on WhatsApp",
      subHeading:
        "Join over 1,200 yoga enthusiasts in our WhatsApp community. Get instant updates, exclusive content, and be part of something beautiful.",
      order: 10,
      isActive: true,
      buttons: [
        {
          label: "Join now",
          url: "/",
        },
      ],
    },
    {
      footer: {
        description:
          "Proin efficitur, mauris vel condimentum pulvinar, velit orci consectetur ligula.",
        logo: "https://cdn.builder.io/api/v1/image/assets%2F228d3b2c4554432dbdd1f0f27ee6ba7c%2F062e0f3cd667449793b24103817a0704",
        socialMedia: [
          {
            platform: "Instagram",
            url: "https://instagram/prachiandharsh",
          },
          {
            platform: "Facebook",
            url: "https://facebook/prachiandharsh",
          },
          {
            platform: "Twitter",
            url: "https://twitter/prachiandharsh",
          },
        ],
        contentDescription: [
          {
            title: "Monday to Friday :",
            description: "09:00-20:00",
          },
          {
            title: "Saturday :",
            description: "09:00-18:00",
          },
          {
            title: "Sunday :",
            description: "09:00-18:00",
          },
        ],
        copyrightText: "©prachiandharsh, All rights reserved",
      },
      sectionName: "footerSection",
      order: 11,
      isActive: true,
      media: [
        "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/logo.png",
      ],
    },
  ],
  status: "published",
  __v: 0,
};
