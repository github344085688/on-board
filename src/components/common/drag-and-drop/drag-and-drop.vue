<template>
  <div class="d-flex col-12 p-0 align-items-center dropbox " ref="select_frame" id="drop_area">
    <div class="drop-or-browse d-flex justify-content-center col-8 p-0"
         :style="{'height':height ? height+'px' : 'auto' }">
      <input type="file"
             style="width: 100%; display: block;opacity:0; filter:alpha(opacity=0);height: 100%;position: absolute;left: 0; top:0;z-index:1; cursor: pointer; "
             @change="addImg" ref="inputer" name="file"
             :accept="accept">
      <div class="d-flex row">
        <img class="align-self-center flex1" style="" v-if="!img && imgs.length < 1"
             src="@/assets/images/cioud.svg"/>
        <img class="align-self-center flex1" v-if="img && imgs.length < 1"
             style="" :src="img"/>
        <div class="align-self-center flex1" v-if="imgs.length > 0" style="" v-for="img in imgs"
             :key="img">
          <img class="align-self-center flex1" style="width: 30px; height: auto;" :src="img"/>
        </div>
        <span class="neutral-grey f-z12 align-self-center flex1" style="margin: 0 5px;" v-if="files.length==0">Drag and drop or</span>
        <span class="align-self-center blue flex1" v-if="files.length==0">browse</span>
        <span class="align-self-center blue flex1" v-for="file in files">{{file.name}}</span>
      </div>
    </div>
    <div class="col-2">
      <button type="button" style="background: #D5E9FA; color: #56A7FD;" class="unis-btn unis-btn-primary unis-ex-sm"
              @click.stop.prevent="onUpload">upload
        <div class="loading" style="margin-left: 15px;" v-if="isLoading"></div>
      </button>
    </div>
  </div>
</template>
<style lang="scss" src="./drag-and-drop.scss"/>
