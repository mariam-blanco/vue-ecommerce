<template>
  <label
    class="form-field"
    :class="styleModifier && `form-field--${styleModifier}`"
    >{{ label }}
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      v-bind="$attrs" 
    />
  </label>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    styleModifier: String,
    label: String,
    placeholder: String,
    modelValue: [String, Number],
  },
}
</script>

<style lang="scss"></style>
