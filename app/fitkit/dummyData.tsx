import { FitkitHomePage } from "@/models/templates/fitkit/fitkit-home-model";

export const dummyData: FitkitHomePage = {
  color: {
    primary: "#141414",
    secondary: "#F41E1E",
  },
  templateId: "fitkit",
  pageName: "home",
  sections: [
    {
      sectionName: "headerSection",
      content: {
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-logo.svg",
        ],
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "heroSection",
      content: {
        carouse: [
          {
            bgMedia: [
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-hero-bg-image02.png",
            ],
            media: [
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-hero-image-1.png",
            ],
            tagline: "KEEP YOUR BODY FITNESS WITH WORKOUTS",
            line1: "YOUR FITNESS",
            line2: "YOUR VICTORY",
            description:
              "Gym workouts are structured exercise sessions conducted in a fitness facility equipped with various machines.",
            buttons: [
              {
                label: "VIEW CLASS SCHEDULE",
                url: "/VIEWSCHEDULE",
              },
            ],
            statValue: "2k+",
            statLabel: "Satisfied Customer",
          },
          {
            bgMedia: [
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-hero-bg-image02.png",
            ],
            media: [
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/hero-upload-1763706734538.png",
            ],
            tagline: "TRANSFORM YOUR BODY, TRANSFORM YOUR LIFE",
            line1: "STRONGER",
            line2: "EVERYDAY",
            description:
              "Build strength and confidence with world-class trainers and a community that motivates you.",
            buttons: [
              {
                label: "JOIN NOW",
                url: "/JOIN",
              },
            ],
            statValue: "5k+",
            statLabel: "Members Trained",
          },
        ],
      },
      order: 1,
      isActive: true,
    },
    {
      sectionName: "aboutSection",
      content: {
        heading: "We Have Lot Of Experience Gym Training",
        description:
          "Many individuals benefit from personalized workout plans designed by fitness professionals or personal trainers to address specific fitness goals, such as muscle gain, weight loss, or improved athletic performance.",
        buttons: [
          {
            label: "Get Started",
            url: "/",
          },
        ],
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-about-us-image2.png",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-about-us-image1.png",
        ],
        bulletes: [
          "Over 15 years of experience",
          "Certified Trainers",
          "Exceptional work quality",
        ],
      },
      order: 2,
      isActive: true,
    },
    {
      sectionName: "serviceSection",
      content: {
        heading: "Easy Step to Achieve Your Goals.",
        services: [
          {
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-services-image1.png",
            serviceName: "Service Name",
            description:
              "Many gyms offer tools and resources to track progress, such as fitness apps, workout logs, or integrated gym software.",
            sections: [
              {
                title: "We Have Lot Of Experience Gym Training",
                description:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
                image:
                  "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_4.png",
                tag: "Section tag",
              },
              {
                title: "We Have Lot Of Experience Gym Training",
                description:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
                image:
                  "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_1.png",
                tag: "Section tag",
              },
              {
                title: "We Have Lot Of Experience Gym Training",
                description:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
                image:
                  "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_2.png",
                tag: "Section tag",
              },
            ],
          },
          {
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-services-image2.png",
            serviceName: "Service Name",
            description:
              "Many gyms offer tools and resources to track progress, such as fitness apps, workout logs, or integrated gym software.",
            sections: [
              {
                title: "We Have Lot Of Experience Gym Training",
                description:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
                image:
                  "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_4.png",
                tag: "Section tag",
              },
              {
                title: "We Have Lot Of Experience Gym Training",
                description:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
                image:
                  "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_1.png",
                tag: "Section tag",
              },
              {
                title: "We Have Lot Of Experience Gym Training",
                description:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
                image:
                  "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_2.png",
                tag: "Section tag",
              },
            ],
          },
          {
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-services-image3.png",
            serviceName: "Service Name",
            description:
              "Many gyms offer tools and resources to track progress, such as fitness apps, workout logs, or integrated gym software.",
            sections: [
              {
                title: "We Have Lot Of Experience Gym Training",
                description:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
                image:
                  "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_4.png",
                tag: "Section tag",
              },
              {
                title: "We Have Lot Of Experience Gym Training",
                description:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
                image:
                  "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_1.png",
                tag: "Section tag",
              },
              {
                title: "We Have Lot Of Experience Gym Training",
                description:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
                image:
                  "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_2.png",
                tag: "Section tag",
              },
            ],
          },
          {
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-services-image1.png",
            serviceName: "Service Name",
            description:
              "Many gyms offer tools and resources to track progress, such as fitness apps, workout logs, or integrated gym software.",
            sections: [
              {
                title: "We Have Lot Of Experience Gym Training",
                description:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
                image:
                  "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_4.png",
                tag: "Section tag",
              },
              {
                title: "We Have Lot Of Experience Gym Training",
                description:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
                image:
                  "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_1.png",
                tag: "Section tag",
              },
              {
                title: "We Have Lot Of Experience Gym Training",
                description:
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut maxime adipisci, et eveniet, quo asperiores, delectus rem reiciendis veniam saepe similique est beatae fugiat eos suscipit possimus aliquam rerum voluptas!",
                image:
                  "https://wordpress.themehour.net/fitkit/wp-content/uploads/2024/08/project_1_2.png",
                tag: "Section tag",
              },
            ],
          },
        ],
      },
      order: 3,
      isActive: true,
    },
    {
      sectionName: "ourTeamSection",
      content: {
        heading: "Meet Our Skilled Trainer",
        features: [
          {
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-team-image-1.png",
            title: "Henry Joseph",
            description: "Gym Trainer",
          },
          {
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-team-image-2.png",
            title: "Esa Elizabed",
            description: "Fitness Trainer",
          },
          {
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-team-image-3.png",
            title: "Henry Carlose",
            description: "Gym Trainer",
          },
          {
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-team-image-4.png",
            title: "Jhon Williams",
            description: "Fitness Trainer",
          },
        ],
      },
      order: 3,
      isActive: true,
    },
    {
      sectionName: "eventSection",
      content: {
        heading: "Easy Step to Achieve Your Goals.",
      },
      order: 4,
      isActive: true,
    },
    {
      sectionName: "whychooseus",
      content: {
        heading: "Invigorating Fitness Workout for Body and Mind",
        description:
          "Many individuals benefit from personalized workout plans designed by fitness professionals or personal trainers to address specific fitness goals, such as muscle gain, weight loss, or improved athletic performance. Gyms provide the flexibility to choose from a variety of exercises, allowing individuals to customize their workouts.",
        bulletes: [
          "Group Fitness and Community",
          "Mental Health Impact",
          "Diversity of Workouts",
          "Benefits for Physical Health",
          "Progression and Consistency",
          "Functional Fitness",
        ],
        buttons: [
          {
            label: "Learn more",
            url: "/",
          },
          {
            label: "Get in touch",
            url: "/",
          },
        ],
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-why-choose-us-image.png",
      },
      order: 5,
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
      },
      order: 8,
      isActive: true,
    },
    {
      sectionName: "plansSection",
      content: {
        heading: "Find Your Perfect Plan",
      },
      order: 9,
      isActive: true,
    },
    {
      sectionName: "testimoniesSection",
      content: {
        testimonies: [
          {
            name: "What Our Clients Say?",
            designation: "Student – Brooklyn Simmons",
            media: [
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-Testimonials-image-1.png",
            ],
            bgMedia: [
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-Testimonials-bg-image-1.png",
            ],
            message:
              "The team at Baroque is incredibly dedicated, knowledgeable, and supportive. The final result was amazing and worth every penny. I would absolutely recommend Baroque for weight loss, fitness improvement, or enhanced athletic performance.",
            rating: 4,
          },
          {
            name: "Stronger, Fitter, Happier.",
            designation: "Courtney Henry",
            media: [
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-Testimonials-image-2.png",
            ],
            bgMedia: [
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-Testimonials-bg-image-1.png",
            ],
            message:
              "“I’ve never felt more confident in a gym. The trainers push you, but in the best way. My strength and stamina have gone to the next level.”",
            rating: 4,
          },
        ],
      },
      order: 9,
      isActive: true,
    },
    {
      sectionName: "contactSection",
      content: {
        availableTimings: [
          "Mon–Sat: 6:30 AM – 8:00 PM",
          "Sun: 8:00 AM – 2:00 PM",
        ],
        contact: {
          address: "3600 Las Vegas Blvd S, Las Vegas, NV",
          phoneNumber: "89232321212",
          email: "hello@gmail.com",
          mapUrl:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.9008980186!2d77.46612818713646!3d12.953945615428093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1764659959005!5m2!1sen!2sin'
        },
      },
      order: 11,
      isActive: true,
    },
    {
      sectionName: "footerSection",
      content: {
        logo: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fitkit-logo.svg",
        description:
          "Treadmills, stationary bikes, and elliptical machines are commonly used for cardiovascular workouts, helping to improve endurance, burn calories, and enhance heart health.",
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
      },
      order: 12,
      isActive: true,
    },
  ],
  status: "published",
  __v: 0,
};
