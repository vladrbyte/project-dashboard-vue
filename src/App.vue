<script setup lang="ts">
import { ref, watch, computed, provide, reactive, onMounted } from 'vue'
import DashboardRow from './components/dashboard/DashboardRow.vue'
import type { CallSession, CallTurn, TurnEvaluation } from './types/call-session'

const mockModules = import.meta.glob('./mocks/*.ts', { eager: true })

const availableSessions = reactive<CallSession[]>(
  Object.values(mockModules).map((module: any) => module.mockCallSession as CallSession)
)
const selectedCallId = ref(availableSessions[0]?.call_id || '')

const currentSession = computed<CallSession>(() => {
  return availableSessions.find(s => s.call_id === selectedCallId.value) || availableSessions[0]
})

const activeTurnId = ref<number | null>(currentSession.value?.turns[0]?.turn_id || null)
const activeAudioTrackId = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/sessions')
    if (!response.ok) return
    
    const overrides = await response.json() as Record<string, Record<number, TurnEvaluation>>
    
    availableSessions.forEach(session => {
      const sessionOverrides = overrides[session.call_id]
      if (sessionOverrides) {
        session.turns.forEach(turn => {
          if (sessionOverrides[turn.turn_id]) {
            turn.evaluation = sessionOverrides[turn.turn_id]
          }
        })
      }
    })
  } catch (e) {
    console.error(e)
  }
})

const saveToServer = async () => {
  const overrides: Record<string, Record<number, TurnEvaluation>> = {}
  availableSessions.forEach(session => {
    session.turns.forEach(turn => {
      if (turn.evaluation && turn.evaluation.is_correct !== null) {
        if (!overrides[session.call_id]) {
          overrides[session.call_id] = {}
        }
        overrides[session.call_id][turn.turn_id] = turn.evaluation
      }
    })
  })
  try {
    await fetch('http://localhost:3000/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(overrides, null, 2) 
    })
  } catch (e) {
    console.error(e)
  }
}

provide('activeTrackId', activeAudioTrackId)

provide('playNext', (currentTurnId: number) => {
  const turns = currentSession.value.turns
  const currentIndex = turns.findIndex(t => t.turn_id === currentTurnId)
  
  if (currentIndex !== -1 && currentIndex < turns.length - 1) {
    const nextTurn = turns[currentIndex + 1]
    activeTurnId.value = nextTurn.turn_id 
    activeAudioTrackId.value = `${currentSession.value.call_id}_turn_${nextTurn.turn_id}`
  }
})

watch(selectedCallId, () => {
  activeAudioTrackId.value = null
  if (currentSession.value?.turns.length > 0) {
    activeTurnId.value = currentSession.value.turns[0].turn_id
  } else {
    activeTurnId.value = null
  }
})

const selectTurn = (id: number): void => {
  activeTurnId.value = id
}

const setCorrect = (turn: CallTurn): void => {
  if (turn.evaluation?.is_correct === true) {
    turn.evaluation = { is_correct: null }
  } else {
    turn.evaluation = { is_correct: true }
  }
}

const setError = (turn: CallTurn): void => {
  if (turn.evaluation?.is_correct === false) {
    turn.evaluation = { is_correct: null }
  } else {
    turn.evaluation = { 
      is_correct: false, 
      scores: { speech_recognition: 100, response_correctness: 100, politeness: 100 },
      error_description: ''
    }
  }
}
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="header-title">AI Voice Assistant QC</h1>
      
      <div class="header-selector">
        <label for="call-select" class="selector-label">Session:</label>
        <select id="call-select" v-model="selectedCallId" class="call-dropdown">
          <option v-for="session in availableSessions" :key="session.call_id" :value="session.call_id">
            {{ session.call_id }}
          </option>
        </select>
        <button @click="saveToServer" class="save-btn">Save</button>
      </div>
    </header>

    <main class="dashboard-main">
      <DashboardRow 
        v-for="turn in currentSession.turns"
        :key="`${currentSession.call_id}_${turn.turn_id}`"
        :turn="turn"
        :gender="currentSession.caller_gender"
        :isActive="turn.turn_id === activeTurnId"
        :callId="currentSession.call_id"
        @select="selectTurn"
        @verify-correct="setCorrect"
        @verify-error="setError"
      />
    </main>
  </div>
</template>