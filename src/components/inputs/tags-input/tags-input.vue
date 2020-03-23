<template>
    <div class="text-field-content ">
        <div class="tags-content d-flex flex-wrap">
            <div class="tag-item p-2 blue" v-for="item in transitionTagDatas">
              <div class="d-flex align-items-center">
                {{item}}
                <i class="unis-cross ml-2 p-0 align-self-center" style="font-size: 12px;" @click.stop.prevent.self="onRemoveItem(item)"></i>
              </div>
            </div>
          <input type="text"
                 v-on:focus="handleFocus"
                 v-on:blur="handleBlur"
                 v-bind:name="name"
                 v-model="modelValue"
                 :placeholder="transitionPlaceholder">
        </div>
        <under-line :focus="isFocused" :underLineColor="transitionIsValidate ? 'red' : ''"></under-line>
    </div>
</template>
<style lang="scss" src="./tags-input.scss"/>

