"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Book,
    UserCircle2Icon,
    LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CourseFormDialog from "./CourseFormDialog";
function AppSidebar() {
    const path = usePathname();

    const menu = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/dashboard",
        },

        {
            title: "My Courses",
            icon: Book,
            path: "/dashboard/my-courses",
        },

        {
            title: "Profile",
            icon: UserCircle2Icon,
            path: "/dashboard/profile",
        },
    ];

    return (
        <div>
            <Sidebar>
                <SidebarHeader className="flex items-center">
                    <Image
                        src={"/logo.png"}
                        width={100}
                        height={100}
                        alt="logo"
                    />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <CourseFormDialog>
                            <Button className="w-full">
                                {" "}
                                + Create New Course
                            </Button>
                        </CourseFormDialog>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menu.map((item) => (
                                    <SidebarMenuItem key={item.path}>
                                        <SidebarMenuButton>
                                            <Link
                                                className={`flex gap-3  w-full p-3 rounded-2xl  ${
                                                    path === item.path &&
                                                    "bg-[#d2e0f4]"
                                                } `}
                                                href={item.path}
                                            >
                                                <item.icon className="text-[#5486CD]" />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
        </div>
    );
}

export default AppSidebar;
