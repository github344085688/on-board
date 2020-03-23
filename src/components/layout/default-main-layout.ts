import WiseVue from "../../shared/wise-vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import template from "./default-main-layout.vue";
import SidebarMenu from './sidebar-menu/sidebar-menu';
import SidebarMenuService from "../../services/sidebar-menu-service";
import { forEach, find } from 'lodash-es';
import AppHeader from './app-header';

@Component({
  mixins: [template],
  components: {
    SidebarMenu,
    AppHeader
  }
})
export default class DefaultMainLayout extends WiseVue {
  @Provide('reloads') reloads: any = this.reload;

  @Watch('$route', {
    deep: true,
    immediate: true
  })
  watchRoute(val: any, oldVal: any) {
    if (val.fullPath.indexOf('/create/') > -1) this.isCreate = true;
    else this.isCreate = false;
  }

  isSideBarShrink: boolean = false;
  menuData: any = [];
  isCreate: boolean = false;
  isRouterAlive: boolean = false;
  isHeavyLoad: boolean = false;

  sideBarShrink(): void {
    this.isSideBarShrink = !this.isSideBarShrink;
  }

  mounted() {
    this.menuData = SidebarMenuService.warehousing();
  }

  reload () {
    this.isRouterAlive = true;
    this.$nextTick(function () {
      this.routerSetUserCompletionSteps(0, true);
      this.isHeavyLoad = true;
      this.isRouterAlive = false;
    });
  }
}
