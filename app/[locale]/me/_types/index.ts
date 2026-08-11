export interface Profile {
  name: string;
  role: string;
  introduction: string;
  careerHistory: CareerHistory[];
}

export interface CareerHistory {
  period: string;
  title: string;
  achievements: string;
}
