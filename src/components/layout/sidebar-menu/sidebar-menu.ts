import WiseVue from "../../../shared/wise-vue";
import { Component, Prop, Inject, Watch } from "vue-property-decorator";
import template from "./sidebar-menu.vue";
@Component({
    mixins: [template],
    name: 'sidebar-menu',
})
export default class SidebarMenu extends WiseVue {
    @Prop({ default: [] })
    menuData!: Array<any>;

    @Prop({ default: false })
    isSideBarShrink!: boolean;

    @Inject('reloads') reloads: any;

    @Watch('menuData')
    getMenuData(val: any, oldVal: any) {
      this.privateMenuData = val;
    }

    private privateMenuData: Array<any> = [];

    private routeGoTo(routerName: string) {
      this.$router.replace({name: routerName});
    }

    mounted() {

    }
  }
