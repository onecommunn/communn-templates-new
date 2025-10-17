import { RestraintHomePage } from "@/models/templates/restraint/restraint-home-model";
export const dummyData: RestraintHomePage = {
  color: {
    primary: "#1E1E1E",
    secondary: "#3D493A",
    neutral: "#AEA17E",
  },
  templateId: "restraint",
  pageName: "home",
  sections: [
    {
      sectionName: "headerSection",
      content: {
        media: ["/assets/restraint/restraint-logo.png"],
        heading: "",
        subheading: "",
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "heroSection",
      content: {
        media: ["/assets/restraint/restraint-hero-image.jpg","/assets/restraint/restraint-section-icon.png"],
        title: "Welcome to Restraint",
        heading: "Transforming your life through Yoga and Meditation",
        description:
          "Discover the path to holistic well-being through yoga meditation practices are designed to enhance your physical strength, mental clarity.",
        buttons: [
          {
            label: "Join Us Today",
            url: "#",
          },
          {
            label: "Watch Video",
            url: "#",
          },
        ],
      },
      order: 1,
      isActive: true,
    },
    {
      sectionName: "aboutSection",
      content: {
        media: ["/assets/restraint/restraint-about-us.png","/assets/restraint/restraint-section-icon.png"],
        title: "ABOUT US",
        heading: "Transforming lives through",
        subheading: "Yoga and Meditation",
        description:
          "Discover inner peace and well-being through yoga Our practice combines physical movement, mindfulness, and breathing techniques to help you achieve balance, reduce stress, and foster personal growth.",
        listItems: [
          {
            title: "Community Support and Encouragement",
            media: "",
            description:
              "Foster a sense of belonging with our supportive community.Share your journey, exchange experiences.",
          },
          {
            title: "Enhanced Physical Flexibility and Strength",
            media: "",
            description:
              "Foster a sense of belonging with our supportive community.Share your journey, exchange experiences.",
          },
        ],
        buttons: [
          {
            label: "More About Us",
            url: "#",
          },
        ],
      },
      order: 2,
      isActive: true,
    },
    {
      sectionName: "appointmentSection",
      content: {
        media:"/assets/restraint/restraint-section-icon.png",
        title: "APPOINTMENTS",
        heading: "1 0N 1 Comprehensive yoga and",
        subheading: "meditation training ",
        appointmentTypes: [
          {
            title: "Beginner Yoga Classes",
            description:
              "Learn foundational poses and techniques yoga journey.",
            media: "/assets/restraint/appointment-icon-1.svg",
          },
          {
            title: "Stress Relief Sessions",
            description:
              "Learn foundational poses and techniques yoga journey.",
            media: "/assets/restraint/appointment-icon-2.svg",
          },
          {
            title: "Mindful Meditation",
            description:
              "Learn foundational poses and techniques yoga journey.",
            media: "/assets/restraint/appointment-icon-3.svg",
          },
          {
            title: "Mental Clarity Meditation",
            description:
              "Learn foundational poses and techniques yoga journey.",
            media: "/assets/restraint/appointment-icon-4.svg",
          },
        ],
        buttons: [
          {
            label: "View All Appointments",
            url: "#",
          },
        ],
      },
      order: 3,
      isActive: true,
    },
    {
        sectionName:"whatWeDoSection",
        content:{
            media:"/assets/restraint/restraint-section-icon.png",
            title:"WHAT WE DO",
            heading:"Holistic Wellness Services",
        }
    }
  ],
  status: "published",
  __v: 0,
};
