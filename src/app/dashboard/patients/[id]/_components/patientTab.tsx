"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { PatientVisits } from "./patientVisits";
import { useSearchParams } from "next/navigation";
import { PatientAllergies } from "./patientAllergies";
import { PatientInvoices } from "./patientInvoices";

export function PatientTab({ patientId }: { patientId: string }) {
  const sp = useSearchParams();
  const searchParams = Object.fromEntries(sp.entries());
  const [value, setValue] = useState("history");

  useEffect(() => {
    if (searchParams.tab === "allergy" || searchParams.tab === "history" || searchParams.tab === "invoice") {
      setValue(searchParams.tab);
    }
  }, [searchParams.tab]);

  return (
    <Tabs
      value={value}
      onValueChange={(v) => {
        setValue(v);
      }}
      className="my-4"
    >
      <div className="flex flex-row justify-between">
        <TabsList>
          <TabsTrigger value="history">Visit History</TabsTrigger>
          <TabsTrigger value="allergy">Allergies</TabsTrigger>
          <TabsTrigger value="invoice">Invoices</TabsTrigger>
        </TabsList>
        {value === "history" && (
          <Link href={`/dashboard/patients/${patientId}/visits/new`}>
            <Button size="sm">New Visit</Button>
          </Link>
        )}
        {value === "allergy" && (
          <Link href={`/dashboard/patients/${patientId}/allergies/new`}>
            <Button size="sm">New Allergy</Button>
          </Link>
        )}
        {value === "invoice" && (
          <Link href={`/dashboard/patients/${patientId}/invoices/new`}>
            <Button size="sm">New Invoice</Button>
          </Link>
        )}
      </div>
      <TabsContent value="history">
        <Suspense>
          <PatientVisits patientId={patientId} />
        </Suspense>
      </TabsContent>
      <TabsContent value="allergy">
        <Suspense>
          <PatientAllergies patientId={patientId} />
        </Suspense>
      </TabsContent>
      <TabsContent value="invoice">
        <Suspense>
          <PatientInvoices patientId={patientId} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
