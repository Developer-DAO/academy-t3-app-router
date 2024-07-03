import type { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./CellAction";
import { Checkbox } from "@/components/ui/checkbox";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(
            value === true || value === "indeterminate" ? true : false,
          );
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(
            value === true || value === "indeterminate" ? true : false,
          );
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "lessonTitle",
    header: "Lesson Title",
  },
  {
    accessorKey: "lessonDescription",
    header: " Description",
  },
  {
    accessorKey: "lessonPath",
    header: "Lesson Path",
  },
  {
    accessorKey: "quizFileName",
    header: "Quiz filename",
  },
  {
    accessorKey: "track.trackTitle",
    header: "Track",
  },
  {
    accessorKey: "order",
    header: "Order N°",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
