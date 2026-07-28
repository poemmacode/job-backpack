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
  return { ...user, dbUserId: dbUser.id };
}
