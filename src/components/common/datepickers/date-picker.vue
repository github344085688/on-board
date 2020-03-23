<template>
  <div class="date-picker">
    <input type="button"
           @click.stop.prevent="handleClick"
    >
    <datepicker :placeholder="placeholder"
                :class="[prStyle,alignDateTimePicker]"
                v-model="startDate"
                :format="customFormatter"
                :clear-button = "true"
                @cleared="clearDate"
                ref="programaticOpen"
                :name="name"
                :required="required"
                :disabled="disabled"
    >
    </datepicker>
    <span class="unis-date"></span>
    <under-line v-if="!prStyle" :focus="isFocused" :underLineColor="transitionIsValidate ? 'red' : ''"></under-line>
  </div>
</template>
<style lang="scss" src="./date-picker.scss"/>
