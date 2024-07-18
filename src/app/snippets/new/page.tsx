"use client";
import * as actions from "@/actions";
import { useFormState } from "react-dom";

export default function SnippetCreatePage() {
  const createSnippetAction = actions.createSnippet;
  //we gonna get back an array that always has two elements inside of it
  //the two elements inside of the array are the formState and the action
  //they get returned from the hook
  //action is an updated version of our server action returned by the useformstate

  const [formState, action] = useFormState(createSnippetAction, {
    message: "",
  });
  //then we gonna take that retturned action from the form state and pass it to the form instead of original server action

  return (
    <form action={action}>
      <h3 className="font-bold m-3 ">Create a Snippet</h3>
      <div className="flex flex-col gap-4 ">
        <div className="flex gap-4">
          <label className="w-12 " htmlFor="title">
            Title
          </label>
          <input
            className="border rounded p-2 w-full"
            name="title"
            id="title"
            type="text"
            placeholder="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12 " htmlFor="code">
            Code
          </label>
          <textarea
            className="border rounded p-2 w-full"
            name="code"
            id="code"
            placeholder="code"
          />
        </div>
        {formState.message ? <div className="my-2 p-2 bg-red-200 border rounded border-red-400">{formState.message}</div> : null}

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
