"use client";

import { useState } from "react";

export const useFormStatus = () => {
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startSubmit = () => {
    setIsPending(true);
    setErrorMessage(null);
  };

  const setError = (message: string) => {
    setErrorMessage(message);
  };

  const finishSubmit = () => {
    setIsPending(false);
  };

  return {
    isPending,
    errorMessage,
    startSubmit,
    setError,
    finishSubmit,
  };
};
