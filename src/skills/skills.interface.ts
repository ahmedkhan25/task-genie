export interface Parameter {
  name: string;
  type: string;
  description: string;
}

export interface Skill {
  name: string;
  description: string;
  code: string;
  parameters: Parameter[];
}