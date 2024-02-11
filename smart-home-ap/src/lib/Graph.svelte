<!-- Graph.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
import * as d3 from 'd3';

export let tempData: number[];

let svg;

function updateGraph() {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // If SVG element is not initialized, create it
    if (!svg) {
        svg = d3.select(`#graph`)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
    } else {
        // If SVG element is already initialized, clear its contents
        svg.selectAll("*").remove();
    }

    const x = d3.scaleLinear()
        .domain([0, tempData.length - 1])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(tempData)!])
        .nice()
        .range([height, 0]);

    const line = d3.line<number>()
        .x((d, i) => x(i))
        .y(d => y(d))
        .curve(d3.curveNatural); // Specify curveNatural interpolation

    svg.append('path')
        .datum(tempData)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);

    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .call(d3.axisLeft(y));
}

$: {
    if (tempData.length > 0) {
        updateGraph();
    }
}



  </script>
  
  <div id="graph"></div>
  
  <style>
    /* Add your CSS styling here */
  </style>
  