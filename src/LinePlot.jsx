import * as d3 from "d3";

export default function LinePlot(data, {
    width = 640,
    height = 400,
    x = d => d.x,
    y = d => d.y
} = {}) {

    const X = d3.map(data, x);
    const Y = d3.map(data, y);

    const xScale = d3.scaleLinear(d3.extent(X), [40, width - 20])
    const yScale = d3.scaleLinear(d3.extent(Y), [height - 40, 20])

    const line = d3.line()
        .x((d, i) => xScale(X[i]))
        .y((d, i) => yScale(Y[i]))

    const svg = d3.create("svg").attr("width", width).attr("height", height);

    // axes
    svg.append("g")
        .attr("transform", `translate(0, ${height - 40})`).call(d3.axisBottom(xScale))

    svg.append("g")
        .attr("transform", `translate(40,0)`).call(d3.axisLeft(yScale))

    svg.append("path").attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 2).attr("d", line(data))

    return svg.node()
}