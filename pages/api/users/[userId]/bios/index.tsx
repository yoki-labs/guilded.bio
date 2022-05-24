import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

const CreateDefaultBioRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const content = req.body.content as string | undefined;
        if (!content) return res.status(400).json({ error: { message: "You must provide content to set this bio to!" } });

        // "this is a placeholder for now until i get auth in place"
        const nico = await prisma.user.findFirst({ where: { userId: "pmbOB8VA" } });
        try {
            const bio = await prisma.bio.create({
                data: {
                    content,
                    authorId: nico!.id,
                },
            });
            await prisma.user.update({ where: { id: nico!.id }, data: { defaultBioId: bio.id } });
            return res.status(200).json({
                bio,
                success: true,
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: { message: "Internal error." } });
        }
    }
};

export default CreateDefaultBioRoute;
