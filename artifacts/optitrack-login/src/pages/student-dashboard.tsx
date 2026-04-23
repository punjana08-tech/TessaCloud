import { useState } from "react";
import StudentCard, { Student } from "@/components/StudentCard";
import StatsBar from "@/components/StatsBar";
import { Search, Filter, X } from "lucide-react";

const STUDENTS: Student[] = [
  {
    id: 1,
    name: "Aisha Patel",
    rollNumber: "CS2021001",
    course: "Computer Science",
    year: 3,
    gpa: 3.8,
    attendance: 92,
    status: "Active",
    avatarColor: "#3b82f6",
  },
  {
    id: 2,
    name: "Rahul Sharma",
    rollNumber: "ME2022042",
    course: "Mechanical Engineering",
    year: 2,
    gpa: 3.4,
    attendance: 78,
    status: "Active",
    avatarColor: "#8b5cf6",
  },
  {
    id: 3,
    name: "Priya Mehta",
    rollNumber: "EC2020015",
    course: "Electronics & Comm.",
    year: 4,
    gpa: 3.9,
    attendance: 97,
    status: "Active",
    avatarColor: "#10b981",
  },
  {
    id: 4,
    name: "Arjun Nair",
    rollNumber: "CS2023088",
    course: "Computer Science",
    year: 1,
    gpa: 3.2,
    attendance: 65,
    status: "On Leave",
    avatarColor: "#f59e0b",
  },
  {
    id: 5,
    name: "Sneha Joshi",
    rollNumber: "BA2021033",
    course: "Business Administration",
    year: 3,
    gpa: 3.6,
    attendance: 88,
    status: "Active",
    avatarColor: "#ec4899",
  },
  {
    id: 6,
    name: "Kiran Reddy",
    rollNumber: "CE2020007",
    course: "Civil Engineering",
    year: 4,
    gpa: 2.9,
    attendance: 71,
    status: "Inactive",
    avatarColor: "#ef4444",
  },
];

type StatusFilter = "All" | Student["status"];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filtered = STUDENTS.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const avgGpa = STUDENTS.reduce((sum, s) => sum + s.gpa, 0) / STUDENTS.length;
  const avgAttendance = Math.round(
    STUDENTS.reduce((sum, s) => sum + s.attendance, 0) / STUDENTS.length
  );
  const uniqueCourses = new Set(STUDENTS.map((s) => s.course)).size;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Overview of all enrolled students and their academic progress.
          </p>
        </div>

        <StatsBar
          totalStudents={STUDENTS.length}
          activeCourses={uniqueCourses}
          avgGpa={avgGpa}
          avgAttendance={avgAttendance}
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search by name, roll number or course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {(["All", "Active", "Inactive", "On Leave"] as StatusFilter[]).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  statusFilter === status
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No students found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onViewProfile={setSelectedStudent}
              />
            ))}
          </div>
        )}
      </div>

      {selectedStudent && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="bg-card border border-card-border rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                style={{ backgroundColor: selectedStudent.avatarColor }}
              >
                {selectedStudent.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{selectedStudent.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedStudent.rollNumber}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              {[
                { label: "Course", value: selectedStudent.course },
                { label: "Year", value: `Year ${selectedStudent.year}` },
                { label: "GPA", value: selectedStudent.gpa.toFixed(2) },
                { label: "Attendance", value: `${selectedStudent.attendance}%` },
                { label: "Status", value: selectedStudent.status },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-muted-foreground font-medium">{label}</span>
                  <span className="text-foreground font-semibold">{value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
