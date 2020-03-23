<template>
  <div class="d-flex  mt-5 animated fadeInUp delay-0_8s">
    <div class="col-1 blue">
      <button type="button"  class="unis-btn unis-btn-tertiary" @click.stop.prevent="cancel">Cancel</button>
    </div>
    <div class="col-2  ml-auto mr-4">
      <button type="submit" class="unis-btn unis-btn-primary unis-sm " :disabled="isNextStep" >
        Next Step
        <span class="unis-arrow right" style=" margin-left: 5px; font-size: 12px; margin-top: 5px;" ></span>
        <div class="loading" style="margin-left: 15px;" v-if="isNextStep"></div>
      </button>
    </div>
  </div>
</template>
