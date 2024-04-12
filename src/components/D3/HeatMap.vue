<template>
    <div class="D3Wrapper"></div>
    <div id="tooltip"></div>
</template>

<script>
export default {
    mounted() {
        const d3Loaded = document.querySelector('#giveMeD3');
        // Dynamically load D3.js script
        if (!d3Loaded) {
            const d3Script = document.createElement('script');
            d3Script.id = "giveMeD3";
            d3Script.src = 'https://d3js.org/d3.v7.min.js';
            d3Script.onload = () => {
                // D3.js script loaded, now load TopoJSON script
                const topojsonScript = document.createElement('script');
                topojsonScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js';
                topojsonScript.integrity = 'sha512-4UKI/XKm3xrvJ6pZS5oTRvIQGIzZFoXR71rRBb1y2N+PbwAsKa5tPl2J6WvbEvwN3TxQCm8hMzsl/pO+82iRlg==';
                topojsonScript.crossOrigin = 'anonymous';
                topojsonScript.referrerPolicy = 'no-referrer';
                topojsonScript.onload = () => {
                    // Both scripts loaded, now you can use D3.js and TopoJSON
                    this.buildGraph();
                };
                document.body.appendChild(topojsonScript);
            };
            document.body.appendChild(d3Script);
        } else {
            this.buildGraph();
        }
    },
    methods: {
        buildGraph() {    
            const req = new XMLHttpRequest()
            req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
            req.send()
            req.onload = function(){
                const json = JSON.parse(req.responseText)
                console.log(json)
                
                // define Vars
                const svgWidth = 1000
                const svgHeight = 800
                const padding = 60
                const baseTemp = json.baseTemperature
                const varTemp = json.monthlyVariance
                const minVariance = d3.min(varTemp, d => d.variance)
                const maxVariance = d3.max(varTemp, d => d.variance)
                const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let tooltipLock = false;

                // temp colours
                const tempColor = [
                    { key: 2.8, value: 'rgb(69,117,180)' },
                    { key: 3.9, value: 'rgb(116,173,209)' },
                    { key: 5, value: 'rgb(171, 217, 233)' },
                    { key: 6.1, value: 'rgb(224,243,248)' },
                    { key: 7.2, value: 'rgb(255,255,191)' },
                    { key: 8.3, value: 'rgb(254,224,144)' },
                    { key: 9.5, value: 'rgb(253,174,97)' },
                    { key: 10.6, value: 'rgb(244,109,67)' },
                    { key: 11.7, value: 'rgb(215,48,39)' },
                    { key: 12.8, value: 'rgb(165,0,38)' }
                ];

                
                console.log(`minTemp: ${minVariance} and maxTemp:${maxVariance}`)

                // Define Gradient
                // const gradient = 

                // create Title
                d3.select('.D3Wrapper')
                .append('h1')
                .attr('id', 'title')
                .html('Monthly Global Land-Surface Temperature')

                d3.select('.D3Wrapper')
                .append('h2')
                .attr('id', 'description')
                .html(`${varTemp[0].year}-${varTemp[varTemp.length - 1].year}: base temperature ${baseTemp}&degC`)
                
                // create svg
                const svg = d3.select('.D3Wrapper')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgHeight)

                // create scales
                const yScale = d3.scaleLinear()
                yScale.domain([-0.5,11.5])
                yScale.range([svgHeight - padding, padding])

                const xScale = d3.scaleLinear()
                xScale.domain([varTemp[0].year, varTemp[varTemp.length - 1].year])
                xScale.range([padding, svgWidth - padding])

                // create axes
                const yAxis = d3.axisLeft(yScale)
                // .tickValues(d3.range(0.5, 12.5)) // Set the numbers 1 to 12 as tick values
                .tickFormat(month => {
                    // Use an array of month names to map to the tick values
                    return monthNames[month]; // Adjust for 0-based array indexing
                })
                
                const xAxis = d3.axisBottom(xScale)
                .tickFormat(d => d)

                svg.append('g')
                .attr('id', 'y-axis')
                .attr('transform', `translate(${padding}, 0)`)
                .call(yAxis)

                svg.append('g')
                .attr('id', 'x-axis')
                .attr('transform', `translate(0, ${svgHeight - padding})`)
                .call(xAxis)

                const numYears = varTemp[varTemp.length - 1].year - varTemp[0].year + 1;
                // draw rectangles
                const rectDims = {w: (svgWidth - padding * 2) / (numYears), h: (svgHeight - padding * 2) / 12}

                svg.selectAll()
                .data(varTemp)
                .enter()
                .append('rect')
                .attr('class', 'cell')
                .attr('data-month', d => d.month - 1) // account for 0 indexing discrepency
                .attr('data-year', d => d.year)
                .attr('data-temp', d => (d.variance + baseTemp))
                .attr('x', d => xScale(d.year))
                .attr('y', d => yScale(d.month) + (rectDims.h / 2))
                .attr('width', rectDims.w)
                .attr('height', rectDims.h)
                .attr('fill', d => {
                    if (d.variance + baseTemp <= tempColor[0].key) {
                        return tempColor[0].value
                    } if (d.variance + baseTemp <= tempColor[1].key) {
                        return tempColor[1].value
                    } if (d.variance + baseTemp <= tempColor[2].key) {
                        return tempColor[2].value
                    } if (d.variance + baseTemp <= tempColor[3].key) {
                        return tempColor[3].value
                    } if (d.variance + baseTemp <= tempColor[4].key) {
                        return tempColor[4].value
                    } if (d.variance + baseTemp <= tempColor[5].key) {
                        return tempColor[5].value
                    } if (d.variance + baseTemp <= tempColor[6].key) {
                        return tempColor[6].value
                    } if (d.variance + baseTemp <= tempColor[7].key) {
                        return tempColor[7].value
                    } if (d.variance + baseTemp <= tempColor[8].key) {
                        return tempColor[8].value
                    } if (d.variance + baseTemp > tempColor[8].key) {
                        return tempColor[9].value
                    }
                } )

                // tooltip
                .on('mouseover', function(ev, d) {
                    function getMonthName(month) {return monthNames[month - 1]}

                    const tooltip = d3.select('#tooltip');
                    const pos = d3.select(this).node().getBoundingClientRect()

                    tooltip
                    .html(`${d.year} - ${getMonthName(d.month)}
                    <br>Average: ${(d.variance + baseTemp).toFixed(1)}&degC
                    <br>Variance: ${(d.variance).toFixed(1)}&degC`)
                    .attr('data-year', d.year)
                    .attr('data-month', d.month)
                    .style('left', `${pos['x'] + padding/2}px`)
                    .style('top', `${pos['y']}px`)
                    .style('display', 'block')
                })
                .on('mouseout', function() {
                    d3.select('#tooltip').style('display', 'none')
                })

                // legend
                const legRect = {w:40, h:20}
                const legendX = svgWidth / 3;
                const legendY = padding / 2;

                const legend = svg.append('g')
                .attr('id', 'legend')
                .attr('transform', `translate(${legendX}, ${legendY})`);

                legend.selectAll('rect')
                .data(tempColor)
                .enter()
                .append('rect')
                .attr('x', (d, i) => i * legRect.w)
                .attr('width', legRect.w)
                .attr('height', legRect.h)
                .attr('fill', d => d.value);

                legend.selectAll('text')
                .data(tempColor)
                .enter()
                .append('text')
                .attr('x', (d, i) => i * legRect.w + legRect.w / 2)
                .attr('y', -5) // Adjust this value for proper label placement
                .attr('text-anchor', 'middle')
                .text(d => d.key)
                .style('fill', 'var(--color-text)');
            }
        }
    }
}
</script>