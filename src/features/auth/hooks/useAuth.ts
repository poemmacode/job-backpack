import { createClient } from '@/lib/supabase-server';
import { getOrCreateUser } from '../repositories/users';

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const dbUser = await getOrCreateUser(user.id, user.email || '');

  if (!dbUser) {
    return { ...user, dbUserId: user.id };
  }

  return { ...user, dbUserId: dbUser.id };
}
