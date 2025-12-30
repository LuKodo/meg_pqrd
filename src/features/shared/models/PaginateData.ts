export interface PaginatedData<T> {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    data: T[];
}