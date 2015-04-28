function extractYear(kodematakuliah){
	number = kodematakuliah.match(/\d+/)[0];
	//alert("isi : " + Math.floor(number/1000));
	return Math.floor(number/1000);
}

$(document).ready(function() {
    var datatest = [];//untuk nyimpen per mata kuliah
	var i = 0;
	var smester = 0;

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
//unutk map nya
 $.getJSON("json/heatmap.json", function(data) {
    $.each(	data, function(key, val) {
		//isi dari data
		//buat variable array tiap2:
		//matkul punya attribut UTS UAS, dalem nya ada pair tahun sama jumlah soal
		//var ampas =new array;//untuk nyimpen permateri ada 10 panjang nya urutannya uts uas dri 2009-2013

			var materi=[]; //array of array
			var dat = [];
		$.each(	val.data, function(key, val2) {
			tuple =" "+val2.soal.campuran+val2.soal.analisis+val2.soal.teori+" "; //ini buat nyimpen tch nya
			if (materi.indexOf(val2.materi) == -1) {
				materi.push(val2.materi);
				var a=[];
				size = 10
				while(size--) a[size] = "000";
				dat.push(a);
			}
			smester = val2.semester //buat nandain ini semester berapa matkulnya
			//masukin tuple ke array nya base : 0,2,4,6,8
			num = 2*(val2.tahun-2009);
			if (val2.ujian == "UAS") num++;
			dat[materi.indexOf(val2.materi)][num]=tuple;
			//masukin tuple ke array materi yg tepat
			i++;

		});

	  //buat objek mata kuliah
	  var datfull = {
			 kode: val.kode,
			 kuliah: val.kuliah,
			 list: materi,
			 data: dat,
			 semester :smester
	  };
	  datatest.push(datfull);
	  //datatest.push(dat);



    });

//function make table

	//kamus parameter
	var UASOnly = false;
	var UTSOnly = false;
	var Semester1 = true;
	var Semester2 = true;
	var Tingkat2 = true;
	var Tingkat3 = false;
	var Tingkat4 = true;
	var num = 5;

	var skip = false; //if true, then skip this loop dataset
	for (var i = 0; i < datatest.length; i++) {
		//Do something
		num = 5; //jumlah tahun 2009-2013
		//filter semester
		if(!Semester1){if(datatest[i].semester == 1) skip = true;}
		if(!Semester2){if(datatest[i].semester == 2) skip = true;}

		//filter
		if(!Tingkat2){if(extractYear(datatest[i].kode) == 2) skip = true;}
		if(!Tingkat3){if(extractYear(datatest[i].kode) == 3) skip = true;}
		if(!Tingkat4){if(extractYear(datatest[i].kode) == 4) skip = true;}

		if(!skip){
			tabledata ="<table class='table'> <tr> <th> Materi </th>";
			if (UASOnly || UTSOnly) for (var j = 0; j < num; j++) tabledata+= "<th>"+(2009+j)+"</th>";
			else for (var j = 0; j < num; j++) tabledata+= "<th colspan='2'>"+(2009+j)+"</th>";
			tabledata +="</tr> <tr> <th>  </th>";

			if(!UASOnly && !UTSOnly ) num*=2;
			for (var j = 0; j < num; j++){
				if ((j%2 == 0 && !UASOnly) || UTSOnly) tabledata+= "<th>UTS</th>";
				else if ((j%2 == 1 && !UTSOnly ) ||  UASOnly) tabledata+= "<th>UAS</th>";
			}
			tabledata +="</tr>";
			//masukan data ke table
			for (var j = 0; j < datatest[i].list.length; j++) {
				tabledata+="\
							<tr>\
								<th>"+datatest[i].list[j]+"</th>" //masukan nama materi
				for (var k = 0; k < num; k++) {
					if (UTSOnly){if(k%2 == 0)tabledata+="<td>"+datatest[i].data[j][k]+"</td>"}
					else if (UASOnly){if(k%2 == 1)tabledata+="<td>"+datatest[i].data[j][k]+"</td>"}
					else tabledata+="<td>"+datatest[i].data[j][k]+"</td>"//kalo normal
				}
				tabledata+=	"</tr>"
			}
			tabledata +="</table>"

			$(".data").append("<div class='item'>\
			<div class='caption'>\
			  <h3>" + datatest[i].kode + "</h3>\
			  <p>" + datatest[i].kuliah + "</p>\
			  <div>"+ tabledata +"</div>\
			</div>\
			</div>"
			);
		}
		skip = false;
	}

    $(".carousel-inner > .item:first-child").addClass("active");

  });
  $(".modal-left-button").click(function() {
    $(".modal-left").toggleClass("closed");
  });

});
