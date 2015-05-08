$(document).ready(function() {
  
  // memasukkan data trivia.json ke carousel
  $.getJSON("json/tips.json", function(tips) {
    $.each(tips, function(key, val) {
      $("#tips").append($("<div class='tip tip-" + key + "'>").append(val));
    });
  });
  
});