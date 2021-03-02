<template>
  <div class="f6 br4 pa2 bg-near-black light-silver mw5">
    <span class="fw5">Credits</span>
    <ul class="list pa0">
      <li v-for="credit in content.list" :key="credit.title" class="pa0 ma0">
        <span class="fw5">{{ credit.title }}</span
        ><span class="fw1"> {{ credit.names }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
