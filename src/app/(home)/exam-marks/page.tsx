"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, Download, Filter, GraduationCap, Search, TrendingUp, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ExamMarks() {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedExam, setSelectedExam] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const courses = [
        { id: "cs301", name: "Data Structures & Algorithms", students: 60 },
        { id: "cs302", name: "Database Management Systems", students: 45 },
        { id: "cs303", name: "Software Engineering", students: 55 },
        { id: "cs304", name: "Computer Networks", students: 40 },
    ];

    const examTypes = [
        { id: "midterm", name: "Mid Term Examination", maxMarks: 50 },
        { id: "final", name: "Final Examination", maxMarks: 100 },
        { id: "assignment", name: "Assignment", maxMarks: 25 },
        { id: "lab", name: "Lab Practical", maxMarks: 30 },
    ];

    const sampleStudents = [
        { id: "BWU/BCA/23/001", name: "Alice Johnson", rollNo: "2023001", marks: 42 },
        { id: "BWU/BCA/23/002", name: "Bob Smith", rollNo: "2023002", marks: 38 },
        { id: "BWU/BCA/23/003", name: "Carol Davis", rollNo: "2023003", marks: 45 },
        { id: "BWU/BCA/23/004", name: "David Wilson", rollNo: "2023004", marks: 35 },
        { id: "BWU/BCA/23/005", name: "Eve Brown", rollNo: "2023005", marks: 48 },
    ];

    const [marks, setMarks] = useState<Record<string, number>>({});

    const handleMarkChange = (studentId: string, mark: number) => {
        const selectedExamType = examTypes.find(exam => exam.id === selectedExam);
        const maxMarks = selectedExamType?.maxMarks || 100;

        if (mark >= 0 && mark <= maxMarks) {
            setMarks(prev => ({
                ...prev,
                [studentId]: mark
            }));
        }
    };

    const handleSaveMarks = () => {
        const studentsWithMarks = Object.keys(marks).length;
        const selectedExamType = examTypes.find(exam => exam.id === selectedExam);

        toast(`Marks Saved Successfully! ${studentsWithMarks} student marks saved for ${selectedExamType?.name}`);
    };

    const handleBulkUpload = () => {
        toast("Bulk Upload: Feature will be available soon. You can upload CSV files with marks data.");
    };

    const filteredStudents = sampleStudents.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedExamType = examTypes.find(exam => exam.id === selectedExam);
    const maxMarks = selectedExamType?.maxMarks || 100;

    const getGrade = (mark: number) => {
        const percentage = (mark / maxMarks) * 100;
        if (percentage >= 90) return { grade: 'A+', color: 'text-green-600' };
        if (percentage >= 80) return { grade: 'A', color: 'text-green-500' };
        if (percentage >= 70) return { grade: 'B+', color: 'text-blue-500' };
        if (percentage >= 60) return { grade: 'B', color: 'text-blue-400' };
        if (percentage >= 50) return { grade: 'C', color: 'text-yellow-500' };
        if (percentage >= 40) return { grade: 'D', color: 'text-orange-500' };
        return { grade: 'F', color: 'text-red-500' };
    };

    const calculateStats = () => {
        const allMarks = Object.values(marks);
        if (allMarks.length === 0) return { average: 0, highest: 0, lowest: 0, passRate: 0 };

        const average = allMarks.reduce((sum, mark) => sum + mark, 0) / allMarks.length;
        const highest = Math.max(...allMarks);
        const lowest = Math.min(...allMarks);
        const passed = allMarks.filter(mark => (mark / maxMarks) * 100 >= 40).length;
        const passRate = (passed / allMarks.length) * 100;

        return { average: Math.round(average), highest, lowest, passRate: Math.round(passRate) };
    };

    const stats = calculateStats();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Exam Marks Management</h1>
                    <p className="text-muted-foreground">Record and manage student examination scores</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={handleBulkUpload}>
                        <Upload className="w-4 h-4 mr-2" />
                        Bulk Upload
                    </Button>
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Results
                    </Button>
                </div>
            </div>

            {/* Statistics Cards */}
            {Object.keys(marks).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Average Score
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.average}/{maxMarks}</div>
                            <Progress value={(stats.average / maxMarks) * 100} className="mt-2" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription className="flex items-center gap-2">
                                <Award className="w-4 h-4" />
                                Highest Score
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-success">{stats.highest}/{maxMarks}</div>
                            <div className="text-sm text-muted-foreground">
                                Grade: {getGrade(stats.highest).grade}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Lowest Score</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-destructive">{stats.lowest}/{maxMarks}</div>
                            <div className="text-sm text-muted-foreground">
                                Grade: {getGrade(stats.lowest).grade}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Pass Rate</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">{stats.passRate}%</div>
                            <Progress value={stats.passRate} className="mt-2" />
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Examination Details
                    </CardTitle>
                    <CardDescription>Select course and examination type to enter marks</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                            <Label htmlFor="exam">Examination Type</Label>
                            <Select value={selectedExam} onValueChange={setSelectedExam}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select examination" />
                                </SelectTrigger>
                                <SelectContent>
                                    {examTypes.map((exam) => (
                                        <SelectItem key={exam.id} value={exam.id}>
                                            {exam.name} (Max: {exam.maxMarks} marks)
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

            {/* Marks Entry */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        Student Marks Entry
                    </CardTitle>
                    <CardDescription>
                        {selectedCourse && selectedExam
                            ? `Enter marks for ${selectedExamType?.name} (Max: ${maxMarks} marks)`
                            : "Select course and examination type to begin"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {selectedCourse && selectedExam ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-12 gap-4 p-4 bg-gradient-secondary rounded-lg font-medium text-sm">
                                <div className="col-span-4">Student Details</div>
                                <div className="col-span-2">Roll Number</div>
                                <div className="col-span-2">Marks ({maxMarks})</div>
                                <div className="col-span-2">Percentage</div>
                                <div className="col-span-2">Grade</div>
                            </div>

                            <div className="space-y-2">
                                {filteredStudents.map((student) => {
                                    const studentMark = marks[student.id] || 0;
                                    const percentage = maxMarks > 0 ? Math.round((studentMark / maxMarks) * 100) : 0;
                                    const gradeInfo = getGrade(studentMark);

                                    return (
                                        <div
                                            key={student.id}
                                            className="grid grid-cols-12 gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors items-center"
                                        >
                                            <div className="col-span-4">
                                                <div className="font-medium">{student.name}</div>
                                                <div className="text-sm text-muted-foreground">ID: {student.id}</div>
                                            </div>
                                            <div className="col-span-2 text-sm font-mono">{student.rollNo}</div>
                                            <div className="col-span-2">
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    max={maxMarks}
                                                    value={marks[student.id] || ""}
                                                    onChange={(e) => handleMarkChange(student.id, parseInt(e.target.value) || 0)}
                                                    placeholder={`0-${maxMarks}`}
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{percentage}%</span>
                                                    <Progress value={percentage} className="flex-1" />
                                                </div>
                                            </div>
                                            <div className="col-span-2">
                                                <span className={`font-bold text-lg ${gradeInfo.color}`}>
                                                    {gradeInfo.grade}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex justify-end pt-4 border-t">
                                <Button onClick={handleSaveMarks} className="bg-gradient-primary">
                                    <GraduationCap className="w-4 h-4 mr-2" />
                                    Save All Marks
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-muted-foreground mb-2">Select Course & Examination</h3>
                            <p className="text-muted-foreground">
                                Choose a course and examination type from the dropdowns above to start entering marks
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}