<template>
  <div class="search-default-select">
    <div class="select-content d-flex flex-wrap" :class="prStyle">
      <input type="text"
             v-on:focus="handleFocus"
             v-on:blur="handleBlur"
             v-model="transitionValue"
             placeholder="Input To Select"
             v-rx-event:input="searchByInput"
             :disabled = "disabled"
      >
      <div style="color: #2E323C; padding-top: 11px;" v-if="allowClear && transitionValue && !disabled">
        <div class="unis-cross cu-p" style="margin-right: 4px; margin-top: 2px;"
             @click.stop.prevent="onAllowClear()"></div>
      </div>
      <div style="color:#ddd ; padding-top: 8px;" v-show=" !disabled">
        <div class="unis-nabla  unis-icon"  :class="{'up':isHandleBin}"></div>
      </div>
    </div>
    <under-line v-if="!prStyle" :focus="isFocused && !disabled" :underLineColor="transitionIsValidate ? 'red' : ''"></under-line>
    <ul v-show="isSearch && !disabled" class="p-0" style="z-index: 888">
      <li style="color: #56A7FD; font-size: 20px; height: auto" class="d-flex align-self-center justify-content-center">
        <div class="loading"></div>
      </li>
    </ul>
    <ul v-show="!isSearch && isSelect && transitionSelectddatas.length>0 && !disabled" class="p-0" style="z-index: 9999999">
      <li v-for="item in transitionSelectddatas" class="p-0">
        <input type="button" @click.stop.prevent="onItemSelect(item)" v-on:focus="[isFocused=true,isSelect=true]"
               v-on:blur="[isFocused=false,isSelect=false]" v-bind:value="item | filterName(filterKey,addToFilter)">
      </li>
    </ul>
  </div>
</template>
<style lang="scss" src="./input-select.scss"/>
