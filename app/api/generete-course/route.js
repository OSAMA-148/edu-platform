import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { NextResponse } from "next/server";
import uuid4 from "uuid4";

export async function POST(req) {
    const { courseId, ...formData } = await req.json();

    const user = await currentUser();

    // Create dynamic prompt that includes the actual course topic/subject
    const PROMPT = `
Create a detailed and structured learning course based on the following input: ${JSON.stringify(
        formData
    )}

Your response should be returned strictly in JSON format and follow the schema described.

Be sure to include:
- Course name, description, category, level of difficulty, whether the course includes video content, and the total number of chapters.
- For each chapter:
  - A descriptive title
  - Estimated duration
  - A list of key learning topics
  - An image prompt for a course banner illustration

Create an appropriate image prompt for each chapter's banner that relates to the actual course topic (${
        formData.name
    }):

"Create a clean and modern 2D flat-style illustration related to ${
        formData.name
    }. The design should include relevant components such as code snippets, programming icons, development tools, and workspace elements if it's a programming course, or appropriate subject-specific visuals for other topics. Add symbolic visuals like diagrams, charts, and educational elements to represent ${
        formData.name
    } in the ${
        formData.category
    } category. Use a bold and dynamic color scheme (with blues, purples, oranges), maintaining a professional and educational tone. The artwork should reflect the specific subject matter and instructional clarity—perfect for digital learning platforms."

Important: Make sure the course content is specifically about: ${formData.name}
The course should be at ${formData.level} level and in the ${
        formData.category
    } category.
Generate exactly ${formData.chapters} chapters for this course.

Respond using this JSON structure only:
{
  "course": {
    "name": "string",
    "description": "string", 
    "category": "string",
    "level": "string",
    "includeVideo": "boolean",
    "chapters": "number",
    "imagePrompt": "string"
    "allchapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": ["string"]
      }
    ]
  }
}
`;

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });

    const config = {
        responseMimeType: "text/plain",
    };

    const model = "gemini-2.5-pro";
    const contents = [
        {
            role: "user",
            parts: [
                {
                    text: PROMPT,
                },
            ],
        },
    ];

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });

    console.log(response.candidates[0].content.parts[0].text);
    const rowRES = response?.candidates[0]?.content?.parts[0]?.text;
    const rowJSON = rowRES.replace('```json', '').replace('```', '');
    const ResJson = JSON.parse(rowJSON);

    const imageBanner = ResJson.course?.imagePrompt;
    const imageURL = await generateImage(imageBanner);

    const result = await db.insert(coursesTable).values({
        ...formData,
        courseJson: ResJson,
        cid: courseId,
        email: user?.primaryEmailAddress?.emailAddress,
        imageURL: imageURL,
    });

    return NextResponse.json({ courseId: courseId });
}

const generateImage = async (imagePrompt) => {
    const BASE_URL = "https://aigurulab.tech";
    const result = await axios.post(
        BASE_URL + "/api/generate-image",
        {
            width: 1024,
            height: 1024,
            input: imagePrompt,
            model: "sdxl", //'flux'
            aspectRatio: "16:9", //Applicable to Flux model only
        },
        {
            headers: {
                "x-api-key": process.env.API_KEY, // Your API Key
                "Content-Type": "application/json", // Content Type
            },
        }
    );
    console.log(result.data.image); //Output Result: Base 64 Image
    return result.data.image;
};
