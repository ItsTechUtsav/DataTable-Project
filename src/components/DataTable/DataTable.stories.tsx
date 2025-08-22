import React from "react";
import DataTable from "./DataTable";
import type { Column } from "./DataTable.types";
import { action } from "@storybook/addon-actions";

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
  { id: 1, name: "Amit Sharma", email: "amit.sharma@example.com" },
  { id: 2, name: "Priya Singh", email: "priya.singh@example.com" },
  { id: 3, name: "Rahul Verma", email: "rahul.verma@example.com" },
  { id: 4, name: "Sneha Patel", email: "sneha.patel@example.com" },
  { id: 5, name: "Vikas Gupta", email: "vikas.gupta@example.com" },
];

export default {
  title: "Components/DataTable",
  component: DataTable,
  argTypes: {
    loading: { control: "boolean" },
    selectable: { control: "boolean" },
  },
};

export const Default = () => (
  <DataTable<User> data={data} columns={columns} />
);

export const Loading = () => (
  <DataTable<User> data={[]} columns={columns} loading />
);

export const Empty = () => (
  <DataTable<User> data={[]} columns={columns} />
);

export const Selectable = () => (
  <DataTable<User>
    data={data}
    columns={columns}
    selectable
    onRowSelect={action("onRowSelect")}
  />
);
export const SelectableWithState = () => {
  const [selected, setSelected] = React.useState<User[]>([]);
  return (
    <>
      <DataTable<User>
        data={data}
        columns={columns}
        selectable
        onRowSelect={setSelected}
      />
      <div className="mt-4 text-sm text-gray-600">
        Selected: {selected.map((u) => u.name).join(", ") || "None"}
      </div>
    </>
  );
};
import type { StoryFn } from "@storybook/react";
import type { DataTableProps } from "./DataTable.types";

const Template: StoryFn<DataTableProps<User>> = (args) => <DataTable<User> {...args} />;
export const Playground = Template.bind({});
Playground.args = {
  data,
  columns,
  loading: false,
  selectable: true,
};