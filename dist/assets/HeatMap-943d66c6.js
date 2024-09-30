import{_ as D,o as f,c as S,F,a as b,b as R}from"./index-7bfa7dea.js";const B={mounted(){if(document.querySelector("#giveMeD3"))this.buildGraph();else{const s=document.createElement("script");s.id="giveMeD3",s.src="https://d3js.org/d3.v7.min.js",s.onload=()=>{const r=document.createElement("script");r.src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js",r.integrity="sha512-4UKI/XKm3xrvJ6pZS5oTRvIQGIzZFoXR71rRBb1y2N+PbwAsKa5tPl2J6WvbEvwN3TxQCm8hMzsl/pO+82iRlg==",r.crossOrigin="anonymous",r.referrerPolicy="no-referrer",r.onload=()=>{this.buildGraph()},document.body.appendChild(r)},document.body.appendChild(s)}},methods:{buildGraph(){const l=new XMLHttpRequest;l.open("GET","https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"),l.send(),l.onload=function(){const s=JSON.parse(l.responseText);console.log(s);const r=1e3,i=800,o=60,a=s.baseTemperature,n=s.monthlyVariance,x=d3.min(n,e=>e.variance),k=d3.max(n,e=>e.variance),h=["January","February","March","April","May","June","July","August","September","October","November","December"],t=[{key:2.8,value:"rgb(69,117,180)"},{key:3.9,value:"rgb(116,173,209)"},{key:5,value:"rgb(171, 217, 233)"},{key:6.1,value:"rgb(224,243,248)"},{key:7.2,value:"rgb(255,255,191)"},{key:8.3,value:"rgb(254,224,144)"},{key:9.5,value:"rgb(253,174,97)"},{key:10.6,value:"rgb(244,109,67)"},{key:11.7,value:"rgb(215,48,39)"},{key:12.8,value:"rgb(165,0,38)"}];console.log(`minTemp: ${x} and maxTemp:${k}`),d3.select(".D3Wrapper").append("h1").attr("id","title").html("Monthly Global Land-Surface Temperature"),d3.select(".D3Wrapper").append("h2").attr("id","description").html(`${n[0].year}-${n[n.length-1].year}: base temperature ${a}&degC`);const p=d3.select(".D3Wrapper").append("svg").attr("width",r).attr("height",i),u=d3.scaleLinear();u.domain([-.5,11.5]),u.range([i-o,o]);const m=d3.scaleLinear();m.domain([n[0].year,n[n.length-1].year]),m.range([o,r-o]);const _=d3.axisLeft(u).tickFormat(e=>h[e]),$=d3.axisBottom(m).tickFormat(e=>e);p.append("g").attr("id","y-axis").attr("transform",`translate(${o}, 0)`).call(_),p.append("g").attr("id","x-axis").attr("transform",`translate(0, ${i-o})`).call($);const w=n[n.length-1].year-n[0].year+1,y={w:(r-o*2)/w,h:(i-o*2)/12};p.selectAll().data(n).enter().append("rect").attr("class","cell").attr("data-month",e=>e.month-1).attr("data-year",e=>e.year).attr("data-temp",e=>e.variance+a).attr("x",e=>m(e.year)).attr("y",e=>u(e.month)+y.h/2).attr("width",y.w).attr("height",y.h).attr("fill",e=>{if(e.variance+a<=t[0].key)return t[0].value;if(e.variance+a<=t[1].key)return t[1].value;if(e.variance+a<=t[2].key)return t[2].value;if(e.variance+a<=t[3].key)return t[3].value;if(e.variance+a<=t[4].key)return t[4].value;if(e.variance+a<=t[5].key)return t[5].value;if(e.variance+a<=t[6].key)return t[6].value;if(e.variance+a<=t[7].key)return t[7].value;if(e.variance+a<=t[8].key)return t[8].value;if(e.variance+a>t[8].key)return t[9].value}).on("mouseover",function(e,c){function M(A){return h[A-1]}const T=d3.select("#tooltip"),g=d3.select(this).node().getBoundingClientRect();T.html(`${c.year} - ${M(c.month)}
                    <br>Average: ${(c.variance+a).toFixed(1)}&degC
                    <br>Variance: ${c.variance.toFixed(1)}&degC`).attr("data-year",c.year).attr("data-month",c.month).style("left",`${g.x+o/2}px`).style("top",`${g.y}px`).style("display","block")}).on("mouseout",function(){d3.select("#tooltip").style("display","none")});const d={w:40,h:20},j=r/3,C=o/2,v=p.append("g").attr("id","legend").attr("transform",`translate(${j}, ${C})`);v.selectAll("rect").data(t).enter().append("rect").attr("x",(e,c)=>c*d.w).attr("width",d.w).attr("height",d.h).attr("fill",e=>e.value),v.selectAll("text").data(t).enter().append("text").attr("x",(e,c)=>c*d.w+d.w/2).attr("y",-5).attr("text-anchor","middle").text(e=>e.key).style("fill","var(--color-text)")}}}},L=b("div",{class:"D3Wrapper"},null,-1),N=b("div",{id:"tooltip"},null,-1);function G(l,s,r,i,o,a){return f(),S(F,null,[L,N],64)}const J=D(B,[["render",G]]),E={__name:"HeatMap",setup(l){return(s,r)=>(f(),R(J))}};export{E as default};