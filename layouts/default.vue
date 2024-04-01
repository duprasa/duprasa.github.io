<template>
  <div class="root">
    <div class="navigation">
      <NuxtLink class="face" to="/">
        <h1><em>Sam Dupras</em><br/>golden nuggets</h1>
      </NuxtLink>
      <div class="nav-content">
        <!-- <ul>
          <li><NuxtLink to="/">Index</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
        </ul> -->
        <h2>Recent Ideas</h2>
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
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="stylus" scoped>

.root {
  background: black;
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
  color: white
}

.face {
  background-image: url("~/assets/face.jpg");
  height: 150px;
  background-size: cover;
  background-position: 0px -180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nav-content {
  padding: 16px;
}

h2 {
  font-family: "Workbench";
  padding-bottom: 8px;
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
  }
  .face {
    height: 80px
    background-position: 0px -100px;
  }
}

</style>