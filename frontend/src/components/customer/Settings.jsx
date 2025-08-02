import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Settings = ({ user }) => {
  const { updateUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswordData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (savingProfile) return;
    setSavingProfile(true);
    try {
      await updateUser(formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.message || "Failed to update profile");
      console.error("Profile update error:", error);
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (resettingPassword) return;

    const { oldPassword, newPassword, confirmPassword } = passwordData;
    const trimmedOld = oldPassword.trim();
    const trimmedNew = newPassword.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (trimmedNew.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    if (trimmedNew === trimmedOld) {
      toast.error("New password must be different from old password");
      return;
    }

    if (trimmedNew !== trimmedConfirm) {
      toast.error("Confirm password does not match new password");
      return;
    }

    setResettingPassword(true);
    try {
      const res = await fetch("/api/customer/change-password", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: trimmedOld,
          newPassword: trimmedNew,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || "Failed to reset password");
      }

      toast.success("Password reset successfully");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error?.message || "Failed to reset password");
      console.error("Error resetting password:", error);
    } finally {
      setResettingPassword(false);
    }
  };

  const inputStyle = {
    borderColor: "#d4af37",
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">Account Settings</h2>

      {/* Update Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Update Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none"
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none"
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none"
                style={inputStyle}
                required
              />
            </div>
            <Button type="submit" disabled={savingProfile}>
              {savingProfile ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Reset Password Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="grid grid-cols-1 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Old Password</label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-md focus:outline-none pr-10"
                style={inputStyle}
                required
              />
              <span
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                onClick={() => setShowOldPassword((prev) => !prev)}
              >
                {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-md focus:outline-none pr-10"
                style={inputStyle}
                required
              />
              <span
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded-md focus:outline-none"
                style={inputStyle}
                required
              />
            </div>

            <Button type="submit" disabled={resettingPassword}>
              {resettingPassword ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
