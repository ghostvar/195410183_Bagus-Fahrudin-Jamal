const form = document.form;
form.addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    const schema = {
      nokk: "Nomor KK",
      nik: "NIK",
      nama_lengkap: "Nama Lengkap",
      jk: "Jenis Kelamin",
      ttl: "Tempat Tanggal Lahir",
      no_telp: "Nomor Telp",
      no_hp: "Nomor HP",
      alamat: "Alamat",
      jenis_pasien: "Jenis Pasien",
      nokk_keluarga: "Nomor KK",
      nik_keluarga: "NIK",
      nama_lengkap_keluarga: "Nama Lengkap",
      jk_keluarga: "Jenis Kelamin",
      ttl_keluarga: "Tempat Tanggal Lahir",
      no_telp_keluarga: "Nomor Telp",
      no_hp_keluarga: "Nomor HP",
      alamat_keluarga: "Alamat",
      hubungan_keluarga: "Hubungan",
      kl: "Kebutuhan Lain",
      catatan: "Catatan"
    };

    let biodata = [];
    let keluarga = [];
    for (let key in schema) {
      let value;
      if (key == 'kl') {
        let values = [];
        form[key].forEach(function (e) {
          if (e.checked) values.push(e.value);
        });
        value = values.join(', ');
      }

      if (key.includes('ttl')) {
        const modifier = key.replace('ttl', '');
        let values = [
          form['tempat_lahir' + modifier].value
        ];
        if (form['tanggal_lahir' + modifier].value) {
          let tgl = new Date(form['tanggal_lahir' + modifier].value);
          values.push(`${tgl.getDate()} ${month[tgl.getMonth()]} ${tgl.getFullYear()}`);
        }
        value = values.join(', ');
      }

      if (form[key] && !value)
        value = form[key].value;

      if (key.includes('keluarga')) {
        keluarga.push(`<tr><td>${schema[key]}</td><td>${value}</td></tr>`);
      } else {
        biodata.push(`<tr><td>${schema[key]}</td><td>${value}</td></tr>`);
      }
    }

    document.querySelector('#formulir').style.display = 'none';
    document.querySelector('#tampilan').innerHTML = `<div class="col"><b>Biodata Pasien</b><table border>${biodata.join('')}</table></div>`
      + `<div class="col"><b>Keluarga Pasien</b><table border>${keluarga.join('')}</table></div>`;
    document.querySelector('button[type=submit]').style.display = 'none';
    document.querySelector('button[type=reset]').style.display = 'inline-block';
  } catch (e) {
    console.log(e);
  }
  return false;
});
document.querySelector('button[type=reset]').addEventListener('click', (e) => {
  document.querySelector('#formulir').style.display = 'block';
  document.querySelector('#tampilan').innerHTML = '';
  document.querySelector('button[type=submit]').style.display = 'inline-block';
  document.querySelector('button[type=reset]').style.display = 'none';
});