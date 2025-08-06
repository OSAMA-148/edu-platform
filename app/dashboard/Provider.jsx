import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";
import Head from "next/head";
import Header from "./_components/Header";

function DashboardProvider({ children }) {
    return (
        <div>
            <SidebarProvider>
                <AppSidebar />

                <div className="w-full">
                    <Header />
                    {children}
                </div>
            </SidebarProvider>
        </div>
    );
}

export default DashboardProvider;
