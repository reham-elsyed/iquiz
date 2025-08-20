import { NextResponse } from "next/server";

export function successResponse(message: string, data?: any, status = 200) {
    return NextResponse.json(
        {
            success: true,
            message,
            data: data ?? null,
        },
        { status }
    );
}

export function errorResponse(message: string, status = 400, details?: any) {
    return NextResponse.json(
        {
            success: false,
            message,
            details: details ?? null,
        },
        { status }
    );
}
