"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);
  return (
    <Alert>
      <AlertTitle>
        {/* permission error */}
        {error.name}
      </AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
}
