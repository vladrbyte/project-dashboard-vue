import { ref, watch, computed, reactive, onMounted } from 'vue'
import type { CallSession, CallTurn, TurnEvaluation } from '../types/call-session'

export function useSessions() {
  const isDemoMode = ref(false)
  const LOCAL_STORAGE_KEY = 'qc-dashboard-overrides'
  const baseUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.BASE_URL : '/'

  const mockModules = import.meta.glob('../mocks/*.ts', { eager: true })

  const availableSessions = reactive<CallSession[]>(
    Object.values(mockModules).map((module: any) => {
      const rawSession = module.mockCallSession as CallSession
      const session = JSON.parse(JSON.stringify(rawSession)) as CallSession
      
      session.turns = session.turns.map(turn => {
        const cleanPath = turn.audio_url.startsWith('/') ? turn.audio_url.slice(1) : turn.audio_url
        return {
          ...turn,
          audio_url: `${baseUrl}${cleanPath}`
        }
      })
      return session
    })
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
      if (!response.ok) throw new Error('Server offline')
      
      const overrides = await response.json() as Record<string, Record<number, TurnEvaluation>>
      applyOverrides(overrides)
      isDemoMode.value = false
    } catch (e) {
      isDemoMode.value = true
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (localData) {
        try {
          const overrides = JSON.parse(localData) as Record<string, Record<number, TurnEvaluation>>
          applyOverrides(overrides)
        } catch (parseErr) {
          console.error('Failed to parse local storage overrides:', parseErr)
        }
      }
    }
  })

  const applyOverrides = (overrides: Record<string, Record<number, TurnEvaluation>>) => {
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
  }

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

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(overrides))

    if (!isDemoMode.value) {
      try {
        const response = await fetch('http://localhost:3000/api/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(overrides, null, 2) 
        })
        if (!response.ok) throw new Error('Write failed')
      } catch (e) {
        isDemoMode.value = true
      }
    }
  }

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

  return {
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
  }
}