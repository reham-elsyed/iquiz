// components/PieChart.tsx
"use client";

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { get } from "http";

type Feedback = {
  label: string;
  value: number;
};

type Props = {
  data: Feedback[];
  width?: number;
  height?: number;
};

export const PieChart: React.FC<Props> = ({ data, width = 300, height = 300 }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal<string>()
      .domain(data.map(d => d.label))
.range(["#F8BABA", "#FFE7B3", "#BFF2C4"]);


    const pie = d3.pie<Feedback>().value(d => d.value);
    const arc = d3.arc<d3.PieArcDatum<Feedback>>()
      .innerRadius(0)
      .outerRadius(radius - 10);

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear before redraw

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const arcs: d3.Selection<SVGPathElement, d3.PieArcDatum<Feedback>, SVGGElement, unknown> = g.selectAll<SVGPathElement, d3.PieArcDatum<Feedback>>("path")
        .data(pie(data))
        .join("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.label))
        .attr("stroke", "#fff")
        .attr("stroke-width", "2");

    // Add labels
    g.selectAll("text")
      .data(pie(data))
      .join('text')
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#000")
      .text(d => `${d.data.label} (${d.data.value})`);

  }, [data, width, height]);

  return ( <svg ref={ref}></svg>
  );
};
