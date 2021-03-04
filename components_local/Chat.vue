<template>
  <div class="ph3 lh-solid">
    <h3 class="tc">Chat</h3>
    <div>
      <template v-for="chat in content.concat(content).concat(content)">
        <div :key="chat.text" class="mt3">
          <div>
            <span class="blue"> {{ chat.from }}</span> to
            <span class="blue">{{ chat.to }}</span>
          </div>
          <div
            class="br4 pa3 bg-lightest-blue reset-p"
            v-html="chat.text"
          ></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
