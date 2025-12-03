<template>
  <div class="root">
    <WaveBackground />
    <div class="navigation">
      <NuxtLink class="face" to="/">
        <h1><em>Sam Dupras</em><br/>Golden Nuggets</h1>
      </NuxtLink>
      <div class="nav-content">
        <h2>Recent Ideas</h2>
        <ContentQuery path="/posts">
          <template #default="{ data }">
            <ul class="post-list">
              <li v-for="post of (data as any[])" :key="post.title" class="post-item">
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
                  <span class="post-title">{{ post.title }}</span>
                </NuxtLink>
              </li>
            </ul>
          </template>
          <template #not-found>
            <p>No ideas found.</p>
          </template>
        </ContentQuery>
      </div>
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const { hasThumbnail, getThumbnail } = usePostThumbnail();
</script>

<style lang="stylus" scoped>

.root {
  /* background: black; */
  display: flex;
  flex-direction: row;
  color: #cdbbbe;
  min-height: 100vh;
}

.content
  display: flex
  flex-direction: row
  justify-content: center
  flex-grow: 1
  padding: 0px 8px 100px 8px


.navigation {
  background: pink;
  width: 300px;
  min-width: 300px;
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
}

.face {
  background-image: url("/face.jpg");
  height: 150px;
  background-size: cover;
  background-position: 0px -180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nav-content {
  padding: 16px;
  overflow-y: auto;
}

h2 {
  font-family: "Workbench";
  padding-bottom: 8px;
  color: black;
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  margin-bottom: 16px;
}

.post-link {
  display: flex;
  flex-direction: row; /* Side by side or stack? Let's stack or row. User said thumbnail for each idea. Row looks good in sidebar. */
  align-items: center;
  color: black; /* Changed to black for visibility on pink */
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

.thumbnail-container {
  width: 80px;
  height: 80px;
  margin-right: 12px;
  background-color: rgba(255,255,255,0.3);
  border-radius: 4px;
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
  background-color: rgba(0,0,0,0.1);
}

.post-title {
  font-weight: bold;
  font-size: 1.1rem;
}

h1 {
  font-family: "Workbench";
  text-shadow: 0px 0px 8px black;
  text-align: center;
  line-height: 1.3;
  color: pink;
  background-color: rgba(0,0,0, 0.5);
  display: inline;
  padding: 4px;
  em {
    font-size: 30px;
  }
}

@media only screen and (max-width: 600px) {
  .root {
    flex-direction: column
  }
  .navigation {
    width: 100%
    display: flex
    flex-direction: row
    position: sticky
    bottom: 0px
    z-index: 1
    height: auto;
    min-height: auto;
  }
  
  .nav-content {
    display: none; /* Hide sidebar content on mobile for now or styled differently? 
                     The original code had .navigation flex-row. 
                     Usually sidebars collapse or move to bottom. 
                     The original CSS had logic to show navigation at bottom.
                  */
  }
  
  /* Re-enabling content for mobile in a specific way if needed, but sticking to original logic mostly.
     Original logic:
     .navigation { width: 100%; display: flex; flex-direction: row; ... }
     But .nav-content was not hidden. It was just there.
     Let's keep it simple.
  */
  
  .face {
    height: 80px
    background-position: 0px -100px;
    width: 100px; /* Fixed width for face on mobile row */
    flex-shrink: 0;
  }
  
  .nav-content {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    align-items: center;
    padding: 8px;
  }
  
  .post-list {
    display: flex;
    flex-direction: row;
  }
  
  .post-item {
    margin-bottom: 0;
    margin-right: 16px;
    min-width: 150px;
  }
}

</style>
