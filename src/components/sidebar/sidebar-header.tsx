"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarTrigger
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const SidebarHeader = () => {
    const pathname = usePathname();

    const getBreadcrumbs = () => {
        const url = pathname;

        const breadcrumbs = ['Dashboard'];

        return breadcrumbs.concat(url.split("/").filter(Boolean).map(part => part.replace(/-/g, " ").replace(/\b\w/g, char => char.toUpperCase())));
    }

    const breadcrumbs = getBreadcrumbs();

    return (
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <Link href="/">
                                {breadcrumbs[0]}
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block last:hidden" />
                        {
                            breadcrumbs.slice(1).map((crumb, index) => (
                                <Fragment key={index}>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{crumb}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block last:hidden" />
                                </Fragment>
                            ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
};

export default SidebarHeader;