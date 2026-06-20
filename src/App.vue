<script setup lang="ts">
import { provide } from 'vue'
import DashboardRow from './components/dashboard/DashboardRow.vue'
import { useSessions } from './composables/use-sessions.ts'

const {
  isDemoMode,
  availableSessions,
  selectedCallId,
  currentSession,
  activeTurnId,
  activeAudioTrackId,
  saveToServer,
  selectTurn,
  setCorrect,
  setError
} = useSessions()

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
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-logo-section">
        <h1 class="header-title">AI Voice Assistant QC</h1>
        <span v-if="isDemoMode" class="badge badge-demo" title="Server offline. Data persists in browser localStorage.">
          🟠 Demo Mode
        </span>
        <span v-else class="badge badge-online" title="Connected to Express server. Data persists in database.">
          🟢 Connected
        </span>
      </div>
      
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