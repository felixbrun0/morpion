<template>
  <div v-if="errors.length" class="error">
    {{ errors }}
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
