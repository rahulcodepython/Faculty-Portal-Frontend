"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, Filter, Search, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Attendance() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const courses = [
        { id: "cs301", name: "Data Structures & Algorithms", students: 60 },
        { id: "cs302", name: "Database Management Systems", students: 45 },
        { id: "cs303", name: "Software Engineering", students: 55 },
        { id: "cs304", name: "Computer Networks", students: 40 },
    ];

    const sampleStudents = [
        { id: "BWU/BCA/23/001", name: "Alice Johnson", rollNo: "2023001", course: "cs301" },
        { id: "BWU/BCA/23/002", name: "Bob Smith", rollNo: "2023002", course: "cs301" },
        { id: "BWU/BCA/23/003", name: "Carol Davis", rollNo: "2023003", course: "cs301" },
        { id: "BWU/BCA/23/004", name: "David Wilson", rollNo: "2023004", course: "cs301" },
        { id: "BWU/BCA/23/005", name: "Eve Brown", rollNo: "2023005", course: "cs301" },
    ];

    const [attendance, setAttendance] = useState<Record<string, boolean>>({});

    const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: isPresent
        }));
    };

    const handleSaveAttendance = () => {
        const presentCount = Object.values(attendance).filter(Boolean).length;
        const totalStudents = sampleStudents.length;

        toast(
            `${presentCount}/${totalStudents} students marked present for ${selectedDate}`,
            { description: "Attendance Saved Successfully!" }
        );
    };

    const handleBulkUpload = () => {
        toast(
            "Feature will be available soon. You can upload CSV files with attendance data.",
            { description: "Bulk Upload" }
        );
    };

    const filteredStudents = sampleStudents.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
                    <p className="text-muted-foreground">Mark and manage student attendance records</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleBulkUpload}>
                        <Upload className="w-4 h-4 mr-2" />
                        Bulk Upload
                    </Button>
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Attendance Filters
                    </CardTitle>
                    <CardDescription>Select course and date to mark attendance</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date</Label>
                            <Input
                                id="date"
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="course">Course</Label>
                            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem key={course.id} value={course.id}>
                                            {course.name} ({course.students} students)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="search">Search Students</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    id="search"
                                    placeholder="Search by name or roll number"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Attendance List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Student Attendance
                    </CardTitle>
                    <CardDescription>
                        Mark attendance for {selectedDate} - {selectedCourse ? courses.find(c => c.id === selectedCourse)?.name : "Select a course"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {selectedCourse ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gradient-secondary rounded-lg">
                                <div className="flex items-center gap-4">
                                    <Checkbox
                                        id="select-all"
                                        checked={filteredStudents.every(student => attendance[student.id])}
                                        onCheckedChange={(checked) => {
                                            const newAttendance = { ...attendance };
                                            filteredStudents.forEach(student => {
                                                newAttendance[student.id] = !!checked;
                                            });
                                            setAttendance(newAttendance);
                                        }}
                                    />
                                    <Label htmlFor="select-all" className="font-medium">
                                        Mark All Present ({filteredStudents.length} students)
                                    </Label>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {Object.values(attendance).filter(Boolean).length} / {filteredStudents.length} present
                                </div>
                            </div>

                            <div className="space-y-2">
                                {filteredStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <Checkbox
                                                id={student.id}
                                                checked={attendance[student.id] || false}
                                                onCheckedChange={(checked) => handleAttendanceChange(student.id, !!checked)}
                                            />
                                            <div className="flex-1">
                                                <div className="font-medium">{student.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    Roll No: {student.rollNo} • ID: {student.id}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${attendance[student.id]
                                            ? 'bg-success/20 text-success'
                                            : 'bg-muted text-muted-foreground'
                                            }`}>
                                            {attendance[student.id] ? 'Present' : 'Absent'}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end pt-4 border-t">
                                <Button onClick={handleSaveAttendance} className="bg-gradient-primary">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Save Attendance
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-muted-foreground mb-2">Select a Course</h3>
                            <p className="text-muted-foreground">
                                Choose a course from the dropdown above to start marking attendance
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}