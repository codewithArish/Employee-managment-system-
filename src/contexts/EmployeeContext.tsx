
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee, Department } from '../types/Employee';

interface EmployeeContextType {
  employees: Employee[];
  departments: Department[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  getEmployeesByLevel: (level: string) => Employee[];
  getEmployeesByDepartment: (department: string) => Employee[];
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};

const sampleDepartments: Department[] = [
  { id: '1', name: 'Engineering', description: 'Software development and technical operations' },
  { id: '2', name: 'Marketing', description: 'Brand promotion and customer acquisition' },
  { id: '3', name: 'Sales', description: 'Revenue generation and client relations' },
  { id: '4', name: 'HR', description: 'Human resources and talent management' },
  { id: '5', name: 'Finance', description: 'Financial planning and accounting' },
];

const sampleEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    experienceLevel: 'senior',
    yearsOfExperience: 8,
    salary: 95000,
    joinDate: '2020-01-15',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    status: 'active'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    position: 'Marketing Manager',
    department: 'Marketing',
    experienceLevel: 'mid',
    yearsOfExperience: 5,
    salary: 70000,
    joinDate: '2021-03-10',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy'],
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    position: 'Junior Developer',
    department: 'Engineering',
    experienceLevel: 'junior',
    yearsOfExperience: 2,
    salary: 55000,
    joinDate: '2023-06-01',
    skills: ['JavaScript', 'React', 'CSS'],
    status: 'active'
  }
];

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments] = useState<Department[]>(sampleDepartments);

  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
      setEmployees(sampleEmployees);
      localStorage.setItem('employees', JSON.stringify(sampleEmployees));
    }
  }, []);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const updateEmployee = (id: string, employeeUpdate: Partial<Employee>) => {
    const updatedEmployees = employees.map(emp => 
      emp.id === id ? { ...emp, ...employeeUpdate } : emp
    );
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const deleteEmployee = (id: string) => {
    const updatedEmployees = employees.filter(emp => emp.id !== id);
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const getEmployeesByLevel = (level: string) => {
    return employees.filter(emp => emp.experienceLevel === level);
  };

  const getEmployeesByDepartment = (department: string) => {
    return employees.filter(emp => emp.department === department);
  };

  return (
    <EmployeeContext.Provider value={{
      employees,
      departments,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      getEmployeesByLevel,
      getEmployeesByDepartment
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};
