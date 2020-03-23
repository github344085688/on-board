<template>
  <div class="progress-lists" >
    <div class="fixed-background pt-3 pb-3" :class="isFirst ? 'first-cli' :'' " :style="{'paddingLeft':!isCheckedBox ? '22px':''}">
      <div class="d-flex col-12 pr-0 pl-0 align-items-center">
        <div class="align-self-center position-relative mr-1 ml-2" v-if="isCheckedBox">
          <div class="unis-draw blue finish" v-if="isFinish"></div>
        </div>
        <div class="align-self-center" style="font-size: 16px; font-weight: 600">{{label}}</div>
        <div class="align-self-center ml-2" v-if="isCheckedBox" style="font-size: 16px; font-weight: 600">{{listNumber}}</div>
        <div class="align-self-center" style="flex: 1;height: 1px; border:#d3d9df 1px solid; "></div>
      </div>
      <div class="d-flex flex-wrap align-items-stretch">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./progress-lists.scss"/>
