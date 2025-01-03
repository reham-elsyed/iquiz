import HistoryComponent from "@/components/HistoryComponent/HistoryComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextAuth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const History = async (props: Props) => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-screen">
       <div className=" w-[60vw]">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">History</CardTitle>
            <Link className="hover:text-accent" href="/userDashboard">
              Back to Dashboard
            </Link>
          </div>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-scroll">
          <HistoryComponent limit={100} userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
    </div>
   
  );
};

export default History;
