function clamp(v, l, r) {
  if (v <= l) return l;
  else if (v >= r) return r;
  else return v;
}

$(document).ready(function() {

  "use strict";

  // memasukkan data trivia.json ke carousel
  $.getJSON("json/trivia.json", function(trivia) {

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

});