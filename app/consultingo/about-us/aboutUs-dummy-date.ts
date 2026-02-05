import { ConsultingoAboutUsPage } from "@/models/templates/consultingo/consultingo-aboutUs-model";

export const aboutUsData: ConsultingoAboutUsPage = {
  color: {
    primary: "#BC4C37",
    secondary: "#4F2910",
    neutral: "#fcf6e8",
  },
  templateId: "consultingo",
  pageName: "aboutUs",
  sections: [
    {
      sectionName: "heroSection",
      content: {
        heading: "Innovative consulting for a transformed business landscape",
        description:
          "Transform your business with Consultingo's specialized consulting solutions crafted to propel your journey to success. Our deep industry knowledge and strategic approach ensure we guide organizations through complexities, enabling them to achieve impactful growth and enduring outcomes.",
        statistics: [
          {
            value: "50+",
            label: "Released projects",
          },
          {
            value: "23",
            label: "Awesome clients",
          },
          {
            value: "6",
            label: "Consultants team",
          },
        ],
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/c2dcb3f357885afeee0d88dbb044ae158df01429.png",
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "valuesSection",
      content: {
        heading: "Values that define us",
        cards: {
          goalCard: {
            title: "Our goal",
            description:
              "Our goal is to be a transformative force in the world of technology, empowering businesses to leverage their full potential for growth and success.",
            list: [
              "Enhance client performance",
              "Foster long-term partnerships",
              "Innovate and lead",
            ],
          },
          visionCard: {
            title: "Our vision",
            description:
              "Our vision is to reimagine the future of business by fostering innovation, driving sustainable growth, and empowering organizations to thrive in an ever-changing world.",
            image:
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
            list: [
              "A world of possibilities",
              "Empowering businesses",
              "Creative potential",
              "Setting new industry standards",
              "Delivering results that matter",
            ],
          },
          coreValues: [
            {
              title: "Excellence",
              description:
                "Committed to delivering the highest quality services and solutions, ensuring superior performance and outstanding results for our clients.",
              variant: "white",
            },
            {
              title: "Empowerment",
              description:
                "Dedicated to enabling our clients and team members to reach their full potential through knowledge sharing, support, and collaborative efforts.",
              variant: "beige",
            },
            {
              title: "Innovation",
              description:
                "Constantly seeking creative and forward-thinking approaches to solve complex challenges and drive sustainable growth for our clients.",
              variant: "dark",
            },
          ],
        },
      },
      order: 1,
      isActive: true,
    },
    {
      sectionName: "founderSection",
      content: {
        heading: "Meet the founder",
        founderName: "Amanda Reed",
        description:
          "As a consultant with a digital agency, your role is pivotal in developing and implementing strategies that drive impactful results for our clients. Your expertise in industry analysis, project management, and client relations is essential. I believe in fostering collaborative partnerships that lead to exceptional outcomes. By working closely with clients and team members, we ensure tailored solutions that meet and exceed expectations.",
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/38cd91882db3abc591bbc3a1903984f920d5abc6.jpg",
      },
      order: 2,
      isActive: true,
    },
    {
      sectionName: "teamSection",
      content: {
        heading: "Meet our team",
        teamMembers: [
          {
            name: "Samuel Bishop",
            role: "Creative Director",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
            socials: {
              facebook: "#",
              twitter: "#",
            },
          },
          {
            name: "Aditi Sharma",
            role: "Senior Consultant",
            image:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
            socials: {
              facebook: "#",
              twitter: "#",
            },
          },
          {
            name: "Marcus Thorne",
            role: "Strategy Lead",
            image:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
            socials: {
              facebook: "#",
              twitter: "#",
            },
          },
          {
            name: "Elena Rossi",
            role: "Marketing Director",
            image:
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
            socials: {
              facebook: "#",
              twitter: "#",
            },
          },
        ],
      },
      order: 3,
      isActive: true,
    },
  ],
  status: "published",
};
