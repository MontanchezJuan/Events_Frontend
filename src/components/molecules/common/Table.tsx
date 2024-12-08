/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ColumnProps, TableColumn } from "../../atoms/common/TableColumn";

interface TableProps<T> {
  children: React.ReactNode;
  data: T[];
  ignoreElements: (keyof T)[];
}

export const Table = <T extends { [key: string]: any }>({
  children,
  data,
  ignoreElements,
}: TableProps<T>) => {
  const getNestedValue = (obj: any, path: string) => {
    return path
      .split(".")
      .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  };

  const columnsChildren = React.Children.toArray(children).filter(
    (child: any) => {
      return React.isValidElement(child) && child.type === TableColumn;
    },
  ) as React.ReactElement<ColumnProps<T>>[];

  if (columnsChildren.length === 0) {
    throw new Error("Table must contain at least one Table.Column component.");
  }

  return (
    <div className="my-4 overflow-x-auto rounded-lg border border-zinc-800">
      {data.length > 0 ? (
        <table className="min-w-full table-auto text-zinc-900">
          <thead>
            <tr className="border-zinc-700 text-white">
              {columnsChildren.map((column, index) => {
                const { title, textCenter } = column.props;
                return (
                  <th
                    key={index}
                    className={`whitespace-nowrap p-2 capitalize ${!textCenter && "text-left"}`}
                  >
                    {title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 && "bg-zinc-800"} text-white`}
              >
                {columnsChildren.map((column, index) => {
                  const { className, dataIndex, render } = column.props;

                  if (ignoreElements.includes(dataIndex)) return null;

                  return (
                    <td
                      key={index}
                      className={`${className?.includes("p-") ? className : `${className} p-2`}`}
                    >
                      {render ? render(item) : getNestedValue(item, dataIndex)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center bg-[#00ff66]">
          <p className="my-4 text-center text-3xl font-semibold">
            Actualmente no hay información para mostrar
          </p>
        </div>
      )}
    </div>
  );
};
