import { getServerSession } from "next-auth";
import { authOptions } from "./nextAuth";

export default async function YouAreAutherized() {
  const session = await getServerSession(authOptions);
}
