import { authOptions } from "./../pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error("Not logged in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  console.log(currentUser);

  if (!currentUser) {
    throw new Error("Not logged in");
  }

  return { currentUser };
};

export default serverAuth;
