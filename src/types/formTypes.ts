export interface FormField {
    name: "amount" | "topic" | "type";
    desc: string;
    type: string;
  }

export type FormFieldsType = FormField[]