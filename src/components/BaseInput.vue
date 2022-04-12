<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :value="modelValue" v-bind="$attrs" @input="upadatModel" />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number]
    }
  },
  methods: {
    upadatModel(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped></style>
