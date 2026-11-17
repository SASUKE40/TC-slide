<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ label: string; value: number; from?: number; color: string }>()

const width = computed(() => `${Math.min(Math.max(props.value, 0), 100)}%`)
const fromWidth = computed(() => (props.from === undefined ? undefined : `${props.from}%`))
</script>

<template>
  <div class="bar">
    <div class="label">{{ label }}</div>
    <div class="track">
      <div v-if="fromWidth" class="from" :style="{ width: fromWidth }" />
      <div class="fill" :style="{ width, background: color }" />
    </div>
    <div class="value">
      <span v-if="from !== undefined" class="c-muted">{{ from }}% → </span>{{ value }}%
    </div>
  </div>
</template>

<style scoped>
.bar {
  display: grid;
  grid-template-columns: 5.5rem 1fr 6.5rem;
  align-items: center;
  gap: 0.6rem;
  margin: 0.45rem 0;
  font-size: 0.82rem;
}
.label {
  color: var(--text-2);
}
.track {
  position: relative;
  height: 0.7rem;
  border-radius: 4px;
  background: #151515;
  overflow: hidden;
}
.fill,
.from {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 4px;
}
.from {
  z-index: 1;
  border-right: 2px solid var(--text);
}
.value {
  font-family: var(--mono);
  text-align: right;
  white-space: nowrap;
}
</style>
