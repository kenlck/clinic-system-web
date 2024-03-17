import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { PatientForm } from "./autoform";

export default function Page() {
  return (
    <div>
      Form
      <PatientForm />
    </div>
  );
}
