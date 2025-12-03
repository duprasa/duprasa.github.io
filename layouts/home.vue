<template>
  <div class="root">
    <WaveBackground />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.root {
  display: flex;
  flex-direction: row;
  color: #c1a1a6;
  min-height: 100vh;
}

.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
  padding: 0px 8px 100px 8px;
}
</style>

