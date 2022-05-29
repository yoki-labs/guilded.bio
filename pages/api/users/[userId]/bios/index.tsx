import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../../lib/prisma";
import { ModifiedSession } from "../../../../../types/session";
import { BadRequest, InternalError, Ok, Unauthenticated } from "../../../../../utility/http";

const CreateDefaultBioRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (!session?.user) return Unauthenticated(res);

    if (req.method === "POST") {
        const content = req.body.content as string | undefined;
        if (!content) return BadRequest(res, "You must provide content to set this bio to!");
        const authorId = (session.user as ModifiedSession).id;

        try {
            const bio = await prisma.bio.create({
                data: {
                    content,
                    authorId: authorId,
                },
            });
            await prisma.user.update({ where: { userId: authorId }, data: { defaultBioId: bio.id } });
            return Ok(res, { bio });
        } catch (e) {
            console.error(e);
            return InternalError(res);
        }
    }
};

export default CreateDefaultBioRoute;
