"use server";

import { prisma } from "@/lib/db.server";

export type PatientVisitType = {
  note?: string;
  diagnosis?: string;
};

export async function createPatientVisit(patientId: string, data: PatientVisitType) {
  console.log(data);
  return await prisma.patientVisit.create({
    data: {
      note: data.note,
      diagnosis: data.diagnosis,
      patientId: Number(patientId),
    },
  });
}

export async function editPatientVisit(visitId: string, data: PatientVisitType) {
  console.log(data);
  return await prisma.patientVisit.update({
    where: {
      id: Number(visitId),
    },
    data: {
      note: data.note,
      diagnosis: data.diagnosis,
    },
  });
}
