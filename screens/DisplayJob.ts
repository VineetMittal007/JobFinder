export type DisplayJob = {
  id: number;
  title: string;
  companyName: string;
  place: string;
  salary: string;
  jobType: string;
  experience: string;
  qualification: string;
  jobTags: {
    value: string;
    bg_color: string;
    text_color: string;
  }[];
  buttonText: string;
  customLink: string;
  updatedOn: string; // Formatted date
  creatives: {
    thumb_url: string;
  }[];
  content: {
    field_key: string;
    field_name: string;
    field_value: string;
  }[];
  jobRole: string;
  jobCategory: string;
  feesText: string;
  whatsappLink?: string; // Optional, for direct WhatsApp contact
};