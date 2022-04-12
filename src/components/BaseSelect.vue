<template>
  <div>
    <label v-if="label" for="select">{{ label }}</label>
    <select
      id="select"
      :value="modelValue"
      name="select"
      v-bind="$attrs"
      @change="updateModel"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected="option === modelValue"
        :value="option"
        >{{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BaseSelect',
  props: {
    label: {
      type: String
    },
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String
    }
  },
  methods: {
    updateModel(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped></style>
