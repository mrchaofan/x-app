<template>
    <div class="tab-strip">
        <TabStripItem
            v-for="tab in tabs"
            :key="tab.id"
            :title="tab.title"
            :icon="tab.icon"
            :active="tab.id === activeId"
            @select="selectTab(tab.id)"
            @close="closeTab(tab.id)"
        >
        </TabStripItem>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import TabStripItem from './TabStripItem.vue'
import { ipcRenderer } from 'electron'

interface TabItem {
    id: string
    title: string
    icon?: string
}

const tabs = ref<TabItem[]>([
    
])
const activeId = ref<string | null>(null)

function selectTab(id: string) {
    ipcRenderer.send('__request-select-tab', id)
}

function closeTab(id: string) {
    ipcRenderer.send('__request-close-tab', id)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onIpcAddTab = (event: any, tab: TabItem) => {
    tabs.value.push(tab)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onIpcSelectTab = (event: any, tabId: string | null) => {
    activeId.value = tabId
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onIpcRemoveTab = (event: any, tabId: string | null) => {
    const index = tabs.value.findIndex(tab => tab.id === tabId)
    if (index !== -1) {
        tabs.value.splice(index, 1)
        if (activeId.value === tabId) {
            activeId.value = null
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onIpcUpdateTab = (event: any, tab: TabItem) => {
    const index = tabs.value.findIndex(t => t.id === tab.id)
    if (index !== -1) {
        tabs.value[index] = tab
    }
}

onMounted(() => {
    ipcRenderer.on('__add-tab', onIpcAddTab)
    ipcRenderer.on('__select-tab', onIpcSelectTab)
    ipcRenderer.on('__remove-tab', onIpcRemoveTab)
    ipcRenderer.on('__update-tab', onIpcUpdateTab)

})

onUnmounted(() => {
    ipcRenderer.off('__add-tab', onIpcAddTab)
    ipcRenderer.off('__select-tab', onIpcSelectTab)
    ipcRenderer.off('__remove-tab', onIpcRemoveTab)
    ipcRenderer.off('__update-tab', onIpcUpdateTab)
})

</script>

<style scoped>
.tab-strip {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    padding: 0 4px;
    height: 44px;
    user-select: none;
}
</style>