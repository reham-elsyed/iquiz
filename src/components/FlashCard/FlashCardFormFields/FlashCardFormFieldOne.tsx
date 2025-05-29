"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { flashcardFormFieldType } from "@/types/formTypes";
import { UseFormReturn } from "react-hook-form";
import { InputValue } from "./FlashCardForm";

type Props = {
  fieldData: flashcardFormFieldType;
  form: UseFormReturn<InputValue>;
};
const FlashCardFormFieldOne = ({ fieldData, form }: Props) => {
  return (
    <FormField
      control={form.control}
      name={fieldData.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldData.name}</FormLabel>
          <FormControl>
            <Input
              placeholder={fieldData.placeholder || ""}
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                if (fieldData.name === "amount") {
                  // Allow empty string for intermediate states
                  if (value === "") {
                    field.onChange(value); // Update the field with an empty string
                  } else {
                    const numericValue = parseInt(value, 10);
                    if (!isNaN(numericValue)) {
                      field.onChange(numericValue); // Update the field with a valid number
                    }
                  }
                } else {
                  field.onChange(e); // Default behavior for other fields
                }
              }}
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default React.memo(FlashCardFormFieldOne);
