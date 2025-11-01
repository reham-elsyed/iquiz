// File: src/components/FlashCard/FlashCardFormFields/FlashCardFormFieldOne.tsx

"use client";
import React from "react";
import {
    FormControl,
    FormDescription, // Added for better UX
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button"; // Need button for the radio group
import { BookOpen, CopyCheck } from "lucide-react"; // Need icons for the radio buttons
import { flashcardFormFieldType, FormFieldsDataType } from "@/types/formTypes"; // Using the generic FormFieldData type
import { UseFormReturn } from "react-hook-form";
//import { InputValue } from "@/types/formTypes"; // Assuming InputValue is now exported from a central types file
import { quizCreationSchema } from "@/app/schemas/formSchema/quizSchema";
import { z } from "zod";
export type InputValue = z.infer<typeof quizCreationSchema>;
// Ensure fieldData has a name property compatible with the form keys
// Extend the form field type to include an optional `type` field used by this UI
type FormFieldWithName = FormFieldsDataType & { name: keyof InputValue; type?: string; label?: string; desc?: string; placeholder?: string; };
// Update Props to be generic and flexible
type Props = {
    // Use FormFieldData (which should combine your flashcardFormFieldProps and FormFieldsType)
    fieldData: FormFieldWithName;
    form: UseFormReturn<InputValue>;
}
const FormFieldUI = ({ fieldData, form }: Props) => {
    const currentFieldValue = form.watch(fieldData.name as keyof InputValue);

    // --- RENDER LOGIC FOR RADIO BUTTON GROUP (Quiz Type) ---
    if (fieldData.type === "radio_button_group") {
        const isMCQ = currentFieldValue === "mcq";
        const isOpenEnded = currentFieldValue === "open_ended";

        return (
            <FormItem className="space-y-4">
                <FormLabel className="text-lg font-semibold">{fieldData.label || fieldData.name}</FormLabel>
                <FormDescription>{fieldData.desc}</FormDescription>
                <div className="flex gap-3 justify-between">

                    {/* Button 1: MCQ */}
                    <Button
                        type="button"
                        onClick={() => form.setValue(fieldData.name, "mcq" as any, { shouldValidate: true })}
                        variant={isMCQ ? "default" : "outline"} // Use outline for secondary for better contrast
                        className="w-1/2 min-h-[50px] flex-col py-6"
                    >
                        <CopyCheck className="w-5 h-5 mb-1" /> Multiple Choice
                    </Button>

                    {/* Button 2: Open Ended */}
                    <Button
                        type="button"
                        onClick={() => form.setValue(fieldData.name, "open_ended" as any, { shouldValidate: true })}
                        variant={isOpenEnded ? "default" : "outline"}
                        className="w-1/2 min-h-[50px] flex-col py-6"
                    >
                        <BookOpen className="w-5 h-5 mb-1" /> Open Ended
                    </Button>
                </div>
                <FormMessage />
            </FormItem>
        );
    }

    // --- RENDER LOGIC FOR TEXT AND NUMBER INPUTS ---
    return (
        <FormField
            control={form.control}
            name={fieldData.name as keyof InputValue}
            render={({ field }) => (
                <FormItem>
                    {/* Use the label from fieldData if available, otherwise fallback to name */}
                    <FormLabel className="capitalize">{fieldData.label || fieldData.name}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder={fieldData.placeholder || ""}
                            {...field}
                            // Set input type dynamically
                            type={fieldData.type === "number" ? "number" : "text"}

                            // Handle change logic consistently
                            onChange={(e) => {
                                const value = e.target.value;
                                if (fieldData.name === "amount") {
                                    // If input is empty, clear the form value
                                    if (value === "") {
                                        field.onChange("");
                                    } else {
                                        // Try to parse as integer
                                        const numericValue = parseInt(value, 10);
                                        // Only update if it's a valid number
                                        if (!isNaN(numericValue)) {
                                            field.onChange(numericValue);
                                        }
                                    }
                                } else {
                                    // Standard text field update
                                    field.onChange(value);
                                }
                            }}
                            // Ensure value is correctly formatted for display (handles number type properly)
                            value={field.value === undefined || field.value === null ? "" : field.value}
                        />
                    </FormControl>
                    {/* Add form description here */}
                    {fieldData.desc && <FormDescription>{fieldData.desc}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormFieldUI;