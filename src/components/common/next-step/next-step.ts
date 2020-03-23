import { Component, Prop } from "vue-property-decorator";
import WiseVue from "../../../shared/wise-vue";
import tlp from './next-step.vue';
import { forEach, isPlainObject } from 'lodash-es';

@Component({
    mixins: [tlp]
})
export default class NextStep extends WiseVue {
    @Prop({
      default: false
    })
    isNextStep !: boolean;

    @Prop({
      default: ''
    })
    value!: any;

  cancel() {
    this.popups({
      title: 'Cancel Your Progress?',
      content: 'Are You Sure You Want To Cancel? <br> Your Changes Will Be Reverted. ',
      confirm: 'ok',
      cancel: 'go back',
    }).then((ord: any) => this.$emit('cancel')).catch((err: any) => {});
  }
}
