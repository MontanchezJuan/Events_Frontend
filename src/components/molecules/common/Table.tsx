/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { TableButton } from "../../atoms/common/TableButton";
import { ColumnProps, TableColumn } from "../../atoms/common/TableColumn";

interface TableProps<T> {
  children: React.ReactNode;
  data: T[];
  ignoreElements: (keyof T)[];
  itemsPerPage: number;
}

export const Table = <T extends { [key: string]: any }>({
  children,
  data,
  ignoreElements,
  itemsPerPage,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const columnsChildren = React.Children.toArray(children).filter(
    (child: any) => {
      return React.isValidElement(child) && child.type === TableColumn;
    },
  ) as React.ReactElement<ColumnProps<T>>[];

  if (columnsChildren.length === 0) {
    throw new Error("Table must contain at least one Table.Column component.");
  }

  return (
    <>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full table-auto bg-zinc-300 text-zinc-900">
          <thead>
            <tr className="bg-zinc-700 text-white">
              {columnsChildren.map((column: any, index: number) => {
                const { title } = column.props;
                return (
                  <th
                    key={index}
                    className="whitespace-nowrap px-4 py-2 capitalize"
                  >
                    {title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-zinc-200"
                } hover:bg-zinc-400`}
              >
                {columnsChildren.map((column, index) => {
                  const { className, dataIndex, render } = column.props;

                  if (ignoreElements.includes(dataIndex)) return null;

                  return (
                    <td
                      key={index}
                      //whitespace-nowrap
                      className={`${className || "whitespace-nowrap px-4 py-2"}`}
                    >
                      {render
                        ? render(item)
                        : (item[dataIndex] as React.ReactNode)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <TableButton
          onClick={handlePrevious}
          disabled={currentPage === 1}
          color={currentPage === 1 ? "gray" : "blue"}
          rounded
          aria-label="Página anterior"
        >
          <MdNavigateBefore />
        </TableButton>

        <span>
          Página {currentPage} de {totalPages}
        </span>

        <TableButton
          onClick={handleNext}
          disabled={currentPage === totalPages}
          color={currentPage === totalPages ? "gray" : "blue"}
          rounded
          aria-label="Página siguiente"
        >
          <MdNavigateNext />
        </TableButton>
      </div>
    </>
  );
};
