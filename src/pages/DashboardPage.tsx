import React, { useState, useMemo } from "react";
import { members as initialMembers } from "@/lib/data";
import { columns } from "@/components/dashboard/columns";
import { DataTable } from "@/components/dashboard/data-table";
import { Member, memberSchema } from "@/lib/schema";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { MemberForm } from "@/components/dashboard/member-form";
import { useUser } from "@/store/auth";
import { toast } from "sonner";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, UserCheck, UserPlus, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};
export function DashboardPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);
  const user = useUser();
  const stats = useMemo(() => {
    const total = members.length;
    const active = members.filter(m => m.status === 'Active').length;
    const pending = members.filter(m => m.status === 'Pending').length;
    const admins = members.filter(m => m.role === 'Admin').length;
    return { total, active, pending, admins };
  }, [members]);
  const handleAddMember = (values: z.infer<typeof memberSchema>) => {
    const newMember: Member = {
      ...values,
      id: `MEM-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      registrationDate: new Date(),
    };
    setMembers((prev) => [newMember, ...prev]);
    toast.success("Member added successfully!");
  };
  const handleUpdateMember = (values: z.infer<typeof memberSchema>) => {
    setMembers((prev) =>
      prev.map((member) => (member.id === values.id ? { ...member, ...values } : member))
    );
    setEditingMember(null);
    toast.success("Member details updated successfully!");
  };
  const handleDeleteMember = () => {
    if (deletingMember) {
      setMembers((prev) => prev.filter((member) => member.id !== deletingMember.id));
      setDeletingMember(null);
      toast.success("Member deleted successfully.");
    }
  };
  return (
    <div className="space-y-8">
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome, {user?.fullName?.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview and management of all Afrimart Agro Trade members.
        </p>
      </motion.div>
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Members"
            value={stats.total.toString()}
            icon={Users}
            description="All registered members in the system."
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Active Members"
            value={stats.active.toString()}
            icon={UserCheck}
            description="Members with approved and active status."
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Pending Approvals"
            value={stats.pending.toString()}
            icon={UserPlus}
            description="New members awaiting approval."
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Administrators"
            value={stats.admins.toString()}
            icon={ShieldCheck}
            description="Users with admin-level privileges."
          />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <DataTable
          columns={columns}
          data={members}
          onAddMember={handleAddMember}
          meta={{
            userRole: user?.role,
            onEdit: (member: Member) => setEditingMember(member),
            onDelete: (member: Member) => setDeletingMember(member),
          }}
        />
      </motion.div>
      {/* Edit Member Dialog */}
      <Dialog open={!!editingMember} onOpenChange={(open) => !open && setEditingMember(null)}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {editingMember && (
              <MemberForm
                member={editingMember}
                onSubmit={handleUpdateMember}
                onCancel={() => setEditingMember(null)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
      {/* Delete Member Confirmation Dialog */}
      <AlertDialog open={!!deletingMember} onOpenChange={(open) => !open && setDeletingMember(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the member
              "{deletingMember?.fullName}" from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingMember(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteMember} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}