import { PrismaClient } from "../../src/generated/prisma";
import UserSeeder from "./user";
import PostSeeder from "./post";
import CommentSeeder from "./comment";

const prisma = new PrismaClient();

async function main() {
  try {
    await UserSeeder();
    await PostSeeder();
    await CommentSeeder();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
main();
