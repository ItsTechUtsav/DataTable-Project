import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import DataTable from "./DataTable";
import type { Column } from "./DataTable.types";
import { vi } from "vitest";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email", sortable: true },
];

const data: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

describe("DataTable", () => {
  it("renders table with data", () => {
    render(<DataTable<User> data={data} columns={columns} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(<DataTable<User> data={[]} columns={columns} loading />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it("shows empty state", () => {
    render(<DataTable<User> data={[]} columns={columns} />);
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  it("calls onRowSelect when a row is selected", () => {
    const onRowSelect = vi.fn();
    render(
      <DataTable<User>
        data={data}
        columns={columns}
        selectable
        onRowSelect={onRowSelect}
      />
    );
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);
    expect(onRowSelect).toHaveBeenCalled();
  });
});