import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ProductActions from "./ProductActions";
import ProductRow from "./ProductRow";

const ProductTable = ({ products = [], onEdit, onDelete, onView }) => {
  const getStatusBadge = (status = "inactive") => {
    const variants = {
      active: "bg-success/10 text-success border-success/20",
      "out-of-stock":
        "bg-destructive/10 text-destructive border-destructive/20",
      inactive: "bg-muted t ext-muted-foreground border-muted",
    };
    return variants[status] || variants.inactive;
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Product</TableHead>
            <TableHead className="font-semibold">Category</TableHead>
            <TableHead className="font-semibold">Price</TableHead>
            <TableHead className="font-semibold">Stock</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Sales</TableHead>
            <TableHead className="font-semibold">Created</TableHead>
            <TableHead className="font-semibold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(products || []).map((product) => (
            <TableRow
              key={product.id}
              className="hover:bg-muted/30 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover border border-border"
                  />
                  <div>
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {product.brand}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">
                ${product.price.toFixed(2)}
              </TableCell>
              <TableCell>
                <span
                  className={`text-sm ${
                    product.stock === 0
                      ? "text-destructive font-medium"
                      : "text-foreground"
                  }`}
                >
                  {product.stock}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`text-xs ${getStatusBadge(product.status)}`}
                >
                  {product.status === "out-of-stock"
                    ? "Out of Stock"
                    : product.status
                    ? product.status.charAt(0).toUpperCase() +
                      product.status.slice(1)
                    : "Unknown"}
                </Badge>
              </TableCell>

              <TableCell className="text-sm">{product.sales}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(product.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <ProductActions
                    onEdit={() => onEdit(product)}
                    onDelete={() => onDelete(product.id)}
                    onView={() => onView(product.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {products.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-sm">No products found</div>
          <div className="text-xs mt-1">
            Try adjusting your search or filters
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
