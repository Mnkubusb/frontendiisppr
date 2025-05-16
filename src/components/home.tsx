import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import FilterControls from "./FilterControls";
import JobApplicationsTable from "./JobApplicationsTable";
import JobApplicationForm from "./JobApplicationForm";
import { Dialog, DialogContent } from "./ui/dialog";

type WorkType = "remote" | "hybrid" | "on-site" | "all";
type ApplicationStatus = "applied" | "interview" | "rejected" | "offer" | "all";
type SortOption = "date" | "company" | "status";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [workTypeFilter, setWorkTypeFilter] = useState<WorkType>("all");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingApplication, setEditingApplication] = useState<any>(null);

  // Mock data for demonstration
  const mockApplications = [
    {
      id: 1,
      company: "Tech Solutions Inc.",
      position: "Frontend Developer",
      dateApplied: "2023-05-15",
      workType: "remote",
      status: "interview",
    },
    {
      id: 2,
      company: "Global Systems",
      position: "Full Stack Engineer",
      dateApplied: "2023-05-10",
      workType: "hybrid",
      status: "applied",
    },
    {
      id: 3,
      company: "Innovative Software",
      position: "UI/UX Designer",
      dateApplied: "2023-05-05",
      workType: "on-site",
      status: "rejected",
    },
    {
      id: 4,
      company: "Digital Platforms",
      position: "Backend Developer",
      dateApplied: "2023-05-01",
      workType: "remote",
      status: "offer",
    },
    {
      id: 5,
      company: "Creative Solutions",
      position: "Product Manager",
      dateApplied: "2023-04-28",
      workType: "hybrid",
      status: "applied",
    },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleAddNewApplication = () => {
    setEditingApplication(null); // Clear any editing state
    setIsFormOpen(true);
  };

  const handleEditApplication = (application: any) => {
    setEditingApplication(application);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingApplication(null);
  };

  const handleFormSubmit = (formData: any) => {
    // Here you would handle saving the form data
    console.log("Form submitted:", formData);
    setIsFormOpen(false);
    setEditingApplication(null);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 lg:p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">JobTrackr</h1>
        <p className="text-muted-foreground mb-6">
          Track and manage your job applications in one place
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search applications..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <Button onClick={handleAddNewApplication}>
            <Plus className="mr-2 h-4 w-4" />
            Add Application
          </Button>
        </div>
      </header>

      <FilterControls
        workTypeFilter={workTypeFilter}
        setWorkTypeFilter={setWorkTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <JobApplicationsTable
        applications={mockApplications}
        onEdit={handleEditApplication}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchQuery={searchQuery}
        workTypeFilter={workTypeFilter}
        statusFilter={statusFilter}
        sortBy={sortBy}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <JobApplicationForm
            onSubmit={handleFormSubmit}
            onCancel={handleFormClose}
            initialData={editingApplication}
            isEditing={!!editingApplication}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
