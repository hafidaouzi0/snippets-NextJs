"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
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
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id:number){
await db.snippet.delete({
  where:{
    id
  }
});
revalidatePath('/');

redirect('/')
}

export async function createSnippet(formState:{message:string},formData: FormData) {
  //this is a server action!
    //check user's inputs and make sure they are valid
    try{
  const title = formData.get("title") ;
  const code = formData.get("code");
  if(typeof title !== 'string' || title.length <3){
    return {
      message:'Title must be at least 3 characters long',
    }
  }
  if(typeof code !== 'string' || code.length <10){
    return {
      message:'Code must be at least 10 characters long',
    }
    
  }
  

   //create a new record in the database
 await db.snippet.create({
    data: {
      title,
      code,
    },
  });
  //handel error example 
//throw new Error('Failed to save to database!');
 
  
}
catch(err:unknown){
  if(err instanceof Error){
    return {
      message:err.message
    }
  }
  else{
    return {
      message:'Something went wrong'
    }
  }
}
revalidatePath('/');

//always put your redirect outside of the try catch
 //Redirect the user bcak to the root route
redirect('/'); 
}
