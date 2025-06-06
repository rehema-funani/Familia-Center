// src/app/components/ProgressTracker.tsx
import React from 'react';
import { CheckCircle, Circle, Clock, BookOpen, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  weekNumber: number;
  dueDate?: string;
}

interface ProgressTrackerProps {
  programTitle: string;
  currentWeek: number;
  totalWeeks: number;
  overallProgress: number;
  steps: ProgressStep[];
  completedAssignments?: number;
  totalAssignments?: number;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  programTitle,
  currentWeek,
  totalWeeks,
  overallProgress,
  steps,
  completedAssignments = 0,
  totalAssignments = 0
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'current':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-300" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success" size="sm">Completed</Badge>;
      case 'current':
        return <Badge variant="default" size="sm">In Progress</Badge>;
      default:
        return <Badge variant="secondary" size="sm">Upcoming</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Program Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-500" />
              <span>{programTitle}</span>
            </CardTitle>
            <Badge variant="outline">
              Week {currentWeek} of {totalWeeks}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress
              value={overallProgress}
              max={100}
              showLabel
              label="Overall Progress"
              variant="default"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <Target className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Week</p>
                  <p className="text-xl font-bold text-gray-900">{currentWeek}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-xl font-bold text-gray-900">{currentWeek - 1}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <Award className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Assignments</p>
                  <p className="text-xl font-bold text-gray-900">{completedAssignments}/{totalAssignments}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start space-x-4 p-4 rounded-lg border-2 transition-colors ${
                  step.status === 'current'
                    ? 'border-blue-200 bg-blue-50'
                    : step.status === 'completed'
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(step.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Week {step.weekNumber}: {step.title}
                    </h4>
                    {getStatusBadge(step.status)}
                  </div>
                  
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  
                  {step.dueDate && step.status !== 'completed' && (
                    <p className="text-sm text-gray-500">
                      Due: {step.dueDate}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assignment Progress */}
      {totalAssignments > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-500" />
              <span>Assignment Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={completedAssignments}
              max={totalAssignments}
              showLabel
              label="Assignments Completed"
              variant="success"
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{completedAssignments}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-600">{totalAssignments - completedAssignments}</p>
                <p className="text-sm text-gray-600">Remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProgressTracker;