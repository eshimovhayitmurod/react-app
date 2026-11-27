export type PaginationChange = {
   page: number;
   page_size: number;
};
export type PaginationProps = {
   disabled?: boolean;
   onChange: (pagination: PaginationChange) => void;
   page?: number;
   page_size?: number;
   perViewCount?: number;
   totalItemsCount?: number;
};
