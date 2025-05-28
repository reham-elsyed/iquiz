import { flashcardFormFieldProps } from "@/types/formTypes";
import CreateFlashcardForm from "@/components/FlashCardFormFields/FlashCardForm";


export default async function CreateFlashcard() {
  console.log("create flashcard");

  return (
    <>
      <div className="flex h-screen">
        <div className="w-full lg:w-1/2 h-full">
          <CreateFlashcardForm />
        </div>
        <div className="lg:w-1/2 bg-slate-500"></div>
      </div>
    </>
  );
}
