<script setup lang="ts">
import { reactive, ref } from 'vue';

const form = reactive({ nama: '', nim: '', prodi: '', angkatan: '', pengalaman: '', paham: false });
const done = ref(false);

function submit() {
  const text = `FORMULIR MINAT BERGABUNG
ST BHINNEKA CHESS CLUB
Unit Prestasi Mahasiswa Universitas Satya Terra Bhinneka

Nama: ${form.nama}
NIM: ${form.nim}
Program studi: ${form.prodi}
Angkatan: ${form.angkatan}
Pengalaman: ${form.pengalaman}

STATUS: BELUM DIKIRIM / BELUM TERDAFTAR
Serahkan formulir ini kepada pengurus setelah kanal penerimaan resmi diumumkan.
`;
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Formulir-Minat-ST-Bhinneka-Chess-Club.txt';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  done.value = true;
}
</script>

<template>
  <form class="join-form" @submit.prevent="submit">
    <span class="kicker">FORMULIR MINAT BERGABUNG</span>
    <h3>Kenalkan dirimu.</h3>
    <div class="row">
      <label>Nama lengkap
        <input v-model="form.nama" required maxlength="100" placeholder="Nama lengkap kamu" autocomplete="name" />
      </label>
      <label>NIM
        <input v-model="form.nim" required maxlength="30" placeholder="Nomor induk mahasiswa" />
      </label>
    </div>
    <div class="row">
      <label>Program studi
        <input v-model="form.prodi" required maxlength="100" placeholder="Program studi" />
      </label>
      <label>Angkatan
        <input v-model="form.angkatan" type="number" min="2000" max="2100" required placeholder="Tahun masuk" />
      </label>
    </div>
    <label>Pengalaman bermain
      <select v-model="form.pengalaman" required>
        <option value="" disabled>Pilih pengalamanmu</option>
        <option>Baru mulai belajar</option>
        <option>Pernah bermain / hobi</option>
        <option>Pernah mengikuti turnamen</option>
      </select>
    </label>
    <label class="check">
      <input v-model="form.paham" type="checkbox" required />
      <span>Saya memahami formulir ini berupa berkas yang diunduh dan belum dikirim ke pengurus.</span>
    </label>
    <button class="btn" type="submit">Unduh formulir minat <span>↓</span></button>
    <p class="fine" :class="{ ok: done }" aria-live="polite">
      {{ done
        ? 'Formulir berhasil disiapkan untuk diunduh. Anda belum terdaftar; serahkan berkas kepada pengurus saat kanal resmi tersedia.'
        : 'Data diolah hanya di perangkat Anda.' }}
    </p>
  </form>
</template>
