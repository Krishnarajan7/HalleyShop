import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Addresses = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You haven't saved any addresses yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Addresses;