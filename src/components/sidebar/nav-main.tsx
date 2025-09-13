"use client"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface NavItem {
    title: string;
    url: string;
    items?: NavItem[];
    isActive?: boolean;
}

export function NavMain({ items }: { items: NavItem[] }) {
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    return (
        <SidebarGroup>
            <SidebarMenu>
                {
                    items.map((item, index) => (
                        <CollapsibleItem
                            key={`${item.title}-${index}`}
                            item={item}
                            path={`${index}`}
                            openItems={openItems}
                            setOpenItems={setOpenItems}
                        />
                    ))
                }
            </SidebarMenu>
        </SidebarGroup>
    );
}

const CollapsibleItem = ({
    item,
    path,
    openItems,
    setOpenItems
}: {
    item: NavItem;
    path: string;
    openItems: Record<string, boolean>;
    setOpenItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) => {
    const hasChildren = item.items && item.items.length > 0;
    const isOpen = openItems[path] || false;

    const handleOpenChange = (open: boolean) => {
        setOpenItems(prev => ({
            ...prev,
            [path]: open
        }));
    };

    if (!hasChildren) {
        return (
            <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild>
                    <Link href={item.url} className="text-xs font-medium">
                        {item.title}
                    </Link>
                </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        );
    }

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={handleOpenChange}
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <span>{item.title}</span>
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform"
                            style={{ display: isOpen ? 'none' : 'block' }}
                        />
                        <ChevronUp className="ml-auto h-4 w-4 transition-transform"
                            style={{ display: isOpen ? 'block' : 'none' }}
                        />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {
                            item.items?.map((subItem, subIndex) => (
                                <CollapsibleItem
                                    key={`${subItem.title}-${subIndex}`}
                                    item={subItem}
                                    path={`${path}-${subIndex}`}
                                    openItems={openItems}
                                    setOpenItems={setOpenItems}
                                />
                            ))
                        }
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}