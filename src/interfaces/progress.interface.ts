export interface IProgress {
    id: number;
    status: string;
    date_of_completion: string;
    notes: string;
    user: {
      id: number;
      preferred_name: string;
    };
    activity: {
      id: number;
      title: string;
      content: string;
    }
  }