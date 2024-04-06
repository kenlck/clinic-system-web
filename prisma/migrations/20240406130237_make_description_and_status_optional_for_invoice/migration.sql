/*
  Warnings:

  - Added the required column `quantity` to the `invoice_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `invoice_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoice_items" ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "unitPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "patient_visit_id" INTEGER,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_patient_visit_id_fkey" FOREIGN KEY ("patient_visit_id") REFERENCES "patient_visits"("id") ON DELETE SET NULL ON UPDATE CASCADE;
