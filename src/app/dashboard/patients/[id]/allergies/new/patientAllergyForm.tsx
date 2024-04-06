"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { type PatientAllergyType, createPatientAllergy, editPatientAllergy } from "./action";
import Input from "@/components/form/input";
import Textarea from "@/components/form/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoaderIcon } from "lucide-react";
import type { PatientAllergy } from "@prisma/client";

export function PatientAllergyForm({ patientId, allergy }: { patientId: string; allergy?: PatientAllergy }) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { allergy: PatientAllergyType; patientId: string }) => {
      if (allergy) {
        return editPatientAllergy(allergy.id.toString(), data.allergy);
      }
      return createPatientAllergy(data.patientId, data.allergy);
    },
    onSuccess: () => {
      toast.success("Patient visit created");
      router.push(`/dashboard/patients/${patientId}?tab=allergy`);
    },
    onError: (err) => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  return (
    <form
      className="flex flex-col gap-4 mb-4"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const form = Object.fromEntries(formData.entries());
        const data = {
          allergy: {
            note: form.note as string,
            refCode: form.refCode as string,
            allergyName: form.allergyName as string,
          },
          patientId,
        };
        mutate(data);
      }}
    >
      <Input label="Ref Code" name="refCode" defaultValue={allergy?.refCode ?? ""} />
      <Input label="Name" name="allergyName" defaultValue={allergy?.allergyName ?? ""} />
      <Textarea label="Note" name="note" rows={4} defaultValue={allergy?.note ?? ""} />

      <Button type="submit" disabled={isPending}>
        {isPending ? <LoaderIcon className="size-5 animate-spin" /> : "Save"}
      </Button>
    </form>
  );
}
