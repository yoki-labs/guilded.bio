import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { ModifiedSession } from "../../../../../types/session";
import { BadRequest, InternalError, Ok, Unauthenticated, Unauthorized } from "../../../../../utility/http";

const BioRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session?.user) return Unauthenticated(res);

    if (req.method === "PUT") {
        const content = req.body.content as string | undefined;
        if (!content) return BadRequest(res, "You must provide content to set this bio to!");

        const bioId = parseInt(req.query.bioId as string);
        if (Number.isNaN(bioId)) return BadRequest(res, "Invalid bio ID.");

        const bio = await prisma.bio.findFirst({ where: { id: bioId } }).catch(() => null);
        if (!bio) return BadRequest(res, "Bio not found.");

        if (bio.authorId !== (session.user as ModifiedSession).id) return Unauthorized(res);
        try {
            await prisma.bio.updateMany({ where: { id: bio.id }, data: { content } });
            return Ok(res, { bio });
        } catch (e) {
            console.error(e);
            return InternalError(res);
        }
    }
};

export default BioRoute;
