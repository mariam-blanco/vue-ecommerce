<template>
  <label
    class="form-field"
    :class="{ classModifier: styleModifier, error: error }"
    >{{ label }}
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      v-bind="$attrs"
      class="input"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
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
    error: String,
  },

  computed: {
    classModifier() {
      return `form-field--${this.styleModifier}`
    },
  },
}
</script>

<style lang="scss"></style>
