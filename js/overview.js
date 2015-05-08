var kuliahlist = ['IF2121 Logif', 'IF2122 Probstat', 'IF2120 Matdis', 'IF2130 Orkom', 'IF2240 Basdat', 'IF2250 DRPL', 'IF2230 OS', 'IF2220 TBFO', 'IF2211 Stima', 'IF3170 AI'];

var heatmapidlist = [
  '#if2121',
  '#if2122',
  '#if2120',
  '#if2130',
  '#if2240',
  '#if2250',
  '#if2230',
  '#if2220',
  '#if2211',
  '#if3170'
];

$(document).ready(function() {
  
  // generate chart
  var chart = c3.generate({
    data: {
      columns: [
        ['Analisis', 0.96, 1.0, 0.9865, 0.4483, 0.7429, 0.51, 0.4146, 1.0, 0.9643, 0.6591],
        ['Teori', 0.04, 0.0, 0.0135, 0.5517, 0.2571, 0.49, 0.3902, 0.0, 0.0357, 0.1136],
        ['Gabungan', 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1951, 0.0, 0.0, 0.2273]
      ],
      type: 'bar',
      colors: {
        Analisis: '#0e9cfe',
        Teori: '#ff2f25',
        Gabungan: '#db0bff'
      },
      groups: [
         ['Analisis', 'Teori', 'Gabungan']
      ],
      labels: {
        format: {
          y: d3.format("%")
        }
      },
    },
    legend: {
      position: 'right'
    },
    bar: {
      width: {
        ratio: 0.7
      }
    },
    axis : {
      x : {
        type: 'category',
   			categories: ['IF2121 Logif', 'IF2122 Probstat', 'IF2120 Matdis', 'IF2130 Orkom', 'IF2240 Basdat', 'IF2250 DRPL', 'IF2230 OS', 'IF2220 TBFO', 'IF2211 Stima', 'IF3170 AI']
      },
      y : {
        max: 0.99,
        tick: {
          format: d3.format("%")
        },
        label: {
          text: 'Persentase Jumlah Soal',
          position: 'outer-middle'
        }
      }
    },
    onrendered: function() {
      $("#chart .c3-chart rect").mouseover(function(e) {
        $("#chart-hover").toggleClass("active", true);
        $("#chart-hover #nama-kuliah").html(kuliahlist[$(this).index()]);
      })
      .mouseout(function() {
        $("#chart-hover").toggleClass("active", false);
      })
      .click(function(e) {
        $("#heatmap-list .heatmap").hide();
        $("#heatmap-list " + heatmapidlist[$(this).index()]).show();
        $("#tips .tip").hide();
        $("#tips .tip-" + heatmapidlist[$(this).index()].substr(1)).show();
        toggleView();
      });
    }
  });
  
  
  /*
  // script untuk pindah view ke details
  // bener-bener jelek tapi, kalau sumbu y-nya di klik juga dia bisa pindah view :v
  d3.selectAll('.tick')
    .on('click', function(value){
      alert('You clicked '+ value);
      setView("details");
  	})
    .style("cursor", "pointer");
  */

});