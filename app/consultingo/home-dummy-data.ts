import { ConsultingoHomePage } from "@/models/templates/consultingo/consultingo-home-model";

export const homedummyData: ConsultingoHomePage = {
  color: {
    primary: "#BC4C37",
    secondary: "#4F2910",
    neutral: "#fcf6e8",
  },
  templateId: "consultingo",
  pageName: "home",
  sections: [
    // headerSection
    {
      sectionName: "headerSection",
      content: {
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Link - home.svg",
        ],
      },
      order: 0,
      isActive: true,
    },
    // heroSection
    {
      sectionName: "heroSection",
      content: {
        heading: "Consulting business growth",
        description:
          "Enhance your business with tailored consulting services for growth & scalability. We offer innovative solutions & expert guidance to optimize operations & seize opportunities.",
        heroImage:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/1affd5e7a9471916ccd329b91ab0cd52c75152fd.jpg",
        floatingCards: {
          sessionCard: {
            date: "28",
            month: "June",
            title: "Consultant Session Booked",
            subtitle: "Previous Record for Amanda Reed",
            tag: "NEW",
            detail: "1 Prescription",
          },
          successCard: {
            percentage: 97,
            label: "Success Ratio",
          },
        },
        actions: [
          {
            label: "Book consultant",
            link: "/book",
          },
          {
            label: "View Blogs",
            link: "/blogs",
          },
        ],
      },
      order: 1,
      isActive: true,
    },
    // trustedBySection
    {
      sectionName: "trustedBySection",
      content: {
        heading: "Trusted by 130+ companies",
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/668b9c808b6e4d158329ae6d_05.svg fill.svg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/668b9b1b9b28ad74d16ed10b_04.svg fill.svg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/668b9c80330799edcae36b23_03.svg fill.svg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/fdsgfdfdfgdfgd.svg",
        ],
      },
      order: 2,
      isActive: true,
    },
    // featuresSection
    {
      sectionName: "featuresSection",
      content: {
        heading:
          "We specialize in tailored solutions for business growth and efficiency, optimizing operations with expert guidance and innovative strategies for sustainable success.",
        features: {
          trackRecord: {
            title: "Proven track record",
            description:
              "Delivering consistent, successful outcomes, showcasing in every project we undertake.",
            link: {
              label: "Learn more",
              url: "#",
            },
          },
          clients: {
            count: "56+",
            title: "Awesome clients",
            description:
              "Partnering with exceptional clients to achieve remarkable results.",
            avatars: [
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/d46ef06dbc51b2ff6eaf044b1e8b174ec1d341d3.jpg",
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/1f8043c4934d4a5ba231ea7ed277e7dd187174c9.jpg",
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/ea45bef46dcd540ac37c3eca04f08b5931f1c0d1.jpg",
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/c0bfd0e460b271cc6fc957defa07a02bf6ee62c7.jpg",
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/927160e115b909516c07c870e79cfb1f394f9372.jpg",
            ],
          },
          successHighlight: {
            title: "Highlighting our client's successes",
            description:
              "Showcasing the achievements and growth of our valued clients.",
            backgroundImage:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/66ba7db16f215782d10496851acc046db19a4f89.jpg",
            cta: {
              label: "Explore Services",
              url: "/services",
            },
          },
          customSolutions: {
            title: "Customized solutions",
            description:
              "Tailored solutions designed to meet your unique business needs and goals.",
            image:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/d9ae6afefd176c1975ff8849afc32b0c25d318de.jpg",
          },
        },
      },
      order: 3,
      isActive: true,
    },
    // sustainabilitySection
    {
      sectionName: "sustainabilitySection",
      content: {
        heading: "Sustainability strategy consulting courses",
        experienceBadge: {
          value: "25+",
          label: "Years Of Experience",
        },
        media: [
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/19f8aef3de92d452f912a8ab8e16372ea1390101.jpg",
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/5390886f0214160e877c040aab7182c66242a2a2.jpg",
        ],
        accordionData: [
          {
            title: "Consultation and assessment",
            content:
              "Through comprehensive assessments and discussions, we gain insights into your specific needs and objectives, laying the foundation for our collaboration.",
          },
          {
            title: "Digital transformation initiative",
            content:
              "We help modernize your business processes using cutting-edge digital tools to enhance efficiency and market reach.",
          },
          {
            title: "Implementation and support",
            content:
              "Our team ensures seamless execution of strategies with ongoing technical and advisory support to maintain long-term growth.",
          },
        ],
      },
      order: 4,
      isActive: true,
    },
    // servicesSection
    {
      sectionName: "serviceSection",
      content: {
        heading: "Innovative consulting services",
        services: [
          {
            serviceName: "Planning & Implementation",
            description:
              "Strategic planning & seamless implementation of initiatives to drive organizational growth and achieve long-term objectives.",
            image:
              "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=600",
            sections: [],
          },
          {
            serviceName: "Process Optimization",
            description:
              "Enhance efficiency through targeted process optimization, ensuring optimal performance and resource use.",
            image:
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
            sections: [],
          },
          {
            serviceName: "Market Analysis",
            description:
              "Comprehensive market research and analysis to inform strategic decisions and maximize opportunities.",
            image:
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600",
            sections: [],
          },
        ],
      },
      order: 5,
      isActive: true,
    },
    // appointmentSection
    {
      sectionName: "appointmentSection",
      content: {
        heading: "Appointments",
      },
      order: 6,
      isActive: true,
    },
    // plansSection
    {
      sectionName: "plansSection",
      content: {
        heading: "Pricing plan",
      },
      order: 7,
      isActive: true,
    },
    // eventsSection
    {
      sectionName: "eventsSection",
      content: {
        heading: "Events",
      },
      order: 8,
      isActive: true,
    },
    // testimonialSection
    {
      sectionName: "testimonialSection",
      content: {
        heading: "Client testimonials",
        summary: {
          averageRating: 4.7,
          totalReviews: "280+",
        },
        testimonials: [
          {
            rating: 5,
            quote:
              "Absolutely blown away by the superior sound quality. It's transformed the way I experience music and control my smart home. Couldn't be happier!",
            author: "Bryan Knight",
            role: "Creative Director",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
          },
          {
            rating: 4,
            quote:
              "The experience has been smooth and premium. Setup was easy and the product feels very high quality. Totally worth it.",
            author: "Ava Morgan",
            role: "Product Manager",
            image:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
          },
        ],
      },
      order: 9,
      isActive: true,
    },
    // ctaSection
    {
      sectionName: "ctaSection",
      content: {
        heading: "Let’s start something great together!",
        button: {
          label: "Book consultant",
          link: "/booking",
        },
      },
      order: 10,
      isActive: true,
    },
    // footerSection
    {
      sectionName: "footerSection",
      content: {
        logo: "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Link - home.svg",
        description:
          "Explore our comprehensive consultancy services designed to empower your business growth towards sustainable success.",
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
      },
      order: 11,
      isActive: true,
    },
  ],
  status: "published",
};
