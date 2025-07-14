import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const {title, content, tags, highlight, createdAt} = await request.json();
    const newEntry = await prisma.entry.create({
        data: {
            title,
            content,
            tags,
            highlight,
            createdAt

        },
    });
    return NextResponse.json(newEntry);
}