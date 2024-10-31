<template>
  <div :class="`has-background-${bgColor}-dark my-4 p-4`">
    <div class="field">
      <label class="label has-text-white" v-if="label">{{ label }}</label>
      <div class="control">
        <textarea
          class="textarea"
          :placeholder="placeholder"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          ref="textAreaRef"
          v-autofocus
          maxlength="100"
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vAutofocus } from "../../directives/vAutofocus";
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "danger",
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
    default: "Type Something ...",
  },
});
const emit = defineEmits(["update:modelValue"]);
const textAreaRef = ref(null);
const focusTextArea = () => {
  textAreaRef.value.focus();
};

defineExpose({
  focusTextArea,
});
</script>
