function clamp(v, l, r) {
  if (v <= l) return l;
  else if (v >= r) return r;
  else return v;
}

$(document).ready(function() {

  "use strict";

  // memasukkan data trivia.json ke carousel
  $.getJSON("data/trivia.json", function(trivia) {

    $.each(trivia, function(key, val) {
      $("#carousel-trivia .carousel-inner")
      .append($("<div class='item'>")
        .append($("<div class='carousel-caption'>")
          .append(["<h3>", val.judul, "</h3>"].join(""))
          .append(["<p>", val.isi, "</p>"].join(""))
        )
      );
    });

    $("#carousel-trivia .carousel-inner > .item:first-child").addClass("active");

  });

  // memasukkan data heatmap.json ke content
  $.getJSON("data/heatmap.json", function(heatmap) {

    // loop tiap mata kuliah
    $.each(heatmap, function(m, matkul) {

      // materi dan matrix untuk addHeatmap
      var materi = [];
      var matrix = [];

      // inisialisasi matrix (default: {0, 0, 0} dari json)
      for (var i = 0; i < 10; i++) {
        matrix[i] = [];
        for (var j = 0; j < 10; j++) {
          matrix[i][j] = {
            analisis: 0,
            campuran: 0,
            teori: 0
          };
        }
      }

      // loop tiap data mata kuliah
      $.each(matkul.data, function(e, entri) {

        // masukkan ke array materi jika materi belum ada
        if (materi.indexOf(entri.materi) == -1) {
          materi.push(entri.materi);
        }

        // format matriks sesuai bentuk tabel
        var r = materi.indexOf(entri.materi);
        var c = (entri.tahun - 2009) + (entri.ujian === "UAS" ? 5 : 0);
        var sa = entri.soal.analisis;
        var sc = entri.soal.campuran;
        var st = entri.soal.teori;
        matrix[r][c] = (sa == 999 || sc == 999 || st == 999) ? null : entri.soal;
      });

      // sampai di sini, materi == daftar materi, matrix == heatmap

      // tbody untuk tabel
      var tbody = $("<tbody>");

      // loop untuk tiap materi (iterator = baris)
      $.each(materi, function(r, m) {

        // tr untuk tbody
        var tr = $("<tr>").append("<td>" + m + "</td>");

        // loop untuk tiap materi (iterator = kolom)
        $.each(matrix[r], function(c, cell) {

          // td untuk tr
          var td = $("<td>");
          // set kelas sesuai heat
          if (cell === null) {
            td.addClass("heat-nil");
          } else {
            var ac = clamp(cell.analisis, 0, 4);
            var cc = clamp(cell.campuran, 0, 4);
            var tc = clamp(cell.teori, 0, 4);
            td.addClass(["heat-", ac, cc, tc].join(""));

            if ((cell.analisis + cell.campuran + cell.teori) > 0) {
              var ujian = c >= 5 ? "UAS" : "UTS";
              var year = (2009 + c) - (ujian === "UAS" ? 5 : 0);
              td.popover({
                container: "body",
                trigger: "hover",
                title: [ujian, year + "/" + (year + 1)].join(" "),
                html: true,
                content:
                  "Analisis: <b class='color-a" + cell.analisis + "'>" + cell.analisis + "</b><br>" +
                  "Gabungan: <b class='color-c" + cell.campuran + "'>" + cell.campuran + "</b><br>" +
                     "Teori: <b class='color-t" + cell.teori    + "'>" + cell.teori    + "</b>"
              });
            }
          }

          tr.append(td);
        });

        tbody.append(tr);
      });

      // memasukkan data ke dalam content
      $(".heatmap-list").append(
        $("<li class='heatmap'>")
        .append(["<h1>", matkul.kode, " ", "<small>", matkul.kuliah,"</small>","</h1>"].join(""))
        .append($("<table>")
          .append(
            ["<thead>",
              "<tr>",
                "<th rowspan='2'>Materi</th>",
                "<th colspan='5'>UTS</th>",
                "<th colspan='5'>UAS</th>",
              "</tr>",
              "<tr>",
                "<th>'09/'10</th>",
                "<th>'10/'11</th>",
                "<th>'11/'12</th>",
                "<th>'12/'13</th>",
                "<th>'13/'14</th>",

                "<th>'09/'10</th>",
                "<th>'10/'11</th>",
                "<th>'11/'12</th>",
                "<th>'12/'13</th>",
                "<th>'13/'14</th>",
              "</tr>",
            "</thead>"].join("")
          )
          .append(tbody)
        )
      );

    });
  });

  // menambahkan change handler untuk kontrol
  // AAAAA I HATE THIS AWFUL SCRIPT

  $("#if2120").change(function(e) {
    if (this.checked) {
      $(".heatmap-list > li:nth-child(1)").show(500);
    } else {
      $(".heatmap-list > li:nth-child(1)").hide(500);
    }
  }).change();
  $("#if2121").change(function(e) {
    if (this.checked) {
      $(".heatmap-list > li:nth-child(2)").show(500);
    } else {
      $(".heatmap-list > li:nth-child(2)").hide(500);
    }
  }).change();
  $("#if2122").change(function(e) {
    if (this.checked) {
      $(".heatmap-list > li:nth-child(3)").show(500);
    } else {
      $(".heatmap-list > li:nth-child(3)").hide(500);
    }
  }).change();
  $("#if2130").change(function(e) {
    if (this.checked) {
      $(".heatmap-list > li:nth-child(4)").show(500);
    } else {
      $(".heatmap-list > li:nth-child(4)").hide(500);
    }
  }).change();
  $("#if2211").change(function(e) {
    if (this.checked) {
      $(".heatmap-list > li:nth-child(5)").show(500);
    } else {
      $(".heatmap-list > li:nth-child(5)").hide(500);
    }
  }).change();
  $("#if2220").change(function(e) {
    if (this.checked) {
      $(".heatmap-list > li:nth-child(6)").show(500);
    } else {
      $(".heatmap-list > li:nth-child(6)").hide(500);
    }
  }).change();
  $("#if2230").change(function(e) {
    if (this.checked) {
      $(".heatmap-list > li:nth-child(7)").show(500);
    } else {
      $(".heatmap-list > li:nth-child(7)").hide(500);
    }
  }).change();
  $("#if2240").change(function(e) {
    if (this.checked) {
      $(".heatmap-list > li:nth-child(8)").show(500);
    } else {
      $(".heatmap-list > li:nth-child(8)").hide(500);
    }
  }).change();
  $("#if2250").change(function(e) {
    if (this.checked) {
      $(".heatmap-list > li:nth-child(9)").show(500);
    } else {
      $(".heatmap-list > li:nth-child(9)").hide(500);
    }
  }).change();
  $("#if3170").change(function(e) {
    if (this.checked) {
      $(".heatmap-list > li:nth-child(10)").show(500);
    } else {
      $(".heatmap-list > li:nth-child(10)").hide(500);
    }
  }).change();

  $("#tahun0").change(function(e) {
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(1)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(6)").toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(2)").toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(7)").toggleClass("hide-col", !this.checked);
  }).change();
  $("#tahun1").change(function(e) {
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(2)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(7)").toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(3)").toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(8)").toggleClass("hide-col", !this.checked);
  }).change();
  $("#tahun2").change(function(e) {
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(3)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(8)").toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(4)").toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(9)").toggleClass("hide-col", !this.checked);
  }).change();
  $("#tahun3").change(function(e) {
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(4)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(9)").toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(5)").toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(10)").toggleClass("hide-col", !this.checked);
  }).change();
  $("#tahun4").change(function(e) {
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(5)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(10)").toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(6)").toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(11)").toggleClass("hide-col", !this.checked);
  }).change();

  $("#uts").change(function(e) {
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(1)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(2)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(2)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(3)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(3)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(4)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(4)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(5)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(5)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(6)").toggleClass("hide-col", !this.checked);
    $("#datavis > div > div > div.col-xs-8 > div > li:nth-child(2) > table > thead > tr:nth-child(1) > th:nth-child(2)").toggleClass("hide-col", !this.checked);
  }).change();
  $("#uas").change(function(e) {
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(6)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(7)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(7)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(8)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(8)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(9)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(9)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(10)").toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(10)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(11)").toggleClass("hide-col", !this.checked);
    $("#datavis > div > div > div.col-xs-8 > div > li:nth-child(2) > table > thead > tr:nth-child(1) > th:nth-child(3)").toggleClass("hide-col", !this.checked);
  }).change();


  // fungsi toggle untuk legend
  $(".legend-toggle").click(function() {
    $(".legend").toggleClass("legend-closed");
  });

});

var chart = c3.generate({
    data: {
        x: 'x',
        columns: [
            ['x', 'IF2121', 'IF2122', 'IF2120', 'IF2130', 'IF2240', 'IF2250', 'IF2230', 'IF2220', 'IF2221', 'IF3170'],
            ['Analisis', 0.96, 1.0, 0.9865, 0.4483, 0.7429, 0.51, 0.4146, 1.0, 0.9643, 0.6591],
            ['Teori', 0.04, 0.0, 0.0135, 0.5517, 0.2571, 0.49, 0.3902, 0.0, 0.0357, 0.1136],
            ['Gabungan', 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1951, 0.0, 0.0, 0.2273]
        ],
        type: 'bar',
        colors: {
            Analisis: '#007fd6',
            Teori: '#d60000',
            Gabungan: '#b700d6'
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
    bar: {
        width: {
            ratio: 0.7
        }
    },
    axis : {
        x : {
            type: 'categorized'
        },
        y : {
            max: 0.99,
            tick: {
                format: d3.format("%")
            }
        }
    }
});
