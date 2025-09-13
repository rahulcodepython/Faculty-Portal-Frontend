"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Download, Edit, Eye, File, Filter, Search, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CourseNotes() {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showUploadForm, setShowUploadForm] = useState(false);

    const courses = [
        { id: "cs301", name: "Data Structures & Algorithms", students: 60 },
        { id: "cs302", name: "Database Management Systems", students: 45 },
        { id: "cs303", name: "Software Engineering", students: 55 },
        { id: "cs304", name: "Computer Networks", students: 40 },
    ];

    const [uploadForm, setUploadForm] = useState({
        title: "",
        description: "",
        course: "",
        type: "",
        file: null as File | null
    });

    const noteTypes = [
        { id: "lecture", name: "Lecture Notes", color: "bg-blue-500" },
        { id: "assignment", name: "Assignment", color: "bg-green-500" },
        { id: "reference", name: "Reference Material", color: "bg-purple-500" },
        { id: "syllabus", name: "Syllabus", color: "bg-orange-500" },
        { id: "presentation", name: "Presentation", color: "bg-pink-500" },
    ];

    const sampleNotes = [
        {
            id: 1,
            title: "Introduction to Data Structures",
            description: "Basic concepts and importance of data structures in programming",
            course: "cs301",
            type: "lecture",
            uploadDate: "2024-01-15",
            fileType: "PDF",
            fileSize: "2.5 MB",
            downloads: 45
        },
        {
            id: 2,
            title: "Arrays and Linked Lists",
            description: "Detailed explanation of linear data structures with examples",
            course: "cs301",
            type: "lecture",
            uploadDate: "2024-01-18",
            fileType: "PDF",
            fileSize: "3.2 MB",
            downloads: 38
        },
        {
            id: 3,
            title: "Assignment 1 - Sorting Algorithms",
            description: "Implementation of bubble sort, merge sort, and quick sort",
            course: "cs301",
            type: "assignment",
            uploadDate: "2024-01-20",
            fileType: "DOCX",
            fileSize: "1.8 MB",
            downloads: 52
        },
        {
            id: 4,
            title: "Database Design Principles",
            description: "Fundamentals of database design and normalization",
            course: "cs302",
            type: "lecture",
            uploadDate: "2024-01-22",
            fileType: "PDF",
            fileSize: "4.1 MB",
            downloads: 31
        }
    ];

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadForm(prev => ({ ...prev, file }));
        }
    };

    const handleUploadSubmit = () => {
        if (!uploadForm.title || !uploadForm.course || !uploadForm.type) {
            toast.error('Missing Information', { description: 'Please fill in all required fields' });
            return;
        }

        toast.success('Notes Uploaded Successfully!', { description: `"${uploadForm.title}" has been shared with students` });

        setUploadForm({
            title: "",
            description: "",
            course: "",
            type: "",
            file: null
        });
        setShowUploadForm(false);
    };

    const filteredNotes = sampleNotes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse = !selectedCourse || selectedCourse === "all" || note.course === selectedCourse;
        return matchesSearch && matchesCourse;
    });

    const getTypeInfo = (typeId: string) => {
        return noteTypes.find(type => type.id === typeId) || { name: "Unknown", color: "bg-gray-500" };
    };

    const getCourseInfo = (courseId: string) => {
        return courses.find(course => course.id === courseId)?.name || "Unknown Course";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Course Notes Management</h1>
                    <p className="text-muted-foreground">Upload and share course materials with students</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setShowUploadForm(!showUploadForm)}
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Notes
                    </Button>
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Bulk Download
                    </Button>
                </div>
            </div>

            {/* Upload Form */}
            {showUploadForm && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="w-5 h-5" />
                            Upload Course Notes
                        </CardTitle>
                        <CardDescription>Share study materials and resources with your students</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter note title"
                                        value={uploadForm.title}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="course-select">Course *</Label>
                                    <Select
                                        value={uploadForm.course}
                                        onValueChange={(value) => setUploadForm(prev => ({ ...prev, course: value }))}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select course" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {courses.map((course) => (
                                                <SelectItem key={course.id} value={course.id}>
                                                    {course.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type-select">Content Type *</Label>
                                    <Select
                                        value={uploadForm.type}
                                        onValueChange={(value) => setUploadForm(prev => ({ ...prev, type: value }))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {noteTypes.map((type) => (
                                                <SelectItem key={type.id} value={type.id}>
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Brief description of the content"
                                        value={uploadForm.description}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                                        rows={4}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="file">Upload File</Label>
                                    <Input
                                        id="file"
                                        type="file"
                                        onChange={handleFileUpload}
                                        accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT (Max: 10MB)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                            <Button variant="outline" onClick={() => setShowUploadForm(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleUploadSubmit} className="bg-gradient-primary">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Upload & Share
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filter Notes
                    </CardTitle>
                    <CardDescription>Search and filter course materials</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="course-filter">Course</Label>
                            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                                <SelectTrigger>
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
                            <Label htmlFor="search-notes">Search Notes</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    id="search-notes"
                                    placeholder="Search by title or description"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Notes List */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Course Materials ({filteredNotes.length})
                    </CardTitle>
                    <CardDescription>
                        {selectedCourse
                            ? `Materials for ${getCourseInfo(selectedCourse)}`
                            : "All uploaded course materials"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {filteredNotes.length > 0 ? (
                        <div className="space-y-4">
                            {filteredNotes.map((note) => {
                                const typeInfo = getTypeInfo(note.type);

                                return (
                                    <div
                                        key={note.id}
                                        className="flex items-center justify-between p-4 rounded-lg border hover:shadow-card transition-all"
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`p-3 rounded-lg ${typeInfo.color} text-white`}>
                                                <File className="w-5 h-5" />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-medium">{note.title}</h3>
                                                    <Badge variant="secondary">{typeInfo.name}</Badge>
                                                    <Badge variant="outline">{note.fileType}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-2">{note.description}</p>
                                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                    <span>Course: {getCourseInfo(note.course)}</span>
                                                    <span>Size: {note.fileSize}</span>
                                                    <span>Uploaded: {note.uploadDate}</span>
                                                    <span>Downloads: {note.downloads}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-muted-foreground mb-2">No Notes Found</h3>
                            <p className="text-muted-foreground mb-4">
                                {searchQuery || selectedCourse
                                    ? "No materials match your search criteria"
                                    : "Start by uploading course materials for your students"}
                            </p>
                            {!showUploadForm && (
                                <Button onClick={() => setShowUploadForm(true)} className="bg-gradient-primary">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload First Note
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}