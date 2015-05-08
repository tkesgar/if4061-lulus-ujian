// view yang sedang aktif
var currentView = "overview";

// memasang view dengan target; jika tidak ("overview" | "details") maka error
function setView(target) {
  
  if (target !== "overview" && target !== "details")
    throw new Error("Unknown target: " + target);
  
  $("#overview").toggleClass("up",   target !== "overview");
  $("#details" ).toggleClass("down", target !== "details");
  currentView = target;
  
  console.log("Current view: " + currentView);
}

// helper untuk mengganti view
function toggleView() {
  setView(currentView === "overview" ? "details" : "overview");
}

$(document).ready(function() {
  
  // inisialisasi view dengan overview
  setView("overview");
  
  // contoh untuk ganti view atas/bawah kalau ditekan ctrl
  $(document).keydown(function(e) {
    console.log(e.keyCode);
    if (e.keyCode === 8 && currentView === "details") {
      toggleView();
      e.preventDefault();
    }
  });
  
});