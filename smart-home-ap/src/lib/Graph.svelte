<!-- Graph.svelte -->
<script lang="ts">
    import * as d3 from 'd3';
    
    export let tempData: number[];
    export let times: number[];
    
    let svg;
    
    function updateGraph() {
        
        const margin = { top: 20, right: 20, bottom: 50, left: 40 };
        const width = 400 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
    
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
    
        // Define x scale using time values
        const x = d3.scaleBand()
            .domain(times)
            .range([0, width]);
    
        // Define y scale using temperature values
        const y = d3.scaleLinear()
            .domain([16, d3.max(tempData)!+6])
            .nice()
            .range([height, 0]);
    
        // Define line generator
        const line = d3.line<number>()
            .x((d, i) => x(times[i])) // Use time values for x-coordinate
            .y(d => y(d))
            .curve(d3.curveNatural); // Specify curveNatural interpolation
    
        // Append path element for line
        svg.append('path')
            .datum(tempData)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', line);
    
        // Append x-axis
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));
    
        // Append y-axis
        svg.append('g')
            .call(d3.axisLeft(y));

        // Append x label
        svg.append("text")             
            .attr("transform",
                  "translate(" + (width/2) + " ," + 
                                 (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .style("fill", "white") // Set text color to white
            .text("Time (HH:MM:SS)");

        // Append y label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("fill", "white") // Set text color to white
            .text("Temperature (°C)");      
    }
    
    $: {
        if (tempData.length > 0 && times.length > 0) {
            updateGraph();
        }
    }
</script>

<div id="graph"></div>

<style>
    /* Add your CSS styling here */
</style>
