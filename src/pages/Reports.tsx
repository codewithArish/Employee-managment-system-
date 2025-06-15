
import React from 'react';
import { useEmployees } from '../contexts/EmployeeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Building,
  FileText,
  Calendar,
  Target,
  Activity
} from 'lucide-react';

const Reports = () => {
  const { employees, departments } = useEmployees();

  // Calculate key metrics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const avgSalary = employees.length > 0 
    ? Math.round(employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length)
    : 0;
  const avgExperience = employees.length > 0
    ? Math.round(employees.reduce((sum, emp) => sum + emp.yearsOfExperience, 0) / employees.length)
    : 0;

  // Department distribution data
  const departmentData = departments.map(dept => ({
    name: dept.name,
    employees: employees.filter(emp => emp.department === dept.name).length,
    avgSalary: Math.round(
      employees.filter(emp => emp.department === dept.name)
        .reduce((sum, emp) => sum + emp.salary, 0) / 
      Math.max(employees.filter(emp => emp.department === dept.name).length, 1)
    )
  }));

  // Experience level distribution
  const experienceData = [
    { name: 'Junior', value: employees.filter(emp => emp.experienceLevel === 'junior').length, color: '#10B981' },
    { name: 'Mid', value: employees.filter(emp => emp.experienceLevel === 'mid').length, color: '#3B82F6' },
    { name: 'Senior', value: employees.filter(emp => emp.experienceLevel === 'senior').length, color: '#8B5CF6' },
    { name: 'Lead', value: employees.filter(emp => emp.experienceLevel === 'lead').length, color: '#F59E0B' }
  ];

  // Salary distribution by experience
  const salaryByExperience = [
    {
      level: 'Junior',
      avgSalary: Math.round(employees.filter(emp => emp.experienceLevel === 'junior')
        .reduce((sum, emp) => sum + emp.salary, 0) / 
        Math.max(employees.filter(emp => emp.experienceLevel === 'junior').length, 1))
    },
    {
      level: 'Mid',
      avgSalary: Math.round(employees.filter(emp => emp.experienceLevel === 'mid')
        .reduce((sum, emp) => sum + emp.salary, 0) / 
        Math.max(employees.filter(emp => emp.experienceLevel === 'mid').length, 1))
    },
    {
      level: 'Senior',
      avgSalary: Math.round(employees.filter(emp => emp.experienceLevel === 'senior')
        .reduce((sum, emp) => sum + emp.salary, 0) / 
        Math.max(employees.filter(emp => emp.experienceLevel === 'senior').length, 1))
    },
    {
      level: 'Lead',
      avgSalary: Math.round(employees.filter(emp => emp.experienceLevel === 'lead')
        .reduce((sum, emp) => sum + emp.salary, 0) / 
        Math.max(employees.filter(emp => emp.experienceLevel === 'lead').length, 1))
    }
  ];

  const keyMetrics = [
    {
      title: 'Total Employees',
      value: totalEmployees,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Employees',
      value: activeEmployees,
      icon: Activity,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Average Salary',
      value: `$${avgSalary.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Avg Experience',
      value: `${avgExperience} years`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+2%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into your workforce</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Last 30 days
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-sm font-medium ${
                      metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`${metric.color} p-3 rounded-full`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              Employees by Department
            </CardTitle>
            <CardDescription>
              Distribution of employees across departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="employees" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Experience Level Distribution */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Experience Level Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of employees by experience level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={experienceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {experienceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Salary Analysis */}
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Average Salary by Experience Level
          </CardTitle>
          <CardDescription>
            Compensation analysis across different experience levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salaryByExperience} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Average Salary']} />
              <Bar dataKey="avgSalary" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Department Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{departments.length}</div>
            <p className="text-sm text-gray-600 mt-1">Active departments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Employment Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 0}%
            </div>
            <p className="text-sm text-gray-600 mt-1">Active employees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Skill Diversity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {[...new Set(employees.flatMap(emp => emp.skills))].length}
            </div>
            <p className="text-sm text-gray-600 mt-1">Unique skills</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
