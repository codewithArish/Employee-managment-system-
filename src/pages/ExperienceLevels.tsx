
import React from 'react';
import { useEmployees } from '../contexts/EmployeeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Star, TrendingUp, Users, DollarSign } from 'lucide-react';

const ExperienceLevels = () => {
  const { employees } = useEmployees();

  const experienceLevels = [
    { 
      level: 'junior', 
      title: 'Junior Level', 
      icon: '🌱', 
      color: 'bg-green-100 text-green-800',
      description: 'Entry-level professionals with 0-2 years of experience'
    },
    { 
      level: 'mid', 
      title: 'Mid Level', 
      icon: '🚀', 
      color: 'bg-blue-100 text-blue-800',
      description: 'Experienced professionals with 3-5 years of experience'
    },
    { 
      level: 'senior', 
      title: 'Senior Level', 
      icon: '⭐', 
      color: 'bg-purple-100 text-purple-800',
      description: 'Senior professionals with 6+ years of experience'
    },
    { 
      level: 'lead', 
      title: 'Lead Level', 
      icon: '👑', 
      color: 'bg-yellow-100 text-yellow-800',
      description: 'Leadership roles with extensive experience and team management'
    }
  ];

  const getLevelStats = (level: string) => {
    const levelEmployees = employees.filter(emp => emp.experienceLevel === level);
    const avgSalary = levelEmployees.length > 0 
      ? Math.round(levelEmployees.reduce((sum, emp) => sum + emp.salary, 0) / levelEmployees.length)
      : 0;
    const avgExperience = levelEmployees.length > 0
      ? Math.round(levelEmployees.reduce((sum, emp) => sum + emp.yearsOfExperience, 0) / levelEmployees.length)
      : 0;

    return {
      employees: levelEmployees,
      count: levelEmployees.length,
      avgSalary,
      avgExperience
    };
  };

  const totalEmployees = employees.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Experience Levels</h1>
          <p className="text-gray-600 mt-1">Overview of employees grouped by their experience levels</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-lg px-3 py-1">
            {totalEmployees} Total Employees
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {experienceLevels.map((levelInfo) => {
          const stats = getLevelStats(levelInfo.level);
          const percentage = totalEmployees > 0 ? Math.round((stats.count / totalEmployees) * 100) : 0;
          
          return (
            <Card key={levelInfo.level} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{levelInfo.icon}</div>
                    <div>
                      <CardTitle className="text-xl font-semibold">
                        {levelInfo.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {levelInfo.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={levelInfo.color}>
                    {stats.count} employees
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-gray-600 mr-1" />
                      <span className="text-sm font-medium text-gray-700">Count</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stats.count}</p>
                    <p className="text-xs text-gray-500">{percentage}% of total</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="h-4 w-4 text-gray-600 mr-1" />
                      <span className="text-sm font-medium text-gray-700">Avg Salary</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      ${stats.avgSalary.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="h-4 w-4 text-gray-600 mr-1" />
                      <span className="text-sm font-medium text-gray-700">Avg Years</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{stats.avgExperience}</p>
                  </div>
                </div>

                {stats.count > 0 && (
                  <>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Employees:</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {stats.employees.slice(0, 5).map((employee) => (
                          <div key={employee.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {employee.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {employee.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {employee.position} • {employee.department}
                              </p>
                            </div>
                            <div className="text-xs text-gray-500">
                              {employee.yearsOfExperience}y
                            </div>
                          </div>
                        ))}
                        {stats.count > 5 && (
                          <p className="text-xs text-gray-500 text-center py-1">
                            +{stats.count - 5} more employees
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {stats.count === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Star className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No employees at this level yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceLevels;
