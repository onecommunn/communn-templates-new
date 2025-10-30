export interface RestarintHomePage {
  templateId: "restraint";
  pageName: "home";
  status: "published" | "draft" | string;
  __v?: number;
  sections: [];
  color: {
    primary: string;
    secondary: string;
  };
}
