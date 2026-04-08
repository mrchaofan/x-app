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
        @click="setIgnoreMouseEvent(true)"
        >
            <ScreenRecordControlPanel></ScreenRecordControlPanel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ipcRenderer } from 'electron'
import ScreenRecordPanel from './ScreenRecordPanel/ScreenRecordPanel.vue'
import ScreenRecordControlPanel from '@/packages/ScreenRecordControlPanel/ScreenRecordControlPanel.vue'

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