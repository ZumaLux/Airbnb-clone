import React from "react";
import prisma from "@/app/libs/prismadb";

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    // return listings;
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(), // change it from date to string
      // to fix the warnigng "Only plain objects can passed to Client Components
      // from Server components"
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
