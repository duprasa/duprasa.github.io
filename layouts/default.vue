<style>
.header {
  background-color: black;
  padding: 16px;
  color: white;
}

.header ul {
  display: flex;
  flex-direction: row;
}

.header li {
  margin: 8px;
}

.footer {
  background-color: black;
  padding: 16px;
  color: white;
}

.root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
  padding: 16px;
}

</style>
<template>
  <div class="root">
    <div class="header">
      <ul>
        <li><NuxtLink to="/">Index</NuxtLink></li>
        <li><NuxtLink to="/about">About</NuxtLink></li>
      </ul>
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="footer">
      Footer
    </div>
  </div>
</template>