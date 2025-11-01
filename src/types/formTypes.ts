export interface FormField {
  name: "amount" | "topic" | "type";
  desc: string;
  type: string;
}

export type FormFieldsDataType = flashcardFormFieldType[];

export type flashcardFormFieldType = {
  id: number;
  name: "amount" | "topic" | "type";
  desc: string;
  type: string;
  placeholder?: string;
  label: string;
};
export type flashcardFormFieldProps = flashcardFormFieldType[];
