import { PhotographyPackagesPage } from "@/models/templates/photography/photography-package-model";

export const packageDummyData: PhotographyPackagesPage = {
  color: {
    primary: "#BC4C37",
    secondary: "#4F2910",
    neutral: "#fcf6e8",
  },
  templateId: "photography",
  pageName: "packages",
  sections: [
    {
      sectionName: "heroSection",
      content: {
        image:
          "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1920&q=80",
        title: "Pricing",
        heading: "Our Packages",
      },
      order: 0,
      isActive: true,
    },
    {
      sectionName: "preWeddingPackagesSection",
      content: {
        heading: "Pre-Wedding Packages",
        preWeddingPackages: [
          {
            name: "Pre-Wedding — 1 Day",
            price: "₹40,000",
            features: [
              "Candid photography session",
              "Professional cinematography",
              "Aerial drone coverage",
              "30 professionally edited photographs",
              "1-minute highlight teaser",
              "4-minute cinematic video",
            ],
            popular: false,
          },
          {
            name: "Pre-Wedding — 2 Days",
            price: "₹80,000",
            features: [
              "Candid photography session",
              "Professional cinematography",
              "Aerial drone coverage",
              "60 professionally edited photographs",
              "1-minute highlight teaser",
              "1 social media reel",
              "5-minute cinematic video",
            ],
            popular: false,
          },
        ],
      },
      order: 1,
      isActive: true,
    },
    {
      sectionName: "weddingPackageSection",
      content: {
        heading: "Wedding Packages",
        weddingPackages: [
          {
            name: "Silver",
            price: "₹50,000",
            features: [
              "Devarakarya — Traditional photography & videography",
              "Reception — Traditional photography & videography",
              "Muhurtham — Traditional photography & videography",
            ],
            popular: false,
          },
          {
            name: "Gold",
            price: "₹85,000",
            features: [
              "Devarakarya — Traditional photography & videography",
              "Reception — Traditional photography, videography & candid",
              "Muhurtham — Traditional photography, videography & candid",
            ],
            popular: false,
          },
          {
            name: "Diamond",
            price: "₹1,80,000",
            features: [
              "Devarakarya — Traditional photography, videography & candid",
              "Reception — Full traditional, candid, cinematography & drone",
              "Muhurtham — Full traditional, candid, cinematography & drone",
            ],
            popular: true,
          },
          {
            name: "Platinum",
            price: "₹2,30,000",
            features: [
              "Devarakarya — Traditional, candid & cinematography",
              "Reception — Full coverage with drone & LED wall",
              "Muhurtham — Full coverage with drone & LED wall",
            ],
            popular: false,
          },
          {
            name: "Elite",
            price: "₹2,90,000",
            features: [
              "Devarakarya — Traditional, candid photography & videography",
              "Reception — Complete coverage with drone, LED wall & live spot mixing",
              "Muhurtham — Complete coverage with drone, LED wall & live spot mixing",
              "2 premium album books (40 sheets each)",
            ],
            popular: false,
          },
        ],
      },
      order: 2,
      isActive: true,
    },
    {
      sectionName: "pricingSection",
      content: {
        tables: [
          {
            title: "Album Book",
            columnOneLabel: "Sheets",
            columnTwoLabel: "Price",
            items: [
              {
                label: "30 Sheets",
                price: "8,000",
              },
              {
                label: "60 Sheets",
                price: "14,000",
              },
              {
                label: "90 Sheets",
                price: "20,000",
              },
            ],
          },
          {
            title: "Photo Frames",
            columnOneLabel: "Size",
            columnTwoLabel: "Price",
            items: [
              {
                label: "12 x 18",
                price: "1,000",
              },
              {
                label: "16 x 24",
                price: "1,300",
              },
              {
                label: "20 x 30",
                price: "2,800",
              },
              {
                label: "24 x 36",
                price: "3,500",
              },
            ],
          },
        ],
      },
      order: 3,
      isActive: true,
    },
    {
      sectionName: "packageTCsection",
      content: {
        heading: "Terms & Conditions",
        terms: [
          "A 90% advance payment is required at the time of booking confirmation.",
          "The remaining balance must be settled on or before the event date.",
          "Professionally edited photographs will be delivered within 10 to 15 business days.",
          "Cinematic video deliverables will be completed within 15 business days.",
          "Travel and accommodation expenses for outstation events are billed separately.",
          "Any additional hours of coverage beyond the package will be charged accordingly.",
          "All deliverables will be completed as per the agreed schedule.",
          "Payments must be made on time as per the agreed terms.",
          "Event data must be collected within 3 to 6 days after the event.",
          "The remaining balance must be cleared at the time of data collection.",
        ],
      },
      order: 4,
      isActive: true,
    },
  ],
  status: "published",
  __v: 0,
};
