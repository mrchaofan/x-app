<template>
    <div class="app">
        <ScreenRecordPanel></ScreenRecordPanel>
        <div :style="{
            position: 'fixed',
            left: `100px`,
            top: `200px`,
            zIndex: 999
        }"
        @mouseenter="setIgnoreMouseEvent(false)"
        @mouseleave="onMouseLeave"
        @click="toggleRecording"
        >
            <ScreenRecordControlPanel></ScreenRecordControlPanel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron'
import ScreenRecordPanel from './ScreenRecordPanel/ScreenRecordPanel.vue'
import ScreenRecordControlPanel from '@/packages/ScreenRecordControlPanel/ScreenRecordControlPanel.vue'
import { ref } from 'vue'

const isRecording = ref(false)


const toggleRecording = () => {
    isRecording.value = !isRecording.value
}

const onMouseLeave = () => {
    if (isRecording.value) {
        setIgnoreMouseEvent(true)
    }
}

const setIgnoreMouseEvent = (ignore: boolean) => {
    ipcRenderer.send('set-ignore-mouse-events', ignore)
}


</script>


<style>
html,
body {
    margin: 0;
    padding: 0;
}
</style>