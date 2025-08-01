import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const CustomerProfile = ({
  isOpen,
  onClose,
  customer,
  onResetPassword,
  onToggleStatus,
  onImpersonate,
}) => {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{customer.first_name} {customer.last_name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <p className="text-sm text-muted-foreground">Email:</p>
            <p className="font-medium">{customer.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status:</p>
            <p className="font-medium">{customer.is_active ? "Active" : "Blocked"}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Order History</h4>
            <ul className="text-sm text-muted-foreground list-disc ml-5">
              {customer.orders?.length > 0 ? (
                customer.orders.map((order) => (
                  <li key={order.id}>
                    #{order.id} - {order.status} - ₹{order.total_amount}
                  </li>
                ))
              ) : (
                <li>No orders found.</li>
              )}
            </ul>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onResetPassword}>Reset Password</Button>
          <Button variant="outline" onClick={onToggleStatus}>
            {customer.is_active ? "Block User" : "Unblock User"}
          </Button>
          <Button onClick={onImpersonate}>Impersonate</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerProfile;
