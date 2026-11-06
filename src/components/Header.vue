<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { nav } from '../data/site';

const open = ref(false);
const active = ref('beranda');
let observer: IntersectionObserver | undefined;

onMounted(() => {
  if (!('IntersectionObserver' in window)) return;
  observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && (active.value = e.target.id)),
    { rootMargin: '-10% 0px -65% 0px' },
  );
  nav.forEach((n) => {
    const el = document.getElementById(n.id);
    if (el) observer!.observe(el);
  });
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <header class="site-header">
    <a href="#beranda" class="brand">
      <img src="/logo.jpg" alt="Logo Satya Terra Bhinneka Chess Club" />
      <span>ST BHINNEKA<small>CHESS CLUB</small></span>
    </a>
    <button
      class="menu-toggle"
      :aria-label="open ? 'Tutup menu' : 'Buka menu'"
      :aria-expanded="open"
      @click="open = !open"
    >☰</button>
    <nav class="site-nav" :class="{ open }" aria-label="Menu utama">
      <a
        v-for="n in nav"
        :key="n.id"
        :href="`#${n.id}`"
        :class="{ active: active === n.id }"
        @click="open = false"
      >{{ n.label }}</a>
    </nav>
  </header>
</template>
