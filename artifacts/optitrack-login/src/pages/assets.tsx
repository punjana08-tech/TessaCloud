import { useState } from "react";
import { useGetAssets } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus } from "lucide-react";

export default function Assets() {
  const { data: assets, isLoading } = useGetAssets();
  const [search, setSearch] = useState("");

  const filteredAssets = assets?.filter(asset => 
    asset.asset_name.toLowerCase().includes(search.toLowerCase()) ||
    asset.asset_tag.toLowerCase().includes(search.toLowerCase()) ||
    asset.category.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Available</Badge>;
      case 'assigned': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Assigned</Badge>;
      case 'maintenance': return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Maintenance</Badge>;
      case 'retired': return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Retired</Badge>;
      case 'lost': return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Lost</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getConditionBadge = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new': return <span className="text-xs font-medium text-green-600">New</span>;
      case 'good': return <span className="text-xs font-medium text-blue-600">Good</span>;
      case 'fair': return <span className="text-xs font-medium text-yellow-600">Fair</span>;
      case 'poor': return <span className="text-xs font-medium text-orange-600">Poor</span>;
      case 'broken': return <span className="text-xs font-medium text-red-600">Broken</span>;
      default: return <span className="text-xs font-medium text-muted-foreground">{condition}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Asset Inventory</h2>
          <p className="text-muted-foreground mt-2">
            Manage your hardware fleet and monitor conditions.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Asset
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>All Assets</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search assets..."
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
                    <TableHead>Tag</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets && filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => (
                      <TableRow key={asset.asset_id}>
                        <TableCell className="font-medium text-primary">{asset.asset_tag}</TableCell>
                        <TableCell className="font-medium">{asset.asset_name}</TableCell>
                        <TableCell className="text-muted-foreground">{asset.category}</TableCell>
                        <TableCell>{getConditionBadge(asset.condition_status)}</TableCell>
                        <TableCell>{getStatusBadge(asset.asset_status)}</TableCell>
                        <TableCell className="text-muted-foreground">{asset.current_location || '—'}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No assets found.
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
