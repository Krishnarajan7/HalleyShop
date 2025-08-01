import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const CustomerSearch = ({ searchQuery, onSearch }) => {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by name or email..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default CustomerSearch;
