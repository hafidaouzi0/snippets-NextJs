import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as actions from "@/actions";
interface SnippetShowProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPAge(props: SnippetShowProps) {
  //artificial little pause
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(props);
  const id = parseInt(props.params.id);
  const snippet = await db.snippet.findFirst({
    where: {
      id: id,
    },
  });

  if (!snippet) return notFound();

  const deleteSnippetAction=actions.deleteSnippet.bind(null,snippet.id);

  return (
    <div>
      <div className="flex justify-between items-center m-2">
        <h1 className="text-xl font-bold">{snippet?.title}</h1>
        <div className="flex gap-4">
          <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded" >Edit</Link>
          <form action={deleteSnippetAction}>
          <button  className="p-2 border rounded" >Delete</button>

          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet?.code}</code>
      </pre>
    </div>
  );
}

//when we run our build command this will be called automatically
export async function generateStaticParams() {
const snippets=await db.snippet.findMany();
return snippets.map((snippet)=>{
  return {
    id:snippet.id.toString()
  }
})

}
