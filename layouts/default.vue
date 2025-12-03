<template>
  <div class="root">
    <WaveBackground />
    <div class="navigation">
      <div class="nav-content">
        <div class="home-link desktop-home">
          <NuxtLink to="/">
            <img src="/home.svg" alt="Home" class="home-icon" />
          </NuxtLink>
        </div>
        <div class="recent-ideas">
          <h2><NuxtLink to="/">Other Ideas</NuxtLink></h2>
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
                    <span class="post-title">{{ post.description }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </template>
            <template #not-found>
              <p>No ideas found.</p>
            </template>
          </ContentQuery>
        </div>
        <div class="mobile-center-group">
          <div class="home-link mobile-home">
            <NuxtLink to="/">
              <img src="/home.svg" alt="Home" class="home-icon" />
            </NuxtLink>
          </div>
          <NuxtLink to="/about" class="mobile-face-link">
            <div class="face mobile-face"></div>
          </NuxtLink>
        </div>
        <div class="about-link">
          <NuxtLink to="/about">
            <h2>Who am I?</h2>
            <div class="face desktop-face"></div>
          </NuxtLink>
        </div>
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
  background: #bb838d;
  width: 300px;
  min-width: 300px;
  box-sizing: border-box;
  color: white;
  display: flex;
  flex-direction: column;
}

.home-link {
  text-align: center;
  margin-bottom: 0;
  display: block;
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}

.home-icon {
  width: 129px;
  height: auto;
  display: block;
  transition: filter 0.2s;
}

// .home-icon:hover {
//  filter: brightness(0) saturate(100%) invert(26%) sepia(93%) saturate(2292%) hue-rotate(325deg) brightness(87%) contrast(89%); 
//}

.mobile-face-link, .mobile-home, .mobile-center-group {
  display: none;
}

.face {
  background-image: url("/face.jpg");
  height: 300px;
  background-position: 0px -100px;
  background-size: cover;
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
  padding-bottom: 16px;
  padding-top: 16px;
  color: black;
  text-align: center;
  font-size: 20px;
  a {
    color: black;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}

.about-link {
  margin-bottom: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(0,0,0,0.1);
  text-align: center;
  a {
    color: black;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
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
  flex-direction: column; /* Side by side or stack? Let's stack or row. User said thumbnail for each idea. Row looks good in sidebar. */
  align-items: center;
  color: black; /* Changed to black for visibility on pink */
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

.thumbnail-container {
  width: 100%;
  height: 140px;
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
  font-size: 1rem;
  line-height: 1.1;
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
  
  .desktop-home {
    display: none;
  }

  .mobile-home {
    display: block;
  }

  .mobile-center-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
  
  .desktop-face {
    display: none;
  }
  
  .face {
    height: 80px;
    background-position: center -20px;
    width: 60px;
    flex-shrink: 0;
  }

  .home-icon {
    width: 60px;
  }

  .nav-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    flex-grow: 1; /* Fill remaining space */
    justify-content: space-between;
    gap: 16px; /* Reduced gap to fit more items */
  }
  
  .post-list {
    display: none; /* Hide post list on mobile */
  }

  .about-link {
    margin-bottom: 0;
    padding-top: 0;
    border-top: none;
    margin-right: 16px;
    a {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
    }
  }
  
  h2 {
    font-size: 1.2rem; /* Smaller font for mobile */
    padding-bottom: 0; /* Remove padding for vertical centering */
    margin: 0;
    padding: 0;
  }
}

</style>
