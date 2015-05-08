function clamp(v, l, r) {
  if (v <= l) return l;
  else if (v >= r) return r;
  else return v;
}

$(document).ready(function() {

  "use strict";

  // memasukkan data heatmap.json ke content
  $.getJSON("json/heatmap.json", function(heatmap) {

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
      $("#heatmap-list").append(
        $("<li id='if" + matkul.kode.substr(2) + "' class='heatmap'>")
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
    $(".heatmap tbody td:nth-child(5)") .toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(10)").toggleClass("hide-col", !this.checked);
  }).change();
  $("#tahun4").change(function(e) {
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(5)") .toggleClass("hide-col", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(10)").toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(6)") .toggleClass("hide-col", !this.checked);
    $(".heatmap tbody td:nth-child(11)").toggleClass("hide-col", !this.checked);
  }).change();

  $("#uts").change(function(e) {
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(1)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(2)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(3)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(4)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(5)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(2)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(3)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(4)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(5)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(6)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap thead tr:nth-child(1) th:nth-child(2)").toggleClass("hide-ujian", !this.checked);
  }).change();
  $("#uas").change(function(e) {
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(6)") .toggleClass("hide-ujian", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(7)") .toggleClass("hide-ujian", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(8)") .toggleClass("hide-ujian", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(9)") .toggleClass("hide-ujian", !this.checked);
    $(".heatmap thead > tr:nth-child(2) > th:nth-child(10)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(7)") .toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(8)") .toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(9)") .toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(10)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap tbody td:nth-child(11)").toggleClass("hide-ujian", !this.checked);
    $(".heatmap thead tr:nth-child(1) th:nth-child(3)").toggleClass("hide-ujian", !this.checked);
  }).change();

});