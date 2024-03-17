type SearchParams = { [key: string]: string | string[] | undefined | number };

type PaginateResponse = {
  totalPages: number;
  total: number;
  size: number;
};

type TableHeader = {
  key: string;
  label: string;
  sortable?: boolean;
  className?: string;
  sortDirection?: string;
};

type TableHeaders = (string | TableHeader)[];
