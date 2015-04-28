function clamp(v, l, r) {
  return v < l ? l : (v > r ? r : v);
}

function addToContent(data) {

  var tbody = $("<tbody>");
  for (var i = 0; i < data.materi.length; i++) {
    materi = data.materi[i];

    var tr = $("<tr>").append("<td>" + materi + "</td>");
    for (var j = 0; j < data.matrix[i].length; j++) {
      cell = data.matrix[i][j];

      var td;
      if (cell === "nil") {
        td = $("<td class='heat-nil'></td>");
      } else {
        var a = parseInt(cell.substring(0, 1));
        var g = parseInt(cell.substring(1, 2));
        var t = parseInt(cell.substring(2, 3));

        td = $(["<td class='heat-", clamp(a, 0, 4), clamp(g, 0, 4), clamp(t, 0, 4), "'></td>"].join(""));
        if (cell !== "000") {
          td.data("soal", {
            analisis: a,
            gabungan: g,
            teori: t
          })
          .mouseenter(function(e) {
            var soal = $(e.target).data("soal");
            $("#hover-a").html(soal.analisis);
            $("#hover-g").html(soal.gabungan);
            $("#hover-t").html(soal.teori);
            $("#content-hover").show();
          })
          .mousemove(function(e) {
            var left = e.pageX + 20;
            var top = e.pageY + 20;
            $("#content-hover").css({ top: top, left: left });
          })
          .mouseleave(function(e) {
            $("#content-hover").hide();
          });
        }
      }

      tr.append(td);
    }

    tbody.append(tr);
  }

  $(".content").append(
    $("<div class='heatmap'>")
    .append(["<h1>", data.kode, " ", "<small>", data.kuliah,"</small>","</h1>"].join(""))
    .append($("<table class='heatmap-table'>")
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
}

$(document).ready(function() {

  // fungsi toggle untuk about
  $(".about-toggle").click(function() {
    $(".about").toggleClass("about-closed");
  });

  // fungsi toggle untuk legend
  $(".legend-toggle").click(function() {
    $(".legend").toggleClass("legend-closed");
  });

  // memasukkan data trivia.json ke carousel
  $.getJSON("json/trivia.json", function(data) {

    $.each(data, function(key, val) {
      $(".carousel-inner").append("<div class='item'>\
        <div class='carousel-caption'>\
          <h3>" + val.judul + "</h3>\
          <p>" + val.isi + "</p>\
        </div>\
        </div>"
      );
    });

    $(".carousel-inner > .item:first-child").addClass("active");

  });

  // memasukkan data heatmap.json ke content
  $.getJSON("json/heatmap.json", function(data) {

    // loop tiap mata kuliah
    $.each(data, function(i, matkul) {

      var dataMatkul = {};
      dataMatkul.kode = matkul.kode;
      dataMatkul.kuliah = matkul.kuliah;

      var dataMatkulMateri = [];

      var dataMatkulMatrix = [];
      for (var i = 0; i < 10; i++) {
        dataMatkulMatrix[i] = [];
        for (var j = 0; j < 10; j++) {
          dataMatkulMatrix[i][j] = "000";
        }
      }

      $.each(matkul.data, function(ii, entri) {

        if (dataMatkulMateri.indexOf(entri.materi) == -1) {
          dataMatkulMateri.push(entri.materi);
        }

        var row = dataMatkulMateri.indexOf(entri.materi);
        var col = entri.tahun - 2009 + (entri.ujian === "UAS" ? 5 : 0);
        if (entri.soal.analisis == 999 || entri.soal.campuran == 999 || entri.soal.teori == 999) {
          dataMatkulMatrix[row][col] = "nil";
        } else {
          dataMatkulMatrix[row][col] = [entri.soal.analisis, entri.soal.campuran, entri.soal.teori].join("");
        }
      });

      dataMatkul.materi = dataMatkulMateri;
      dataMatkul.matrix = dataMatkulMatrix;
      addToContent(dataMatkul);
    });
  });

});
