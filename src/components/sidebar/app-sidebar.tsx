"use client"

import {
    Frame,
    GraduationCap
} from "lucide-react"
import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"

const data = {
    user: {
        name: "Soujash Chowdhury",
        code: "BWU/BCA/23/408",
        avatar: "",
    },
    navMain: [
        {
            title: "Self Service",
            url: "#",
            items: [
                { title: "Profile", url: "/profile" },
                { title: "Attendance of Assessment", url: "/attendance" },
                { title: "Lecture Plan", url: "/lecture" },
                { title: "Academic Resource", url: "/academic-resources" },
                { title: "Payment", url: "/payment" },
                { title: "Online Money Receipt", url: "#" },
                {
                    title: "Marks",
                    url: "#",
                    items: [
                        { title: "Class Test And Unit Test And Aptitude Test", url: "/marks" },
                        { title: "Semester / Year End Result", url: "#" },
                        { title: "Semester / Year End Result ( Backlog )", url: "#" },
                        { title: "Semester / Year End Result (Review / Supplementary)", url: "#" },
                        { title: "Semester / Year End Result (Special Supplementary)", url: "#" }
                    ]
                },
                { title: "Examination Form Print", url: "#" },
                { title: "Backlog Form Print", url: "#" },
                { title: "Supplementary Form Print", url: "#" },
                {
                    title: "Admit Card",
                    url: "#",
                    items: [
                        { title: "Admit Card Print", url: "#" }
                    ]
                },
                { title: "Attendance", url: "#" },
                { title: "Attendance (semester wise)", url: "#" },
                { title: "Syllabus Completion Status", url: "#" },
                { title: "Activity Point", url: "#" },
                { title: "Download Caution Refund Form", url: "#" },
                { title: "Change Password", url: "#" }
            ]
        },
        {
            title: "Admission Documents",
            url: "#",
            items: [
                { title: "Student Rule Book", url: "#" },
                { title: "Anti Ragging Rule Book", url: "#" },
                { title: "Download Hostel Rule Book", url: "#" },
                { title: "Download Admission Form", url: "#" },
                { title: "Download Admission Letter", url: "#" },
                { title: "Download ID Card", url: "#" },
                { title: "Download Fee Structure", url: "#" },
                { title: "Hostel Fee Information", url: "#" },
                { title: "Download Regd. Certificate", url: "#" }
            ]
        }
    ],
    projects: [
        { name: "Students Forum", url: "#", icon: Frame },
        { name: "Feedback", url: "#", icon: Frame },
        { name: "Brainware University Library", url: "#", icon: Frame }
    ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground dark:text-white flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <GraduationCap className="w-4 h-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Brainware University</span>
                                    <span className="truncate text-xs">Soujash Chowdhury</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
