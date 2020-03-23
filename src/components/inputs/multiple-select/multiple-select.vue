<template>
  <div class="multiple-select-content">
    <div class="select-content d-flex flex-wrap ">
      <span class="unis-arrow down-arrow " style="font-size: 18px; color: #ddd" :class="{'up':isHandleBin}"></span>
      <input type="button"
             class="flex-1"
             v-on:focus.stop.prevent="handleFocus"
             v-on:blur.stop.prevent="handleBlur"
             readonly="readonly">
      <div class="transition-item p-2 blue d-flex align-items-center" v-for="item in transitionSelects">{{item | filtersName(filterKey)}}
        <i class="unis-cross m-0 p-0 ml-1" style="font-size: 12px;" @click.stop.prevent.self="onRemoveItem(item)"></i>
      </div>
    </div>
    <under-line :focus="isFocused"  :underLineColor="transitionIsValidate ? 'red' : ''"></under-line>
    <ul class="p-0" v-show="isSelect && transitionSelectdatas.length > 0">
      <li class="p-0" v-for="item in transitionSelectdatas" @click.stop.prevent="onItemSelect(item)">
        <input type="button" @click.stop.prevent="onItemSelect(item)"
               v-on:focus.stop.prevent="[isFocused=true,isSelect=true]"
               v-on:blur.stop.prevent="[isFocused=false,isSelect=false]" v-bind:value="item | filtersName(filterKey)">
      </li>
    </ul>
  </div>
</template>
<style lang="scss" src="./multiple-select.scss"/>

