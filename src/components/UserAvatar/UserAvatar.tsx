import React from "react";
import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function UserAvatar({ user }: Props) {
  return (
    <>
      <Avatar className="h-10 w-10 rounded-full">
        {user.image ? (
          <AvatarImage src={user?.image as string} alt={user.name as string} />
        ) : (
          <AvatarImage src="https://gokxczesysklzepbknzb.supabase.co/storage/v1/object/public/user-image/user.png" />
        )}
        <AvatarFallback className="rounded-md"></AvatarFallback>
        <span className="src-only">{user.name as string}</span>
      </Avatar>
    </>
  );
}

type Props = { user: Pick<User, "image" | "name"> };

export default UserAvatar;
