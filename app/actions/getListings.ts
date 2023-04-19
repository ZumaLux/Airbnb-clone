import React from "react";
import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount, // gte(means >=) +(to convert the string to num)
      };
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount, // gte(means >=) +(to convert the string to num)
      };
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount, // gte(means >=) +(to convert the string to num)
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    // filter out all listing which have reservation on our desired date range
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
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
