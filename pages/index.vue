<script setup>
const catsQuery = {
  where: [
{ _path: /^\/posts/ },
  ],
}
</script>

<template>
  <div>
    Posts
    <ContentQuery path="/posts">
      <template #default="{ data }">
        <ul>
          <li v-for="post of data" :key="post.title">
            <NuxtLink :to="post._path">{{ post.title }}</NuxtLink>
          </li>
        </ul>
      </template>
      <template #not-found>
        <p>No authors found.</p>
      </template>
    </ContentQuery>
  </div>
</template>
