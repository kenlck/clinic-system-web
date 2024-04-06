"use client";

import {
  type ColumnDef,
  type PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Paginate } from "./paginate";

import { Table as TTable, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DataTableColumnHeader } from "./columnHeader";
import { cn, makeSpace } from "@/lib/utils";
import { useDebounceFn } from "ahooks";
// import { DataTablePagination } from "./dataTablePagination";

export type SortAndPaginateState = {
  size: number;
  page: number;
  sort: string;
  sortDirection: string;
};

type DataTableProps<TData, TValue> = {
  columns?: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  pageSizeOptions?: number[];
  onRowClick?: (row: TData) => void;
  onSortAndPaginateChange?: (state: SortAndPaginateState) => void;
  sizeKey?: string;
  pageKey?: string;
  sortKey?: string;
  pageState?: number;
  defaultSize?: number;
  excludeColumns?: string[];
  excludeSorting?: string[];
  enablePagination?: boolean;
  href?: string;
};

export function Table<TData, TValue>({
  columns,
  data,
  pageCount,
  defaultSize = 10,
  onRowClick,
  onSortAndPaginateChange,
  sizeKey = "size",
  pageKey = "page",
  sortKey = "sort",
  pageSizeOptions = [5, 10, 25, 50, 100, 200],
  excludeColumns,
  excludeSorting,
  enablePagination = true,
  pageState,
  href,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mount, setMount] = useState(false);
  let tableColumns = columns ?? [];
  if (!columns && data.length > 0) {
    const keys = Object.keys(data[0] ?? {});
    tableColumns = keys
      .map((k) => {
        if (excludeColumns?.includes(k)) {
          return;
        }
        return {
          accessorKey: k,
          header: makeSpace(k),
          enableSorting: !excludeSorting?.includes(k),
        };
      })
      .filter((v) => v !== undefined) as ColumnDef<TData, TValue>[];
  }
  // search params
  const page = searchParams?.get(pageKey) ?? 1; // default is page: 1
  const size = searchParams?.get(sizeKey); // default 5 record per page

  const sort = searchParams?.get(sortKey);
  const sortDirection = searchParams?.get(`${sortKey}Direction`);

  // debounce push search params
  const debouncedPushSearchParams = useDebounceFn(
    (pageIndex, pageSize, sortingState) => {
      router.push(
        `${pathname}?${createQueryString({
          [pageKey]: pageIndex + 1,
          [sizeKey]: pageSize,
          [sortKey]: sortingState[0]?.id,
          [`${sortKey}Direction`]: sortingState[0]?.id ? (sortingState[0]?.desc ? "desc" : "asc") : null,
        })}`
      );
    },
    { wait: 50 }
  );
  // create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());
      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === undefined) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );
  useEffect(
    () => {
      if (pageState && pageState - 1 !== pageIndex) {
        table.setPageIndex(pageState - 1);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageState]
  );

  // handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: Number(page ?? 0) - 1,
    pageSize: Number(size ?? defaultSize),
  });

  const [sortingState, setSortingState] = useState<SortingState>([]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    setMount(true);
  }, []);
  // set sorting state based on search params
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (sort) {
      setSortingState([
        {
          id: sort,
          desc: sortDirection === "desc",
        },
      ]);
      setPagination({
        pageIndex: 0,
        pageSize,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, sortDirection]);

  useEffect(() => {
    if (page) {
      setPagination({
        pageIndex: Number(page ?? 1) - 1,
        pageSize: Number(size ?? defaultSize),
      });
    }
  }, [defaultSize, page, size]);

  // changed the route as well
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (pageIndex === -1) return;
    // console.log(page, size, sort, sortDirection);
    // not default value: 0 0 [] undefined
    if (!mount) return;
    // console.log("onSortAndPaginateChange");
    // console.log(pageIndex, pageSize, sortingState);
    if (onSortAndPaginateChange) {
      onSortAndPaginateChange({
        page: pageIndex + 1,
        size: pageSize,
        sort: sortingState[0]?.id ?? "",
        sortDirection: sortingState[0]?.id ? (sortingState[0]?.desc ? "desc" : "asc") : "",
      });
      return;
    }

    // router.push(
    //   `${pathname}?${createQueryString({
    //     [pageKey]: pageIndex + 1,
    //     [sizeKey]: pageSize,
    //     [sortKey]: sortingState[0]?.id,
    //     [`${sortKey}Direction`]: sortingState[0]?.id
    //       ? sortingState[0]?.desc
    //         ? "desc"
    //         : "asc"
    //       : null,
    //   })}`,
    // );
    debouncedPushSearchParams.run(pageIndex, pageSize, sortingState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sortingState]);

  const table = useReactTable({
    data,
    columns: tableColumns,
    pageCount: pageCount ?? 1,
    state: {
      pagination,
      sorting: sortingState,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    onSortingChange: setSortingState,
    getSortedRowModel: getSortedRowModel(),

    manualPagination: true,
    manualSorting: true,
  });

  const pageSizeOpts = pageSizeOptions.includes(defaultSize)
    ? pageSizeOptions
    : [defaultSize, ...pageSizeOptions].sort((a, b) => a - b);
  return (
    <div className="rounded-md border">
      {enablePagination && <Paginate table={table} pageSizeOptions={pageSizeOpts} />}
      <div className="w-full overflow-x-auto">
        <TTable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <DataTableColumnHeader key={header.id} column={header.column}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </DataTableColumnHeader>
                    // <TableHead key={header.id}>
                    //   {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    // </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(href || onRowClick ? "cursor-pointer" : "")}
                  onClick={() => {
                    // console.log(row.original);
                    if (href) {
                      // replace {} with variable
                      const hrefUrl = href.replace(/{\w+}/g, (match) => {
                        const key = match.slice(1, -1); // remove curly brackets
                        // @ts-expect-error
                        return row.original[key] ?? "undefined";
                      });
                      router.push(hrefUrl);
                      return;
                    }
                    onRowClick?.({ ...row.original });
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TTable>
      </div>
    </div>
  );
}
