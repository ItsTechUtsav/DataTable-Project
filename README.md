# DataTable Component Assignment

## 📊 Project Overview

This project implements a reusable, accessible, and responsive DataTable component in React with TypeScript. It supports tabular data display, column sorting, row selection, loading and empty states, and is styled with Tailwind CSS. The component is fully documented and demonstrated in Storybook.

---

## ✨ Features

- Display tabular data with customizable columns
- Column sorting (ascending/descending)
- Row selection (single/multiple)
- Loading and empty states
- TypeScript with strong typing
- Responsive design for all devices
- Accessible (ARIA labels, keyboard navigation)
- Modern, clean styling with Tailwind CSS
- Storybook stories for all states
- Unit tests covering all features

---

## 🚀 Setup Instructions

1. **Clone the repo:**
   ```sh
   git clone https://github.com/your-username/datatable-project.git
   cd datatable-project
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run Storybook:**
   ```sh
   npm run storybook
   ```
   Open [http://localhost:6006](http://localhost:6006) to view the component demos.

4. **Run tests:**
   ```sh
   npm run test
   ```

---

## 🧑‍💻 Usage Example

```tsx
import DataTable from "./components/DataTable/DataTable";
import type { Column } from "./components/DataTable/DataTable.types";

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

<DataTable<User>
  data={data}
  columns={columns}
  selectable
  loading={false}
  onRowSelect={(selected) => console.log(selected)}
/>
```

---

## 🛠️ Approach & Design Decisions

- **TypeScript Generics:** Used for strong typing and reusability across data shapes.
- **Tailwind CSS:** For rapid, consistent, and modern UI styling.
- **Accessibility:** Added ARIA labels, keyboard navigation, and focus states.
- **Sorting & Selection:** Managed with React state and memoization for performance.
- **Storybook:** Used for isolated development, documentation, and visual testing.
- **Testing:** Used Vitest and React Testing Library to cover all states and interactions.

---

## ⚖️ Trade-offs & Known Limitations

- **Sorting:** Only supports simple value comparison (no custom sort functions yet).
- **Selection:** Uses reference equality; for complex data, a unique key is recommended.
- **Styling:** Tailwind is used for speed, but can be customized further for branding.
- **Accessibility:** Basic ARIA and keyboard support; more advanced features can be added.

---

## 🧪 Testing

- All states (loading, empty, selection, sorting) are covered.
- Example test for row selection and loading state.
- **Test file:**  
  See [`src/components/DataTable/DataTable.test.tsx`](src/components/DataTable/DataTable.test.tsx) for details.
- To run tests:
  ```sh
  npm run test
  ```

---

## 📚 Storybook

- Stories for default, loading, empty, selectable, and sorted states.
- Controls to play with props interactively.
- Docs panel includes usage and prop descriptions.

---

## 📱 Accessibility & Responsiveness

- Table is fully responsive and works on all screen sizes.
- ARIA roles and labels are used for screen readers.
- Keyboard navigation is supported for row selection.

---

## 🎨 Styling

- Tailwind classes for a clean, modern look.
- Subtle hover and focus states for interactivity.
- Rounded corners and shadow for visual polish.

---

## 🖼️ Demo & Screenshots

![DataTable Demo](./screenshots/datatable-demo.gif)
> _Add your own GIF or screenshot here!_

**Storybook Preview:**  
[https://your-chromatic-or-vercel-link](https://your-chromatic-or-vercel-link)

---

## 💡 Personal Touch

I enjoyed building this component, especially focusing on accessibility and clean code. I learned a lot about React generics and Storybook workflows.  
If I had more time, I would add custom sort functions and more advanced keyboard navigation.

---

## 📝 Commit History

- `feat: add row selection to DataTable`
- `test: add loading state test`
- `docs: update README with usage example`
- _...and more descriptive commits!_

---

## 🤝 Thanks for reviewing!

If you have any questions or feedback, feel free to reach out!