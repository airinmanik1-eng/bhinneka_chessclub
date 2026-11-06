<script setup lang="ts">
import { ref, computed } from 'vue';
import { lomba } from '../data/site';

// Semua foto di src/assets/<slug>/* otomatis terbaca. Tiap lomba menampilkan seluruh fotonya.
const allFiles = import.meta.glob('/src/assets/**/*.*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;
// Hanya berkas gambar.
const files = Object.fromEntries(Object.entries(allFiles).filter(([path]) => /\.(jpe?g|png|webp|gif|avif)$/i.test(path)));
// Nama folder kategori = segmen kedua terakhir dari path (mis. /src/assets/<folder>/foto.jpg).
const folderOf = (path: string) => path.split('/').slice(-2, -1)[0] ?? '';

type Photo = { src: string; name: string };
const bySlug = computed(() => {
  const map: Record<string, Photo[]> = {};
  for (const [path, src] of Object.entries(files)) {
    (map[folderOf(path)] ??= []).push({ src, name: path.split('/').pop() as string });
  }
  for (const k in map) map[k].sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  return map;
});
const photos = (slug: string) => bySlug.value[slug] ?? [];
const emptySlots = (slug: string) => (photos(slug).length ? 0 : 3);

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

    <div class="lomba-list">
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
    </div>

    <dialog ref="dlg" class="lightbox" @click="onBackdrop" @keydown="onKey">
      <button class="close" type="button" aria-label="Tutup foto" @click="dlg?.close()">×</button>
      <img v-if="cur" :src="cur.src" :alt="`Dokumentasi ${curTitle}`" />
      <div v-if="cur" class="lb-bar">
        <button type="button" aria-label="Foto sebelumnya" @click="step(-1)">←</button>
        <span>{{ curTitle }} · {{ idx + 1 }} / {{ list.length }}</span>
        <button type="button" aria-label="Foto berikutnya" @click="step(1)">→</button>
      </div>
    </dialog>
  </div>
</template>
