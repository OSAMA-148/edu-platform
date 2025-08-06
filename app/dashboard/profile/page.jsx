import { UserProfile } from "@clerk/nextjs";

function Profile() {
    return (
        <div className="p-5 mt-6">
            <h2 className="font-bold text-blue-500 text-[30px]">
                Manage Your Profile
            </h2>
            <div className="flex items-center justify-center">
                <UserProfile />
            </div>
        </div>
    );
}

export default Profile;
