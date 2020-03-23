import WiseVue from "../../../shared/wise-vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import template from "./collapsible-list-group.vue";
import Step from "../../common/step/step";
import { forEach } from 'lodash-es';

@Component({
  mixins: [template],
  name: 'AccountFramework',
  components: {
    Step
  }
})
export default class CollapsibleListGroup extends WiseVue {

  @Prop({
    default: ''
  })
  panelTitle!: string;

  @Prop({
    default: false
  })
  isShow!: boolean;

  dataToggle: boolean = false;
  dataToggleKey: string = '';

  @Watch('isShow')
  WatchIsShow(val: any, oldVal: any) {
    this.dataToggle = val;
  }

  mounted() {
    if (this.isShow) this.dataToggle = this.isShow;
  }

  onToggleGroupList(): void {
    this.dataToggle = !this.dataToggle;
    this.$emit('collapsible', {title: this.panelTitle, isShow: this.dataToggle});
  }

}
