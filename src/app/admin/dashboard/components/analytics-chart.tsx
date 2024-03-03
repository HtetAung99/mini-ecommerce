"use client";

import {
  Label,
  LabelList,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function AnalyticsChart() {
  const data02 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 },
    { name: "Group G", value: 239 },
  ];
  return (
    <ResponsiveContainer className={"flex"} width={"100%"} height={"100%"}>
      <PieChart width={400} height={400}>
        <Pie
          data={data02}
          dataKey="value"
          cx={"20%"}
          cy="50%"
          innerRadius={80}
          outerRadius={130}
          fill="#82ca9d"
          label
        >
          <Label value="Sales of 2024" position="center" />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
