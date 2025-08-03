import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-blue-100 via-white to-blue-200">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
                <h1 className="text-2xl font-bold text-blue-500">
                    AI CourseGen
                </h1>
                <UserButton />
            </nav>

            {/* Hero Section */}
            <section className="text-center py-20 px-4 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white">
                <div className="mb-7">
                    <Link href="/sign-in">
                        <Button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-blue-100 transition">
                            Sign In
                        </Button>
                    </Link>

                    <Link href="/sign-up" className="ml-4">
                        <Button
                            variant="outline"
                            className="text-blue-600 border-white hover:bg-blue-400 transition"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>

                <h2 className="text-4xl font-extrabold mb-4">
                    Build Smarter with AI
                </h2>
                <p className="text-lg max-w-2xl mx-auto mb-6">
                    Unlock your learning potential. Our AI generates
                    personalized courses just for you — fast, effective, and
                    smart.
                </p>
                <Button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-blue-100 transition">
                    Get Started
                </Button>
            </section>

            {/* Features / Cards */}
            <section className="py-16 px-6 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {["Web Development", "Data Science", "UI/UX Design"].map(
                    (category, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-blue-100 via-white to-blue-200 hover:scale-105 transform transition"
                        >
                            <h3 className="text-2xl font-bold text-blue-600 mb-2">
                                {category}
                            </h3>
                            <p className="text-blue-700">
                                Explore custom-built AI courses tailored to your
                                skill level and goals in {category}.
                            </p>
                        </div>
                    )
                )}
            </section>

            {/* Middle Message */}
            <section className="py-16 text-center px-6 bg-white">
                <h2 className="text-3xl font-bold text-blue-500 mb-4">
                    AI is Your New Instructor
                </h2>
                <p className="text-gray-700 max-w-xl mx-auto">
                    Our platform doesn't just suggest content—it understands
                    your pace, preferences, and progress. Start your learning
                    journey with technology that adapts to *you*.
                </p>
            </section>

            {/* Footer */}
            <footer className="bg-blue-500 text-white py-6 mt-10">
                <div className="text-center">
                    <p className="font-semibold">
                        © 2025 AI CourseGen. All rights reserved.
                    </p>
                    <p className="text-sm mt-2">
                        Empowering education with the power of artificial
                        intelligence.
                    </p>
                </div>
            </footer>
        </div>
    );
}
