import { getAuthSession } from "@/lib/nextAuth";
import { Navbar01 } from "../ui/shadcn-io/navbar-01";
import { LinksArray } from "@/types/navbarTypes";
import Rocket from "../SVGComponents/Rocket";

export default async function Navbar() {
  const session = await getAuthSession();
  return (
    <div className="relative w-full">
      <Navbar01
        logo=<Rocket size={20} />
        logoHref="/home"
        navigationLinks={LinksArray}
        user={
          session?.user
            ? {
              name: session.user.name ?? null,
              email: session.user.email ?? "",
              image: session.user.image ?? null,
            }
            : undefined
        } />
    </div>
  );
}
