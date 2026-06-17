<script setup lang="ts">
import type { CallTurn } from '../../types/call-session'

const props = defineProps<{
  turn: CallTurn
}>()

const slidersConfig = [
  { key: 'speech_recognition', emoji: '🎙️', title: 'STT Accuracy' },
  { key: 'response_correctness', emoji: '🧠', title: 'Response Correctness' },
  { key: 'politeness', emoji: '😊', title: 'Politeness' }
] as const
</script>

<template>
  <div class="evaluation-container">
    
    <div v-if="turn.evaluation?.is_correct === false" class="evaluation-error-row">

      <textarea 
        :id="`feedback_${turn.turn_id}`"
        class="feedback-textarea"
        v-model="turn.evaluation.error_description" 
        placeholder="Feedback..." 
      ></textarea>

      <div v-for="slider in slidersConfig" :key="slider.key" class="feedback-slider" :id="`feedback_${slider.key}_turn_${turn.turn_id}`">
        <span class="slider-emoji" :title="slider.title">{{ slider.emoji }}</span>
        
        <input 
          v-model.number="turn.evaluation.scores![slider.key]" 
          type="range" 
          appearance="slider-vertical"
          orient="vertical"
          min="0" 
          max="100" 
          class="vertical-slider" 
        />
        
        <span class="slider-value">{{ turn.evaluation.scores?.[slider.key] }}%</span>
      </div>

    </div>

    <div v-else-if="turn.evaluation?.is_correct === true" class="evaluation-verified">
      Verified (100)
    </div>

    <div v-else class="evaluation-pending">
      Pending
    </div>

  </div>
</template>