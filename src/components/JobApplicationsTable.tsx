import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import JobApplicationForm from "./JobApplicationForm";

type WorkType = "Remote" | "Hybrid" | "On-site";
type ApplicationStatus = "Applied" | "Interview" | "Rejected" | "Offer";

interface JobApplication {
  id: string;
  company: string;
  position: string;
  dateApplied: string;
  workType: WorkType;
  status: ApplicationStatus;
}

interface JobApplicationsTableProps {
  applications?: JobApplication[];
  onEdit?: (application: JobApplication) => void;
  onDelete?: (id: string) => void;
  searchTerm?: string;
  workTypeFilter?: WorkType | "All";
  statusFilter?: ApplicationStatus | "All";
  sortBy?: "company" | "dateApplied" | "status";
  sortDirection?: "asc" | "desc";
}

const JobApplicationsTable: React.FC<JobApplicationsTableProps> = ({
  applications = defaultApplications,
  onEdit = () => {},
  onDelete = () => {},
  searchTerm = "",
  workTypeFilter = "All",
  statusFilter = "All",
  sortBy = "dateApplied",
  sortDirection = "desc",
}) => {
  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter applications based on search term and filters
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      searchTerm === "" ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesWorkType =
      workTypeFilter === "All" || app.workType === workTypeFilter;
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesWorkType && matchesStatus;
  });

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === "company") {
      return sortDirection === "asc"
        ? a.company.localeCompare(b.company)
        : b.company.localeCompare(a.company);
    } else if (sortBy === "dateApplied") {
      return sortDirection === "asc"
        ? new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime()
        : new Date(b.dateApplied).getTime() - new Date(a.dateApplied).getTime();
    } else if (sortBy === "status") {
      return sortDirection === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    return 0;
  });

  const handleEditClick = (application: JobApplication) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (updatedApplication: JobApplication) => {
    onEdit(updatedApplication);
    setIsDialogOpen(false);
  };

  const getStatusBadgeVariant = (status: ApplicationStatus) => {
    switch (status) {
      case "Applied":
        return "secondary";
      case "Interview":
        return "default";
      case "Rejected":
        return "destructive";
      case "Offer":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getWorkTypeBadgeVariant = (workType: WorkType) => {
    switch (workType) {
      case "Remote":
        return "secondary";
      case "Hybrid":
        return "default";
      case "On-site":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="w-full bg-background rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Company</TableHead>
              <TableHead className="w-[250px]">Position</TableHead>
              <TableHead className="w-[150px]">Date Applied</TableHead>
              <TableHead className="w-[120px]">Work Type</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedApplications.length > 0 ? (
              sortedApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">
                    {application.company}
                  </TableCell>
                  <TableCell>{application.position}</TableCell>
                  <TableCell>
                    {new Date(application.dateApplied).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getWorkTypeBadgeVariant(application.workType)}
                    >
                      {application.workType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(application.status)}>
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(application)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(application.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-muted-foreground"
                >
                  No job applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <JobApplicationForm
            application={selectedApplication || undefined}
            onSubmit={handleFormSubmit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Sample data for default display
const defaultApplications: JobApplication[] = [
  {
    id: "1",
    company: "Tech Innovations Inc.",
    position: "Frontend Developer",
    dateApplied: "2023-05-15",
    workType: "Remote",
    status: "Interview",
  },
  {
    id: "2",
    company: "Global Solutions",
    position: "Full Stack Engineer",
    dateApplied: "2023-05-10",
    workType: "Hybrid",
    status: "Applied",
  },
  {
    id: "3",
    company: "Digital Creations",
    position: "UX Designer",
    dateApplied: "2023-05-05",
    workType: "On-site",
    status: "Rejected",
  },
  {
    id: "4",
    company: "Future Technologies",
    position: "Backend Developer",
    dateApplied: "2023-05-20",
    workType: "Remote",
    status: "Offer",
  },
  {
    id: "5",
    company: "Innovative Systems",
    position: "DevOps Engineer",
    dateApplied: "2023-05-12",
    workType: "Hybrid",
    status: "Applied",
  },
];

export default JobApplicationsTable;
