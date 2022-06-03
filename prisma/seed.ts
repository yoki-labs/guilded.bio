import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding ...`);
    const users = await prisma.user.createMany({
        data: [
            {
                id: "pmbOB8VA",
                email: "nico@guilded.bio",
                flairInfos: [],
            },
            {
                id: "EdVMVKR4",
                email: "shay@guilded.bio",
                flairInfos: [],
            },
            {
                id: "0mqNyllA",
                email: "panku@guilded.bio",
                flairInfos: [],
            },
        ],
    });
    console.log(`Created ${users.count} users.`);
    const panku = await prisma.user.findFirst({ where: { email: "panku@guilded.bio" } });
    const pankuDefaultBio = await prisma.bio.create({
        data: {
            authorId: panku!.id,
            content: "This is a default bio!",
        },
    });
    await prisma.user.update({ where: { id: panku!.id }, data: { defaultBioId: pankuDefaultBio.id } });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
