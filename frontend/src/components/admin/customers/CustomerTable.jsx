import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash, UserX, UserCheck, Shield } from "lucide-react";

const CustomerTable = ({
  customers = [],
  onView,
  onDelete,
  onToggleStatus,
  onImpersonate,
}) => {
  if (!Array.isArray(customers) || customers.length === 0) {
    return <p className="p-4 text-center text-gray-500">No customers found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                {customer.firstName} {customer.lastName}
              </td>
              <td className="px-4 py-2">{customer.email}</td>
              <td className="px-4 py-2">
                <Badge
                  variant={
                    customer.status === "Active" ? "default" : "destructive"
                  }
                >
                  {customer.status}
                </Badge>
              </td>
              <td className="px-4 py-2 space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onView(customer)}
                >
                  <Eye className="w-4 h-4 mr-1" /> View
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onToggleStatus(customer)}
                >
                  {customer.status === "Active" ? (
                    <>
                      <UserX className="w-4 h-4 mr-1" /> Block
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4 mr-1" /> Unblock
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onImpersonate(customer)}
                >
                  <Shield className="w-4 h-4 mr-1" /> Impersonate
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(customer)}
                >
                  <Trash className="w-4 h-4 mr-1" /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
