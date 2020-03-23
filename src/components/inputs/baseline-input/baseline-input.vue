<template>
  <div class="input-baseline">
    <div class="text-field-content">
      <input :type="type"
             :min = "min"
             v-on:focus="isFocused = true"
             v-on:blur="isFocused = false"
             ref="input"
             :name="name"
             v-rx-event:input="inputSubject"
             :placeholder="placeholder"
             v-model="transitionValue"
             autocomplete="off"
             :disabled="disabled"

      >
      <under-line v-if="!disabled" :focus="isFocused" :underLineColor="isPrValidate ? 'red' : ''"></under-line>
    </div>
  </div>
</template>
<style lang="scss" src="./baseline-input.scss"/>
