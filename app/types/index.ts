import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & { createdAt: string; startDate: string; endDate: string; listing: SafeListing };

// creatimg SafeUser that takes string instead of Date
// and calling it from the navbar and userMenu instead of calling User
