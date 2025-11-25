import { SpawellHomePage } from "@/models/templates/spawell/spawell-home-model";

export const dummyData: SpawellHomePage = {
  color: {
    primary: "#5D3222",
    secondary: "#fff",
    neutral: "#F9F6F1",
  },
  templateId: "spawell",
  pageName: "home",
  sections: [
    {
      sectionName: "headerSection",
      content: {
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-logo.png",
        ],
        heading: "Explore Our Services",
        subHeading: "Our agents work with you to customize policies",
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "heroSection",
      content: {
        heading: "Relax, recharge, and reconnect with inner",
        subHeading: "peace today",
        description:
          "Step into a haven of calm where every treatment is designed to tension, renew your energy, and restore a deep sense of inner peace.",
        features: [
          {
            icon: "UserCog",
            title: "Personalized Wellness Programs",
          },
          {
            icon: "BadgeCheck",
            title: "Experienced and Certified Wellness Practitioners",
          },
        ],
        buttons: [
          {
            label: "Book An Appointment",
            url: "/appointments",
          },
          {
            label: "Our Services",
            url: "/services",
          },
        ],
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-hero-image.png",
        ],
      },
      order: 1,
      isActive: true,
    },
    {
      sectionName: "aboutSection",
      content: {
        heading: "Where passion meet purpose",
        subHeading: "in every treatment",
        description:
          "Every service we offer is guided by a deep passion for healing and a clear purpose to help you feel your best, inside and out.",
        bulletes: [
          "Passionate and Certified Wellness Experts",
          "Passionate and Certified Wellness Experts",
          "Passionate and Certified Wellness Experts",
        ],
        buttons: [
          {
            label: "About More",
            url: "/about",
          },
        ],
        teamCount: 29,
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-aboutus-image-1.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-aboutus-image-2.jpg",
        ],
      },
      order: 2,
      isActive: true,
    },
    {
      sectionName: "featuredAppointmentSection",
      content: {
        heading: "Let our featured treatments elevate",
        subHeading: "your wellness journey",
        itemBox: [
          {
            media: "Flower2",
            description: "Signature Full-Body Massage",
          },
          {
            media: "Gem",
            description: "Signature Full-Body Massage",
          },
          {
            media: "Grid3X3",
            description: "Signature Full-Body Massage",
          },
          {
            media: "Snowflake",
            description: "Signature Full-Body Massage",
          },
        ],
        linkDescription: "Let’s bring your vision to life today!",
        description: "Elevate your brand with creative design solutions.",
      },
      order: 3,
      isActive: true,
    },
    {
      sectionName: "aboutTwoSection",
      content: {
        heading: "Where healing, comfort, and",
        subHeading: "luxury come together",
        description:
          "At our spa, you’re more than a client — you’re family. Our experienced therapists bring compassion, skill, and personalized attention to every treatment.",
        services: [
          {
            serviceName: "Course Name ",
            media: "Flower2",
            description:
              "Experience the warmth of volcanic stones placed on key points to release tension and promote deep relaxation.",
          },
          {
            serviceName: "Course Name ",
            media: "Star",
            description:
              "Experience the warmth of volcanic stones placed on key points to release tension and promote deep relaxation.",
          },
        ],
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-hero-image.png",
        ],
      },
      order: 4,
      isActive: true,
    },
    {
      sectionName: "serviceSection",
      content: {
        heading: "Wellness benefits that soothe, heal,",
        subHeading: "and uplift every guest",
        services: [
          {
            serviceName: "Service Name",
            media: "Grid3X3",
            bgImage: "",
            description:
              "Tailored treatments to meet your unique health and relaxation needs",
            sections: [],
          },
          {
            serviceName: "Natural & Organic Products",
            media: "Leaf",
            bgImage: "",
            description:
              "We use only clean, skin-safe, and eco-friendly ingredients.",
            sections: [],
          },
          {
            serviceName: "Tranquil, Hygienic Environment",
            media: "ShieldCheck",
            bgImage: "",
            description:
              "Enjoy peace of mind and total serenity in our spa sanctuary.",
            sections: [],
          },
          {
            serviceName: "Wide Range of Services",
            media: "Coffee",
            bgImage: "",
            description:
              "From massages and facials to holistic therapies and coaching.",
            sections: [],
          },
          {
            serviceName: "Holistic Wellness Approach",
            media: "ScrollText",
            bgImage: "",
            description:
              "We treat the whole you — not just symptoms — mind, body, and spirit.",
            sections: [],
          },
          {
            serviceName: "Flexible Appointments",
            media: "CalendarClock",
            bgImage: "",
            description:
              "Convenient scheduling that fits your lifestyle — online or in-person.",
            sections: [],
          },
        ],
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-services-image-1.jpg",
        ],
      },
      order: 5,
      isActive: true,
    },
    {
      sectionName: "eventsSection",
      content: {
        heading: "Holistic programs to restore",
        subHeading: "balance and vitality",
      },
      order: 6,
      isActive: true,
    },
    {
      sectionName: "whyChooseUsSection",
      content: {
        heading: "Your journey to",
        subHeading: "wellness begins",
        description:
          "Empowering you to achieve optimal health and wellness with personalized coaching, support.",
        itemBox: [
          {
            title: "Personalized Spa Treatments",
            media: "Calendar",
            description: "Every guest is unique, and so are our services.",
          },
          {
            title: "Therapeutic Massage Therapy",
            media: "Layers",
            description:
              "Our massages go beyond relaxation. Whether it’s deep tissue, Swedish, or custom blends.",
          },
          {
            title: "Skin Rejuvenation & Facial Care",
            media: "Sparkles",
            description:
              "We use nutrient-rich, all-natural products to hydrate, brighten, and rejuvenate your skin.",
          },
        ],
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-chooseus-image-1.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-chooseus-image-2.jpg",
        ],
        buttons: [
          {
            label: "Contact Us",
            url: "/contact",
          },
        ],
      },
      order: 7,
      isActive: true,
    },
    {
      sectionName: "ourTeamSection",
      content: {
        heading: "Our team, your partners in",
        subHeading: "holistic wellness",
        itemBox: [
          {
            title: "Brooklyn Simmons",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-team-image-1.png",
            description: "Spa Director",
          },
          {
            title: "Leslie Alexander",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-team-image-2.png",
            description: "Senior Esthetician",
          },
          {
            title: "Ronald Richards",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-team-image-3.png",
            description: "Facial Expert",
          },
          {
            title: "Darlene Robertson",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-team-image-4.png",
            description: "Wellness Coach",
          },
        ],
      },
      order: 8,
      isActive: true,
    },
    {
      sectionName: "testimoniesSection",
      content: {
        heading: "Heartfelt stories of hope and",
        subHeading: "success",
        testimonies: [
          {
            name: "Jenny Wilson",
            designation: "Senior Esthetician",
            rating: 4,
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-Testimonials-image-1.jpg",
            message:
              "My monthly massage here is my favorite self-care ritual. Their team knows exactly what I need every time.",
          },
          {
            name: "Theresa Webb",
            designation: "IVF Specialist",
            rating: 5,
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-Testimonials-image-2.jpg",
            message:
              "Calm ambiance, skilled therapists, and consistent results. I always walk out lighter and happier.",
          },
          {
            name: "Darlene Robertson",
            designation: "Wellness Coach",
            rating: 4,
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-Testimonials-image-3.jpg",
            message:
              "Thoughtful, holistic, and professional. They truly understand mind-body balance and it shows.",
          },
          {
            name: "Courtney Henry",
            designation: "Physio Therapist",
            rating: 5,
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-Testimonials-image-4.jpg",
            message:
              "From booking to treatment, everything feels premium and personal. Highly recommended!",
          },
          {
            name: "Cody Fisher",
            designation: "Yoga Instructor",
            rating: 5,
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-Testimonials-image-5.jpg",
            message:
              "The therapists listen and tailor each session. My posture and sleep improved a lot.",
          },
          {
            name: "Esther Howard",
            designation: "Nutritionist",
            rating: 5,
            avatar:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-Testimonials-image-3.jpg",
            message:
              "Clean space, caring staff, and real results. Exactly what a wellness studio should be.",
          },
        ],
        overallRating: 5,
      },
      order: 9,
      isActive: true,
    },
    {
      sectionName: "faqSection",
      content: {
        heading: "Frequently Asked ",
        subHeading: "Questions",
        description:
          "Explore our Frequently Asked Questions for quick answers on policies, claims, and coverage, helping you make informed insurance decisions.",
        itemBox: [
          {
            title: "10+ Years of Experience",
            description:
              "With over a decade of dedicated service, we’ve built a reputation for excellence and trust.",
            media: "CheckCircle2",
          },
          {
            title: "30+ Unique Treatments Offered",
            description:
              "From soothing massages and revitalizing facials to holistic therapies.",
            media: "Gem",
          },
        ],
        faqItem: [
          {
            question: "How do I book an appointment?",
            answer:
              "Just bring yourself! We provide everything you need — robes, slippers, towels, and relaxation amenities. Book online from your dashboard or call our front desk.",
          },
          {
            question: "How do I choose the right insurance plan?",
            answer:
              "Our team can guide you on eligibility and coverage for wellness services. Share your insurer and plan type during booking and we’ll verify benefits.",
          },
          {
            question: "What if I’m running late or need to cancel?",
            answer:
              "We offer a 10-minute grace period. Cancellations within 4 hours of the appointment may incur a fee. You can reschedule from your booking confirmation link.",
          },
          {
            question: "Are your products natural or organic?",
            answer:
              "Yes. We use dermatologist-tested, cruelty-free products with botanical ingredients. Ask our therapists for a full ingredient list if you have sensitivities.",
          },
        ],
      },
      order: 10,
      isActive: true,
    },
    {
      sectionName: "contactSection",
      content: {
        heading: "Time to unwind ?",
        subHeading: "Book now.",
        description:
          "Take a break from the busy and step into serenity. Our expert therapists are ready to guide you on a journey of relaxation, healing,",
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-contact-image-1.png",
        ],
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
      },
      order: 11,
      isActive: true,
    },
    {
      sectionName: "plansSection",
      content: {
        heading: "Inside the ultimate luxury",
        subHeading: "spa experience",
      },
      order: 12,
      isActive: true,
    },
    {
      sectionName: "footerSection",
      content: {
        logo: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/spawell-logo-light.png",
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
        },
      },
      order: 13,
      isActive: true,
    },
  ],
  status: "published",
  __v: 0,
};
