"use server";

import { prisma } from "@/lib/db.server";
import type { PatientType } from "./form";

export async function savePatient(patient: PatientType, id?: number) {
  console.log(patient);
  if (id) {
    // update
    const pt = await prisma.patient.update({
      where: { id },
      data: patient,
    });
    return !!pt;
  }
  // create
  const pt = await prisma.patient.create({ data: patient });
  return !!pt;
}
