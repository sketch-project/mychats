import { User as UserAccount } from "@/types/user";
import Axios from '@/api/client';
import { User } from '@/types';

export const updateActiveStatusUser = (user: UserAccount|User, data: { active_status: boolean }) => {
  return Axios.patch(route("account.status", user.id), {
    email: user.email,
    name: user.name,
    ...data,
  });
};
