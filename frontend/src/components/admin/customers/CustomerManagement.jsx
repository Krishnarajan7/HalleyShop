import { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CustomerSearch from "./CustomerSearch";
import CustomerFilters from "./CustomerFilters";
import CustomerTable from "./CustomerTable";
import CustomerModal from "./CustomerModal";
import CustomerForm from "./CustomerForm";
import CustomerPagination from "./CustomerPagination";
import { useToast } from "@/components/ui/use-toast";
import PageLoader from "@/components/ui/PageLoader";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    limit: 10,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const { toast } = useToast();

  const fetchCustomers = useCallback(
    async (page = 1) => {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", pagination?.limit || 10);
      if (statusFilter && statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      if (searchQuery) {
        params.append("search", searchQuery);
      }

      try {
        const res = await fetch(`/api/admin/customers?${params.toString()}`, {
          credentials: "include",
        });

        if (!res.ok) {
          const error = await res.text();
          throw new Error(error || "Failed to fetch customers");
        }

        const data = await res.json();
        console.log("Pagination info:", data.pagination);
        setCustomers(data.customers || []);

        if (data.pagination) {
          setPagination({
            page: data.pagination.page,
            totalPages: data.pagination.totalPages,
            limit: data.pagination.limit,
          });
        } else {
          console.warn("Missing pagination in response:", data);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: err.message || "Failed to fetch customers",
          variant: "destructive",
        });
      }
    },
    [statusFilter, searchQuery, pagination.limit, toast]
  );

  useEffect(() => {
    fetchCustomers(1);
  }, [statusFilter, searchQuery]);

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleAddOrUpdateCustomer = async (data) => {
    try {
      const res = await fetch(
        `/api/admin/customers${
          editingCustomer ? `/${editingCustomer.id}` : ""
        }`,
        {
          method: editingCustomer ? "PATCH" : "POST",
          body: JSON.stringify(data),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Failed to save customer");

      setShowForm(false);
      setEditingCustomer(null);

      toast({
        title: `Customer ${editingCustomer ? "updated" : "created"}`,
        description: `${data.firstName} ${data.lastName}`,
      });

      setStatusFilter("all");
      setSearchQuery("");

      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomerToDelete(customerId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`/api/admin/customers/${customerToDelete}`, {
        method: "DELETE",
        credentials: "include",
      });
      toast({
        title: "Customer deleted",
        description: `The customer has been deleted.`,
      });
      fetchCustomers();
      setCustomerToDelete(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImpersonate = async (customerId, customerName) => {
    try {
      setLoading(true); // Show PageLoader immediately

      await fetch(`/api/admin/customers/${customerId}/impersonate`, {
        method: "POST",
        credentials: "include",
      });

      localStorage.setItem(
        "impersonating",
        JSON.stringify({ customerId, customerName })
      );

      setTimeout(() => {
        window.location.href = "/customer-portal"; // Redirect after loader
      }, 800);
    } catch (err) {
      console.error("Error starting impersonation:", err);
      setLoading(false);
    }
  };

  const handleToggleStatus = async (customer) => {
    try {
      const endpoint = customer.status === "Active" ? "block" : "unblock";
      await fetch(`/api/admin/customers/${customer.id}/${endpoint}`, {
        method: "PATCH",
        credentials: "include",
      });

      toast({
        title: `Customer ${endpoint === "block" ? "blocked" : "unblocked"}`,
        description: `${customer.firstName} ${customer.lastName}`,
      });

      fetchCustomers();
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleClearFilters = () => {
    setStatusFilter("all");
    setSearchQuery("");
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <CustomerForm
          initialData={editingCustomer || undefined}
          onSubmit={handleAddOrUpdateCustomer}
          onCancel={() => {
            setShowForm(false);
            setEditingCustomer(null);
          }}
          isEditing={!!editingCustomer}
        />
      </div>
    );
  }

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <Button onClick={() => setShowForm(true)}>+ Add Customer</Button>
      </div>

      <Tabs defaultValue="customers" className="w-full">
        <TabsList>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          <CustomerSearch searchQuery={searchQuery} onSearch={setSearchQuery} />
          <CustomerFilters
            statusFilter={statusFilter}
            onStatusChange={(value) => setStatusFilter(value)}
            onClear={handleClearFilters}
          />

          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <CustomerTable
                customers={customers}
                onView={handleEditCustomer} // using form modal
                onToggleStatus={handleToggleStatus}
                onDelete={(customer) => handleDeleteCustomer(customer.id)}
                onImpersonate={(customer) =>
                  handleImpersonate(
                    customer.id,
                    `${customer.firstName} ${customer.lastName}`
                  )
                }
              />

              <div>
                <CustomerPagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={(newPage) => fetchCustomers(newPage)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CustomerModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Customer"
        description="Are you sure you want to delete this customer? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
};

export default CustomerManagement;
