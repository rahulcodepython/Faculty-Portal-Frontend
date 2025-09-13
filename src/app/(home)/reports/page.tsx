"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Download, FileText, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";

export default function Reports() {
    const reportCategories = [
        {
            title: "Attendance Reports",
            description: "Generate detailed attendance statistics and summaries",
            icon: Calendar,
            reports: [
                { name: "Monthly Attendance Summary", description: "Course-wise attendance for the month" },
                { name: "Student Attendance History", description: "Individual student attendance records" },
                { name: "Low Attendance Alert", description: "Students with attendance below 75%" },
            ]
        },
        {
            title: "Academic Performance",
            description: "Comprehensive academic performance analytics",
            icon: TrendingUp,
            reports: [
                { name: "Grade Distribution", description: "Grade analysis across all courses" },
                { name: "Course Performance", description: "Subject-wise student performance" },
                { name: "Top Performers", description: "High-achieving students list" },
            ]
        },
        {
            title: "Student Analytics",
            description: "Student enrollment and demographic reports",
            icon: Users,
            reports: [
                { name: "Enrollment Statistics", description: "Course-wise enrollment numbers" },
                { name: "Student Progress Report", description: "Individual student progress tracking" },
                { name: "Class Demographics", description: "Student demographic breakdown" },
            ]
        },
        {
            title: "Course Statistics",
            description: "Course-specific analytics and insights",
            icon: BarChart,
            reports: [
                { name: "Course Completion Rates", description: "Success rates by course" },
                { name: "Material Usage Analytics", description: "Most accessed course materials" },
                { name: "Assignment Submission Trends", description: "Assignment completion statistics" },
            ]
        }
    ];

    const handleGenerateReport = (reportName: string) => {
        toast("Generating Report", {
            description: `"${reportName}" will be available for download shortly`,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Academic Reports</h1>
                    <p className="text-muted-foreground">Generate comprehensive analytics and performance reports</p>
                </div>
                <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-primary border-0">
                    <CardHeader className="pb-2">
                        <CardDescription className="">Reports Generated</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">48</div>
                        <div className="text-sm">This semester</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Last Generated</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">2 hours ago</div>
                        <div className="text-sm text-muted-foreground">Attendance Summary</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Most Requested</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">Grade Distribution</div>
                        <div className="text-sm text-muted-foreground">15 times this month</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Data Coverage</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">150 Students</div>
                        <div className="text-sm text-muted-foreground">Across 4 courses</div>
                    </CardContent>
                </Card>
            </div>

            {/* Report Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reportCategories.map((category) => (
                    <Card key={category.title} className="hover:shadow-primary transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <div className="p-2 rounded-lg bg-primary-muted">
                                    <category.icon className="w-5 h-5 text-primary" />
                                </div>
                                {category.title}
                            </CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {category.reports.map((report) => (
                                    <div
                                        key={report.name}
                                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm">{report.name}</h4>
                                            <p className="text-xs text-muted-foreground">{report.description}</p>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleGenerateReport(report.name)}
                                        >
                                            <FileText className="w-3 h-3 mr-1" />
                                            Generate
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Reports */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Recent Reports
                    </CardTitle>
                    <CardDescription>Your recently generated reports and downloads</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: "Monthly Attendance Summary - November 2024", generated: "2 hours ago", size: "2.3 MB", type: "PDF" },
                            { name: "Grade Distribution - CS301", generated: "1 day ago", size: "1.8 MB", type: "PDF" },
                            { name: "Low Attendance Alert Report", generated: "3 days ago", size: "945 KB", type: "PDF" },
                            { name: "Course Performance Analysis", generated: "1 week ago", size: "3.2 MB", type: "PDF" },
                        ].map((report, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary-muted">
                                        <FileText className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{report.name}</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Generated {report.generated} • {report.size} • {report.type}
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}