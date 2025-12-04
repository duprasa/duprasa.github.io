<template>
  <div class="about">
    <h2>Who am I?</h2>
    <div class="face" role="img" aria-label="Face"></div>
    <p>From where I sit, it's a bit hard to tell. I could get your IP, roughly guess your location, and do the whole Google Analytics thing, but then I would have to annoy you with cookie banners... Let's skip that.</p>
    <p>So, yeah... I don't know who you are, but you're definitely a cool person if you care enough to read this and I'm glad you're here. </p>
    <p>Anyway, enough about you. Let's talk about me.</p>
    <p>I'm Sam.</p> 
    <p>I'm a curious person who stumbled into the endless rabbit hole of programming, music, and emotions.</p>
    <p>Inconveniently, I have this urge to share my thoughts and ideas. So here we are.</p>
    <p>If you like the vibe and want to work together on something strange, just reach out.</p>

    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeYBum7TDJFZM9Qavkudoqe_jXeH1rnOkYY2hqYbZGKAZ5u0Q/viewform?embedded=true" width="640" height="700" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
    <!-- Add more about content here -->
  </div>
</template>

<style scoped>
.about {
  margin-top: 64px;
  padding: 20px;
  max-width: 800px;
  color: #cdbbbe;
}


.face {
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  margin-bottom: 32px;
}

.face::before {
  content: '';
  position: absolute;
  left: -225px;
  top: -300px;
  width: calc(100% + 225px);
  height: calc(100% + 300px);
  background-image: url('/face.jpg');
  background-repeat: repeat;
  background-size: 225px;
  animation: scroll 5s linear infinite;
  will-change: transform;
}

iframe {
  width: 100%
}

@keyframes scroll {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(225px, 300px, 0);
  }
}

h2 {
  font-family: "Workbench";
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

p {
  font-family: "Rosarivo";
  line-height: 1.6;
  margin-bottom: 1rem;
}
</style>

