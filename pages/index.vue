<script setup>
const catsQuery = {
  where: [
{ _path: /^\/posts/ },
  ],
}
</script>

<template>
  <div class="main-content">
    <div class="welcome">
      <h3 class="big">Hi There!</h3>
      <p>You have stumbled onto my small corner of the internet. TEST</p>
      <p>For me this is a sacred place where I catalog my most prized ideas</p>
      <p>My goal here is not to create content or get views, but to share unobvious ideas that I hope can bring value to your life as much as it has in me writing them for you.</p>
      <p>You can expect thoughts about psychology, science, sexuality, web development and some life hacks</p>
      <p>I hope you leave here with a few ideas that helps you find you.</p>
    </div>
    <h3>Recent Ideas</h3>
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

<style lang="stylus" scoped>
  h3
    font-family: "Workbench"
    padding-bottom: 16px;
    font-size: 20px;
    &.big
      font-size: 40px;
  a
    color: pink
  .main-content
    display: flex
    justify-content: center
    flex-direction: column
  .welcome
    padding-top: 100px
    max-width: 600px
    padding-bottom: 50px
    p
      line-height: 1.5
      font-family: "Rosarivo"
      margin-top: 16px
      line-height: 1.5em
      font-size: 16px
</style>
