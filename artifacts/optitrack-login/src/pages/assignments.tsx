import { useState } from "react";
import { useGetAssignments } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Link as LinkIcon } from "lucide-react";
import { format } from "date-fns";

export default function Assignments() {
  const { data: assignments, isLoading } = useGetAssignments();
  const [search, setSearch] = useState("");

  // Since we only have IDs, searching by names requires joining data, but we can search status/notes
  const filteredAssignments = assignments?.filter(a => 
    a.assignment_status.toLowerCase().includes(search.toLowerCase()) ||
    (a.assignment_notes && a.assignment_notes.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Assignments</h2>
          <p className="text-muted-foreground mt-2">
            Track who has what and manage hardware allocations.
          </p>
        </div>
        <Button>
          <LinkIcon className="mr-2 h-4 w-4" /> Create Assignment
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Assignment History</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search status or notes..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Asset ID</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Assigned Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments && filteredAssignments.length > 0 ? (
                    filteredAssignments.map((a) => (
                      <TableRow key={a.assignment_id}>
                        <TableCell className="font-medium text-muted-foreground">#{a.assignment_id}</TableCell>
                        <TableCell className="font-medium text-primary">Asset {a.asset_id}</TableCell>
                        <TableCell className="font-medium">Emp {a.employee_id}</TableCell>
                        <TableCell>{format(new Date(a.assigned_at), 'MMM d, yyyy')}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {a.returned_at ? format(new Date(a.returned_at), 'MMM d, yyyy') : '—'}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={a.assignment_status === 'Active' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-700 border-gray-200'}
                          >
                            {a.assignment_status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No assignments found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
