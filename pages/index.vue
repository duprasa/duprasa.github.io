<script setup>
definePageMeta({
  layout: 'home'
})
const { hasThumbnail, getThumbnail } = usePostThumbnail();
const catsQuery = {
  where: [
{ _path: /^\/posts/ },
  ],
}

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
</script>

<template>
  <div class="main-content">
    <div class="welcome">
      <h3 class="big">Hi There!</h3>
      <p>You have stumbled onto my small corner of the internet. For <NuxtLink to="/about">me</NuxtLink>, this is a sacred place where I catalog my most prized ideas.</p>
      <p>Here I share unobvious ideas that I hope can prove useful to you.</p>
      <p>You can expect thoughts about emotions, music, science, web development, and maybe a worthwhile life hack.</p>
    </div>
    <h3>Recent Ideas</h3>
    <ContentQuery path="/posts">
      <template #default="{ data }">
        <ul class="post-list">
          <li v-for="post of data" :key="post.title" class="post-item">
            <NuxtLink :to="post._path" class="post-link">
              <div class="thumbnail-container">
                <img 
                  v-if="hasThumbnail(post)"
                  :src="getThumbnail(post)" 
                  alt="Thumbnail" 
                  class="thumbnail"
                />
                <div v-else class="thumbnail-placeholder"></div>
              </div>
              <div class="post-info">
                <span class="post-title">{{ post.title }}</span>
                <span v-if="post.date" class="post-date">{{ formatDate(post.date) }}</span>
                <p v-if="post.description" class="post-description">{{ post.description }}</p>
              </div>
            </NuxtLink>
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
    text-decoration: underline
    text-underline-offset: 4px
    &.post-link
      text-decoration: none
  
  .post-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .post-item {
    margin-bottom: 32px; /* Increased spacing for new content */
  }

  .post-link {
    display: flex;
    align-items: flex-start; /* Align to top */
    color: pink;
    text-decoration: none;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }

  .thumbnail-container {
    width: 240px;
    height: 160px;
    margin-right: 24px;
    background-color: rgba(255,255,255,0.1);
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .thumbnail-placeholder {
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.05);
  }

  .post-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 8px; /* Slight offset to align with image top */
  }

  .post-title {
    font-family: "Rosarivo";
    font-weight: bold;
    font-size: 1.4rem;
    margin-bottom: 8px;
    color: #cdbbbe; /* Match site text color */
  }

  .post-date {
    font-size: 0.9rem;
    color: rgba(205, 187, 190, 0.6);
    margin-bottom: 12px;
    font-family: "Rosarivo";
  }

  .post-description {
    font-size: 1rem;
    line-height: 1.5;
    color: #cdbbbe;
    font-family: "Rosarivo";
    margin: 0;
    max-width: 600px;
  }

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
