<template>
  <section class="collapsible-list-group ">
    <div class="group-list flex-1 d-flex align-items-center" :class="dataToggle ? 'bottom1' :''"
         @click.stop.prevent="onToggleGroupList()">
      <div class=" ml-2 mr-2">
       <span class="unis-nabla" :class="dataToggle ? 'rotate90' :''" style="font-size: 14px;
}"></span>
      </div>
      <div class="flex-1">{{panelTitle}}</div>
    </div>
    <div class="flex-1" :class="dataToggle ? 'conceal-box-block' :'conceal-box-hide'">
        <slot></slot>
    </div>

  </section>
</template>
<style lang="scss" src="./collapsible-list-group.scss"/>

