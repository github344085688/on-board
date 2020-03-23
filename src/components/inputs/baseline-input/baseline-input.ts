import WiseVue from "../../../shared/wise-vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import tlp from "./baseline-input.vue";
import UnderLine from "../../common/under-line/under-line";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";

@Component({
  name: "BaselineInput",
  mixins: [tlp],
  components: {
    UnderLine
  }
})

export default class BaselineInput extends WiseVue {

  @Prop({
    default: 'text'
  })
  type!: string;

  @Prop({
    default: ''
  })
  min!: string;

  @Prop({
    default: ''
  })
  name!: string;

  @Prop({
    default: ''
  })
  placeholder!: string;

  @Prop({
    default: ''
  })
  value!: string;

  @Prop({
    default: false
  })
  required!: boolean;

  @Prop({
    default: false
  })
  isValidate!: boolean;

  @Prop({
    default: false
  })
  disabled!: boolean;

  isPrValidate: boolean = false;
  isFocused: boolean = false;
  transitionValue: string = '';
  invalue: string = '';
  inputSubject: Subject<void> = new Subject();

  @Watch('isValidate')
  getValidate(val: any, oldVal: any) {
    if (val) this.isPrValidate = true;
    else this.isPrValidate = false;
  }

  @Watch('value')
  getValue(val: any, oldVal: any) {
    this.transitionValue = val;
  }

  get valErrors(): any {
    if (this.isPrValidate ) return  'red';
  }

  mounted() {
    if (this.value) this.transitionValue = this.value;
    this.isPrValidate = this.isValidate;
    this.inputSubject.debounceTime(1000).subscribe(
      this.emitinput,
      err => this.error(err));
  }

  private emitinput() {
    this.$emit('input', this.transitionValue);
  }
}
