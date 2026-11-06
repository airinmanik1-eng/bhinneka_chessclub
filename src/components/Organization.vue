<script setup lang="ts">
import { ref, computed } from 'vue';
import { periods } from '../data/site';

const selected = ref(4);
const period = computed(() => periods.find((p) => p.id === selected.value)!);
</script>

<template>
  <div class="org">
    <article class="mentor">
      <div class="glyph" aria-hidden="true">♚</div>
      <span class="kicker">PEMBINA UPM</span>
      <h3>Abdul Muis, S.T.,M.Kom</h3>
      <p>Dosen &amp; pembina<br />ST Bhinneka Chess Club</p>
      <hr />
      <p>Mendampingi pengembangan kegiatan dan potensi mahasiswa melalui catur.</p>
    </article>

    <div>
      <div class="tabs period-tabs" role="group" aria-label="Pilih periode kepengurusan">
        <button
          v-for="p in periods"
          :key="p.id"
          :aria-pressed="selected === p.id"
          @click="selected = p.id"
        >Periode {{ p.label }}</button>
      </div>
      <div class="period" aria-live="polite">
        <div class="period-top">
          <h3>Kepengurusan Periode {{ period.label }}</h3>
          <span class="badge">{{ period.status }}</span>
        </div>
        <p>{{ period.desc }}</p>
        <div class="roles">
          <div v-for="(m, i) in period.board" :key="m.role">
            <span>0{{ i + 1 }}</span>
            <b>{{ m.role }} · {{ m.name }}</b>
            <small>{{ m.info }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
