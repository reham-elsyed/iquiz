// File: src/components/Forms/UnifiedMultiStepFormUI.tsx

"use client";
import { FormProvider } from "react-hook-form";
import { BookAIcon, Loader, Hash, LightbulbIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ProgressBar/ProgressBar"; // Assuming the path
import FlashCardFormFieldOne from "@/components/FlashCard/FlashCardFormFields/FlashCardFormFieldOne"; // Reused field component
import { flashcardFormFieldProps, FormFieldsDataType } from "@/types/formTypes"; // Ensure you have this type or define ite
import { TextAtom } from "@/components/TextAtom";

// Define a type for all the props the UI component needs
type UnifiedFormProps = {
    form: any; // The result of useForm
    formFields: FormFieldsDataType; // The array of field objects
    step: number;
    handleBack: () => void;
    handleNext: () => void;
    onSubmit: (e: React.FormEvent) => void; // Form submission handler
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
    currentStepName: string; // Used for dynamic titles/icons
    formTitle: string;
    formDescription: string;
};

// Map step names to icons for dynamic display
const stepIcons: Record<string, React.ReactNode> = {
    amount: <Hash className="w-10 h-10 text-primary" />, // Use Hash for number/amount
    topic: <BookAIcon className="w-10 h-10 text-primary" />, // Use BookAIcon for topic
    default: <LightbulbIcon className="w-10 h-10 text-primary" />, // Default icon
};

export default function UnifiedMultiStepFormUI({
    form,
    formFields,
    step,
    handleBack,
    handleNext,
    onSubmit,
    isPending,
    isError,
    isSuccess,
    currentStepName,
    formTitle,
    formDescription,
}: UnifiedFormProps) {

    // Use currentStepName to dynamically select the icon
    const Icon = stepIcons[currentStepName] || stepIcons.default;

    // Create an on-submit handler that uses the form's handleSubmit and the passed-in onSubmit function
    const handleSubmitWrapper = form.handleSubmit(onSubmit);

    return (
        <>
            {/* 1. Error Message */}
            {isError && (
                <div className="absolute top-0 left-0 right-0 p-3 bg-red-600/10 text-red-500 font-medium z-50 text-center border-b border-red-500/30">
                    <p>⚠️ <TextAtom>form.error</TextAtom></p>
                </div>
            )}

            {/* 2. Loading State */}
            {isPending || isSuccess ? (
                <div className="flex items-center justify-center min-h-screen bg-background/80">
                    <div className="flex flex-col items-center gap-4">
                        <Loader className="animate-spin h-10 w-10 text-primary" aria-label="Loading" />
                        <p className="text-lg text-muted-foreground">
                            <TextAtom>form.generating</TextAtom> {formTitle.toLowerCase()}...
                        </p>
                    </div>
                </div>
            ) : (
                /* 3. Main Content Wrapper */
                <div className="min-h-screen flex items-center justify-center p-8 ">
                    <Card className="
            w-full max-w-xl mx-auto shadow-2xl border-border/50 
            bg-card backdrop-blur-sm overflow-hidden rounded-2xl
          ">

                        {/* Progress Bar */}
                        <div className="pt-8 px-8 pb-3">
                            <ProgressBar
                                value={step + 1}
                                max={formFields.length}
                                size='md'
                                className="rounded-full"
                                variant='default'
                                aria-label={`Step ${step + 1} of ${formFields.length}`}
                            />
                        </div>

                        {/* Card Header (Dynamic Icon/Title) */}
                        <CardHeader className="text-center pb-5 pt-0 px-8">
                            <div className="flex justify-center mb-3">
                                {Icon}
                            </div>
                            <CardTitle className="text-3xl font-extrabold text-foreground"><TextAtom>{formTitle}</TextAtom></CardTitle>
                            <CardDescription className="text-base text-muted-foreground mt-2">
                                <TextAtom> {formDescription}</TextAtom>
                            </CardDescription>
                        </CardHeader>

                        {/* Card Content */}
                        <CardContent className="px-8 pb-8">
                            <FormProvider {...form}>
                                {/* Use handleSubmitWrapper with form.handleSubmit() */}
                                <form onSubmit={handleSubmitWrapper} className="space-y-5">

                                    {/* 4. Current Field Display */}
                                    <div className="py-5 border-y border-border/70">
                                        <FlashCardFormFieldOne
                                            key={currentStepName}
                                            fieldData={formFields[step]}
                                            form={form}
                                        />
                                    </div>

                                    {/* 5. Navigation/CTA Area */}
                                    <div className="flex justify-between items-center pt-3 gap-3">
                                        {/* Back Button */}
                                        {step > 0 && (
                                            <Button
                                                onClick={handleBack}
                                                type="button"
                                                variant="outline"
                                                className="min-w-[100px] border-border/80"
                                                disabled={isPending}
                                            >
                                                ← <TextAtom>buttons.back</TextAtom>
                                            </Button>
                                        )}
                                        {/* Spacer for alignment */}
                                        {step === 0 && <div className="min-w-[100px] invisible">Back</div>}

                                        {/* Next/Submit Buttons */}
                                        {step < formFields.length - 1 ? (
                                            <Button
                                                onClick={handleNext}
                                                type="button"
                                                className="min-w-[150px] bg-primary hover:bg-primary/90 transition-colors"
                                                disabled={isPending}
                                            >
                                                <TextAtom>buttons.nextStep</TextAtom> →
                                            </Button>
                                        ) : (
                                            /* Final Step: Submit Button */
                                            <Button
                                                disabled={isPending}
                                                type="submit"
                                                className="min-w-[150px] bg-green-600 hover:bg-green-700 transition-colors"
                                            >
                                                {isPending ? (
                                                    <Loader className=" h-5 w-5 mr-2" />
                                                ) : (
                                                    <>
                                                        <TextAtom>buttons.generate</TextAtom> {formTitle.split(' ')[0]}
                                                    </>
                                                )}
                                            </Button>
                                        )}
                                    </div>
                                </form>
                            </FormProvider>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}