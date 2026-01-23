import { CollectionsCollectionPage } from "@/models/templates/collections/collections-collection-model";

export const CollectiondummyData: CollectionsCollectionPage = {
  templateId: "collections",
  color: {
    primary: "#C09932",
  },
  sections: [
    {
      sectionName: "heroSection",
      content: {
        heading: "Our Collections",
        media:
          "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Background.png",
      },
      isActive: true,
      order: 0,
    },
    {
      sectionName: "itemsSections",
      content: {
        itembox: [
          {
            title: "All sarees",
            price: "4000",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Link.webp",
            isfeatured: false,
          },
          {
            title: "Kanjeevaram soft silk Sarees",
            price: "6000",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Link (1).webp",
            isfeatured: false,
          },
          {
            title: "Pure Kancheepuram Sarees",
            price: "4800",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Link (2).webp",
            isfeatured: false,
          },
          {
            title: "Mysore crepe silk sarees",
            price: "8000",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Link (3).webp",
            isfeatured: false,
          },
          {
            title: "Banarsi sarees",
            price: "4000",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Shop Primary Image.webp",
            isfeatured: false,
          },
          {
            title: "Semi Kanchi sarees",
            price: "600",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Link (6).webp",
            isfeatured: false,
          },
          {
            title: "Cotton sarees",
            price: "4800",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Link (7).webp",
            isfeatured: false,
          },
          {
            title: "Embroidered sarees",
            price: "8000",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Link (5).webp",
            isfeatured: false,
          },
          {
            title: "Sarees with custom order ",
            price: "12000",
            media:
              "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/Link (8).webp",
            isfeatured: false,
          },
          // {
          //   title: "Banarasi Silk Wedding Saree",
          //   price: "4800",
          //   media:
          //     "https://upload-community-files-new.s3.ap-south-1.amazonaws.com/uploads/58a0acf7987d0c5fea87ef30f5aafb16729065e7.jpg",
          //   isfeatured: false,
          // },
        ],
      },
      isActive: true,
      order: 1,
    },
  ],
  pageName: "collections",
  status: "published",
  __v: 0,
};
