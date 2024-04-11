<template>
    <h1 id="title"></h1>
    <h2 id="description"></h2>
    <svg id="svg"></svg>
    <div id="tooltip"></div>
</template>

<script>
// TODO
// give tooltip some better styling
// format data better before building chart
// add yAxis label
// add link to http://www.bea.gov/national/pdf/nipaguid.pdf

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
                    this.loadDataAndBuildChart();
                };
                document.body.appendChild(topojsonScript);
            };
            document.body.appendChild(d3Script);
        } else {
            this.loadDataAndBuildChart();
        }
    },
    methods: {
        loadDataAndBuildChart() {
            const userEduURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
            const countiesURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
            let jsonUserEdu
            let eduMin
            let eduMax
            let jsonCounties
            const svg = d3.select('#svg')
            let svgHeight
            let svgWidth
            const choropleth = {'element':d3.select('#svg').append('g'), 'height':'', 'width':''} // attr set in drawMap function
            const padding = 50
            let userData
            let tooltipLock = false;
            // define colours
            const colors = [
                {key : 25, value :'#74c476'},
                {key : 50, value :'#41ab5d'},
                {key : 75, value :'#238b45'},
                {key : 100, value :'#006d2c'}
            ]

            const drawMap = () => {
                choropleth.element.selectAll('path')
                .data(jsonCounties)
                .enter()
                .append('path')
                .attr('d', d3.geoPath())
                .attr('class', 'county')
                .attr('data-fips', d => d.id)
                // .attr('data-education', d => jsonUserEdu.find(d1 => d1.fips === d.id ? d1.bachelorsOrHigher : undefined).bachelorsOrHigher) // map education value to drawn path
                .attr('data-education', (d, i) => userData[i].bachelorsOrHigher)
                .attr('fill', function() {
                    const dataEdu = this.getAttribute('data-education')
                    const colorPercent = ((dataEdu / eduMax) * 100).toFixed(0)
                    return  colorPercent < 25 ? colors[0].value :
                            colorPercent < 50 ? colors[1].value :
                            colorPercent < 75 ? colors[2].value :
                            colors[3].value
                })

                // tooltip
                .on('mouseover', function(ev, d) {
                    const tooltip = d3.select('#tooltip')
                    const pos = d3.select(this).node().getBoundingClientRect()
                
                    tooltip
                    .html(`${d.userData.area_name}, ${d.userData.state}: ${d.userData.bachelorsOrHigher}%`)
                    .attr('data-education', d.userData.bachelorsOrHigher)
                    .style('left', `${pos['x'] + padding/2}px`)
                    .style('top', `${pos['y']}px`)
                    .style('display', 'block')
                })
                .on('click', function() {
                    d3.select('#tooltip')
                    
                    tooltipLock = !tooltipLock
                })
                .on('mouseout', function() {
                    if (!tooltipLock) {
                        d3.select('#tooltip')
                        .style('display', 'none')
                    }
                })

                // get chroropleth dimensions
                choropleth.height = choropleth.element.node().getBBox().height
                choropleth.width = choropleth.element.node().getBBox().width
                // console.log('choropleth.height:', choropleth.height)
                svgHeight = choropleth.height + padding
                svgWidth = choropleth.width + padding
                svg.attr('width', svgWidth)
                svg.attr('height', svgHeight)
            }

            d3.json(countiesURL).then(
                (data, error) => {
                    error ? console.log(log) : jsonCounties = topojson.feature(data, data.objects.counties).features;
                    console.log('jsonCounties:', jsonCounties)
                    d3.json(userEduURL).then(
                        (data, error) => {
                            error ? console.log(error) : jsonUserEdu = data;
                            userData = jsonCounties.map( county => jsonUserEdu.find( countyEdu => countyEdu.fips === county.id ? county.userData = countyEdu : undefined))
                            console.log('userData:', userData) // order matches jsonCounties

                            // console.log('jsonUserEdu:', jsonUserEdu)
                            eduMin = d3.min(jsonUserEdu, d => d.bachelorsOrHigher)
                            eduMax = d3.max(jsonUserEdu, d => d.bachelorsOrHigher)
                            // console.log(`eduMin: ${eduMin} eduMax: ${eduMax}`)

                            d3.select('#title').html('United States Educational Attainment')
                            d3.select('#description').html('Percentage of adults age 25 and older with a bachelor\'s degree or higher (2010-2014)')
                            drawMap()

                            choropleth.element.attr('transform', `translate(${padding}, 0)`)

                            // legend
                            const legRect = {w:60, h:20}
                            const legendX = svgWidth / 1.6;
                            const legendY = padding / 2;

                            const legend = svg.append('g')
                            .attr('id', 'legend')
                            .attr('transform', `translate(${legendX}, ${legendY})`);

                            legend.selectAll('rect')
                            .data(colors)
                            .enter()
                            .append('rect')
                            .attr('x', (d, i) => i * legRect.w)
                            .attr('width', legRect.w)
                            .attr('height', legRect.h)
                            .attr('fill', d => d.value);

                            legend.selectAll('text')
                            .data(colors)
                            .enter()
                            .append('text')
                            .attr('x', (d, i) => i * legRect.w + legRect.w / 2)
                            .attr('y', -5) // Adjust this value for proper label placement
                            .attr('text-anchor', 'middle')
                            .text(d => `<${(eduMax * (d.key * 0.01)).toFixed(0)}%`);
                        }
                    ) 
                }
            )
        }
    }
}
    
</script>

<style>
.wrapper {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    background-color: #eee;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
.bar:hover {
    fill: #3c4ef0;
}
#tooltip {
    position: absolute;
    background-color: white;
    border: 1px solid black;
    padding: 10px;
    display: none;
    z-index: 1;
}
</style>