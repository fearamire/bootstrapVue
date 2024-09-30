import{_ as D,o as j,c as k,F as A,a as m,b as C}from"./index-7bfa7dea.js";const E={mounted(){if(document.querySelector("#giveMeD3"))this.loadDataAndBuildChart();else{const a=document.createElement("script");a.id="giveMeD3",a.src="https://d3js.org/d3.v7.min.js",a.onload=()=>{const t=document.createElement("script");t.src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js",t.integrity="sha512-4UKI/XKm3xrvJ6pZS5oTRvIQGIzZFoXR71rRBb1y2N+PbwAsKa5tPl2J6WvbEvwN3TxQCm8hMzsl/pO+82iRlg==",t.crossOrigin="anonymous",t.referrerPolicy="no-referrer",t.onload=()=>{this.loadDataAndBuildChart()},document.body.appendChild(t)},document.body.appendChild(a)}},methods:{loadDataAndBuildChart(){const p="https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",a="https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";let t,u,d;const g=d3.select("#svg");let y,_;const s={element:d3.select("#svg").append("g"),height:"",width:""},c=50;let f,v=!1;const l=[{key:25,value:"#74c476"},{key:50,value:"#41ab5d"},{key:75,value:"#238b45"},{key:100,value:"#006d2c"}],w=()=>{s.element.selectAll("path").data(d).enter().append("path").attr("d",d3.geoPath()).attr("class","county").attr("data-fips",n=>n.id).attr("data-education",(n,e)=>f[e].bachelorsOrHigher).attr("fill",function(){const e=(this.getAttribute("data-education")/u*100).toFixed(0);return e<25?l[0].value:e<50?l[1].value:e<75?l[2].value:l[3].value}).on("mouseover",function(n,e){const x=d3.select("#tooltip"),i=d3.select(this).node().getBoundingClientRect();x.html(`${e.userData.area_name}, ${e.userData.state}: ${e.userData.bachelorsOrHigher}%`).attr("data-education",e.userData.bachelorsOrHigher).style("left",`${i.x+c/2}px`).style("top",`${i.y}px`).style("display","block")}).on("click",function(){d3.select("#tooltip"),v=!v}).on("mouseout",function(){v||d3.select("#tooltip").style("display","none")}),s.height=s.element.node().getBBox().height,s.width=s.element.node().getBBox().width,y=s.height+c,_=s.width+c,g.attr("width",_),g.attr("height",y)};d3.json(a).then((n,e)=>{e?console.log(log):d=topojson.feature(n,n.objects.counties).features,console.log("jsonCounties:",d),d3.json(p).then((x,i)=>{i?console.log(i):t=x,f=d.map(o=>t.find(r=>r.fips===o.id?o.userData=r:void 0)),console.log("userData:",f),d3.min(t,o=>o.bachelorsOrHigher),u=d3.max(t,o=>o.bachelorsOrHigher),d3.select("#title").html("United States Educational Attainment"),d3.select("#description").html("Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"),w(),s.element.attr("transform",`translate(${c}, 0)`);const h={w:60,h:20},B=_/1.6,$=c/2,b=g.append("g").attr("id","legend").attr("transform",`translate(${B}, ${$})`);b.selectAll("rect").data(l).enter().append("rect").attr("x",(o,r)=>r*h.w).attr("width",h.w).attr("height",h.h).attr("fill",o=>o.value),b.selectAll("text").data(l).enter().append("text").attr("x",(o,r)=>r*h.w+h.w/2).attr("y",-5).attr("text-anchor","middle").text(o=>`<${(u*(o.key*.01)).toFixed(0)}%`).style("fill","var(--color-text)")})})}}},R=m("h1",{id:"title"},null,-1),O=m("h2",{id:"description"},null,-1),H=m("svg",{id:"svg"},null,-1),P=m("div",{id:"tooltip"},null,-1);function F(p,a,t,u,d,g){return j(),k(A,null,[R,O,H,P],64)}const L=D(E,[["render",F]]),S={__name:"EducationData",setup(p){return(a,t)=>(j(),C(L))}};export{S as default};