"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CopyCheck, BookOpen, Flashlight } from "lucide-react";
import { TextAtom } from "@/components/TextAtom";
import { useTranslation } from "react-i18next";

export default function AnimatedFormField({ form, fieldData, step }: any) {
  const { t } = useTranslation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={fieldData.name}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full"
      >
        <FormField
          control={form.control}
          name={fieldData.name}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="capitalize"><TextAtom>{fieldData.label || fieldData.name}</TextAtom></FormLabel>

              <FormControl>
                {fieldData.type === "radio_button_group" ? (
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    className="flex flex-col gap-3 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mcq" id="mcq" />
                      <label htmlFor="mcq" className="flex items-center gap-2 cursor-pointer">
                        <CopyCheck className="w-4 h-4" /> <TextAtom textVariantComponent="span" className="text-sm">flashCard:mcq</TextAtom>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="open_ended" id="open_ended" />
                      <label htmlFor="open_ended" className="flex items-center gap-2 cursor-pointer">
                        <BookOpen className="w-4 h-4" /> <TextAtom textVariantComponent="span" className="text-sm">flashCard:openEnded</TextAtom>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="flash_card" id="flash_card" />
                      <label htmlFor="flash_card" className="flex items-center gap-2 cursor-pointer">
                        <Flashlight className="w-4 h-4" /> <TextAtom textVariantComponent="span" className="text-sm">flashCard:flashCard</TextAtom>
                      </label>
                    </div>
                  </RadioGroup>
                ) : (
                  <Input
                    type={fieldData.type || "text"}
                    placeholder={t(fieldData.placeholder) || ""}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (fieldData.type === "number") {
                        if (value === "") field.onChange("");
                        else {
                          const num = parseInt(value, 10);
                          if (!isNaN(num)) field.onChange(num);
                        }
                      } else {
                        field.onChange(e.target.value);
                      }
                    }}
                    className="mt-2"
                  />
                )}
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
    </AnimatePresence>
  );
}
