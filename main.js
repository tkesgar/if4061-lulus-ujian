function clamp(h,t,e){return t>=h?t:h>=e?e:h}$(document).ready(function(){"use strict";$.getJSON("json/heatmap.json",function(h){$.each(h,function(h,t){for(var e=[],a=[],d=0;10>d;d++){a[d]=[];for(var i=0;10>i;i++)a[d][i]={analisis:0,campuran:0,teori:0}}$.each(t.data,function(h,t){-1==e.indexOf(t.materi)&&e.push(t.materi);var d=e.indexOf(t.materi),i=t.tahun-2009+("UAS"===t.ujian?5:0),c=t.soal.analisis,l=t.soal.campuran,n=t.soal.teori;a[d][i]=999==c||999==l||999==n?null:t.soal});var c=$("<tbody>");$.each(e,function(h,t){var e=$("<tr>").append("<td>"+t+"</td>");$.each(a[h],function(h,t){var a=$("<td>");if(null===t)a.addClass("heat-nil");else{var d=clamp(t.analisis,0,4),i=clamp(t.campuran,0,4),c=clamp(t.teori,0,4);if(a.addClass(["heat-",d,i,c].join("")),t.analisis+t.campuran+t.teori>0){var l=h>=5?"UAS":"UTS",n=2009+h-("UAS"===l?5:0);a.popover({container:"body",trigger:"hover",title:[l,n+"/"+(n+1)].join(" "),html:!0,content:"Analisis: <b class='color-a"+t.analisis+"'>"+t.analisis+"</b><br>Gabungan: <b class='color-c"+t.campuran+"'>"+t.campuran+"</b><br>Teori: <b class='color-t"+t.teori+"'>"+t.teori+"</b>"})}}e.append(a)}),c.append(e)}),$("#heatmap-list").append($("<li id='if"+t.kode.substr(2)+"' class='heatmap'>").append(["<h1>",t.kode," ","<small>",t.kuliah,"</small>","</h1>"].join("")).append($("<table>").append(["<thead>","<tr>","<th rowspan='2'>Materi</th>","<th colspan='5'>UTS</th>","<th colspan='5'>UAS</th>","</tr>","<tr>","<th>'09/'10</th>","<th>'10/'11</th>","<th>'11/'12</th>","<th>'12/'13</th>","<th>'13/'14</th>","<th>'09/'10</th>","<th>'10/'11</th>","<th>'11/'12</th>","<th>'12/'13</th>","<th>'13/'14</th>","</tr>","</thead>"].join("")).append(c)))})}),$("#tahun0").change(function(h){$(".heatmap thead > tr:nth-child(2) > th:nth-child(1)").toggleClass("hide-col",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(6)").toggleClass("hide-col",!this.checked),$(".heatmap tbody td:nth-child(2)").toggleClass("hide-col",!this.checked),$(".heatmap tbody td:nth-child(7)").toggleClass("hide-col",!this.checked)}).change(),$("#tahun1").change(function(h){$(".heatmap thead > tr:nth-child(2) > th:nth-child(2)").toggleClass("hide-col",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(7)").toggleClass("hide-col",!this.checked),$(".heatmap tbody td:nth-child(3)").toggleClass("hide-col",!this.checked),$(".heatmap tbody td:nth-child(8)").toggleClass("hide-col",!this.checked)}).change(),$("#tahun2").change(function(h){$(".heatmap thead > tr:nth-child(2) > th:nth-child(3)").toggleClass("hide-col",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(8)").toggleClass("hide-col",!this.checked),$(".heatmap tbody td:nth-child(4)").toggleClass("hide-col",!this.checked),$(".heatmap tbody td:nth-child(9)").toggleClass("hide-col",!this.checked)}).change(),$("#tahun3").change(function(h){$(".heatmap thead > tr:nth-child(2) > th:nth-child(4)").toggleClass("hide-col",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(9)").toggleClass("hide-col",!this.checked),$(".heatmap tbody td:nth-child(5)").toggleClass("hide-col",!this.checked),$(".heatmap tbody td:nth-child(10)").toggleClass("hide-col",!this.checked)}).change(),$("#tahun4").change(function(h){$(".heatmap thead > tr:nth-child(2) > th:nth-child(5)").toggleClass("hide-col",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(10)").toggleClass("hide-col",!this.checked),$(".heatmap tbody td:nth-child(6)").toggleClass("hide-col",!this.checked),$(".heatmap tbody td:nth-child(11)").toggleClass("hide-col",!this.checked)}).change(),$("#uts").change(function(h){$(".heatmap thead > tr:nth-child(2) > th:nth-child(1)").toggleClass("hide-ujian",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(2)").toggleClass("hide-ujian",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(3)").toggleClass("hide-ujian",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(4)").toggleClass("hide-ujian",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(5)").toggleClass("hide-ujian",!this.checked),$(".heatmap tbody td:nth-child(2)").toggleClass("hide-ujian",!this.checked),$(".heatmap tbody td:nth-child(3)").toggleClass("hide-ujian",!this.checked),$(".heatmap tbody td:nth-child(4)").toggleClass("hide-ujian",!this.checked),$(".heatmap tbody td:nth-child(5)").toggleClass("hide-ujian",!this.checked),$(".heatmap tbody td:nth-child(6)").toggleClass("hide-ujian",!this.checked),$(".heatmap thead tr:nth-child(1) th:nth-child(2)").toggleClass("hide-ujian",!this.checked)}).change(),$("#uas").change(function(h){$(".heatmap thead > tr:nth-child(2) > th:nth-child(6)").toggleClass("hide-ujian",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(7)").toggleClass("hide-ujian",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(8)").toggleClass("hide-ujian",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(9)").toggleClass("hide-ujian",!this.checked),$(".heatmap thead > tr:nth-child(2) > th:nth-child(10)").toggleClass("hide-ujian",!this.checked),$(".heatmap tbody td:nth-child(7)").toggleClass("hide-ujian",!this.checked),$(".heatmap tbody td:nth-child(8)").toggleClass("hide-ujian",!this.checked),$(".heatmap tbody td:nth-child(9)").toggleClass("hide-ujian",!this.checked),$(".heatmap tbody td:nth-child(10)").toggleClass("hide-ujian",!this.checked),$(".heatmap tbody td:nth-child(11)").toggleClass("hide-ujian",!this.checked),$(".heatmap thead tr:nth-child(1) th:nth-child(3)").toggleClass("hide-ujian",!this.checked)}).change()});
var kuliahlist=["IF2121 Logif","IF2122 Probstat","IF2120 Matdis","IF2130 Orkom","IF2240 Basdat","IF2250 DRPL","IF2230 OS","IF2220 TBFO","IF2211 Stima","IF3170 AI"],heatmapidlist=["#if2121","#if2122","#if2120","#if2130","#if2240","#if2250","#if2230","#if2220","#if2211","#if3170"];$(document).ready(function(){c3.generate({data:{columns:[["Analisis",.96,1,.9865,.4483,.7429,.51,.4146,1,.9643,.6591],["Teori",.04,0,.0135,.5517,.2571,.49,.3902,0,.0357,.1136],["Gabungan",0,0,0,0,0,0,.1951,0,0,.2273]],type:"bar",colors:{Analisis:"#0e9cfe",Teori:"#ff2f25",Gabungan:"#db0bff"},groups:[["Analisis","Teori","Gabungan"]],labels:{format:{y:d3.format("%")}}},legend:{position:"right"},bar:{width:{ratio:.7}},axis:{x:{type:"category",categories:["IF2121 Logif","IF2122 Probstat","IF2120 Matdis","IF2130 Orkom","IF2240 Basdat","IF2250 DRPL","IF2230 OS","IF2220 TBFO","IF2211 Stima","IF3170 AI"]},y:{max:.99,tick:{format:d3.format("%")},label:{text:"Persentase Jumlah Soal",position:"outer-middle"}}},onrendered:function(){$("#chart .c3-chart rect").mouseover(function(i){$("#chart-hover").toggleClass("active",!0),$("#chart-hover #nama-kuliah").html(kuliahlist[$(this).index()])}).mouseout(function(){$("#chart-hover").toggleClass("active",!1)}).click(function(i){$("#heatmap-list .heatmap").hide(),$("#heatmap-list "+heatmapidlist[$(this).index()]).show(),$("#tips .tip").hide(),$("#tips .tip-"+heatmapidlist[$(this).index()].substr(1)).show(),toggleView()})}})});
function setView(e){if("overview"!==e&&"details"!==e)throw new Error("Unknown target: "+e);$("#overview").toggleClass("up","overview"!==e),$("#details").toggleClass("down","details"!==e),currentView=e,console.log("Current view: "+currentView)}function toggleView(){setView("overview"===currentView?"details":"overview")}var currentView="overview";$(document).ready(function(){setView("overview"),$(document).keydown(function(e){console.log(e.keyCode),8===e.keyCode&&"details"===currentView&&(toggleView(),e.preventDefault())})});
$(document).ready(function(){$.getJSON("json/tips.json",function(n){$.each(n,function(n,t){$("#tips").append($("<div class='tip tip-"+n+"'>").append(t))})})});
function clamp(i,n,a){return n>=i?n:i>=a?a:i}$(document).ready(function(){"use strict";$.getJSON("json/trivia.json",function(i){$.each(i,function(i,n){$("#carousel-trivia .carousel-inner").append($("<div class='item'>").append($("<div class='carousel-caption'>").append(["<h3>",n.judul,"</h3>"].join("")).append(["<p>",n.isi,"</p>"].join(""))))}),$("#carousel-trivia .carousel-inner > .item:first-child").addClass("active")})});
//# sourceMappingURL=main.js.map