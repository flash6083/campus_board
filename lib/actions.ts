/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";

export const createStickie = async (
    state: any,
    form: FormData,
    details: string) => {
    
        const session = await auth();
        if(!session) return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR"
        })

        const {title, description, category, link} = Object.fromEntries(
            Array.from(form).filter(([key]) => key !== "detail")
        );

        const slug = slugify(title as string,{
            lower: true,
            strict: true
        });

        try{
            const stickie = {
                title,
                description,
                category,
                image: link,
                details,
                views: 1,
                slug:{
                    _type: slug,
                    current: slug
                },
                author:{
                    _type: "reference",
                    _ref: session?.user?.id
                }
            }

            const result = await writeClient.create({
                _type: "stickie",
                ...stickie
            })

            return parseServerActionResponse({
                ...result,
                error: "",
                status: "SUCCESS"
            })

        }catch(error){
            console.error(error);
            return parseServerActionResponse({
                error: JSON.stringify(error),
                status: "ERROR"
            })
        }
}