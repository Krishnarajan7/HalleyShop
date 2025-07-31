import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Eye } from "lucide-react";
import ProductActions from "./ProductActions";


const ProductRow = ({ product, onEdit, onDelete, onView }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case "active": return "default";
      case "inactive": return "secondary";
      case "out-of-stock": return "destructive";
      default: return "outline";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active": return "Active";
      case "inactive": return "Inactive";
      case "out-of-stock": return "Out of Stock";
      default: return status;
    }
  };

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <div className="flex items-center space-x-3">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <Badge variant="outline">{product.category}</Badge>
      </TableCell>
      
      <TableCell className="font-medium">
        ${product.price.toFixed(2)}
      </TableCell>
      
      <TableCell>
        <span className={product.stock <= 10 ? "text-destructive font-medium" : ""}>
          {product.stock}
        </span>
      </TableCell>
      
      <TableCell>
        <Badge variant={getStatusVariant(product.status)}>
          {getStatusText(product.status)}
        </Badge>
      </TableCell>
      
      <TableCell>{product.sales}</TableCell>
      
      <TableCell className="text-sm text-muted-foreground">
        {new Date(product.createdAt).toLocaleDateString()}
      </TableCell>
      
      <TableCell>
        <ProductActions
          onEdit={() => onEdit(product)}
          onDelete={() => onDelete(product.id)}
          onView={() => onView(product.id)}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductRow;