import { useState, useContext } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "../context/AuthContext"; // Adjust path
import { useNavigate } from "react-router-dom";
import PageLoader from "@/components/ui/PageLoader";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, user, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // States for login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // States for register
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error/feedback
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setSuccessMessage("");
    setIsLoading(true);
    try {
      const result = await login(loginEmail, loginPassword);
      setSuccessMessage("Login successful!");
      if (result?.user?.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/customer");
      }
    } catch (err) {
      setAuthError(
        err.response?.data?.message || err.message || "Login failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError("");
    setSuccessMessage("");
    if (registerPassword !== confirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      await register(firstName, lastName, registerEmail, registerPassword);
      setSuccessMessage("Registration successful! Redirecting...");
      setSuccessMessage("Registration successful! Redirecting...");
      navigate("/dashboard/customer");
    } catch (err) {
      setAuthError(
        err.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      setSuccessMessage("Logged out successfully!");
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button variant="outline" asChild className="mb-6">
          <a href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </a>
        </Button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative">
              <span className="text-4xl font-bold font-space bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                H
              </span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-medium font-space text-primary">
              alleyShop
            </span>
          </div>
          <p className="text-muted-foreground">Your Orbit to Smart Shopping</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-elegant">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Returning Customer</TabsTrigger>
              <TabsTrigger value="register">New Customer</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6 mt-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-semibold">Welcome Back!</h2>
                  <p className="text-sm text-muted-foreground">
                    Continue your shopping journey
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="mt-1"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-10"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Button variant="link" className="p-0 h-auto text-sm">
                      Forgot password?
                    </Button>
                  </div>
                </div>
                {authError && (
                  <div className="text-red-500 text-sm">{authError}</div>
                )}
                {successMessage && (
                  <div className="text-green-600 text-sm">{successMessage}</div>
                )}
                {user && (
                  <Button
                    type="button"
                    onClick={handleLogout}
                    className="w-full mt-2"
                  >
                    Logout
                  </Button>
                )}
                <Button size="lg" className="w-full" type="submit">
                  Sign In
                </Button>
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" type="button">
                    Google
                  </Button>
                  <Button variant="outline" type="button">
                    Facebook
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register" className="space-y-6 mt-6">
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-semibold">Join HalleyShop!</h2>
                  <p className="text-sm text-muted-foreground">
                    Create your account and start exploring
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="mt-1"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="mt-1"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="registerEmail">Email</Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="john@example.com"
                      className="mt-1"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="registerPassword">Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="registerPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pr-10"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative mt-1">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pr-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                        type="button"
                      >
                        Terms of Service
                      </Button>{" "}
                      and{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                        type="button"
                      >
                        Privacy Policy
                      </Button>
                    </Label>
                  </div>
                </div>
                {authError && (
                  <div className="text-red-500 text-sm">{authError}</div>
                )}
                {successMessage && (
                  <div className="text-green-600 text-sm">{successMessage}</div>
                )}
                <Button size="lg" className="w-full" type="submit">
                  Create Account
                </Button>
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
                    Or register with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" type="button">
                    Google
                  </Button>
                  <Button variant="outline" type="button">
                    Facebook
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;
