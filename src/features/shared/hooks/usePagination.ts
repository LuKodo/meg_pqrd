import { useEffect, useState } from "react";

interface UsePaginationOptions<T> {
    data: T[] | undefined;
    itemsPerPage?: number;
}

interface UsePaginationResult<T> {
    displayData: T[] | undefined;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

export function usePagination<T>({
    data,
    itemsPerPage = 10,
}: UsePaginationOptions<T>): UsePaginationResult<T> {
    const [displayData, setDisplayData] = useState<T[] | undefined>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (!data) {
            setDisplayData([]);
            setTotalPages(1);
            return;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setDisplayData(data.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(data.length / itemsPerPage));
    }, [currentPage, data, itemsPerPage]);

    return {
        displayData,
        currentPage,
        totalPages,
        setCurrentPage,
    };
}
