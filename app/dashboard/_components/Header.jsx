import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

function Header({ hideSideBar = false }) {
    return (
        <div className="flex item-center justify-between p-5 shadow-sm">
            {!hideSideBar && <SidebarTrigger />}
            <UserButton afterSignOutUrl="/" />
        </div>
    );
}

export default Header;
