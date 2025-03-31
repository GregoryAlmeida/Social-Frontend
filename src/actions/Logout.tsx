'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function Logout() {
    (await cookies()).delete('token')
    revalidatePath('/')
    redirect('/')
}