import { Badge } from "@/features/shared/components/Badge";
import { Button } from "@/features/shared/components/Button";
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@/svg";
import type { FC } from "react";

interface PaginationProps {
  pagination: {
    currentPage: number;
    totalPages: number;
    setPage: (arg0: number) => void;
  };
}

export const Pagination: FC<PaginationProps> = ({
  pagination,
}) => {
  return (
    <div className="flex justify-between items-center">
      {pagination && (
        <>
          <span className="p-2">
            Mostrando: Página{" "}
            <Badge bg="primary">{pagination.currentPage}</Badge> de{" "}
            <Badge bg="primary">{pagination.totalPages}</Badge>
          </span>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={() =>
                pagination.currentPage > 1 && pagination.setPage(1)
              }
            >
              <IconChevronsLeft />
            </Button>

            <Button
              size="sm"
              variant="primary"
              onClick={() =>
                pagination.currentPage > 1 &&
                pagination.setPage(pagination.currentPage - 1)
              }
            >
              <IconChevronLeft />
            </Button>

            <Button
              size="sm"
              variant="primary"
            >
              {pagination?.currentPage}
            </Button>

            <Button
              size="sm"
              variant="primary"
              onClick={() =>
                pagination.totalPages >= pagination.currentPage + 1 &&
                pagination.setPage(pagination.currentPage + 1)
              }
            >
              <IconChevronRight />
            </Button>

            <Button
              size="sm"
              variant="primary"
              onClick={() => pagination.setPage(pagination.totalPages)}
            >
              <IconChevronsRight />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
