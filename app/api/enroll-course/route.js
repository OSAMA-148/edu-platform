import { db } from "@/config/db";
import { coursesTable, enrollToCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { courseId } = await req.json();

    const user = await currentUser();

    // if already enrolled

    const enrollCourse = await db
        .select()
        .from(enrollToCourseTable)
        .where(
            and(
                eq(
                    enrollToCourseTable.email,
                    user?.primaryEmailAddress.emailAddress
                ),
                eq(enrollToCourseTable.cid, courseId)
            )
        );

    if (enrollCourse?.length == 0) {
        const result = await db
            .insert(enrollToCourseTable)
            .values({
                cid: courseId,
                email: user?.primaryEmailAddress?.emailAddress,
            })
            .returning(enrollToCourseTable);

        return NextResponse.json(result);
    }

    return NextResponse.json({ message: "already enrolled" });
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (courseId) {
        const user = await currentUser();
        const result = await db
            .select()
            .from(coursesTable)
            .innerJoin(
                enrollToCourseTable,
                eq(coursesTable.cid, enrollToCourseTable.cid)
            )
            .where(
                and(
                    eq(
                        enrollToCourseTable.email,
                        user?.primaryEmailAddress?.emailAddress
                    ),
                    eq(enrollToCourseTable.cid, courseId)
                )
            );

        return NextResponse.json(result[0]);
    } else {
        const user = await currentUser();
        const result = await db
            .select()
            .from(coursesTable)
            .innerJoin(
                enrollToCourseTable,
                eq(coursesTable.cid, enrollToCourseTable.cid)
            )
            .where(
                eq(
                    enrollToCourseTable.email,
                    user?.primaryEmailAddress?.emailAddress
                )
            );

        return NextResponse.json(result);
    }
}
