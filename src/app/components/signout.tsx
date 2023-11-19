"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";

export default function SignOutButton() {
  const { data: session, status } = useSession();

  return <button onClick={async () => await signOut()}>Sign Out</button>;
}
