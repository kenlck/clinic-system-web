"use client";

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { Gender, type Patient } from "@prisma/client";
import { useState } from "react";
import { z } from "zod";
import { savePatient } from "./action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

// name      String?   @map("name")
// contactNo String?   @map("contact_no")
// email     String?   @map("email")
// gender    Gender?
// dob       DateTime?

// address1   String? @map("address1")
// address2   String? @map("address2")
// city       String? @map("city")
// state      String? @map("state")
// postalCode String? @map("postal_code")
// country    String? @map("country")

const patientSchema = z.object({
  // id: z.number().optional(),
  name: z.string(),
  contactNo: z.string().optional(),
  email: z.string().optional(),
  gender: z.nativeEnum(Gender).optional(),
  dob: z.coerce.date().optional(),

  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

export type PatientType = z.infer<typeof patientSchema>;

export function PatientForm({ patient }: { patient?: Patient }) {
  const initialPatient: PatientType = {
    name: patient?.name ?? "",
    contactNo: patient?.contactNo ?? "",
    email: patient?.email ?? "",
    gender: patient?.gender ?? Gender.MALE,
    dob: patient?.dob ?? undefined,
    address1: patient?.address1 ?? "",
    address2: patient?.address2 ?? "",
    city: patient?.city ?? "",
    state: patient?.state ?? "",
    postalCode: patient?.postalCode ?? "",
    country: patient?.country ?? "",
  };

  const [form, setForm] = useState<Partial<PatientType>>({ ...initialPatient });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { patient: PatientType; id?: number }) => {
      savePatient(data.patient, data.id);
    },
    onSuccess: () => {
      if (patient?.id) {
        toast.success("Patient updated");
        return;
      }
      toast.success("Patient created");
    },
    onError: (err) => {
      toast.error("Something went wrong. Please try again.");
    },
  });
  return (
    <AutoForm
      formSchema={patientSchema}
      values={form}
      onValuesChange={setForm}
      className=""
      onSubmit={(values) => {
        console.log(values);
        mutate({
          patient: values,
          id: patient?.id,
        });
      }}
      fieldConfig={{
        email: { inputProps: { type: "email" } },
      }}
    >
      <AutoFormSubmit disabled={isPending}>
        {isPending ? <LoaderIcon className="h-5 w-5 animate-spin" /> : "Submit"}
      </AutoFormSubmit>
    </AutoForm>
  );
}
