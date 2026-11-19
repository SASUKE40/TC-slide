<script setup lang="ts">
// Small-multiple bar chart: one bar per model, an optional dashed baseline marker.
interface Row {
  label: string
  value: number
  text: string
  color: string
}

const props = defineProps<{
  title: string
  rows: Row[]
  max: number
  baseline?: { label: string; value: number }
  note?: string
}>()

function pct(v: number): string {
  return `${Math.min(Math.max(v / props.max, 0), 1) * 100}%`
}
</script>

<template>
  <div class="mb">
    <div class="mb-title">{{ title }}</div>
    <div v-for="r in rows" :key="r.label" class="mb-row">
      <div class="mb-label">{{ r.label }}</div>
      <div class="mb-track">
        <div class="mb-fill" :style="{ width: pct(r.value), background: r.color }" />
        <div v-if="baseline" class="mb-base" :style="{ left: pct(baseline.value) }" />
      </div>
      <div class="mb-value" :style="{ color: r.color }">{{ r.text }}</div>
    </div>
    <div v-if="baseline || note" class="mb-note">
      <span v-if="baseline"><span class="dash" /> {{ baseline.label }}</span>
      <span v-if="note">{{ note }}</span>
    </div>
  </div>
</template>

<style scoped>
.mb {
  border: 1.5px solid var(--divider);
  border-radius: 12px;
  padding: 0.5rem 0.75rem 0.45rem;
}
.mb-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-2);
  margin-bottom: 0.2rem;
}
.mb-row {
  display: grid;
  grid-template-columns: 4.6rem 1fr 4.4rem;
  align-items: center;
  gap: 0.5rem;
  margin: 0.22rem 0;
  font-size: 0.74rem;
}
.mb-label {
  color: var(--text-2);
}
.mb-track {
  position: relative;
  height: 0.6rem;
  border-radius: 3px;
  background: #151515;
}
.mb-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  min-width: 2px;
  border-radius: 3px;
}
.mb-base {
  position: absolute;
  top: -0.2rem;
  bottom: -0.2rem;
  border-left: 2px dashed var(--text);
}
.mb-value {
  font-family: var(--mono);
  font-weight: 600;
  text-align: right;
  white-space: nowrap;
}
.mb-note {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.64rem;
  color: var(--muted);
  margin-top: 0.15rem;
}
.dash {
  display: inline-block;
  width: 0;
  height: 0.6rem;
  border-left: 2px dashed var(--text);
  vertical-align: middle;
  margin-right: 0.2rem;
}
</style>
