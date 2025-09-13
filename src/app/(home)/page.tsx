import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    Award,
    BookOpen,
    Calendar,
    ClipboardList,
    FileText,
    GraduationCap,
    LucideIcon,
    TrendingUp,
    Users
} from "lucide-react";

export default function Dashboard() {
    const quickActions = [
        {
            title: "Upload Attendance",
            description: "Mark student attendance for today's classes",
            icon: ClipboardList,
            url: "/attendance",
            color: "bg-blue-600",
        },
        {
            title: "Enter Exam Marks",
            description: "Record and manage student exam scores",
            icon: GraduationCap,
            url: "/marks",
            color: "bg-blue-500",
        },
        {
            title: "Upload Notes",
            description: "Share course materials and study resources",
            icon: BookOpen,
            url: "/notes",
            color: "bg-blue-400",
        },
    ];

    const recentActivity = [
        { action: "Uploaded attendance for CS-301", time: "2 hours ago" },
        { action: "Added exam marks for Database Systems", time: "1 day ago" },
        { action: "Shared lecture notes for Algorithm Analysis", time: "2 days ago" },
        { action: "Updated attendance for Software Engineering", time: "3 days ago" },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Welcome back, Dr. Sarah Chen!</h1>
                        <p className="text-blue-100 text-lg">
                            Computer Science Department • 6th Semester
                        </p>
                        <p className="text-blue-200 mt-2">
                            Ready to manage your academic responsibilities for today
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">CS-301, CS-302</div>
                        <div className="text-blue-100">Today's Classes</div>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                    title="Total Students"
                    value="150"
                    icon={Users}
                    description="Across all courses"
                    trend={{ value: "+12", isPositive: true }}
                />
                <DashboardCard
                    title="Classes Today"
                    value="4"
                    icon={Calendar}
                    description="Scheduled lectures"
                />
                <DashboardCard
                    title="Pending Marks"
                    value="23"
                    icon={Award}
                    description="Assignments to grade"
                    trend={{ value: "-5", isPositive: true }}
                />
                <DashboardCard
                    title="Course Materials"
                    value="48"
                    icon={FileText}
                    description="Uploaded this semester"
                    trend={{ value: "+8", isPositive: true }}
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {quickActions.map((action) => (
                    <Card key={action.title} className="hover:shadow-lg transition-all duration-300 cursor-pointer group border border-blue-200">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform`}>
                                    <action.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">{action.title}</CardTitle>
                                    <CardDescription>{action.description}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full border-blue-300 text-blue-600 hover:bg-blue-600 hover:text-white" variant="outline">
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity & Today's Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border border-blue-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-700">
                            <TrendingUp className="w-5 h-5" />
                            Recent Activity
                        </CardTitle>
                        <CardDescription>Your latest actions and updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                                    <span className="text-sm font-medium">{activity.action}</span>
                                    <span className="text-xs text-blue-400">{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-blue-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-700">
                            <Calendar className="w-5 h-5" />
                            Today's Schedule
                        </CardTitle>
                        <CardDescription>Your classes and appointments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg border-l-4 border-l-blue-600 bg-blue-50">
                                <div>
                                    <div className="font-medium">Data Structures & Algorithms</div>
                                    <div className="text-sm text-blue-500">Room: CS-301</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-blue-700">10:00 AM</div>
                                    <div className="text-sm text-blue-500">60 students</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-lg border-l-4 border-l-blue-500 bg-blue-100">
                                <div>
                                    <div className="font-medium">Database Management</div>
                                    <div className="text-sm text-blue-500">Room: CS-205</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-blue-600">2:00 PM</div>
                                    <div className="text-sm text-blue-500">45 students</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-lg border-l-4 border-l-blue-400 bg-blue-50">
                                <div>
                                    <div className="font-medium">Faculty Meeting</div>
                                    <div className="text-sm text-blue-500">Conference Room</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium text-blue-500">4:00 PM</div>
                                    <div className="text-sm text-blue-400">Department</div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

interface DashboardCardProps {
    title: string;
    description?: string;
    value: string | number;
    icon: LucideIcon;
    trend?: {
        value: string;
        isPositive: boolean;
    };
    className?: string;
}

export function DashboardCard({
    title,
    description,
    value,
    icon: Icon,
    trend,
    className
}: DashboardCardProps) {
    return (
        <Card className={cn(
            "relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white border rounded-2xl",
            className
        )}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardDescription className="text-sm font-medium text-gray-500">
                        {title}
                    </CardDescription>
                    <div className="p-2 rounded-lg bg-blue-100">
                        <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        {value}
                    </CardTitle>
                    {description && (
                        <p className="text-sm text-gray-500">
                            {description}
                        </p>
                    )}
                    {trend && (
                        <div className="flex items-center gap-1 text-sm">
                            <span className={cn(
                                "font-medium",
                                trend.isPositive ? "text-green-600" : "text-red-600"
                            )}>
                                {trend.isPositive ? "+" : ""}{trend.value}
                            </span>
                            <span className="text-gray-500">
                                from last semester
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
