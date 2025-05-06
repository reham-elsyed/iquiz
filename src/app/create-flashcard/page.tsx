
import { flashcardFormFieldProps } from '@/types/formTypes';
import CreateFlashcardForm from '@/components/FlashCardFormFields/FlashCardForm';


const formFields: flashcardFormFieldProps= [
  {
    id:1,
    name: "amount",
    desc: "add number of questions min: 3 max: 10",
    type: "number",
  },
  { id:2,name: "topic", desc: "add your Flash Card topic ", type: "text" },
  
];
export default async function CreateFlashcard(){
console.log("create flashcard")             
    
   return(
    <>
    <div className='flex h-screen'>
    <div className='w-1/2 h-full'><CreateFlashcardForm/></div>
<div  className='w-1/2 bg-slate-500'></div>

    </div>
    
    </>
   )
  
}

