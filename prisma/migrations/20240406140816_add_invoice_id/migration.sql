-- AlterTable
ALTER TABLE invoices
ADD COLUMN invoice_id TEXT GENERATED ALWAYS AS (
    'INV' || LPAD(id::TEXT, 5, '0')
) STORED;
