"use server";

import { prisma } from "@/lib/db.server";

export async function getPatientVisit(patientId: string, searchParams: SearchParams) {
  const page = Number(searchParams.page) || 1;
  const size = Number(searchParams.size) || 10;
  const sort = (searchParams.sort as string) || undefined;
  const sortDirection = searchParams.sortDirection || undefined;

  let orderBy: SearchParams = {
    createdAt: "desc",
  };
  if (sort && sortDirection) {
    // sort
    orderBy = {
      [sort]: sortDirection === "asc" ? "asc" : "desc",
    };
  }

  const data = await prisma.patientVisit.findMany({
    where: {
      patientId: Number(patientId),
    },
    orderBy: {
      ...orderBy,
    },
    skip: (page - 1) * size,
    take: size,
  });

  const count = await prisma.patientVisit.count({
    where: {
      patientId: Number(patientId),
    },
  });

  const pageCount = Math.ceil(count / size);

  return {
    data,
    pageCount,
  };
}

export async function getPatientAllergies(patientId: string, searchParams: SearchParams) {
  const page = Number(searchParams.page) || 1;
  const size = Number(searchParams.size) || 10;
  const sort = (searchParams.sort as string) || undefined;
  const sortDirection = searchParams.sortDirection || undefined;

  let orderBy: SearchParams = {
    createdAt: "desc",
  };
  if (sort && sortDirection) {
    // sort
    orderBy = {
      [sort]: sortDirection === "asc" ? "asc" : "desc",
    };
  }

  const data = await prisma.patientAllergy.findMany({
    where: {
      patientId: Number(patientId),
    },
    orderBy: {
      ...orderBy,
    },
    skip: (page - 1) * size,
    take: size,
  });

  const count = await prisma.patientAllergy.count({
    where: {
      patientId: Number(patientId),
    },
  });

  const pageCount = Math.ceil(count / size);

  return {
    data,
    pageCount,
  };
}
