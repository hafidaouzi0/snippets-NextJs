import { PrismaClient } from "@prisma/client";

//create a prsima client to access our database

export const db = new PrismaClient();

db.snippet.create({
    data: {
        title: "title",
        code: "const abc=()=>{}",
    },
})