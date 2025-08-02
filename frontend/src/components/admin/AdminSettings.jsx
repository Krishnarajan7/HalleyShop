import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const AdminSettings = () => {
  const [siteName, setSiteName] = useState("HalleyShop");
  const [primaryColor, setPrimaryColor] = useState("#1d4ed8");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings saved:", { siteName, primaryColor, maintenanceMode });
    // Later: Send POST to /api/admin/settings
  };

  return (
    <div className="space-y-6 px-2 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
        <div className="space-y-2">
          <Label>Site Name</Label>
          <Input value={siteName} onChange={(e) => setSiteName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Primary Color</Label>
          <Input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
        </div>

        <div className="flex items-center justify-between">
          <Label>Maintenance Mode</Label>
          <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default AdminSettings; 
