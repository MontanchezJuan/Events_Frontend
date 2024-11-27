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

  const getNestedValue = (obj: any, path: string) => {
    return path
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
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
      <div className="overflow-x-auto rounded-tl-2xl rounded-tr-2xl p-4">
        <table className="min-w-full table-auto text-zinc-900">
          <thead>
            <tr className="bg-[#2C2C2C] text-white">
              {columnsChildren.map((column, index) => {
                const { title, textCenter } = column.props;
                return (
                  <th
                    key={index}
                    className={`whitespace-nowrap px-4 py-2 capitalize ${!textCenter && "text-left"}`}
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
                className={`${index % 2 === 0 ? "bg-white" : "bg-[#EAEAEB]"} `}
              >
                {columnsChildren.map((column, index) => {
                  const { className, dataIndex, render } = column.props;

                  if (ignoreElements.includes(dataIndex)) return null;

                  return (
                    <td
                      key={index}
                      className={`${className || "border-l-2 border-r-2 border-[#2C2C2C] px-4 py-2"}`}
                    >
                      {render ? render(item) : getNestedValue(item, dataIndex)}
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
