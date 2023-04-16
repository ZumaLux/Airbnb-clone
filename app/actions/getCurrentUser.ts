import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

// This is not an API call its an direct connection to the database
// so we dont want to throw errors to unnecesary break it
// we are gona use conditional

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    // this is how we get our session in our server components
    const session = await getSession();

    // check if the session is correct
    if (!session?.user?.email) {
      return null;
    }

    // find the current user
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    // if there is not current user
    if (!currentUser) return null;

    // if all the checks have passed
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}
