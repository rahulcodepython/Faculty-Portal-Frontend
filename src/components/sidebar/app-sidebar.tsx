"use client"

import {
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
import { NavUser } from "./nav-user"

const data = {
    user: {
        name: "Soujash Chowdhury",
        code: "BWU/BCA/23/408",
        avatar: "",
    },
    navMain: [
        { title: "Dashboard", url: "/" },
        { title: "Attendance", url: "/attendance" },
        { title: "Exam Marks", url: "/exam-marks" },
        { title: "Course Notes", url: "/notes" },
        { title: "Students", url: "/students" },
        { title: "Reports", url: "/reports" },
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
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
