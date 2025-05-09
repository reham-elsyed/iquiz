export interface FormField {
  name: "amount" | "topic" | "type";
  desc: string;
  type: string;
}

export type FormFieldsType = FormField[];

export type flashcardFormFieldType = {
  id: number;
  name: "amount" | "topic" | "type";
  desc: string;
  type: string;
};
export type flashcardFormFieldProps = flashcardFormFieldType []
