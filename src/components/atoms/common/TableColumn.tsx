import React from "react";

export interface ColumnProps<T> {
  className?: string;
  dataIndex: string;
  key: keyof T;
  title: string;
  textCenter?: boolean;
  render?: (item: T) => React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TableColumn = <T,>(_: ColumnProps<T>) => {
  return null;
};
