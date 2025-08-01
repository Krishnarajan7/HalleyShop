// admin/customers/CustomerFilters.jsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CustomerFilters = ({ statusFilter, onStatusChange, onClear }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={onClear}>
        Clear Filters
      </Button>
    </div>
  );
};

export default CustomerFilters;
