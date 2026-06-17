<script setup lang="ts">
import { computed } from 'vue';
import type { CallTurn, CallerGender } from '../../types/call-session'
import SpeakerCell from './SpeakerCell.vue'
import AudioCell from './AudioCell.vue'
import EvaluationInspector from './EvaluationInspector.vue'

const props = defineProps <{
  turn: CallTurn
  gender: CallerGender
  isActive: boolean
  callId: string
}>()

const emit = defineEmits(['select', 'verify-correct', 'verify-error'])
const originalStr = props.callId
const [prefix, id] = originalStr.split('_') 
const result = `${prefix}_${id}`
const transcriptId = computed(() => `transcript_${result}_turn_${props.turn.turn_id}`)
</script>

<template>
  <div class="dashboard-row" @click="emit('select', turn.turn_id)">
    
    <div class="dashboard-cell cell-speaker">
      <SpeakerCell :type="turn.speaker_type" :gender="gender" :turnId="turn.turn_id" />
    </div>

    <div class="dashboard-cell cell-audio">
      <AudioCell 
        :audioUrl="turn.audio_url" 
        :durationMs="turn.duration_ms" 
        :callId="callId"
        :turnId="turn.turn_id"
      />
    </div>

    <div :id="transcriptId" class="dashboard-cell cell-transcript" >
      <p class="transcript-text">
        {{ turn.speech.transcript }}
      </p>
    </div>

    <div class="dashboard-cell cell-actions">
        <button @click.stop="emit('verify-correct', turn)" class="btn-verify btn-correct" :class="{ 'is-dimmed': turn.evaluation?.is_correct === false }">V</button>
        <button @click.stop="emit('verify-error', turn)" class="btn-verify btn-error" :class="{ 'is-dimmed': turn.evaluation?.is_correct === true }">X</button>
    </div>

    <div class="dashboard-cell cell-evaluation">
      <EvaluationInspector :turn="turn" />
    </div>

  </div>
</template>