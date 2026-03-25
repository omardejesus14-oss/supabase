import { NextResponse } from "next/server";
import { createClient } from "./app/utils/supabase/server";

export async function proxy(request) {
    const supabase = await createClient();

    const { data: {user }} = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect( new URL("/login", request.url));
    }


    return NextResponse.next();

}

export const config = {
    matcher: ["/dashboard"],
}