import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, ListFilter, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MemberForm } from "./member-form";
import { useState } from "react";
import { z } from "zod";
import { memberSchema } from "@/lib/schema";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  onAddMember: (values: z.infer<typeof memberSchema>) => void;
}
export function DataTableToolbar<TData>({ table, onAddMember }: DataTableToolbarProps<TData>) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isFiltered = table.getState().columnFilters.length > 0;
  const handleFormSubmit = (values: z.infer<typeof memberSchema>) => {
    onAddMember(values);
    setIsFormOpen(false);
  };
  const statuses = ["Active", "Pending", "Suspended"];
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by name or email..."
          value={(table.getState().globalFilter as string) ?? ""}
          onChange={(event) =>
            table.setGlobalFilter(event.target.value)
          }
          className="h-10 w-[150px] lg:w-[250px]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10">
              <ListFilter className="mr-2 h-4 w-4" />
              Status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={(table.getColumn("status")?.getFilterValue() as string[] | undefined)?.includes(status) ?? false}
                onCheckedChange={(checked) => {
                  const currentFilter = (table.getColumn("status")?.getFilterValue() as string[] | undefined) || [];
                  const newFilter = checked
                    ? [...currentFilter, status]
                    : currentFilter.filter((s) => s !== status);
                  table.getColumn("status")?.setFilterValue(newFilter.length ? newFilter : undefined);
                }}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-10 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          <Button className="bg-brand hover:bg-green-600 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add New Member</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <MemberForm onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}