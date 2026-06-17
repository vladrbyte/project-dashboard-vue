<script setup lang="ts">
import type { SpeakerType, CallerGender } from '../../types/call-session'

defineProps<{
  type: SpeakerType
  gender?: CallerGender
  turnId: number
}>()
</script>

<template>
  <div class="speaker-card">
    <div class="avatar-wrapper">
      <span v-if="type === 'ai'" class="avatar-icon" title="AI Assistant">🤖</span>
      <span v-else-if="type === 'operator'">🎧</span>
      <span v-else-if="gender === 'male'" class="avatar-icon" title="Caller: Male">👨</span>
      <span v-else-if="gender === 'female'" class="avatar-icon" title="Caller: Female">👩</span>
      <span v-else class="avatar-icon" title="Caller: Unknown">👤</span> 
    </div>
    <span class="speaker-id">Turn: {{ turnId }}</span>
  </div>
</template>