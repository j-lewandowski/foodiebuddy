import { authOptions } from "@/utils/authOptions";
import db from "@/utils/prisma";
import { Ranking } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { userId } = session.user;

  const rankings = await db.ranking.findMany({
    where: {
      user: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      restaurant: true,
      user: {
        where: {
          ranking: {
            some: {
              user: {
                some: {
                  id: userId,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!rankings) {
    return NextResponse.json([]);
  }

  const formattedRankings = rankings.map((ranking) => {
    return {
      id: ranking.id,
      name: ranking.name,
      restaurantsCount: ranking.restaurant.length,
      usersCount: ranking.user.length,
    };
  });

  return NextResponse.json(formattedRankings);
}
