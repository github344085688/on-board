<template>
    <div class="input-select-filter">
      <div class="select-content d-flex flex-wrap">
        <input type="text"
               v-on:focus="handleFocus"
               v-on:blur="handleBlur"
               v-model="transitionValue"
               placeholder="Input To Filter">
        <div style="color: #2E323C; padding-top: 11px;" v-if="allowClear && transitionValue && !disabled">
          <div class="unis-cross cu-p" style="margin-right: 4px; margin-top: 2px;"
               @click.stop.prevent="onAllowClear()"></div>
        </div>
        <div style="color:#ddd ; padding-top: 8px;" v-show=" !disabled">
          <div class="unis-nabla  unis-icon" style="color: #2E323C; font-size: 18px;" :class="{'up':isHandleBin}"></div>
        </div>
      </div>
      <under-line :focus="isFocused" :underLineColor="transitionIsValidate ? 'red' : ''"></under-line>

      <ul v-show="isSearch" class="p-0" style="z-index: 888">
        <li style="color: #56A7FD; font-size: 15px; height: auto" class="d-flex align-self-center justify-content-center" >
          <div class="loader-13"></div>
        </li>
      </ul>
      <ul v-show="!isSearch && isSelect && transitionSelectddata.length>0"  class="p-0" style="z-index: 9999999">
        <li v-for="item in transitionSelectddata" class="p-0">
          <input type="button" @click.stop.prevent="onItemSelect(item)" v-on:focus="[isFocused=true,isSelect=true]" v-on:blur="[isFocused=false,isSelect=false]" v-bind:value="item | filtersName(filterKey)">
        </li>
      </ul>
    </div>
</template>
<style lang="scss" src="./input-select-filter.scss"/>

