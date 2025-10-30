import { RestarintHomePage } from "@/models/templates/restraint/restraint-home-model";

export const dummyData: RestarintHomePage = {
  color: {
    primary: "#3D493A",
    secondary: "#AEA17E",
  },
  templateId: "restraint",
  pageName: "home",
  sections: [
    {
      sectionName: "headerSection",
      content: {
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-logo.png",
        ],
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "heroSection",
      content: {
        heading: "WELCOME RESTRAINT",
        subHeading: "TRANSFORM YOUR LIFE THROUGH YOGA AND MEDITATION",
        description:
          "Discover the path to holistic well-being through yoga meditation practices are designed to enhance your physical strength, mental clarity.",
        buttons: [
          {
            label: "Join Us Today",
            url: "/",
          },
        ],
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-hero-bg-image.png",
      },
      order: 1,
      isActive: true,
    },
    {
      sectionName: "aboutSection",
      content: {
        heading: "Transforming lives through",
        subHeading: "yoga and meditation",
        description:
          "Discover inner peace and well-being through yoga Our practice combines physical movement, mindfulness, and breathing techniques to help you achieve balance, reduce stress, and foster personal growth.",
        features: [
          {
            icon: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-about-image01.svg",
            title: "Community Support and Encouragement",
            description:
              "Foster a sense of belonging with our supportive community. Share your journey, exchange experiences.",
          },
          {
            icon: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-about-image02.svg",
            title: "Enhanced Physical Flexibility and Strength",
            description:
              "Foster a sense of belonging with our supportive community. Share your journey, exchange experiences.",
          },
        ],
        buttons: [
          {
            label: "More About Us",
            url: "/",
          },
        ],
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-about-image-1.png",
      },
      order: 2,
      isActive: true,
    },
    {
      sectionName: "eventsSection",
      content: {
        heading: "Experience excellence in",
        subHeading: "yoga and meditation Events",
        description:
          "Join us to experience expert-guided yoga and meditation practices designed to enhance your physical health, mental clarity, and overall well-being.",
        features: [
          {
            icon: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-event-icon-2.svg",
            title: "25 +",
            description: "Years Of Experience",
          },
          {
            icon: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-event-icon-1.svg",
            title: "150 K+",
            description: "Satisfied Clients",
          },
          {
            icon: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-event-icon-3.svg",
            title: "30 +",
            description: "Countries Reached",
          },
          {
            icon: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-event-icon-4.svg",
            title: "2 k+",
            description: "Classes Conducted",
          },
        ],
      },
      order: 3,
      isActive: true,
    },
    {
      sectionName: "whatWeDoSection",
      content: {
        heading: "Transforming minds and",
        subHeading: "bodies through yoga",
        description:
          "Unlock the power of yoga to harmonize your mind and body. Our practice integrates mindful movement, meditation, and breathing techniques to promote physical strength, mental clarity.",
        bulletes: [
          "Mindful Movement For Balance",
          "Guided Meditation For Clarity",
          "Personalized Wellness Programs",
          "Yoga For Every Skill Level",
        ],
        features: [
          {
            icon: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-whatWeDo-image02.svg",
            title: "Holistic Wellness Programs",
            description:
              "Experience an approach to well-being with programs that combine.",
          },
          {
            icon: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-whatWeDo-image03.svg",
            title: "Group Meditation Sessions",
            description:
              "Experience an approach to well-being with programs that combine.",
          },
          {
            icon: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-whatWeDo-image04.svg",
            title: "Relaxation Techniques",
            description:
              "Experience an approach to well-being with programs that combine.",
          },
          {
            icon: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-whatWeDo-image05.svg",
            title: "Breathwork Practices",
            description:
              "Experience an approach to well-being with programs that combine.",
          },
        ],
        buttons: [
          {
            label: "Contact Now",
            url: "/",
          },
        ],
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-whatwedo-image-1.png",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-whatwedo-image-2.jpg",
        ],
      },
      order: 4,
      isActive: true,
    },
    {
      sectionName: "serviceSection",
      content: {
        heading: "Comprehensive yoga and",
        subHeading: "meditation services",
        features: [
          {
            icon: "/assets/restraint-about-image01.svg",
            title: "Service Name",
            description:
              "We focus on connection, offering a complete wellness experience that nurtures your physical",
          },
          {
            icon: "/assets/restraint-services-image01.svg",
            title: "Emotional Balance",
            description:
              "We focus on connection, offering a complete wellness experience that nurtures your physical",
          },
          {
            icon: "/assets/restraint-services-image02.svg",
            title: "Stress Reduction",
            description:
              "We focus on connection, offering a complete wellness experience that nurtures your physical",
          },
          {
            icon: "HeartHandshake",
            title: "Mind-Body Harmony",
            description:
              "We focus on connection, offering a complete wellness experience that nurtures your physical",
          },
        ],
        buttons: [
          {
            label: "Contact Now",
            url: "/",
          },
        ],
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-services-images-1.png",
      },
      order: 5,
      isActive: true,
    },
    {
      sectionName: "howItWorkSection",
      content: {
        heading: "Discover our yoga and",
        subHeading: "meditation process",
        features: [
          {
            title: "Choose Your Yoga Practice",
            description:
              "Foster a sense of belonging with our supportive community your journey, exchange experiences.",
          },
          {
            title: "Schedule Your Yoga Session",
            description:
              "Foster a sense of belonging with our supportive community your journey, exchange experiences.",
          },
          {
            title: "Practice Mindfulness Daily",
            description:
              "Foster a sense of belonging with our supportive community your journey, exchange experiences.",
          },
        ],
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-how-it-work-image-1.png",
      },
      order: 6,
      isActive: true,
    },
    {
      sectionName: "plansSection",
      content: {
        heading: "Flexible pricing for yoga ",
        subHeading: "and meditation",
        description:
          "Choose from our flexible pricing plans designed to suit your needs. Whether you’re a beginner or advanced practitioner, we offer affordable.",
      },
      order: 7,
      isActive: true,
    },
    {
      sectionName: "gallerySection",
      content: {
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-marquee-image-1.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-marquee-image-2.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-marquee-image-3.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-marquee-image-4.jpg",
        ],
        bulletes: ["Harmony Practice", "Inner Balance", "Calm Breathing"],
      },
      order: 8,
      isActive: true,
    },
    {
      sectionName: "testimoniesSection",
      content: {
        heading: "Real stories transformation",
        subHeading: "and growth",
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-testimonials-image-1.jpg",
        testimonies: [
          {
            name: "Sarah Taylor",
            designation: "Student",
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-marquee-image-1.jpg",
            message:
              "Sed rutrum leo ante, vel lobortis odio pellentesque. Suspendisse faucibus elementum pharetra. Aenean quis vehicula dolor. Sed condimentum interdum convallis.",
          },
          {
            name: "John Carter",
            designation: "Black Belt Trainer",
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-marquee-image-1.jpg",
            message:
              "Duis aliquet nulla vel tellus rhoncus, et malesuada purus pharetra. Integer eu sem felis.",
          },
          {
            name: "Emily Chen",
            designation: "Karate Champion",
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-marquee-image-1.jpg",
            message:
              "Quisque volutpat, ipsum id ullamcorper cursus, lectus justo iaculis lacus.",
          },
          {
            name: "Hiro Tanaka",
            designation: "Dojo Instructor",
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-marquee-image-1.jpg",
            message:
              "Maecenas eget sagittis libero. Ut cursus magna ut tincidunt fermentum.",
          },
        ],
        cta: {
          heading: "Try A Free Class Today!",
          description:
            "Experience the benefits of yoga with a free trial class! Discover how mindful movement, techniques, and guided relaxation can enhance your well-being. No matter your skill level, this is the perfect place to begin.",
          clientCount: "30K+",
        },
      },
      order: 9,
      isActive: true,
    },
    {
      sectionName: "faqSection",
      content: {
        heading: "Answers to common yoga",
        subHeading: "meditation questions",
        faqItem: [
          {
            question: "What is yoga, and how can it benefit me?",
            answer:
              "No prior experience is required. Our classes cater to all levels, from beginners to advanced practitioners. Instructors will guide you every step of the way.",
          },
          {
            question: "Do I need prior experience to join a class?",
            answer:
              "Not at all. Our beginner-friendly sessions focus on alignment, breathing, and comfort so you can build confidence step by step.",
          },
          {
            question: "What's the difference between yoga and meditation?",
            answer:
              "Yoga involves physical postures, breathwork, and mindfulness. Meditation is a mental practice that cultivates attention and calm—both complement each other.",
          },
          {
            question: "What types of yoga classes do you offer?",
            answer:
              "We offer Hatha, Vinyasa, Yin, Restorative, and specialized breathwork sessions—available online and in-person.",
          },
          {
            question: "How do I know which class is right for me?",
            answer:
              "Start with beginner or restorative sessions. Our instructors can suggest a path based on your goals and preferences.",
          },
        ],
        phoneNumber: "9876543210",
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/yogona-hero-image.jpg",
      },
      order: 10,
      isActive: true,
    },
    {
      sectionName: "contactSection",
      content: {
        heading: "Book an appointment or",
        subHeading: "send us a message",
        availableTimings: [
          "Mon–Sat: 6:30 AM – 8:00 PM",
          "Sun: 8:00 AM – 2:00 PM",
        ],
        contact: {
          address: "3600 Las Vegas Blvd S, Las Vegas, NV",
          phoneNumber: "89232321212",
          email: "hello@gmail.com",
        },
      },
      order: 11,
      isActive: true,
    },
    {
      sectionName: "footerSection",
      content: {
        logo: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/restraint-logo.png",
        description:
          "Holistic practices for inner peace, focus, and overall well-being.",
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
            platform: "Twitter",
            url: "/",
          },
        ],
        copyrightText: "Copyright © 2025 All Rights Reserved.",
        contact: {
          phoneNumber: "89232321212",
          email: "hello@gmail.com",
          address: "3600 Las Vegas Blvd S, Las Vegas, NV",
        },
      },
      order: 12,
      isActive: true,
    },
  ],
  status: "published",
  __v: 0,
};
