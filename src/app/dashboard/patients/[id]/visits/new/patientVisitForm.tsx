"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { type PatientVisitType, createPatientVisit, editPatientVisit } from "./action";
import Input from "@/components/form/input";
import Textarea from "@/components/form/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { PatientVisit } from "@prisma/client";
import { LoaderIcon } from "lucide-react";

export function PatientVisitForm({ patientId, visit }: { patientId: string; visit?: PatientVisit }) {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { patientVisit: PatientVisitType; patientId: string }) => {
      if (visit?.id) {
        return editPatientVisit(visit?.id.toString(), data.patientVisit);
      }
      return createPatientVisit(data.patientId, data.patientVisit);
    },
    onSuccess: () => {
      toast.success("Patient visit created");
      router.push(`/dashboard/patients/${patientId}`);
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
          patientVisit: {
            note: form.note as string,
            diagnosis: form.diagnosis as string,
          },
          patientId,
        };
        mutate(data);
      }}
    >
      <Textarea label="Note" name="note" rows={4} defaultValue={visit?.note ?? ""} />
      <Textarea label="Diagnosis" name="diagnosis" rows={4} defaultValue={visit?.diagnosis ?? ""} />

      <Button type="submit" disabled={isPending}>
        {isPending ? <LoaderIcon className="size-5 animate-spin" /> : "Save"}
      </Button>
    </form>
  );
}
