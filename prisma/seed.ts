import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        userId: "pmbOB8VA",
        email: "nico@guilded.bio",
        bios: {
            create: {
                serverId: "4R56dNkl",
                content: "THIS IS A TEST BIO!!!!",
            },
        },
    },
    {
        userId: "EdVMVKR4",
        email: "shay@guilded.bio",
        bios: {
            create: {
                serverId: "4R56dNkl",
                content: "THIS IS A TEST BIO2!!!!",
            },
        },
    },
    {
        userId: "0mqNyllA",
        email: "panku@guilded.bio",
        defaultBioContent: "this is a default bio content",
        bios: {
            create: {
                serverId: "4R56dNkl",
                content: "THIS IS A TEST BIO3!!!!",
            },
        },
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
