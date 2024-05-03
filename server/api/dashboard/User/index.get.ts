import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  // console.log(session)
  const Email = session?.user?.email as string;

  if (Email) {
    try {
      const CheckAdmin = await prisma.user.findUnique({
        where: {
          email: Email,
        },
      });

      if (!CheckAdmin?.admin) {
        console.log("Not Admin");
        return ({
          statusCode: 401,
          statusMessage: "Nice try. You're not an admin"
        });
      } else if (CheckAdmin?.admin) {
        try {
          const users = await prisma.user.findMany();
          return ({
            statusCode: 200,
            statusMessage: "Success",
            data: users
          });
        } catch (error) {
          console.log(error);
          return error;
        }
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
});
