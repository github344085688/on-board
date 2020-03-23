<template>
  <div class="default-select-content">
    <div class="select-content" :class="prStyle">
      <input type="text"
             v-on:focus="handleFocus"
             v-on:blur="handleBlur"
             v-model="transitionValue "
             placeholder="select"
             readonly="readonly"
             :disabled = "disabled"
      >
      <div  class="loding-box d-flex justify-content-center align-items-center" v-if="loading">
        <div class="loading blue" ></div>
      </div>
      <div style="color:#ddd; padding-top: 11px;" v-if="allowClear && transitionValue">
        <div class="unis-cross cu-p" @click.stop.prevent="onAllowClear()"></div>
      </div>
      <div style="color:#ddd ; padding-top: 8px;" v-show=" !disabled">
        <div class="unis-nabla  unis-icon" style="color: #2E323C; font-size: 18px;" :class="{'up':isHandleBin}"></div>
      </div>
    </div>
    <under-line v-if="!prStyle" :focus="isFocused && !disabled" :underLineColor="transitionIsValidate ? 'red' : ''"></under-line>
    <ul class="m-0 p-0" v-show="isSelect && priSelectdatas.length > 0 && !disabled">
      <li class="m-0 p-0" v-for="item in priSelectdatas" :key="item.id">
        <input type="button" @click.stop.prevent="onItemSelect(item)" v-on:focus="[isFocused=true,isSelect=true]"
               v-on:blur="[isFocused=false,isSelect=false]" v-bind:value="item | filtersName(filter)">
      </li>
    </ul>
  </div>
</template>
<style lang="scss" src="./default-select.scss"/>
