import { Users, BookOpen, TrendingUp, Award } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  positive: boolean;
}

interface StatsBarProps {
  totalStudents: number;
  activeCourses: number;
  avgGpa: number;
  avgAttendance: number;
}

export default function StatsBar({ totalStudents, activeCourses, avgGpa, avgAttendance }: StatsBarProps) {
  const stats: Stat[] = [
    {
      label: "Total Students",
      value: String(totalStudents),
      icon: <Users className="w-5 h-5 text-blue-500" />,
      change: "+3 this month",
      positive: true,
    },
    {
      label: "Active Courses",
      value: String(activeCourses),
      icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
      change: "2 new",
      positive: true,
    },
    {
      label: "Avg. GPA",
      value: avgGpa.toFixed(2),
      icon: <Award className="w-5 h-5 text-yellow-500" />,
      change: "+0.1 vs last sem",
      positive: true,
    },
    {
      label: "Avg. Attendance",
      value: `${avgAttendance}%`,
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      change: "-2% vs last month",
      positive: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card border border-card-border rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{stat.label}</span>
            <div className="p-1.5 bg-muted rounded-lg">{stat.icon}</div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className={`text-xs mt-1 font-medium ${stat.positive ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
            {stat.change}
          </p>
        </div>
      ))}
    </div>
  );
}
