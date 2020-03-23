<template>
  <transition>
    <div class="pop-up-windows">
      <div class="pop-up-pos-re">
        <div class="pop-up-content-box animated fadeIn" :style="{'height':height +'px','width':width +'%' }">
          <div class="content-box">
            <div class="col-12 p-0">
              <div class="card">
                <div class="card-header">
                  {{tlitle}}
                </div>
                <div class="card-body" :style="{'height':(height - 120) +'px'}">
                  <slot></slot>
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <div class="ml-auto d-flex align-items-center">
                <div class="col-6">
                  <button type="button"  class="unis-btn unis-btn-tertiary" @click.stop.prevent="cancel">Cancel</button>
                </div>
                <div class="col-6 ">
                  <button type="submit" class="unis-btn unis-btn-primary unis-sm " >Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" src="./pop-up-windows.scss"/>

