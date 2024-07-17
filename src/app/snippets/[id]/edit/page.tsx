import SnippetEditForm from "@/components/snippet-edit-form";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetEditProps {
  params: {
    id: string;
  };
}
//steps:
//fetch data
//update data (using server action like we did in create snippet)
//show code editor
export default async function SnippetEditPage(props: SnippetEditProps) {
  const id = parseInt(props.params.id);
  //fetch data of the snippet
  const snippet =await db.snippet.findFirst({
    where: {
      id
    },
  });
  if(!snippet) return notFound();

  

  return <div>
    <SnippetEditForm snippet={snippet} />
  </div>;
}
