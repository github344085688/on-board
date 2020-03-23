/**
 * Created by f on 2018/5/22.
 */
import { Component, Prop, Watch } from "vue-property-decorator";
import WiseVue from "../../../shared/wise-vue";
import template from './pop-up-windows.vue';
@Component({
  mixins: [template],
  name: 'PopUpWindows',
  components: {},
})
export default class PopUpWindows extends WiseVue {
  @Prop({ default: true })
  show!: boolean;

  @Prop({ default: 200 })
  height!: Number;

  @Prop({ default: 70 })
  width!: Number;

  @Prop({ default: '' })
  tlitle!: String;

  options: any = {};

  @Watch("show")
  getIsShow() {

  }

  cancel(event: any): void {
    this.$emit('cancel');
  }
}




