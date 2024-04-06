import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/db.server";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

export async function PatientInfo({ patientId, edit }: { patientId: string; edit?: boolean }) {
  const patient = await prisma.patient.findUnique({
    where: { id: Number(patientId) },
  });

  if (!patient) {
    return null;
  }

  return (
    <div className="">
      <Card className="">
        <div className="container px-4 py-4 grid">
          <div className="space-y-2 text-center md:order-2 md:text-left md:space-y-4">
            <div className="flex flex-row justify-between">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">{patient.name}</h2>
              {edit && (
                <Link href={`/dashboard/patients/${patient.id}/edit`}>
                  <Button variant="ghost">
                    <PencilIcon className="size-5 text-gray-500" />
                  </Button>
                </Link>
              )}
            </div>
            <div className="space-y-2 text-sm md:text-base">
              <dl className="grid grid-cols-3 gap-1">
                <div>Contact No</div>
                <div className="col-span-2">
                  <Link className="font-medium underline underline-offset-2" href={`tel:${patient.contactNo}`}>
                    {patient.contactNo}
                  </Link>
                </div>
                <div>Email</div>
                <div className="col-span-2">
                  <Link className="font-medium underline underline-offset-2" href={`mailto:${patient.email}`}>
                    {patient.email}
                  </Link>
                </div>
                <div>Location</div>
                <div className="grid gap-1 col-span-2">
                  <div>Home</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {patient.address1}
                    {patient.address2 && (
                      <>
                        <br />
                        {patient.address2}
                      </>
                    )}{" "}
                    {patient.city && (
                      <>
                        <br />
                        {patient.postalCode} {patient.city}
                      </>
                    )}
                    {patient.state && (
                      <>
                        <br />
                        {patient.state}
                      </>
                    )}
                    {patient.country && (
                      <>
                        <br />
                        {patient.country}
                      </>
                    )}
                  </div>
                </div>
              </dl>
            </div>
          </div>
          <div className="flex items-center justify-center md:order-1" />
        </div>
      </Card>
    </div>
  );
}
