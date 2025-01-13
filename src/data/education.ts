export interface Education {
  school: string;
  degrees: string[];
  year?: string;
}

export const education: Education[] = [
  {
    school: "Central Washington University",
    degrees: [
      "Bachelor of Fine Arts, Graphic Design",
      "Bachelor of Arts, Russian"
    ]
  }
];