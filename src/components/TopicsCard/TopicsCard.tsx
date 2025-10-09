import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon } from "lucide-react";
import CollapsibleComponent from '../CollapsibleComponent/DynamicCollabsible';
type TopicsCardProps = {
    topic: string;
    value: number;

}
const TopicsCard = ({ topic, value }: TopicsCardProps) => {


    return (
        <>
            <Card
                className='app-card--raised'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{topic}</CardTitle>
                    <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    <CollapsibleComponent topic={topic} />
                </CardContent>
            </Card>
        </>
    )
}

export default TopicsCard