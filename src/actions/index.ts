"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

//all functions we export from this file will be server actions

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: {
      id,
    },
    data: {
      code
    },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id:number){
await db.snippet.delete({
  where:{
    id
  }
});

redirect('/')
}
