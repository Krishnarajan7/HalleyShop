import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const fontOptions = [
  { label: "Inter", value: "'Inter', sans-serif" },
  { label: "Space Grotesk", value: "'Space Grotesk', sans-serif" },
  { label: "Roboto", value: "'Roboto', sans-serif" },
];

const AdminSettings = () => {
  const [siteName, setSiteName] = useState("HalleyShop");
  const [primaryColor, setPrimaryColor] = useState("#1d4ed8");
  const [secondaryColor, setSecondaryColor] = useState("#f3f4f6");
  const [fontFamily, setFontFamily] = useState("'Inter', sans-serif");
  const [logoPreview, setLogoPreview] = useState(null);
  const [customHTML, setCustomHTML] = useState("");

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyTheme = () => {
    document.documentElement.style.setProperty("--primary", hexToHSL(primaryColor));
    document.documentElement.style.setProperty("--secondary", hexToHSL(secondaryColor));
    document.documentElement.style.setProperty("--font-family", fontFamily);
  };

  const hexToHSL = (hex) => {
    // Convert HEX -> HSL (for Tailwind HSL setup)
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l;
    l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return `${h} ${s}% ${l}%`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyTheme();
    toast.success("Branding settings updated successfully");
    console.log("Settings saved:", { siteName, primaryColor, secondaryColor, fontFamily, customHTML });
    // TODO: Send POST/PUT to /api/admin/settings for persistence
  };

  return (
    <div className="space-y-6 px-2 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold">Branding Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        
        {/* Site Name */}
        <div className="space-y-2">
          <Label>Site Name</Label>
          <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
        </div>

        {/* Logo Upload */}
        <div className="space-y-2">
          <Label>Logo Upload</Label>
          <Input type="file" accept="image/*" onChange={handleLogoUpload} />
          {logoPreview && (
            <img
              src={logoPreview}
              alt="Logo Preview"
              className="h-16 mt-2 border rounded-md object-contain"
            />
          )}
        </div>

        {/* Primary Color */}
        <div className="space-y-2">
          <Label>Primary Color</Label>
          <Input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
        </div>

        {/* Secondary Color */}
        <div className="space-y-2">
          <Label>Secondary Color</Label>
          <Input type="color" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
        </div>

        {/* Font Family */}
        <div className="space-y-2">
          <Label>Font Family</Label>
          <select
            className="w-full border rounded-md p-2"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom HTML Block */}
        <div className="space-y-2">
          <Label>Custom Dashboard HTML</Label>
          <Textarea
            placeholder="Enter custom HTML for dashboard"
            value={customHTML}
            onChange={(e) => setCustomHTML(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default AdminSettings;
