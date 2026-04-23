import { useState } from "react";
import { useGetMaintenanceTickets } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Wrench } from "lucide-react";
import { format } from "date-fns";

export default function Maintenance() {
  const { data: tickets, isLoading } = useGetMaintenanceTickets();
  const [search, setSearch] = useState("");

  const filteredTickets = tickets?.filter(t => 
    t.issue_title.toLowerCase().includes(search.toLowerCase()) ||
    t.ticket_status.toLowerCase().includes(search.toLowerCase()) ||
    t.priority.toLowerCase().includes(search.toLowerCase())
  );

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
      case 'medium': return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Medium</Badge>;
      case 'low': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Low</Badge>;
      default: return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Open</Badge>;
      case 'in_progress': return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">In Progress</Badge>;
      case 'resolved': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>;
      case 'closed': return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Closed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Maintenance</h2>
          <p className="text-muted-foreground mt-2">
            Track repairs, service requests, and hardware issues.
          </p>
        </div>
        <Button>
          <Wrench className="mr-2 h-4 w-4" /> New Ticket
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Service Tickets</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search issues..."
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
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Issue Title</TableHead>
                    <TableHead>Asset ID</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reported Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets && filteredTickets.length > 0 ? (
                    filteredTickets.map((t) => (
                      <TableRow key={t.ticket_id}>
                        <TableCell className="font-medium text-muted-foreground">TKT-{t.ticket_id}</TableCell>
                        <TableCell className="font-medium">{t.issue_title}</TableCell>
                        <TableCell className="font-medium text-primary">Asset {t.asset_id}</TableCell>
                        <TableCell>{getPriorityBadge(t.priority)}</TableCell>
                        <TableCell>{getStatusBadge(t.ticket_status)}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(t.reported_at), 'MMM d, yyyy')}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No maintenance tickets found.
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
