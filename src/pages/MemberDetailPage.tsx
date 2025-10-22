import { useParams, Link, useNavigate } from 'react-router-dom';
import { members as initialMembers } from '@/lib/data';
import { Member } from '@/lib/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, CheckCircle, XCircle, User, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { useIsAuthenticated } from '@/store/auth';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
type BadgeVariant = "default" | "outline" | "secondary" | "destructive";
interface StatusConfig {
  variant: BadgeVariant;
  className: string;
  icon: React.ElementType;
}
const statusConfig: Record<Member['status'], StatusConfig> = {
  Active: { variant: "outline", className: "border-green-600 text-green-600", icon: CheckCircle },
  Pending: { variant: "secondary", className: "", icon: User },
  Suspended: { variant: "destructive", className: "", icon: XCircle },
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
export function MemberDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const [member, setMember] = useState<Member | undefined>(undefined);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    const foundMember = initialMembers.find((m) => m.id === id);
    setMember(foundMember);
  }, [id, isAuthenticated, navigate]);
  if (!member) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Member not found</h1>
          <Button asChild variant="link" className="mt-4">
            <Link to="/dashboard">Go back to dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }
  const StatusIcon = statusConfig[member.status].icon;
  const handleStatusChange = (newStatus: "Active" | "Pending" | "Suspended") => {
    setMember(prev => prev ? { ...prev, status: newStatus } : undefined);
    toast.success(`Member status updated to ${newStatus}.`);
  };
  const handleSendMessage = () => {
    toast.info(`Message sent to ${member.fullName} (mock).`);
  };
  return (
    <motion.div
      className="grid gap-8 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="lg:col-span-2 space-y-8">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{member.fullName}</span>
                <Badge variant={statusConfig[member.status].variant} className={statusConfig[member.status].className}>
                  <StatusIcon className="mr-2 h-4 w-4" />
                  {member.status}
                </Badge>
              </CardTitle>
              <CardDescription>{member.brandName}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="flex items-center"><Mail className="w-4 h-4 mr-3 text-muted-foreground" /><span>{member.email}</span></div>
              <div className="flex items-center"><Phone className="w-4 h-4 mr-3 text-muted-foreground" /><span>{member.phone}</span></div>
              {member.website && <div className="flex items-center"><Globe className="w-4 h-4 mr-3 text-muted-foreground" /><a href={member.website} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">{member.website}</a></div>}
              <div className="flex items-center"><MapPin className="w-4 h-4 mr-3 text-muted-foreground" /><span>{`${member.city || 'N/A'}, ${member.country || 'N/A'}`}</span></div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent activities related to this member.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {member.activityLog && member.activityLog.length > 0 ? (
                    member.activityLog.map((log, index) => (
                      <TableRow key={index}>
                        <TableCell>{log.date.toLocaleDateString()}</TableCell>
                        <TableCell><Badge variant="secondary">{log.action}</Badge></TableCell>
                        <TableCell>{log.description}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">No activity recorded.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div className="space-y-8" variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
            <CardDescription>Manage member status and actions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {member.status === 'Pending' && (
              <Button className="w-full bg-brand hover:bg-green-600 text-white" onClick={() => handleStatusChange('Active')}>
                <CheckCircle className="mr-2 h-4 w-4" /> Approve Membership
              </Button>
            )}
            {member.status === 'Active' && (
              <Button variant="destructive" className="w-full" onClick={() => handleStatusChange('Suspended')}>
                <XCircle className="mr-2 h-4 w-4" /> Suspend Member
              </Button>
            )}
            {member.status === 'Suspended' && (
              <Button className="w-full bg-brand hover:bg-green-600 text-white" onClick={() => handleStatusChange('Active')}>
                <CheckCircle className="mr-2 h-4 w-4" /> Reactivate Member
              </Button>
            )}
            <Button variant="outline" className="w-full" onClick={handleSendMessage}>Send Message</Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}