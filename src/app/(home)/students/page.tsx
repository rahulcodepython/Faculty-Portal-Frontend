"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Mail, MapPin, Phone, Search, UserPlus, Users } from "lucide-react";
import { useState } from "react";

export default function Students() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");

    const courses = [
        { id: "cs301", name: "Data Structures & Algorithms" },
        { id: "cs302", name: "Database Management Systems" },
        { id: "cs303", name: "Software Engineering" },
        { id: "cs304", name: "Computer Networks" },
    ];

    const sampleStudents = [
        {
            id: "BWU/BCA/23/001",
            name: "Alice Johnson",
            rollNo: "2023001",
            email: "alice.johnson@student.bwu.edu",
            phone: "+91 98765 43210",
            course: "cs301",
            semester: "6th",
            cgpa: 8.7,
            attendance: 87,
            status: "active",
            avatar: ""
        },
        {
            id: "BWU/BCA/23/002",
            name: "Bob Smith",
            rollNo: "2023002",
            email: "bob.smith@student.bwu.edu",
            phone: "+91 98765 43211",
            course: "cs301",
            semester: "6th",
            cgpa: 7.5,
            attendance: 82,
            status: "active",
            avatar: ""
        },
        {
            id: "BWU/BCA/23/003",
            name: "Carol Davis",
            rollNo: "2023003",
            email: "carol.davis@student.bwu.edu",
            phone: "+91 98765 43212",
            course: "cs302",
            semester: "6th",
            cgpa: 9.1,
            attendance: 94,
            status: "active",
            avatar: ""
        },
        {
            id: "BWU/BCA/23/004",
            name: "David Wilson",
            rollNo: "2023004",
            email: "david.wilson@student.bwu.edu",
            phone: "+91 98765 43213",
            course: "cs302",
            semester: "6th",
            cgpa: 6.8,
            attendance: 75,
            status: "warning",
            avatar: ""
        },
        {
            id: "BWU/BCA/23/005",
            name: "Eve Brown",
            rollNo: "2023005",
            email: "eve.brown@student.bwu.edu",
            phone: "+91 98765 43214",
            course: "cs303",
            semester: "6th",
            cgpa: 8.9,
            attendance: 91,
            status: "active",
            avatar: ""
        }
    ];

    const filteredStudents = sampleStudents.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse = !selectedCourse || selectedCourse === "all" || student.course === selectedCourse;
        return matchesSearch && matchesCourse;
    });

    const getCourseInfo = (courseId: string) => {
        return courses.find(course => course.id === courseId)?.name || "Unknown Course";
    };

    const getStatusInfo = (status: string) => {
        switch (status) {
            case "active":
                return { label: "Active", color: "bg-success text-success-foreground" };
            case "warning":
                return { label: "Warning", color: "bg-warning text-warning-foreground" };
            case "inactive":
                return { label: "Inactive", color: "bg-destructive text-destructive-foreground" };
            default:
                return { label: "Unknown", color: "bg-muted text-muted-foreground" };
        }
    };

    const getAttendanceColor = (attendance: number) => {
        if (attendance >= 85) return "text-success";
        if (attendance >= 70) return "text-warning";
        return "text-destructive";
    };

    const getCgpaColor = (cgpa: number) => {
        if (cgpa >= 8.0) return "text-success";
        if (cgpa >= 7.0) return "text-primary";
        if (cgpa >= 6.0) return "text-warning";
        return "text-destructive";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Student Management</h1>
                    <p className="text-muted-foreground">View and manage student information and records</p>
                </div>
                <Button className="bg-gradient-primary">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Student
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Students</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{sampleStudents.length}</div>
                        <div className="text-sm text-muted-foreground">Across all courses</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Active Students</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-success">
                            {sampleStudents.filter(s => s.status === "active").length}
                        </div>
                        <div className="text-sm text-muted-foreground">Currently enrolled</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Average CGPA</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">
                            {(sampleStudents.reduce((sum, s) => sum + s.cgpa, 0) / sampleStudents.length).toFixed(1)}
                        </div>
                        <div className="text-sm text-muted-foreground">Class performance</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Average Attendance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-success">
                            {Math.round(sampleStudents.reduce((sum, s) => sum + s.attendance, 0) / sampleStudents.length)}%
                        </div>
                        <div className="text-sm text-muted-foreground">Overall attendance</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filter Students
                    </CardTitle>
                    <CardDescription>Search and filter student records</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="course-filter">Course</Label>
                            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="All courses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Courses</SelectItem>
                                    {courses.map((course) => (
                                        <SelectItem key={course.id} value={course.id}>
                                            {course.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="search-students">Search Students</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    id="search-students"
                                    placeholder="Search by name, roll number, or ID"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Student List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Student Directory ({filteredStudents.length})
                    </CardTitle>
                    <CardDescription>
                        {selectedCourse
                            ? `Students enrolled in ${getCourseInfo(selectedCourse)}`
                            : "All students in your courses"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredStudents.map((student) => {
                            const statusInfo = getStatusInfo(student.status);

                            return (
                                <div
                                    key={student.id}
                                    className="flex items-center justify-between p-4 rounded-lg border hover:shadow-card transition-all"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={student.avatar} />
                                            <AvatarFallback className="bg-gradient-primary text-white font-medium">
                                                {student.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium">{student.name}</h3>
                                                <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground space-y-1">
                                                <div className="flex items-center gap-4">
                                                    <span>ID: {student.id}</span>
                                                    <span>Roll: {student.rollNo}</span>
                                                    <span>Semester: {student.semester}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="flex items-center gap-1">
                                                        <Mail className="w-3 h-3" />
                                                        {student.email}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Phone className="w-3 h-3" />
                                                        {student.phone}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-3 h-3" />
                                                        Course: {getCourseInfo(student.course)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right space-y-2">
                                        <div className="flex items-center gap-4">
                                            <div className="text-center">
                                                <div className={`text-lg font-bold ${getCgpaColor(student.cgpa)}`}>
                                                    {student.cgpa}
                                                </div>
                                                <div className="text-xs text-muted-foreground">CGPA</div>
                                            </div>
                                            <div className="text-center">
                                                <div className={`text-lg font-bold ${getAttendanceColor(student.attendance)}`}>
                                                    {student.attendance}%
                                                </div>
                                                <div className="text-xs text-muted-foreground">Attendance</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredStudents.length === 0 && (
                            <div className="text-center py-12">
                                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-muted-foreground mb-2">No Students Found</h3>
                                <p className="text-muted-foreground">
                                    {searchQuery || selectedCourse
                                        ? "No students match your search criteria"
                                        : "No students enrolled in your courses"}
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}