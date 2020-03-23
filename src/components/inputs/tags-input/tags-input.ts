import WiseVue from "../../../shared/wise-vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import tlp from "./tags-input.vue";
import UnderLine from "../../common/under-line/under-line";
@Component({
  name: "TagsInput",
  mixins: [tlp],
  components: {
    UnderLine
  }
})

export default class TagsInput extends WiseVue {
  @Prop({
    default: ''
  })
  name!: string;

  @Prop({
    default: null
  })
  fill!: any;

  @Prop({
    default: ''
  })
  placeholder!: string;

  @Prop({
    default: []
  })
  tagDatas!: Array<any>;

  @Prop({
    default: false
  })
  isValidate!: boolean;

  @Prop({
    default: () => []
  })
  value!: Array<any>;

  transitionIsValidate: boolean = false;
  transitionTagDatas: Array<any> = [];
  transitionPlaceholder: String = '';
  isFocused: boolean = false;
  modelValue: any = null;

  @Watch('isValidate')
  getValidate(val: any, oldVal: any) {
    if (val) this.transitionIsValidate = true;
    else this.transitionIsValidate = false;
  }

  @Watch("transitionTagDatas")
  transitionTag() {
    if (this.transitionTagDatas.length == 0) this.transitionPlaceholder = this.placeholder;
    else this.transitionPlaceholder = '';
  }

  mounted() {
    this.transitionTagDatas = this.value;
    if (this.tagDatas.length > 0) {
      this.transitionTagDatas = this.tagDatas;
    } else this.transitionPlaceholder = this.placeholder;
  }

  get valErrors(): any {
    if (this.transitionIsValidate ) return  'red';
  }


  handleFocus() {
    this.isFocused = true;
  }

  handleBlur() {
    this.isFocused = false;
    if (this.fill && this.modelValue) {
      this.modelValue = `${this.fill}${this.modelValue}`;
      let index = this.transitionTagDatas.indexOf(this.modelValue);
      if (index < 0) this.transitionTagDatas.push(this.modelValue);
    } else if (this.modelValue) {
      let index = this.transitionTagDatas.indexOf(this.modelValue);
      if (index < 0) this.transitionTagDatas.push(this.modelValue);
    }
    this.modelValue = '';
    this.$emit('input', this.transitionTagDatas);
  }

  onRemoveItem(item: any) {
    this.transitionTagDatas.splice(this.transitionTagDatas.indexOf(item), 1);
    this.$emit('input', this.transitionTagDatas);
  }

}
