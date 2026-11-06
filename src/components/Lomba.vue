<script setup lang="ts">
import { ref, computed } from 'vue';
import { lomba } from '../data/site';

const SLOTS = 3; // jumlah slot foto yang selalu ditampilkan per kegiatan


// Semua foto di src/assets/dokumentasi/<slug>/*  otomatis terbaca.
const files = import.meta.glob(
  '/src/assets/dokumentasi/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>;

type Photo = { src: string; name: string };
const bySlug = computed(() => {
  const map: Record<string, Photo[]> = {};
  for (const [path, src] of Object.entries(files)) {
    const parts = path.split('/');
    (map[parts[parts.length - 2]] ??= []).push({ src, name: parts[parts.length - 1] });
  }
  for (const k in map) map[k].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  return map;
});
const photos = (slug: string) => bySlug.value[slug] ?? [];
const emptySlots = (slug: string) => (photos(slug).length ? 0 : 1);

const dlg = ref<HTMLDialogElement | null>(null);
const openSlug = ref('');
const idx = ref(0);
const list = computed(() => photos(openSlug.value));
const cur = computed(() => list.value[idx.value]);
const curTitle = computed(() => lomba.find((l) => l.slug === openSlug.value)?.title ?? '');

function open(slug: string, i: number) {
  openSlug.value = slug;
  idx.value = i;
  dlg.value?.showModal();
}
function step(d: number) {
  const n = list.value.length;
  if (n) idx.value = (idx.value + d + n) % n;
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
}
function onBackdrop(e: MouseEvent) {
  if (e.target === dlg.value) dlg.value?.close();
}
</script>

<template>
  <div class="lomba-wrap">
    <div class="intro">
      <div class="eyebrow">DOKUMENTASI LOMBA</div>
      <h2>Jejak langkah di <em>papan pertandingan.</em></h2>
      <p>Kegiatan lomba catur yang pernah diikuti, lengkap dengan foto dokumentasinya.</p>
    </div>

    <article v-for="(e, i) in lomba" :key="e.slug" class="lomba">
      <header class="lomba-head">
        <span class="lomba-no" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
        <div>
          <span class="kicker">LOMBA CATUR<template v-if="e.year"> · {{ e.year }}</template></span>
          <h3>{{ e.title }}</h3>
        </div>
        <span class="badge">{{ photos(e.slug).length }} foto</span>
      </header>

      <div class="gallery">
        <button
          v-for="(p, pi) in photos(e.slug)"
          :key="p.name"
          type="button"
          class="shot"
          :aria-label="`Perbesar foto ${pi + 1} · ${e.title}`"
          @click="open(e.slug, pi)"
        >
          <img :src="p.src" :alt="`Dokumentasi ${e.title}, foto ${pi + 1}`" loading="lazy" />
        </button>
        <div v-for="n in emptySlots(e.slug)" :key="'kosong' + n" class="shot empty" role="img" aria-label="Tempat foto dokumentasi">
          <span aria-hidden="true">+</span>
          <small>Foto dokumentasi</small>
        </div>
      </div>
    </article>

    <dialog ref="dlg" class="lightbox" @click="onBackdrop" @keydown="onKey">
      <button class="close" type="button" aria-label="Tutup foto" @click="dlg?.close()">×</button>
      <img v-if="cur" :src="cur.src" :alt="`Dokumentasi ${curTitle}`" />
      <div class="lb-bar">
        <button type="button" aria-label="Foto sebelumnya" @click="step(-1)">←</button>
        <span>{{ curTitle }} · {{ idx + 1 }} / {{ list.length }}</span>
        <button type="button" aria-label="Foto berikutnya" @click="step(1)">→</button>
      </div>
    </dialog>
  </div>
</template>
