import React, { useState } from "react";
import type { DataTableProps, Column } from "./DataTable.types";

function DataTable<T>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return data;
    return [...data].sort((a, b) => {
      const aValue = a[col.dataIndex];
      const bValue = b[col.dataIndex];
      if (aValue === bValue) return 0;
      if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });
  }, [data, sortKey, sortOrder, columns]);

  // Selection logic
  const handleRowSelect = (row: T) => {
    let updated: T[];
    if (selectable) {
      if (selectedRows.includes(row)) {
        updated = selectedRows.filter((r) => r !== row);
      } else {
        updated = [...selectedRows, row];
      }
      setSelectedRows(updated);
      onRowSelect?.(updated);
    }
  };

  // Render
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8" role="status" aria-label="Loading">
        <span className="animate-spin rounded-full border-4 border-blue-400 border-t-transparent w-8 h-8"></span>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center text-gray-500 py-8" role="status" aria-label="No data">
        No data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded shadow bg-white">
      <table className="min-w-full divide-y divide-gray-200" aria-label="Data Table">
        <thead className="bg-gray-50">
          <tr>
            {selectable && <th className="p-2"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-2 text-left font-semibold text-gray-700 cursor-pointer select-none"
                onClick={() => col.sortable && setSortKey(col.key) && setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                aria-sort={sortKey === col.key ? (sortOrder === "asc" ? "ascending" : "descending") : "none"}
                scope="col"
              >
                {col.title}
                {col.sortable && (
                  <span className="ml-1 text-xs">
                    {sortKey === col.key ? (sortOrder === "asc" ? "▲" : "▼") : "↕"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr
              key={idx}
              className={`hover:bg-blue-50 transition ${selectable && selectedRows.includes(row) ? "bg-blue-100" : ""}`}
              onClick={() => selectable && handleRowSelect(row)}
              aria-selected={selectable && selectedRows.includes(row)}
              tabIndex={0}
            >
              {selectable && (
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => handleRowSelect(row)}
                    aria-label="Select row"
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;