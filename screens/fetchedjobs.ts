export type FetchedJob = {
  id: number;
  title: string;
  type: number;
  primary_details: {
    Place: string;
    Salary: string;
    Job_Type: string;
    Experience: string;
    Fees_Charged: string;
    Qualification: string;
  };
  fee_details: {
    V3: any[];
  };
  job_tags: {
    value: string;
    bg_color: string;
    text_color: string;
  }[];
  job_type: number;
  job_category_id: number;
  qualification: number;
  experience: number;
  shift_timing: number;
  job_role_id: number;
  salary_max: number;
  salary_min: number;
  city_location: number;
  locality: number;
  premium_till: string;
  company_name: string;
  advertiser: number;
  button_text: string;
  custom_link: string;
  amount: string;
  views: number;
  shares: number;
  fb_shares: number;
  is_bookmarked: boolean;
  is_applied: boolean;
  is_owner: boolean;
  updated_on: string;
  whatsapp_no: string;
  contact_preference: {
    preference: number;
    whatsapp_link: string;
    preferred_call_start_time: string;
    preferred_call_end_time: string;
  };
  created_on: string;
  is_premium: boolean;
  creatives: {
    file: string;
    thumb_url: string;
    creative_type: number;
  }[];
  videos: any[];
  locations: {
    id: number;
    locale: string;
    state: number;
  }[];
  tags: any[];
  contentV3: {
    V3: {
      field_key: string;
      field_name: string;
      field_value: string;
    }[];
  };
  status: number;
  expire_on: string;
  job_hours: string;
  openings_count: number;
  job_role: string;
  other_details: string;
  job_category: string;
  num_applications: number;
  enable_lead_collection: boolean;
  is_job_seeker_profile_mandatory: boolean;
  translated_content: any;
  job_location_slug: string;
  fees_text: string;
  question_bank_id: number | null;
  screening_retry: number | null;
  should_show_last_contacted: boolean;
  fees_charged: number;
};
