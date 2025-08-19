import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
type ChartComponentProps = {
  gamesDuration: { topic: string; duration: number }[];
};
export default function ChartComponent({ gamesDuration }: ChartComponentProps) {
  return (


    // <BarChart
    //   width={500}
    //   height={500}
    //   data={gamesDuration}
    //   margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    // >
    //   <CartesianGrid strokeDasharray="3 3" />
    //   <XAxis
    //     dataKey="topic"
    //     tickLine={false}
    //     tickMargin={10}
    //     axisLine={false}
    //     tickFormatter={(value) => value.slice(0, 3)}
    //   />
    //   {/* <YAxis /> */}

    <Bar dataKey="duration" fill="#8884d8" radius={4} />
    // </BarChart>
  );
}
