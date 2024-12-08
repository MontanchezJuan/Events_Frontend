export interface Event {
  _id: string;
  categories: string[];
  date: string;
  description: string;
  entity: string;
  image: string;
  inscription_id?: string;
  is_active: boolean;
  name: string;
  organizer_id: string;
  restrictions: string[];
  site: string;
  time: string;
}

export interface EventData {
  categories?: string[];
  date: string;
  description: string;
  entity: string;
  image: string;
  name: string;
  organizer_id: string;
  restrictions?: string[];
  site: string;
}
