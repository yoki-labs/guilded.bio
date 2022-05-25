import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

const BioRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "PUT") {
        const content = req.body.content as string | undefined;
        if (!content) return res.status(400).json({ error: { message: "You must provide content to set this bio to!" } });
        const bioId = parseInt(req.query.bioId as string);
        if (Number.isNaN(bioId)) return res.status(400).json({ error: { message: "Invalid bio ID." } });

        const bio = await prisma.bio.findFirst({ where: { id: bioId } }).catch(() => null);
        if (!bio) return res.status(400).json({ error: { message: "Body not found." } });

        try {
            await prisma.bio.updateMany({ where: { id: bio.id }, data: { content } });
            return res.status(200).json({ success: true });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: { message: "Internal error." } });
        }
    }
};

export default BioRoute;
