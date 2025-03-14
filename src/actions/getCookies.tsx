'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getCookies(key: string) {
  const token = (await cookies()).get(key)?.value;

  if (typeof token === 'string') {
    return token;
  } else {
    revalidatePath('/login');
    redirect('/login');
  }
}
