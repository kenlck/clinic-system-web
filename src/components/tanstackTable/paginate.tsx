"use client";

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Select } from "../form/selects";
import Input from "../form/input";
import { useEffect, useState } from "react";
import { useDebounceEffect } from "ahooks";
import { DataTableViewOptions } from "./viewOptions";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function Paginate<TData>({
  table,
  pageSizeOptions = [5, 10, 25, 50, 100, 200],
}: DataTablePaginationProps<TData>) {
  const [page, setPage] = useState("1");

  const currentPageIndex = table.getState().pagination.pageIndex + 1;
  useEffect(() => {
    setPage(currentPageIndex.toString());
  }, [currentPageIndex]);

  useDebounceEffect(
    () => {
      table.setPageIndex(Number(page) - 1);
    },
    [page],
    {
      wait: 500,
    }
  );

  return (
    <div className="flex items-center justify-center sm:justify-end gap-4 overflow-auto p-2 flex-row sm:gap-8">
      <div className="flex items-center gap-4 flex-col sm:flex-row sm:gap-6">
        <div className="flex flex-row justify-between sm:justify-end w-full gap-4">
          <div className="flex flex-row items-center gap-x-2">
            Show
            <Select
              options={pageSizeOptions.map((pageSize) => ({
                label: pageSize.toString(),
                value: pageSize.toString(),
              }))}
              value={table.getState().pagination.pageSize.toString()}
              onChange={(value) => {
                table.setPageSize(Number(value));
              }}
            />
          </div>
          <div className="flex items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden h-8 w-8 px-1 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            className="h-8 w-8 px-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <div>
            <Input
              className="text-center"
              value={page}
              min={1}
              max={table.getPageCount()}
              onChange={(e) => {
                setPage(e.target.value);
                // table.setPageIndex(table.getPageCount() - 1);
              }}
            />
          </div>
          <Button
            aria-label="Go to next page"
            variant="outline"
            className="h-8 w-8 px-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            className="hidden h-8 w-8 px-1 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </div>
  );
}
