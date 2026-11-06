<script setup lang="ts">
import { ref, computed } from 'vue';
import { members } from '../data/site';

const q = ref('');
const result = computed(() => {
  const term = q.value.trim().toLowerCase();
  return members.filter((m) => `${m.name} ${m.prodi}`.toLowerCase().includes(term));
});
const initials = (name: string) =>
  name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
</script>

<template>
  <div class="directory">
    <div class="dir-head">
      <h3>Direktori anggota</h3>
      <span class="badge">Contoh data</span>
    </div>
    <label>
      Cari anggota
      <input v-model="q" type="search" placeholder="Cari nama atau program studi…" />
    </label>
    <article v-for="m in result" :key="m.name" class="member">
      <span class="avatar">{{ initials(m.name) }}</span>
      <div>
        <h3>{{ m.name }}</h3>
        <p>{{ m.prodi }} · Angkatan {{ m.angkatan }}</p>
      </div>
      <small>Aktif</small>
    </article>
    <p v-if="!result.length" class="empty">Tidak ada anggota yang sesuai pencarian.</p>
    <p class="fine">Seluruh entri direktori di atas merupakan data dummy.</p>
  </div>
</template>
