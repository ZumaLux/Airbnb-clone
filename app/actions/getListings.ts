import React from "react";
import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId } = params;
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
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
