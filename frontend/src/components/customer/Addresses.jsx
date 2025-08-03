import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Addresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: "Alice Smith",
      addressLine: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
      phone: "+1 555-123-4567",
    },
    {
      id: 2,
      type: "Office",
      name: "Alice Smith",
      addressLine: "456 Corporate Ave",
      city: "Brooklyn",
      state: "NY",
      zip: "11201",
      country: "USA",
      phone: "+1 555-987-6543",
    },
  ]);

  const [editingAddress, setEditingAddress] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (editingAddress.id) {
      // Update existing address
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === editingAddress.id ? editingAddress : addr
        )
      );
      toast.success("Address updated successfully");
    } else {
      // Add new address
      const newAddress = { ...editingAddress, id: Date.now() };
      setAddresses((prev) => [...prev, newAddress]);
      toast.success("Address added successfully");
    }
    setOpen(false);
    setEditingAddress(null);
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    toast.warning("Address deleted");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Addresses</h2>
        <Button
          onClick={() => {
            setEditingAddress({
              type: "",
              name: "",
              addressLine: "",
              city: "",
              state: "",
              zip: "",
              country: "",
              phone: "",
            });
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Addresses Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You haven't saved any addresses yet. Add one to make checkout faster.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className="p-4">
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{address.type}</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingAddress(address);
                        setOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(address.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-sm">
                  {address.name} <br />
                  {address.addressLine}, {address.city}, {address.state}{" "}
                  {address.zip}, {address.country}
                </p>
                <p className="text-sm text-muted-foreground">{address.phone}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Address Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAddress?.id ? "Edit Address" : "Add New Address"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Type (Home/Office)"
              value={editingAddress?.type || ""}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, type: e.target.value })
              }
            />
            <Input
              placeholder="Full Name"
              value={editingAddress?.name || ""}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, name: e.target.value })
              }
            />
            <Input
              placeholder="Address Line"
              value={editingAddress?.addressLine || ""}
              onChange={(e) =>
                setEditingAddress({
                  ...editingAddress,
                  addressLine: e.target.value,
                })
              }
            />
            <Input
              placeholder="City"
              value={editingAddress?.city || ""}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, city: e.target.value })
              }
            />
            <Input
              placeholder="State"
              value={editingAddress?.state || ""}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, state: e.target.value })
              }
            />
            <Input
              placeholder="ZIP Code"
              value={editingAddress?.zip || ""}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, zip: e.target.value })
              }
            />
            <Input
              placeholder="Country"
              value={editingAddress?.country || ""}
              onChange={(e) =>
                setEditingAddress({
                  ...editingAddress,
                  country: e.target.value,
                })
              }
            />
            <Input
              placeholder="Phone"
              value={editingAddress?.phone || ""}
              onChange={(e) =>
                setEditingAddress({ ...editingAddress, phone: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button onClick={handleSave}>
              {editingAddress?.id ? "Save Changes" : "Add Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Addresses;
