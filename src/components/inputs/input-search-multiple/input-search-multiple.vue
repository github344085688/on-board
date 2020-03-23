<template>
  <div class="input-search-multiple">
    <div class="select-content d-flex flex-wrap">
      <span class="unis-arrow down-arrow " style="font-size: 18px; color: #ddd" :class="{'up':isHandleBin}"></span>
      <div class="transition-item p-2 blue d-flex align-items-center" v-for="item in transitionSelects">{{item | filtersName(filterKey)}}
        <i class="unis-cross align-self-center" style="font-size: 12px;" @click.stop.prevent.self="onRemoveItem(item)"></i>
      </div>
       <input type="text"
             v-on:focus.stop.prevent="handleFocus"
             v-on:blur.stop.prevent="handleBlur"
             placeholder="input to select"
             v-model="inputValue"
             v-rx-event:input="searchByInput"
      >
    </div>
    <under-line :focus="isFocused" :underLineColor="transitionIsValidate ? 'red' : ''"></under-line>
    <ul v-if="isSearch" class="p-0">
      <li style="color: #56A7FD; font-size: 15px; height: auto"  >
        <div class="loading d-flex justify-content-center">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </li>
    </ul>
    <ul v-show="isSelect && transitionSelectdatas.length>1" class="p-0">
      <li v-for="item in transitionSelectdatas" @click.stop.prevent="onItemSelect(item)" class="p-0">
        <input type="button" @click.stop.prevent="onItemSelect(item)"
               v-on:focus.stop.prevent="[isFocused=true,isSelect=true]"
               v-on:blur.stop.prevent="[isFocused=false,isSelect=false]" v-bind:value="item | filtersName(filterKey)">
      </li>
    </ul>
  </div>
</template>
<style lang="scss" src="./input-search-multiple.scss"/>

