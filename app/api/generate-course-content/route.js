import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import JSON5 from "json5";
import axios from "axios";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
    const { courseJson, name, courseId } = await req.json();

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });

    const promises = courseJson?.allchapters?.map(async (chapter) => {
        const PROMPT = `You are an expert course content generator.

Based on the given chapter information, generate high-quality, educational HTML content for EACH topic in the topics array.

The course is about: ${name}
Chapter Name: ${chapter.chapterName}
Topics to cover: ${JSON.stringify(chapter.topics)}

IMPORTANT OUTPUT RULES:
- Return ONLY a valid JSON array with NO extra text or explanations
- Create ONE object for EACH topic in the topics array
- Each object must follow this exact schema:
  {
    "chapterName": "${chapter.chapterName}",
    "topic": "exact topic name from the topics array",
    "content": "detailed HTML-formatted educational content for this specific topic"
  }
- Do NOT include \`\`\`json or \`\`\` markers
- Do NOT include any explanations before or after the JSON
- Escape special characters properly (quotes as \", newlines as \\n)
- Make sure content is specifically about the individual topic, not the entire chapter
- Generate substantial, educational content (at least 200-300 words per topic)

Example format:
[
  {
    "chapterName": "${chapter.chapterName}",
    "topic": "First Topic Name",
    "content": "<h2>First Topic Name</h2><p>Detailed content...</p>"
  },
  {
    "chapterName": "${chapter.chapterName}", 
    "topic": "Second Topic Name",
    "content": "<h2>Second Topic Name</h2><p>Detailed content...</p>"
  }
]

Generate content for these topics: ${JSON.stringify(chapter.topics)}
`;
        const config = {
            thinkingConfig: {
                thinkingBudget: -1,
            },
            responseMimeType: "text/plain",
        };

        const model = "gemini-2.5-pro";
        const contents = [
            {
                role: "user",
                parts: [
                    {
                        text: PROMPT + JSON.stringify(chapter),
                    },
                ],
            },
        ];

        const response = await ai.models.generateContent({
            model,
            config,
            contents,
        });

        const rowRES = response?.candidates[0]?.content?.parts[0]?.text;
        const rowJSON = rowRES
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .replace(/\r/g, "")
            .replace(/\u0000/g, "")
            .trim();

        let ResJson;

        try {
            ResJson = JSON5.parse(rowJSON);
            if (!Array.isArray(ResJson)) {
                console.warn(
                    "⚠️ Gemini returned invalid courseData structure, defaulting to empty array"
                );
                ResJson = [];
            }
        } catch (e) {
            console.error("❌ JSON parsing error:", e.message);
            console.log("Offending Gemini content:", rowJSON?.slice(0, 400));
        }

        const youtubeData = await getYoutubeVideo(chapter?.chapterName);
        console.log({
            youtubeVideo: youtubeData,
            courseData: ResJson,
        });
        return {
            youtubeVideo: youtubeData,
            courseData: ResJson,
        };
    });

    const courseContent = await Promise.all(promises);

    //save to databse
    const saveData = await db
        .update(coursesTable)
        .set({
            courseContent: JSON.stringify(courseContent),
        })
        .where(eq(coursesTable.cid, courseId));

    return NextResponse.json({ courseContent: courseContent, name: name });
}

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const getYoutubeVideo = async (topic) => {
    const params = {
        part: "snippet",
        q: topic,
        maxResults: 4,
        type: "video",
        key: process.env.YOUTUBE_API,
    };

    const resp = await axios.get(YOUTUBE_BASE_URL, { params });

    const youtubeListRes = resp.data.items;
    const youtubeList = [];
    youtubeListRes.forEach((item) => {
        const data = {
            videoId: item?.id?.videoId,
            title: item?.snippet?.title,
        };
        youtubeList.push(data);
    });
    console.log("youtubeList", youtubeList);
    return youtubeList;
};
