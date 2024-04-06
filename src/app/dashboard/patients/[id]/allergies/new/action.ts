"use server";

import { prisma } from "@/lib/db.server";

export type PatientAllergyType = {
  note?: string;
  refCode?: string;
  allergyName?: string;
};

export async function createPatientAllergy(patientId: string, data: PatientAllergyType) {
  return await prisma.patientAllergy.create({
    data: {
      note: data.note,
      refCode: data.refCode,
      allergyName: data.allergyName ?? "",
      patientId: Number(patientId),
    },
  });
}

export async function editPatientAllergy(allergyId: string, data: PatientAllergyType) {
  console.log(data);
  return await prisma.patientAllergy.update({
    where: {
      id: Number(allergyId),
    },
    data: {
      note: data.note,
      refCode: data.refCode,
      allergyName: data.allergyName ?? "",
    },
  });
}
