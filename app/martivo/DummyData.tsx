import { MartivoHomePage } from "@/models/templates/martivo/martivo-home-model";

export const dummyData: MartivoHomePage = {
  color: {
    primary: "#0A2640",
    secondary: "#FF7300",
  },
  templateId: "martivo",
  pageName: "home",
  sections: [
    {
      sectionName: "headerSection",
      content: {
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivoLogo.png",
        ],
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "heroSection",
      content: {
        heading: "Empowering Mind, Body",
        subHeading: " And Spirit Through Martial Arts",
        description:
          "Join our expert instructors and transform your life with professional martial arts training. Suitable for all ages and skill levels, our programs focus",
        buttons: [
          {
            label: "Explore More",
            url: "/explore",
          },
        ],
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martvo-hero-image.png",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-hero-bg-image.png",
        ],
      },
      order: 1,
      isActive: true,
    },
    {
      sectionName: "aboutSection",
      content: {
        heading: "About us",
        subHeading: 'Bodies Strengthening & Balancing Minds',
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet tortor sodales vulputate. Phasellus in enim euismod, efficitur felis a, facilisis ligula. Suspendisse potenti. Sed at libero nec nisi tincidunt facilisis.",
        features: [
          {
            icon: "Activity",
            title: "Kickboxing",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
          },
          {
            icon: "Shield",
            title: "Self Defense",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
          },
          {
            icon: "Dumbbell",
            title: "Increase Strength",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
          },
          {
            icon: "HeartPulse",
            title: "Heart & Balance",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
          },
          {
            icon: "Sparkles",
            title: "Mindfulness",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
          },
          {
            icon: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-service-image-1.svg",
            title: "Kickboxing",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
          },
          {
            icon: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-service-image-2.svg",
            title: "Self Defense",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet.",
          },
        ],
        buttons: [
          {
            label: "Discover More ",
            url: "/discover",
          },
        ],
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-event-image-1.png",
        ],
      },
      order: 2,
      isActive: true,
    },
    {
      sectionName: "serviceSection",
      content: {
        heading: "Elevate your mind, body, and spirit here",
        itemBox: [
          {
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-courses-image-1.png",
            title: "Dojo Training",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet tortor sodales vulputate",
          },
          {
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-courses-image-2.png",
            title: "Kata & Techniques",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet tortor sodales vulputate",
          },
          {
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-courses-image-3.png",
            title: "Bushido Spirit",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet tortor sodales vulputate",
          },
          {
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-courses-image-4.png",
            title: "Kumite Sessions",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet tortor sodales vulputate",
          },
        ],
      },
      order: 3,
      isActive: true,
    },
    {
      sectionName: "plansSection",
      content: {
        heading: "Our Plans",
        subHeading: "Best Plan for Your Martial Arts Programs"
      },
      order: 4,
      isActive: true,
    },
    {
      sectionName: "eventsSection",
      content: {
        heading: "Learn from the best martial arts instructors around",
      },
      order: 5,
      isActive: true,
    },
    {
      sectionName: "ourTeamSection",
      content: {
        heading: "Learn from expert martial arts masters",
        itemBox: [
          {
            name: "Sara Lee",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Martivo-team-image-1.jpg",
            role: "SR. MARTIAL ARTS",
          },
          {
            name: "Savanna Hahn",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Martivo-team-image-2.jpg",
            role: "STRENGTH TRAINERS",
          },
          {
            name: "Mike Johnson",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Martivo-team-image-3.jpg",
            role: "SELF DEFENSE EXPERT",
          },
          {
            name: "Leilani Smitham",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Martivo-team-image-4.jpg",
            role: "PUNCHING EXPERTS",
          },
        ],
      },
      order: 6,
      isActive: true,
    },
    {
      sectionName: "testimoniesSection",
      content: {
        heading: "Start your martial arts journey with us!",
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-testimonials-bg-image.png",
        testimonies: [
          {
            name: "Sarah Taylor",
            designation: "Student",
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-testimonials-image-1.png",
            message:
              "Sed rutrum leo ante, vel lobortis odio pellentesque. Suspendisse faucibus elementum pharetra. Aenean quis vehicula dolor. Sed condimentum interdum convallis.",
          },
          {
            name: "John Carter",
            designation: "Black Belt Trainer",
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-testimonials-image-2.png",
            message:
              "Duis aliquet nulla vel tellus rhoncus, et malesuada purus pharetra. Integer eu sem felis.",
          },
          {
            name: "Emily Chen",
            designation: "Karate Champion",
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-testimonials-image-3.png",
            message:
              "Quisque volutpat, ipsum id ullamcorper cursus, lectus justo iaculis lacus.",
          },
          {
            name: "Hiro Tanaka",
            designation: "Dojo Instructor",
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-testimonials-image-4.png",
            message:
              "Maecenas eget sagittis libero. Ut cursus magna ut tincidunt fermentum.",
          },
        ],
        itemBox: [
          {
            title: "Happy Students",
            count: 1500,
          },
          {
            title: "Expert Trainers",
            count: 250,
          },
          {
            title: "Martial Arts Programs",
            count: 50,
          },
          {
            title: "Awards Won",
            count: 100,
          },
        ],
      },
      order: 7,
      isActive: true,
    },
    {
      sectionName: "gallerySection",
      content: {
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-gallery-image-1.png",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-gallery-image-2.png",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-gallery-image-3.png",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivo-gallery-image-4.png",
        ],
      },
      order: 8,
      isActive: true,
    },
    {
      sectionName: "contactSection",
      content: {
        heading: "Have questions? We’re here to help",
        subHeading: "Get in touch",
        description:
          "Tell us what you need and we’ll get back to you as soon as possible. You can also reach us directly using the details below.",
        availableTimings: "Mon–Sat: 8:00 AM – 8:00 PM",
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
        logo: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/martivoLogo.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam venenatis imperdiet titor sodales vulputate",
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
      order: 13,
      isActive: true,
    },
  ],
  status: "published",
  __v: 0,
};
