export interface SearchJob {
  id: string;
  title: string;
  company: string;
  location: string | null;
}

export interface SearchApplication {
  id: string;
  status: string;
  job: {
    id: string;
    title: string;
    company: string;
  };
}

export interface SearchNote {
  id: string;
  content: string;
  type: string;
  application: {
    id: string;
    job: {
      id: string;
      title: string;
      company: string;
    };
  };
}

export interface SearchRecruiter {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
}

export interface SearchResults {
  jobs: SearchJob[];
  applications: SearchApplication[];
  notes: SearchNote[];
  recruiters: SearchRecruiter[];
}

export type SearchResultType = 'job' | 'application' | 'note' | 'recruiter';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  href: string;
}
