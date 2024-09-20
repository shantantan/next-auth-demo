import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const main = async () => {
  const name = "アリス";
  const email = "alice@prisma.io";
  const password = await bcrypt.hash("1234", 8);

  const result = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name,
      email,
      password,
    },
  });

  console.log(result);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
