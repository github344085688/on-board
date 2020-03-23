import WiseVue from "../../../shared/wise-vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import tlp from "./input-select-filter.vue";
import UnderLine from "../../common/under-line/under-line";
import "rxjs/add/operator/debounceTime";
import { keyBy, clone, filter } from 'lodash-es';

@Component({
  name: "DefaultSelect",
  mixins: [tlp],
  components: {
    UnderLine
  },
  filters: {
    filtersName(value: any, filterKey: any) {
      if (value[filterKey]) return value[filterKey];
      else return value;
    }
  }
})

export default class InputSelectFilte extends WiseVue {

  @Prop({
    default: ''
  })
  selectdatas!: any;

  @Prop({
    default: ''
  })
  placeholder!: string;

  @Prop({
    default: ''
  })
  value!: any;

  @Prop({
    default: ''
  })
  filterKey!: string;

  @Prop({
    default: ''
  })
  syncKey!: string;

  @Prop({
    default: false
  })
  isValidate!: boolean;

  @Prop({
    default: false
  })
  allowClear!: boolean;

  @Prop({
    default: false
  })
  disabled!: boolean;

  transitionIsValidate: boolean = false;
  isFocused: boolean = false;
  isSearch: boolean = false;
  isSelect: boolean = false;
  isHandleBin: boolean = false;
  transitionValue: any = '';
  cloneTtransitionValue: any = '';

  @Watch('selectdatas')
  getSelectdatas(val: any, oldVal: any) {
    if (this.syncKey) this._setTransitionValues(this.value);
  }

  @Watch('isValidate')
  getValidate(val: any, oldVal: any) {
    if (val) this.transitionIsValidate = true;
    else this.transitionIsValidate = false;
  }

  @Watch('value')
  getValue(val: any, oldVal: any) {
    if (this.syncKey) this._setTransitionValues(val);
    else this.transitionValue = val;
  }

  private _setTransitionValues(val: any) {
    if (!val) this.transitionValue = '';
    let transitionValues = filter(this.selectdatas, data => {
      return data[this.syncKey] === val;
    });
    if (transitionValues.length > 0) this.transitionValue = transitionValues[0][this.filterKey];
  }

  get transitionSelectddata() {
    let reg = new RegExp(this.transitionValue, 'ig');
    let filterKey = this.filterKey;
    if (reg) {
      return filter(this.selectdatas, data => {
        if (filterKey)return data[filterKey].match(reg);
        else return data.match(reg);
      });
    } else return this.selectdatas;
  }

  async mounted() {
    this._setTransitionValues(this.value);
  }

  handleFocus() {
    this.isSelect = true;
    this.isFocused = true;
    this.isHandleBin = true;
    this.transitionValue = '';
  }

  handleBlur(isValidate: any) {
    this.isSelect = false;
    this.isFocused = false;
    this.isHandleBin = false;
    this.isFocused = false;
  }

  onItemSelect(item: any) {
    this.isSelect = false;
    this.isFocused = false;
      if (this.syncKey && item[this.filterKey]) this.transitionValue = item[this.filterKey];
      else this.transitionValue = item;
      this.cloneTtransitionValue = clone(this.transitionValue);
      if (this.syncKey && item[this.syncKey]) this.$emit('input', item[this.syncKey]);
      else if (item) this.$emit('input', item);
  }

  crossSelect() {
    this.transitionValue = '';
    this.$emit('input', null);
  }

  onAllowClear() {
    this.transitionValue = null;
    this.$emit('input', null);
  }

}
