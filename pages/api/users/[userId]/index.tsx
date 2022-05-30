import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";
import { Prisma } from "@prisma/client";
import { ModifiedSession } from "../../../../types/session";
import { BadRequest, InternalError, NoContent, Unauthenticated } from "../../../../utility/http";

const DeleteUserRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session?.user) return Unauthenticated(res);

    // Delete all bios & the user themself
    if (req.method === "DELETE") {
        const id = (session.user as ModifiedSession).id;

        try {
            await prisma.user.delete({ where: { id } });
            return NoContent(res);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === "P2025") {
                    return BadRequest(res, "The specified user does not exist.");
                }
            }
            console.error(e);
            return InternalError(res);
        }
    }
};

export default DeleteUserRoute;
