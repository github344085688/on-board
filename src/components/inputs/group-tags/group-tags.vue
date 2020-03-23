<template>
  <div class="d-flex flex-wrap">
    <div class="col-6 pl-0 mt-1" v-for=" (tag,index) in privateTags">
      <div class="unis-checkbox ">
        <input type="checkbox" :name="index + 1" :id="'tag'+ index" v-model="tag.isChecked" @click.stop.prevent="onChecked(tag)">
        <label class="unis-checkbox-style" :for="'tag'+ index"></label>
        <span>{{tag.name}}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" src="./group-tags.scss"/>

