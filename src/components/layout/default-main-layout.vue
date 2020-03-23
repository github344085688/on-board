<template>
  <div class="default-main-layout">
    <aside class="obd-sidebar-menu" :style="{'width':isSideBarShrink ? '64px' : ''}">
      <div class="unis-aside " :class="isSideBarShrink ? 'shrink' : ''">
        <div class="logo-box">
          <div class="spread" @click.stop.prevent="sideBarShrink()">
            <i></i>
          </div>
          <i class="unis-unis logo"></i>
        </div>
        <span class="project-name">WAREHOUSING</span>
        <span class="project-name-shrink">WMS</span>
        <sidebar-menu :isSideBarShrink ="isSideBarShrink" :menu-data="menuData" class="page-sidebar-menu"></sidebar-menu>
      </div>
    </aside>
    <app-header :class="isSideBarShrink ? 'obd-header-shrink' : ''"></app-header>
    <section class="obd-content scroll-bar" :style="{'left':isSideBarShrink ? '64px' : ''}"  :class="{'obd-content-shrink':isSideBarShrink, 'pr-28':isCreate}">
     <div class="section-box">
       <router-view v-if="!isRouterAlive"/>
     </div>
    </section>

  </div>
</template>
<style lang="scss" src="./default-main-layout.scss" scoped></style>
<div class="grid-25">
  <label>Allow Receive To Tote</label>
  <md-switch class="md-primary" aria-label=" " ng-model="customer.allowReceiveToTote" style="margin-top: 0;margin-bottom: 0;"></md-switch>
</div>
