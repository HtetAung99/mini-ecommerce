"use client";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
// loc = {
//   address: {
//     address1: "TW20 0LG",
//     address2: "Englefield Green, Egham",
//     aptOrSuite: "",
//     eaterFormattedAddress: "Englefield Green, Egham TW20 0LG, UK",
//     subtitle: "Englefield Green, Egham",
//     title: "TW20 0LG",
//     uuid: "",
//   },
//   latitude: 51.436864,
//   longitude: -0.5631267999999999,
//   reference: "ChIJv9dj26lwdkgRXSUYxRc-O44",
//   referenceType: "google_places",
//   type: "google_places",
//   addressComponents: {
//     city: "Egham",
//     countryCode: "GB",
//     firstLevelSubdivisionCode: "England",
//     postalCode: "TW20 0LG",
//   },
//   categories: ["postal_code"],
//   originType: "user_autocomplete",
//   source: "manual_auto_complete",
//   userState: "Unknown",
// };
