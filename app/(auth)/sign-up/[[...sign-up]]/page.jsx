import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center h-full w-full mt-7">
            <SignUp forceRedirectUrl="/dashboard" />
        </div>
    );
}
