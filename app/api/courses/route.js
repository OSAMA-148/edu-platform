import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);

    const courseId = searchParams.get("courseId");

    const user = await currentUser();

    if (courseId) {
        const result = await db
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.cid, courseId));


        return NextResponse.json(result[0]);
    } else {
        const result = await db
            .select()
            .from(coursesTable)
            .where(
                eq(coursesTable.email, user?.primaryEmailAddress?.emailAddress)
            );


        return NextResponse.json(result);
    }
}
