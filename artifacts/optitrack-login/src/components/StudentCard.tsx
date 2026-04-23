import { BookOpen, Star, TrendingUp, User } from "lucide-react";

export interface Student {
  id: number;
  name: string;
  rollNumber: string;
  course: string;
  year: number;
  gpa: number;
  attendance: number;
  status: "Active" | "Inactive" | "On Leave";
  avatarColor: string;
}

interface StudentCardProps {
  student: Student;
  onViewProfile: (student: Student) => void;
}

const statusStyles: Record<Student["status"], string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Inactive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "On Leave": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

export default function StudentCard({ student, onViewProfile }: StudentCardProps) {
  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: student.avatarColor }}
          >
            {initials}
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-base leading-tight">{student.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Roll No: {student.rollNumber}</p>
          </div>
        </div>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[student.status]}`}>
          {student.status}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{student.course}</span>
          <span className="ml-auto text-xs font-medium text-foreground bg-secondary px-1.5 py-0.5 rounded">
            Year {student.year}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="bg-muted/60 rounded-lg p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Star className="w-3 h-3 text-yellow-500" />
              <span className="text-xs text-muted-foreground font-medium">GPA</span>
            </div>
            <p className="font-bold text-foreground text-base">{student.gpa.toFixed(1)}</p>
          </div>
          <div className="bg-muted/60 rounded-lg p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <TrendingUp className="w-3 h-3 text-primary" />
              <span className="text-xs text-muted-foreground font-medium">Attendance</span>
            </div>
            <p className="font-bold text-foreground text-base">{student.attendance}%</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => onViewProfile(student)}
        className="w-full mt-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground text-sm font-medium py-2 px-4 rounded-lg hover:opacity-90 active:scale-95 transition-all duration-150"
      >
        <User className="w-4 h-4" />
        View Profile
      </button>
    </div>
  );
}
