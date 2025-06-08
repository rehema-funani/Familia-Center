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
  programTitle?: string;
  currentWeek?: number;
  totalWeeks?: number;
  overallProgress?: number;
  steps?: ProgressStep[];
  completedAssignments?: number;
  totalAssignments?: number;
}

// Helper function to safely convert to number and handle NaN
const safeNumber = (value: any, fallback: number = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

// Helper function to safely convert to string
const safeString = (value: any, fallback: string = ''): string => {
  if (value === null || value === undefined) return fallback;
  return String(value);
};

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  programTitle = 'Family Counseling Program',
  currentWeek = 1,
  totalWeeks = 6,
  overallProgress = 0,
  steps = [],
  completedAssignments = 0,
  totalAssignments = 0
}) => {
  // Safely convert all numeric values
  const safeCurrentWeek = safeNumber(currentWeek, 1);
  const safeTotalWeeks = safeNumber(totalWeeks, 6);
  const safeOverallProgress = safeNumber(overallProgress, 0);
  const safeCompletedAssignments = safeNumber(completedAssignments, 0);
  const safeTotalAssignments = safeNumber(totalAssignments, 0);
  const safeProgramTitle = safeString(programTitle, 'Family Counseling Program');

  // Ensure steps is always an array
  const safeSteps = Array.isArray(steps) ? steps : [];

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

  // Calculate completed weeks safely
  const completedWeeks = Math.max(0, safeCurrentWeek - 1);

  return (
    <div className="space-y-6">
      {/* Program Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-500" />
              <span>{safeProgramTitle}</span>
            </CardTitle>
            <Badge variant="outline">
              Week {safeCurrentWeek} of {safeTotalWeeks}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress
              value={safeOverallProgress}
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
                  <p className="text-xl font-bold text-gray-900">{safeCurrentWeek}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-xl font-bold text-gray-900">{completedWeeks}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                <Award className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Assignments</p>
                  <p className="text-xl font-bold text-gray-900">
                    {safeCompletedAssignments}/{safeTotalAssignments}
                  </p>
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
            {safeSteps.length > 0 ? (
              safeSteps.map((step, index) => (
                <div
                  key={step.id || `step-${index}`}
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
                        Week {safeNumber(step.weekNumber, index + 1)}: {safeString(step.title, 'Untitled')}
                      </h4>
                      {getStatusBadge(step.status)}
                    </div>
                    
                    <p className="text-gray-600 mb-2">
                      {safeString(step.description, 'No description available')}
                    </p>
                    
                    {step.dueDate && step.status !== 'completed' && (
                      <p className="text-sm text-gray-500">
                        Due: {safeString(step.dueDate)}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p>No progress steps available yet.</p>
                <p className="text-sm">Your weekly progress will appear here once you start the program.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Assignment Progress */}
      {safeTotalAssignments > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-500" />
              <span>Assignment Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={safeCompletedAssignments}
              max={safeTotalAssignments}
              showLabel
              label="Assignments Completed"
              variant="success"
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{safeCompletedAssignments}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-600">
                  {Math.max(0, safeTotalAssignments - safeCompletedAssignments)}
                </p>
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