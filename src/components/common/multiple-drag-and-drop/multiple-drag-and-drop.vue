<template>
  <div class=" multiple-drag-and-drop " ref="select_frame" id="drop_area" :style="{'height':isShow? '400px' : '0px', 'font-size': isShow? '18px' : '0px'}">
    <div class="drop-or-browse d-flex justify-content-center  p-0  dropbox ">
      <input type="file"
             @change="addImg" ref="inputer" name="file"
             :multiple="'multiple'"
             :accept="accept">
        <img class="align-self-center flex1" src="@/assets/images/cioud.svg"/>
        <span class="neutral-grey f-z12 align-self-center flex1" style="margin: 0 5px;" >Drag and drop or</span>
        <span class="align-self-center blue flex1" v-if="files.length==0">browse</span>
    </div>
    <div class="itemLists" >
      <div class="item" v-for="(files,index) in filesNames " :key="files.name">
        <div class="name">{{files.name}}</div>
        <div class="operation" @click.stop.prevent="removeFile(files, index) "><i class="unis-cross unis-icon" style="font-size: 1.5em;"></i></div>
      </div>
    </div>
    <button type="button" style="background: #D5E9FA; color: #56A7FD;"  class="unis-btn unis-btn-secondary"
            @click.stop.prevent="onUpload">Upload
      <div class="loading" style="margin-left: 15px;" v-if="isLoading"></div>
    </button>
    </div>
</template>
<style lang="scss" src="./multiple-drag-and-drop.scss"/>
