import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding ...`);
    const users = await prisma.user.createMany({
        data: [
            {
                userId: "pmbOB8VA",
                email: "nico@guilded.bio",
            },
            {
                userId: "EdVMVKR4",
                email: "shay@guilded.bio",
            },
            {
                userId: "0mqNyllA",
                email: "panku@guilded.bio",
            },
        ],
    });
    console.log(`Created ${users.count} users.`);
    const nico = await prisma.user.findFirst({ where: { email: "nico@guilded.bio" } });
    const nicoDefaultBio = await prisma.bio.create({
        data: {
            authorId: nico!.id,
            content: "This is a default bio!",
        },
    });
    await prisma.user.update({ where: { id: nico!.id }, data: { defaultBioId: nicoDefaultBio.id } });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
