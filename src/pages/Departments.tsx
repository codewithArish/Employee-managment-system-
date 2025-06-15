
import React, { useState } from 'react';
import { useEmployees } from '../contexts/EmployeeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Users, Building, TrendingUp } from 'lucide-react';

const Departments = () => {
  const { employees, departments } = useEmployees();

  const getDepartmentStats = (departmentName: string) => {
    const deptEmployees = employees.filter(emp => emp.department === departmentName);
    const activeEmployees = deptEmployees.filter(emp => emp.status === 'active').length;
    const avgSalary = deptEmployees.length > 0 
      ? Math.round(deptEmployees.reduce((sum, emp) => sum + emp.salary, 0) / deptEmployees.length)
      : 0;
    const avgExperience = deptEmployees.length > 0
      ? Math.round(deptEmployees.reduce((sum, emp) => sum + emp.yearsOfExperience, 0) / deptEmployees.length)
      : 0;

    return {
      totalEmployees: deptEmployees.length,
      activeEmployees,
      avgSalary,
      avgExperience
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600 mt-1">Manage and overview all company departments</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {departments.length} Departments
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => {
          const stats = getDepartmentStats(department.name);
          
          return (
            <Card key={department.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Building className="h-5 w-5 mr-2 text-blue-600" />
                    {department.name}
                  </CardTitle>
                  <Badge 
                    variant={stats.activeEmployees > 0 ? "default" : "secondary"}
                    className="ml-2"
                  >
                    {stats.activeEmployees} Active
                  </Badge>
                </div>
                <CardDescription className="text-sm text-gray-600">
                  {department.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-900">Total Staff</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700 mt-1">
                      {stats.totalEmployees}
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-900">Avg Experience</span>
                    </div>
                    <p className="text-2xl font-bold text-green-700 mt-1">
                      {stats.avgExperience}y
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Average Salary</span>
                  <p className="text-xl font-bold text-gray-900 mt-1">
                    ${stats.avgSalary.toLocaleString()}
                  </p>
                </div>

                {stats.totalEmployees > 0 && (
                  <div className="pt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Active Employees</span>
                      <span>{Math.round((stats.activeEmployees / stats.totalEmployees) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(stats.activeEmployees / stats.totalEmployees) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {departments.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
          <p className="text-gray-600">Start by creating your first department.</p>
        </div>
      )}
    </div>
  );
};

export default Departments;
