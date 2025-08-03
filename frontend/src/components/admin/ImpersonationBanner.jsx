import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import PageLoader from "@/components/ui/PageLoader";

const ImpersonationBanner = () => {
  const [impersonating, setImpersonating] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("impersonating");
    if (stored) {
      setImpersonating(JSON.parse(stored));
      document.body.style.paddingTop = "48px"; // Shift header
    }

    const handleStorage = () => {
      const updated = localStorage.getItem("impersonating");
      if (updated) {
        setImpersonating(JSON.parse(updated));
        document.body.style.paddingTop = "48px";
      } else {
        setImpersonating(null);
        document.body.style.paddingTop = "0px";
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      document.body.style.paddingTop = "0px";
    };
  }, []);

  const handleExit = () => {
    setLoading(true);

    // Clear impersonation state
    localStorage.removeItem("impersonating");

    setTimeout(() => {
      document.body.style.paddingTop = "0px";
      window.location.href = "/dashboard/admin"; // Redirect after loader
    }, 800); // 800ms for smooth loader
  };

  if (loading) return <PageLoader />;

  if (!impersonating) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-500 text-black flex items-center justify-between px-4 py-2 z-[9999] shadow-md">
      <span>
        You are impersonating <strong>{impersonating.customerName}</strong>
      </span>
      <Button size="sm" variant="destructive" onClick={handleExit}>
        Exit Impersonation
      </Button>
    </div>
  );
};

export default ImpersonationBanner;
