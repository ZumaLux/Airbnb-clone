import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    console.log("id -->> ", reservationId);
    console.log("id type -->> ", typeof reservationId);
    console.log("params -->> ", params);
    throw new Error("Invalid ID");
  }

  const reservation = await prisma.reservation.deleteMany({
    // ensure that the person trying to delete the reservation is either
    // the creator of the reservation or the owner of the place
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
