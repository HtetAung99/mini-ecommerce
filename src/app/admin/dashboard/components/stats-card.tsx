import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function StatsCard({
  children,
  title,
  mainStat,
  subStat,
}: {
  children: React.ReactNode;
  title: string;
  mainStat: string;
  subStat: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {children}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{mainStat}</div>
        <p className="text-xs text-muted-foreground">{subStat}</p>
      </CardContent>
    </Card>
  );
}
