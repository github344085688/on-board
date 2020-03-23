<template>
  <div class="selects-device">
    <div class="select-content d-flex">
      <input type="text"
             class="flex-1 align-self-center"
             v-on:focus="handleFocus"
             v-on:blur="handleBlur"
             v-model="transitionValue"
             :placeholder="placeholder"
             readonly="readonly">
      <div class="align-self-center" style="width: 1px; background: #ffffff; height: 80%; "></div>
      <div class="col-2 pr-4 pl-2 pt-1">
      <span class="unis-nabla align-self-center" :class="{'up':isHandleBin}" style="font-size: 18px; color: #ffffff"></span>
      </div>
    </div>
    <ul v-show="isSelect && selectDatas.length>0" class="m-0 p-0">
      <li v-for="item in selectDatas">
        <input type="button" @click.stop.prevent="onItemSelect(item)" v-on:focus="[isFocused=true,isSelect=true]"
               v-on:blur="[isFocused=false,isSelect=false]" v-bind:value="item | filtersName(filterKey)">
      </li>
    </ul>
  </div>
</template>
<style lang="scss" src="./selects-device.scss"/>

