<template>
    <div class="float-ball-container">
        <div class="float-ball">
            🎮
        </div>
    </div>
</template>

<script setup>

</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
}

.float-ball-container {
    user-select: none;
    box-sizing: border-box;
    position: relative;
    width: 60px;
    height: 60px;
    overflow: hidden;
    padding: 10px;
}

.float-ball {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 255, 0, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 100%;
    font-size: 24px;
}
</style>