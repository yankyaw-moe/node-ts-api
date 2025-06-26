import { PrismaClient } from "../../src/generated/prisma";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function UserSeeder() {
  const users: {
    name: string;
    username: string;
    bio: string;
    password: string;
  }[] = [];

  const password = await bcrypt.hash("password", 10);
  console.log("User seeding started...");

  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const username = `${firstName}${lastName[0]}`.toLocaleLowerCase();
    const bio = faker.person.bio();

    users.push({ name, username, bio, password });
  }

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log("User seeding done.");
}

export default UserSeeder;
