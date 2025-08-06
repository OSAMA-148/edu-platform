import React from "react";

function Banner() {
    return (
        <div className="bg-gradient-to-r from-blue-200 to-blue-600 h-64 w-full ">
            <div className="p-5">
                <h1 className="text-[35px] font-bold text-white mb-3">
                    Welcome to our AI Education Platform
                </h1>
                <p className="text-blue-900 font-bold text-[20px]">
                    Learn More, Spend Less, Share it with Your Friends
                </p>
            </div>
        </div>
    );
}

export default Banner;
