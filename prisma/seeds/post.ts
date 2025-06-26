import { PrismaClient } from "../../src/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function PostSeeder() {
  const data: { content: string; userId: number }[] = [];
  for (let i = 0; i < 20; i++) {
    const content = faker.lorem.paragraph();
    const userId = faker.number.int({ min: 1, max: 10 });
    data.push({ content, userId });
  }
  console.log("Post seeding started...");
  await prisma.post.createMany({ data });
  console.log("Post seeding done.");
}

export default PostSeeder;
