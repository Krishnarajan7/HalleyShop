import { useState, useContext, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "../context/AuthContext"; // Adjust path
import { useNavigate, useLocation } from "react-router-dom";
import PageLoader from "@/components/ui/PageLoader";
import { toast } from "@/components/ui/sonner";
import { useCart } from "@/context/CartContext";

const MIN_LOADER_TIME = 700;

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) =>
  password.length >= 8 && /[A-Z]/.test(password);
const validateName = (name) => name.length >= 1;

const Auth = () => {
  const {
    user,
    isAdmin,
    loading,
    login,
    register,
    justLoggedOut,
    setJustLoggedOut,
  } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const { mergeCartAfterLogin } = useCart();

  // Handle logout feedback
  useEffect(() => {
    if (justLoggedOut) {
      console.log("Auth: Showing logout toast"); // Debug
      toast.success("You have been logged out.");
      setJustLoggedOut(false);
      window.history.replaceState({}, document.title);
    }
  }, [justLoggedOut, setJustLoggedOut]);

  // Reset forms on tab switch
  const resetLoginForm = () => {
    setLoginEmail("");
    setLoginPassword("");
    setShowPassword(false);
    setAuthError("");
    setSuccessMessage("");
  };

  const resetRegisterForm = () => {
    setFirstName("");
    setLastName("");
    setRegisterEmail("");
    setRegisterPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setAuthError("");
    setSuccessMessage("");
  };

  // Login handler

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(loginEmail)) {
      toast.error("Invalid email format.");
      return;
    }
    if (!loginPassword) {
      toast.error("Password is required.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(loginEmail, loginPassword);
      toast.success("Login successful!");

      // Merge guest cart into backend cart
      await mergeCartAfterLogin();

      // Redirect after login
      const redirectTo =
        location.state?.from ||
        (res.user.role === "admin"
          ? "/dashboard/admin"
          : "/dashboard/customer");

      navigate(redirectTo, { replace: true });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Login failed";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateName(firstName)) {
      setAuthError("First name is required.");
      toast.error("First name is required.");
      return;
    }
    if (!validateName(lastName)) {
      setAuthError("Last name is required.");
      toast.error("Last name is required.");
      return;
    }
    if (!validateEmail(registerEmail)) {
      setAuthError("Invalid email format.");
      toast.error("Invalid email format.");
      return;
    }
    if (!validatePassword(registerPassword)) {
      setAuthError(
        "Password must be 8+ characters with at least one uppercase letter."
      );
      toast.error(
        "Password must be 8+ characters with at least one uppercase letter."
      );
      return;
    }
    if (registerPassword !== confirmPassword) {
      setAuthError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    setAuthError("");
    const start = Date.now();
    try {
      const result = await register(
        firstName,
        lastName,
        registerEmail,
        registerPassword
      );
      console.log("Auth: Register successful:", result); // Debug
      setSuccessMessage("Account created successfully!");
      toast.success("Account created successfully!");
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_LOADER_TIME - elapsed);
      setTimeout(() => {
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo, { replace: true });
      }, wait);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Registration failed";
      console.error("Auth: Register error:", errorMsg); // Debug
      setAuthError(errorMsg);
      toast.error(errorMsg);
      setIsLoading(false);
    }
  };

  // Google login (placeholder)
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setAuthError("");
    try {
      // Replace with actual Google OAuth logic
      console.log("Auth: Google login attempted"); // Debug
      setSuccessMessage("Google login successful!");
      toast.success("Google login successful!");
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const errorMsg = err.message || "Google login failed";
      console.error("Auth: Google login error:", errorMsg); // Debug
      setAuthError(errorMsg);
      toast.error(errorMsg);
      setIsLoading(false);
    }
  };

  // Forgot password (placeholder)
  const handleForgotPassword = () => {
    console.log("Auth: Navigating to forgot-password with email:", loginEmail); // Debug
    navigate("/forgot-password", { state: { email: loginEmail } });
  };

  if (loading || isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => navigate("/", { replace: true })}
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
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
          {authError && (
            <p className="text-red-500 text-sm mb-4">{authError}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm mb-4">{successMessage}</p>
          )}
          <Tabs
            defaultValue="login"
            className="w-full"
            onValueChange={(value) => {
              if (value === "login") resetRegisterForm();
              else resetLoginForm();
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Returning Customer</TabsTrigger>
              <TabsTrigger value="register">New Customer</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6 mt-6">
              <div className="space-y-6">
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
                      disabled={isLoading}
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
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        disabled={isLoading}
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
                      <Checkbox id="remember" disabled={isLoading} />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-sm"
                      onClick={handleForgotPassword}
                      disabled={isLoading}
                    >
                      Forgot password?
                    </Button>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    Google
                  </Button>
                  <Button variant="outline" type="button" disabled={isLoading}>
                    Facebook
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="register" className="space-y-6 mt-6">
              <div className="space-y-6">
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
                        disabled={isLoading}
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
                        disabled={isLoading}
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
                      disabled={isLoading}
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
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        disabled={isLoading}
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
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                        disabled={isLoading}
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
                    <Checkbox id="terms" required disabled={isLoading} />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                        type="button"
                        onClick={() => navigate("/terms")}
                        disabled={isLoading}
                      >
                        Terms of Service
                      </Button>{" "}
                      and{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                        type="button"
                        onClick={() => navigate("/privacy")}
                        disabled={isLoading}
                      >
                        Privacy Policy
                      </Button>
                    </Label>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleRegister}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
                    Or register with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    Google
                  </Button>
                  <Button variant="outline" type="button" disabled={isLoading}>
                    Facebook
                  </Button>
                </div>
              </div>
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
