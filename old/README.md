### "Strategi Sukses Ujian: Kenali Soalmu!"
Dashboard berisi visualisasi interaktif mengenai soal-soal ujian pada prodi Teknik Informatika ITB. Dibuat untuk Tugas Besar 2 IF4061 Visualisasi Data.

Oleh:
- 13511018 / Tito D. Kesumo Siregar
- 13511020 / Arief Rahman
- 13511066 / Rifki Afina Putri
- 13511088 / M. Andri Eka Fauzy

How To
=================================
CSV to JSON Converter
- Contoh format penamaan file .csv berikut isinya ada di dalam folder '/csv' (formatnya file .csv harus kayak gitu, nggak boleh beda pokoknya)
- Ketik command 'python csv2json.py' pada command prompt untuk menjalankan kode program
- Voila! Output file .json akan tersimpan pada folder '/json'

TODO Isi datanya pakai JavaScript
=================================

Tambahkan aja di bagian $(document).ready() di script.js:

1. XHR dari JSON (bikin file baru trivia.json)
2. Bagian carousel-inner diisi seperti ini:
```
  <div class="item active">
    <div class="carousel-caption">
      <h3>TRIVIA</h3>
      <p>Deskripsi trivia</p>
    </div>
  </div>
  <div class="item">
    <div class="carousel-caption">
      <h3>TRIVIA</h3>
      <p>Deskripsi trivia</p>
    </div>
  </div>
  ...
  <div class="item">
    <div class="carousel-caption">
      <h3>TRIVIA</h3>
      <p>Deskripsi trivia</p>
    </div>
  </div>
```
  Sebanyak jumlah trivianya, item pertama dikasih class "active".
