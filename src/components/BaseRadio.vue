<template>
  <label
    class="form-field"
    :class="styleModifier && `form-field--${styleModifier}`"
    :style="{ borderColor: (modelValue === value) ? '#D87D4A': null}"
  >
    <input
      type="radio"
      :value="value"
      @change="$emit('update:modelValue', value)"
      :checked="modelValue === value"
      v-bind="$attrs"
      class="radio"
    />
    <span class="checkmark"></span>
    {{ label }}
  </label>
</template>

<script>
export default {
  name: 'BaseRadio',
  inheritAttrs: false,
  props: {
    styleModifier: String,
    label: String,
    modelValue: [String, Number],
    value: {
      type: [String, Number],
      required: true,
    },
  },
}
</script>

<style lang="scss"></style>
