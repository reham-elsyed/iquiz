import { flashcardFormFieldProps } from "@/types/formTypes";
import CreateFlashcardForm from "@/components/FlashCard/FlashCardFormFields/FlashCardForm";


export default async function CreateFlashcard() {
  console.log("create flashcard");

  return (
    <>
      <div className="">
        <div className="h-[calc(100vh-4rem)] ">
          <CreateFlashcardForm />
        </div>
        <div className=""></div>
      </div>
    </>
  );
}
