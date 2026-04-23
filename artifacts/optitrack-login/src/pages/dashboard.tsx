import { 
  useGetDashboardSummary, 
  useGetRecentActivities, 
  useGetDepartmentAssetReport 
} from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Users, Activity, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function Dashboard() {
  const { data: summary, isLoading: summaryLoading } = useGetDashboardSummary();
  const { data: activities, isLoading: activitiesLoading } = useGetRecentActivities();
  const { data: deptReport, isLoading: reportLoading } = useGetDepartmentAssetReport();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-2">
          System summary and recent activity across your organization.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Laptop className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {summaryLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">{summary?.total_assets || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {summary?.available_assets || 0} available for assignment
                </p>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {summaryLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">{summary?.total_employees || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {summary?.active_employees || 0} currently active
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {summaryLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">{summary?.active_assignments || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all departments
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            {summaryLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold text-destructive">
                  {(summary?.maintenance_assets || 0) + (summary?.broken_assets || 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {summary?.maintenance_assets || 0} in maintenance, {summary?.broken_assets || 0} broken
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Department Report */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Department Asset Distribution</CardTitle>
            <CardDescription>
              Assets currently assigned per department
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reportLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-10 w-full" />)}
              </div>
            ) : deptReport && deptReport.length > 0 ? (
              <div className="space-y-4">
                {deptReport.map(dept => (
                  <div key={dept.department_name} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <span className="font-medium">{dept.department_name}</span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
                      {dept.assigned_asset_count} assets
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground py-8 text-center">
                No department data available.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest asset assignments and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activitiesLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : activities && activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map(activity => (
                  <div key={activity.activity_id} className="flex flex-col space-y-1 pb-3 border-b last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">
                        {activity.activity_type.replace(/_/g, ' ')}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(activity.created_at), 'MMM d, yyyy HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.activity_description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground py-8 text-center">
                No recent activity recorded.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
