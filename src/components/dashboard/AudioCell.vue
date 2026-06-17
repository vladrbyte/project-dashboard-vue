<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, inject, watch, type Ref } from 'vue'
import WaveSurfer from 'wavesurfer.js'

const props = defineProps<{
  audioUrl: string
  durationMs: number
  callId: string | number
  turnId: number
}>()

const trackIdent = computed(() => `${props.callId}_turn_${props.turnId}`)
const playButtonId = computed(() => `play_${trackIdent.value}`)
const waveContainerId = computed(() => `wave_${trackIdent.value}`)

let wavesurfer: WaveSurfer | null = null
const isPlaying = ref(false)
const currentTimeMs = ref(0)

const activeAudioTrackId = inject<Ref<string | null>>('activeTrackId')
const playNext = inject<(turnId: number) => void>('playNext')

onMounted(async () => {
  await nextTick()
  wavesurfer = WaveSurfer.create({
    container: `#${waveContainerId.value}`,
    waveColor: '#334155',
    progressColor: '#10b981',
    cursorColor: '#10b981',
    cursorWidth: 2,
    height: 'auto',
    barWidth: 2,
    barGap: 1,
    barRadius: 2,
    url: props.audioUrl,
  })

  wavesurfer.on('play', () => {
    isPlaying.value = true
    if (activeAudioTrackId) {
      activeAudioTrackId.value = trackIdent.value
    }
  })

  if (activeAudioTrackId) {
    watch(activeAudioTrackId, (newActiveId) => {
      if (!wavesurfer) return
      if (newActiveId === trackIdent.value) { if (!isPlaying.value) { wavesurfer.play() } } 
      else if (isPlaying.value) { wavesurfer.pause() }
    })
  }

  wavesurfer.on('pause', () => { isPlaying.value = false })

  wavesurfer.on('finish', () => {
    isPlaying.value = false
    if (playNext) { playNext(props.turnId) }
  })

  wavesurfer.on('interaction', () => { if (wavesurfer) { wavesurfer.play() } })

  wavesurfer.on('audioprocess', (time) => { currentTimeMs.value = time * 1000 })

  wavesurfer.on('seeking', (time) => { currentTimeMs.value = time * 1000 })

})

onBeforeUnmount(() => {
  if (wavesurfer) {
    wavesurfer.destroy()
  }
})

const togglePlayback = (): void => {
  if (wavesurfer) {
    wavesurfer.playPause()
  }
}

const formatTime = (ms: number): string => {
  const totalSeconds = ms / 1000
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.floor(totalSeconds % 60)
  const milliseconds = Math.floor(ms % 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
}

const formattedCurrentTime = computed(() => formatTime(currentTimeMs.value))
const formattedTotalTime = computed(() => formatTime(props.durationMs))
</script>

<template>
  <div class="audio-player-container">
    <button :id="playButtonId" class="btn-play" @click="togglePlayback">
      {{ isPlaying ? '❚❚' : '▶' }}
    </button>
    <div class="waveform-track">
      <div :id="waveContainerId" class="waveform-element"></div>
      <div class="waveform-timeline">
        <span class="time-current">{{ formattedCurrentTime }}</span>
        <span class="time-total">{{ formattedTotalTime }}</span>
      </div>
    </div>
  </div>
</template>