
import React, { useState } from 'react';
import { Employee } from '../../types/Employee';
import { useEmployees } from '../../contexts/EmployeeContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const { updateEmployee, deleteEmployee } = useEmployees();
  const { user } = useAuth();
  const [showDetails, setShowDetails] = useState(false);

  const canEdit = user?.role === 'admin' || user?.role === 'manager';

  const handleStatusToggle = () => {
    const newStatus = employee.status === 'active' ? 'inactive' : 'active';
    updateEmployee(employee.id, { status: newStatus });
    toast({
      title: "Status Updated",
      description: `Employee status changed to ${newStatus}`,
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(employee.id);
      toast({
        title: "Employee Deleted",
        description: "Employee has been removed from the system",
        variant: "destructive",
      });
    }
  };

  const getExperienceColor = (level: string) => {
    switch (level) {
      case 'junior': return 'bg-red-100 text-red-800';
      case 'mid': return 'bg-yellow-100 text-yellow-800';
      case 'senior': return 'bg-green-100 text-green-800';
      case 'lead': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{employee.position}</p>
            <p className="text-sm text-blue-600">{employee.email}</p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getExperienceColor(employee.experienceLevel)}`}>
              {employee.experienceLevel}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {employee.status}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Department:</span>
            <span className="font-medium">{employee.department}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Experience:</span>
            <span className="font-medium">{employee.yearsOfExperience} years</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Salary:</span>
            <span className="font-medium">${employee.salary.toLocaleString()}</span>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            <div className="text-sm">
              <span className="text-gray-600">Join Date:</span>
              <span className="ml-2 font-medium">{new Date(employee.joinDate).toLocaleDateString()}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Skills:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {employee.skills.map((skill, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>

          {canEdit && (
            <div className="flex space-x-2">
              <button
                onClick={handleStatusToggle}
                className={`px-3 py-1 text-xs font-medium rounded ${
                  employee.status === 'active' 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {employee.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
