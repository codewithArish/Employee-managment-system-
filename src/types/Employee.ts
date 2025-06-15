
export interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
  yearsOfExperience: number;
  salary: number;
  joinDate: string;
  skills: string[];
  status: 'active' | 'inactive';
  managerId?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
}
