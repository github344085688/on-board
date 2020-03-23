import WiseVue from "../../../shared/wise-vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import tlp from "./multiple-select.vue";
import UnderLine from "../../common/under-line/under-line";
import { differenceWith, isEqual, map, keyBy, forEach, pick, takeWhile  } from 'lodash-es';
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

export default class MultipleSelect extends WiseVue {

  @Prop({
    default: ''
  })
  tag!: string;

  @Prop({
    default: () => []
  })
  selectdatas!: Array<any>;

  @Prop({
    default: ''
  })
  placeholder!: string;

  @Prop({
    default: () => []
  })
  value!: Array<any>;

  @Prop({
    default: 'name'
  })
  filterKey!: string;

  @Prop({
    default: ''
  })
  syncKey!: string;

  @Prop({
    default: ''
  })
  returnStructure!: string;

  @Prop({
    default: false
  })
  isValidate!: boolean;

  transitionIsValidate: boolean = false;
  isFocused: boolean = false;
  isSelect: boolean = false;
  isHandleBin: boolean = false;
  transitionSelects: Array<any> = [];
  transitionSelectdatas: Array<any> = [];

  @Watch('isValidate')
  getValidate(val: any, oldVal: any) {
    if (val) this.transitionIsValidate = true;
    else this.transitionIsValidate = false;
  }

  @Watch('selectdatas')
  getSelectdatas(val: any, oldVal: any) {
    if (val) this.transitionSelectdatas = val;
  }

  @Watch('value')
  getValue(val: any, oldVal: any) {
    if (val.length == 0) {
      this.transitionSelects = [];
    }
  }

  mounted() {
    this.transitionSelects = this.value;
    if (this.tag === 'facility') {
      let facilitys = this.getFacilityByUserSelect();
      let keyByfacilitys = keyBy(facilitys, this.syncKey);
      let findValueToFacilitys: Array<any> = [];
      forEach(this.value, function (item: any) {
        findValueToFacilitys.push(keyByfacilitys[item]);
      });
      this.transitionSelects = findValueToFacilitys;
      this.transitionSelectdatas = facilitys;
    } else {
      this.transitionSelects = this.value;
      this.transitionSelectdatas = differenceWith(this.selectdatas, this.value, isEqual);
    }
  }

  handleFocus() {
    this.isFocused = true;
    this.isHandleBin = true;
    this.isSelect = true;
    this.transitionSelectdatas = differenceWith(this.transitionSelectdatas, this.transitionSelects, isEqual);
  }

  handleBlur() {
    this.isSelect = false;
    this.isFocused = false;
    this.isHandleBin = false;
  }

  onItemSelect(item: any) {
    let index = this.transitionSelects.indexOf(item);
    if (index < 0) this.transitionSelects.push(item);
    this.transitionSelectdatas.splice(this.transitionSelectdatas.indexOf(item), 1);
    if (this.transitionSelects.length > 0) {
      if (this.returnStructure === 'obj') {
        this.$emit('input', this.transitionSelects);
        return;
      }
      if (this.syncKey) {
        this.$emit('input', map(this.transitionSelects, this.syncKey));
      }
      else this.$emit('input', this.transitionSelects);
    }
    else this.$emit('input', null);

  }

  onRemoveItem(item: any) {
    this.isSelect = false;
    this.isFocused = false;
    let index = this.transitionSelectdatas.indexOf(item);
    if (index < 0) this.transitionSelectdatas.push(item);
    this.transitionSelects.splice(this.transitionSelects.indexOf(item), 1);
    if (this.transitionSelects.length > 0) {
      if (this.returnStructure === 'obj') {
        this.$emit('input', this.transitionSelects);
        return;
      }
      if (this.syncKey) {
        this.$emit('input', map(this.transitionSelects, this.syncKey));
      }
      else this.$emit('input', this.transitionSelects);
    }
    else this.$emit('input', null);
  }
}
