export interface Inscription {
  _id: string;
  user_id: string;
  event_id: string;
  inscription_date: Date;
  participated: boolean;
}

export interface InscriptionData {
  user_id: string;
  event_id: string;
}
