import React from "react";

export interface ColumnProps<T> {
  className?: string;
  dataIndex: keyof T;
  key: keyof T;
  title: string;
  render?: (item: T) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TableColumn = <T,>(_: ColumnProps<T>) => {
  return null;
};
