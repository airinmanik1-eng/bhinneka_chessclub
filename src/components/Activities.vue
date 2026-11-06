<script setup lang="ts">
import { ref, computed } from 'vue';
import { activities, filters, lomba, sparing, type Kind } from '../data/site';

type Activity = (typeof activities)[number];

const active = ref<'all' | Kind>('all');
const shown = computed(() => activities.filter((a) => active.value === 'all' || a.kind === active.value));
const dlg = ref<HTMLDialogElement | null>(null);
const current = ref<Activity>(activities[0]);

function openDetail(a: Activity) {
  current.value = a;
  dlg.value?.showModal();
}
function onBackdrop(e: MouseEvent) {
  const d = dlg.value;
  if (!d || e.target !== d) return;
  const r = d.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
}

// Foto dokumentasi per kategori, diambil dari src/assets/<folder>/
//   Latihan   -> folder sparing (lihat daftar `sparing` di site.ts)
//   Kompetisi -> folder lomba (lihat daftar `lomba` di site.ts)
//   Komunitas -> folder komunitas
const allFiles = import.meta.glob('/src/assets/**/*.*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;
// Hanya berkas gambar; folder di dalam folder kegiatan (mis. hasil unduhan) tetap terbaca.
const files = Object.fromEntries(Object.entries(allFiles).filter(([path]) => /\.(jpe?g|png|webp|gif|avif)$/i.test(path)));
// Nama folder kategori = segmen kedua terakhir dari path (mis. /src/assets/<folder>/foto.jpg).
const folderOf = (path: string) => path.split('/').slice(-2, -1)[0] ?? '';
const folders: Record<Kind, { slug: string; title: string }[]> = {
  latihan: sparing,
  kompetisi: lomba,
  komunitas: [{ slug: 'komunitas', title: 'Kegiatan Komunitas UPM Catur' }],
};
const docLabel: Record<Kind, string> = {
  latihan: 'DOKUMENTASI SPARING',
  kompetisi: 'DOKUMENTASI LOMBA',
  komunitas: 'DOKUMENTASI KOMUNITAS',
};
type Photo = { src: string; slug: string; name: string; caption: string };
// Foto dikelompokkan per folder (per tahun / per lomba), tiap kelompok punya judul sendiri.
const groups = computed(() => {
  if (active.value === 'all') return [];
  return folders[active.value].map((f) => ({
    ...f,
    photos: Object.entries(files)
      .filter(([path]) => folderOf(path) === f.slug)
      .map(([path, src]) => ({ src, slug: f.slug, name: path.split('/').pop() as string, caption: f.title }))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true })) as Photo[],
  }));
});

const photoDlg = ref<HTMLDialogElement | null>(null);
const lightList = ref<Photo[]>([]);
const photoIdx = ref(0);
const photo = computed(() => lightList.value[photoIdx.value]);
function openPhoto(list: Photo[], i: number) {
  lightList.value = list;
  photoIdx.value = i;
  photoDlg.value?.showModal();
}
function step(d: number) {
  const n = lightList.value.length;
  if (n) photoIdx.value = (photoIdx.value + d + n) % n;
}
function onPhotoKey(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
}
function onPhotoBackdrop(e: MouseEvent) {
  if (e.target === photoDlg.value) photoDlg.value?.close();
}
</script>

<template>
  <div>
    <div class="tabs" role="group" aria-label="Filter kegiatan">
      <button
        v-for="f in filters"
        :key="f.key"
        :aria-pressed="active === f.key"
        @click="active = f.key"
      >{{ f.label }}</button>
    </div>

    <div class="cards">
      <article v-for="a in shown" :key="a.kind" class="card">
        <div class="card-art" :class="a.tone">
          <span aria-hidden="true">{{ a.glyph }}</span>
          <b>{{ a.tag }}</b>
        </div>
        <div class="card-body">
          <span class="kicker">{{ a.kind.toUpperCase() }}</span>
          <h3>{{ a.title }}</h3>
          <p>{{ a.summary }}</p>
          <div class="card-foot">
            <span>{{ a.when }}</span>
            <button class="round" :aria-label="`Detail ${a.title}`" @click="openDetail(a)">↗</button>
          </div>
        </div>
      </article>
    </div>

        <div v-if="active !== 'all'" class="sparing-docs">
      <span class="kicker">{{ docLabel[active] }}</span>
      <section v-for="g in groups" :key="g.slug" class="doc-group">
        <h3>{{ g.title }}</h3>
        <div class="doc-grid">
          <button
            v-for="(p, i) in g.photos"
            :key="p.src"
            type="button"
            class="shot doc-shot"
            :aria-label="`Perbesar foto ${g.title}`"
            @click="openPhoto(g.photos, i)"
          >
            <img :src="p.src" :alt="`Dokumentasi ${g.title}`" loading="lazy" />
          </button>
          <template v-if="!g.photos.length">
            <div v-for="n in 3" :key="n" class="shot empty" role="img" aria-label="Tempat foto dokumentasi">
              <span aria-hidden="true">+</span>
              <small>Foto dokumentasi</small>
            </div>
          </template>
        </div>
      </section>
    </div>

    <dialog ref="dlg" @click="onBackdrop">
      <button class="close" aria-label="Tutup detail" @click="dlg?.close()">×</button>
      <span class="kicker">{{ current.kind.toUpperCase() }}</span>
      <h2>{{ current.title }}</h2>
      <p>{{ current.detail }}</p>
      <div class="dialog-info"><span>JADWAL</span><b>{{ current.when }}</b></div>
    </dialog>

    <dialog ref="photoDlg" class="lightbox" @click="onPhotoBackdrop" @keydown="onPhotoKey">
      <button class="close" type="button" aria-label="Tutup foto" @click="photoDlg?.close()">×</button>
      <img v-if="photo" :src="photo.src" :alt="`Dokumentasi ${photo.caption}`" />
      <div v-if="photo" class="lb-bar">
        <button type="button" aria-label="Foto sebelumnya" @click="step(-1)">←</button>
        <span>{{ photo.caption }} · {{ photoIdx + 1 }} / {{ lightList.length }}</span>
        <button type="button" aria-label="Foto berikutnya" @click="step(1)">→</button>
      </div>
    </dialog>
  </div>
</template>
