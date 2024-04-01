<template>
  <div id="article">

    <ContentDoc v-slot="{ doc }">
      <article>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </div>
  </template>

<style lang="stylus">
#article
  .content
    display: flex
    flex-direction: row
    justify-content: center
    padding: 0px 8px
    padding-bottom: 100px
  article
    max-width: 800px
    h1, h2
      font-family: "Workbench"
    h6, p
      font-family: "Rosarivo"
    h1 
      font-size: 30px
      text-align: center
      margin: 16px 0px
      color: white
    h2
      font-size: 20px
      margin-top: 64px
      margin-bottom: 32px
      a
        text-decoration: none
    h6 
      text-align: center
      margin-bottom: 64px
      opacity: 0.8
      font-size: 12px
    p
      margin-top: 16px
      line-height: 1.5em
      font-size: 16px
    a
      color: pink
      text-decoration: underline
    img
      margin-top: 32px
      width: 100%
</style>