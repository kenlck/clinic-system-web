"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";

export function PatientForm() {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    favouriteNumber: z.number().int().min(1).max(10),
    acceptTerms: z.boolean(),
    birthday: z.date(),
    sendMeMails: z.boolean(),
    bio: z.string(),
    marshmallows: z.enum(["yes", "no"]),
    customParent: z.string(),
    file: z.string(),
  });

  return (
    <AutoForm
      formSchema={formSchema}
      className=""
      onSubmit={console.log}
      fieldConfig={{
        password: {
          inputProps: {
            type: "password",
            placeholder: "••••••••",
          },
        },
        favouriteNumber: {
          description: "Your favourite number between 1 and 10.",
        },
        acceptTerms: {
          inputProps: {
            required: true,
          },
          description: (
            <>
              I agree to the{" "}
              <button
                type="button"
                className="text-primary underline"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Terms and conditions clicked.");
                }}
              >
                terms and conditions
              </button>
              .
            </>
          ),
        },

        birthday: {
          description: "We need your birthday to send you a gift.",
        },

        sendMeMails: {
          fieldType: "switch",
        },

        bio: {
          fieldType: "textarea",
        },

        marshmallows: {
          fieldType: "radio",
        },

        customParent: {
          renderParent: ({ children }) => (
            <div className="flex items-end gap-3">
              <div className="flex-1">{children}</div>
              <div>
                <Button type="button">Check</Button>
              </div>
            </div>
          ),
        },

        file: {
          fieldType: "file",
        },
      }}
    >
      <AutoFormSubmit>Send now</AutoFormSubmit>
    </AutoForm>
  );
}
