/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createStickie } from "@/lib/actions";
import { formSchema } from "@/lib/validation";
import MDEditor from '@uiw/react-md-editor';
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";


const StickieForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [details, setDetail] = useState<string>("");
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try{
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                details,
            }
            console.log(formValues);
            await formSchema.parseAsync(formValues);
            const result = await createStickie(prevState, formData, details);
            console.log("The result is", result);
            if(result.status === 'SUCCESS'){
                toast.success("Your stickie has been created successfully");
                router.push(`/board/${result._id}`);
            }
            return result;
        }
        catch(error){
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);
                toast.error("Please check your inputs and try again");
                return {
                    ...prevState,
                    error: "Validation failed",
                    status: "ERROR"
                };
            }

            toast.error("An unexpected error has occurred");

            return {
                ...prevState,
                    error: "An unexpected error has occurred",
                    status: "ERROR"
            }
        }
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    });

    return (
        <form action={formAction} className="startup-form">
            <div>
                <label htmlFor="title"
                className="startup-form_label">Title</label>
                <Input id="title" name="title"
                className="startup-form_input"
                required
                placeholder="Stickie Title"
                />
                {errors.title &&
                <p className="startup-form_error">
                    {errors.title}
                </p>
                }
            </div>

            <div>
                <label htmlFor="description"
                className="startup-form_label">Description</label>
                <Textarea
                id="description"
                name="description"
                className="startup-form_textarea"
                required
                placeholder="Stickie description"
                />
                {errors.description &&
                <p className="startup-form_error">
                    {errors.description}
                </p>
                }
            </div>

            <div>
                <label htmlFor="category"
                className="startup-form_label">Category</label>
                <Input
                id="category"
                name="category"
                className="startup-form_input"
                required
                placeholder="Stickie Category (Books, Tech, Fests, Classes...)"
                />
                {errors.category &&
                <p className="startup-form_error">
                    {errors.category}
                </p>
                }
            </div>

            <div>
                <label htmlFor="link"
                className="startup-form_label">
                    Image URL
                </label>
                <Input
                id="link"
                name="link"
                className="startup-form_input"
                required
                placeholder="Stickie Image URL"
                />
                {errors.link &&
                <p className="startup-form_error">
                    {errors.link}
                </p>
                }
            </div>
            
            <div data-color-mode="light">
                <label htmlFor="details"
                className="startup-form_label">
                    Details
                </label>
                <MDEditor
                    value={details}
                    onChange={(value?: string) => setDetail(value ?? '')}
                    id="details"
                    preview="edit"
                    height={300}
                    style={{borderRadius: 20, overflow: "hidden"}}
                    textareaProps={{
                        placeholder: "Briefly describe your stickie and add any other details you want to share",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }}
                />
                {errors.detail &&
                <p className="startup-form_error">
                    {errors.detail}
                </p>
                }
            </div>
            <Button type="submit"
                className="startup-form_btn"
                disabled={isPending}
            >
                {isPending ? "Creating..." : "Submit your Stickie"}
                <Send className="size-6 ml-2" />
            </Button>

        </form>
    )
}

export default StickieForm