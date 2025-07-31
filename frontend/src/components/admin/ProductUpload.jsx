import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Download,
  FileImage,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProductUpload = ({ onImageUpload, onCSVUpload, onExportCSV }) => {
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [dragActive, setDragActive] = useState(false);
  const imageInputRef = useRef(null);
  const csvInputRef = useRef(null);

  const handleImageDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageFiles(e.dataTransfer.files);
    }
  };

  const handleImageFiles = async (files) => {
    setUploadStatus("uploading");
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default"); 

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dw0hqyiw8/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) throw new Error("Cloudinary upload failed");
        const data = await response.json();
        uploadedUrls.push(data.secure_url); // this is the hosted image URL
      }

      onImageUpload(uploadedUrls); // Pass URLs back to parent
      setUploadStatus("success");
      setTimeout(() => setUploadStatus("idle"), 3000);
    } catch (error) {
      console.error("Upload failed", error);
      setUploadStatus("error");
      setTimeout(() => setUploadStatus("idle"), 3000);
    }
  };

  const handleCSVFile = async (file) => {
    setUploadStatus("uploading");
    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onCSVUpload(file);
      setUploadStatus("success");
      setTimeout(() => setUploadStatus("idle"), 3000);
    } catch (error) {
      setUploadStatus("error");
      setTimeout(() => setUploadStatus("idle"), 3000);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Product Upload & Import
        </CardTitle>
        <CardDescription>
          Upload product images or import products via CSV file
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="images">Image Upload</TabsTrigger>
            <TabsTrigger value="csv-import">CSV Import</TabsTrigger>
            <TabsTrigger value="csv-export">CSV Export</TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50"
              }`}
              onDragEnter={handleImageDrag}
              onDragLeave={handleImageDrag}
              onDragOver={handleImageDrag}
              onDrop={handleImageDrop}
            >
              <FileImage className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Upload Product Images</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop images here, or click to select files
              </p>
              <Button
                variant="outline"
                onClick={() => imageInputRef.current?.click()}
                disabled={uploadStatus === "uploading"}
              >
                {uploadStatus === "uploading"
                  ? "Uploading..."
                  : "Select Images"}
              </Button>
              <input
                ref={imageInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  e.target.files && handleImageFiles(e.target.files)
                }
              />
              <p className="text-xs text-muted-foreground mt-2">
                Supports: JPG, PNG, WebP (Max 5MB each)
              </p>
            </div>

            {uploadStatus !== "idle" && (
              <Alert
                className={uploadStatus === "error" ? "border-destructive" : ""}
              >
                {uploadStatus === "uploading" && <Upload className="h-4 w-4" />}
                {uploadStatus === "success" && (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                {uploadStatus === "error" && (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {uploadStatus === "uploading" && "Uploading images..."}
                  {uploadStatus === "success" &&
                    "Images uploaded successfully!"}
                  {uploadStatus === "error" &&
                    "Failed to upload images. Please try again."}
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="csv-import" className="space-y-4">
            <div className="border rounded-lg p-6">
              <div className="text-center space-y-4">
                <FileSpreadsheet className="mx-auto h-12 w-12 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold mb-2">
                    Import Products from CSV
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Upload a CSV file with product data to bulk import products
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => csvInputRef.current?.click()}
                  disabled={uploadStatus === "uploading"}
                >
                  {uploadStatus === "uploading"
                    ? "Processing..."
                    : "Choose CSV File"}
                </Button>
                <input
                  ref={csvInputRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files?.[0] && handleCSVFile(e.target.files[0])
                  }
                />
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>CSV Format:</strong> name, description, price, category,
                brand, stock, imageUrl
                <br />
                <a href="#" className="text-primary hover:underline">
                  Download sample CSV template
                </a>
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="csv-export" className="space-y-4">
            <div className="border rounded-lg p-6">
              <div className="text-center space-y-4">
                <Download className="mx-auto h-12 w-12 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold mb-2">Export Products to CSV</h3>
                  <p className="text-sm text-muted-foreground">
                    Download all product data in CSV format for backup or
                    analysis
                  </p>
                </div>
                <Button onClick={onExportCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Export All Products
                </Button>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                The exported file will include all product fields and current
                inventory data.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProductUpload;
