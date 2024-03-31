<template>
  <ContentDoc v-slot="{ doc }">
    <article>
        <ContentRenderer :value="doc" />
      </article>
  </ContentDoc>
</template>