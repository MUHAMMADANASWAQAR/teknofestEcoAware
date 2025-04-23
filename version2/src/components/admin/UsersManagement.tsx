
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { 
  PlusCircle, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Search, 
  UserPlus,
  ShieldAlert,
  ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Dummy data for demonstration
const dummyUsers = [
  { id: 1, name: "Sarah Connor", email: "sarah@example.com", role: "user", status: "active", ecoPoints: 1250, joinDate: "2023-08-15" },
  { id: 2, name: "John Smith", email: "john@example.com", role: "admin", status: "active", ecoPoints: 3450, joinDate: "2023-07-22" },
  { id: 3, name: "Emma Wilson", email: "emma@example.com", role: "user", status: "inactive", ecoPoints: 870, joinDate: "2023-09-05" },
  { id: 4, name: "Michael Brown", email: "michael@example.com", role: "user", status: "active", ecoPoints: 2100, joinDate: "2023-08-02" },
  { id: 5, name: "Olivia Davis", email: "olivia@example.com", role: "moderator", status: "active", ecoPoints: 1920, joinDate: "2023-07-18" },
];

export const UsersManagement = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User deleted",
      description: "The user has been successfully removed."
    });
  };
  
  const handlePromoteToAdmin = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: "admin" } : user
    ));
    toast({
      title: "User promoted",
      description: "The user has been promoted to admin."
    });
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search users..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableCaption>List of all registered users in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Eco Points</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? "destructive" : user.role === 'moderator' ? "secondary" : "default"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? "outline" : "secondary"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.ecoPoints}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      {user.role !== 'admin' && (
                        <DropdownMenuItem onClick={() => handlePromoteToAdmin(user.id)}>
                          <ShieldCheck className="mr-2 h-4 w-4" />
                          <span>Promote to Admin</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};
