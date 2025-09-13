import { AppSidebar } from "@/components/sidebar/app-sidebar";
import SidebarHeader from "@/components/sidebar/sidebar-header";
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <SidebarHeader />
                <div className="p-6">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
