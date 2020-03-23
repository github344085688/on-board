import WiseVue from "../../../shared/wise-vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import tlp from "./default-select.vue";
import UnderLine from "../../common/under-line/under-line";
import session from "../../../shared/session";
import { differenceWith, isEqual, map, keyBy } from 'lodash-es';

@Component({
  name: "DefaultSelect",
  mixins: [tlp],
  components: {
    UnderLine
  },
  filters: {
    filtersName(value: any, filter: any) {
      if (value[filter]) return value[filter];
      else return value;
    }
  }
})

export default class DefaultSelect extends WiseVue {

  @Prop({
    default: null
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
  filter!: string;

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

  @Prop({
    default: false
  })
  allowClear!: boolean;

  @Prop({
    default: ''
  })
  tag!: string;

  @Prop({
    default: false
  })
  disabled!: boolean;

  @Prop({
    default: false
  })
  loading !: boolean;

  @Prop({
    default: ''
  })
  prStyle!: string;

  priSelectdatas: Array<any> = [];
  transitionIsValidate: boolean = false;
  isFocused: boolean = false;
  isSelect: boolean = false;
  isHandleBin: boolean = false;
  transitionValue: any = '';


  @Watch('isValidate')
  getValidate(val: any, oldVal: any) {
    if (val) this.transitionIsValidate = true;
    else this.transitionIsValidate = false;
  }

  @Watch('selectdatas')
  getSelectdatas(val: any, oldVal: any) {
    if (val) {
      this.priSelectdatas = val;
    }
    if (this.filter) {
      this.assignmentTransitionValue(this.value);
    }
  }

  @Watch('value')
  getValue(val: any, oldVal: any) {
    if (!val) {
      this.transitionValue = '';
    }
    if (this.filter) {
      this.assignmentTransitionValue(val);
    } else {
      this.transitionValue = val;
    }

  }

  private assignmentTransitionValue(value: any) {
    let keyByPriSelectdatas: any = {};
    if (this.tag === 'facility') {
      keyByPriSelectdatas = keyBy(this.priSelectdatas, this.syncKey);
    } else keyByPriSelectdatas = keyBy(this.selectdatas, this.syncKey);
    if (keyByPriSelectdatas[value]) this.transitionValue = keyByPriSelectdatas[value][this.filter];
  }

  mounted() {
    if (typeof (this.value) == 'object') this.transitionValue = this.value[this.filter];
    else if (this.filter) {
      this.assignmentTransitionValue(this.value);
    } else {
      this.transitionValue = this.value;
    }
    if (this.tag === 'item') this.getItemGroup();
    if (this.tag === 'facility') this.getFacilitysGroup();
    if (this.selectdatas) this.priSelectdatas = this.selectdatas;

  }

  handleFocus() {
    this.isFocused = true;
    this.isHandleBin = true;
    this.isSelect = true;
  }

  handleBlur(isValidate: any) {
    this.isSelect = false;
    this.isFocused = false;
    this.isHandleBin = false;
  }

  onItemSelect(item: any) {
    this.isSelect = false;
    this.isFocused = false;
    this.isHandleBin = false;
    if (this.returnStructure === 'obj') {
      this.transitionValue = item[this.filter];
      this.$emit('input', item);
      this.$emit('emitChoose', item);
      return;
    }
    if (item[this.filter]) this.transitionValue = item[this.filter];
    else this.transitionValue = item;
    if (item[this.syncKey]) this.$emit('input', item[this.syncKey]);
    else if (item) this.$emit('input', item);
    this.$emit('emitChoose', item);
    if (this.tag === 'facility') {
      let sessioncompanyFacility = session.getCurrentCompanyFacility();
      sessioncompanyFacility.Facility = item;
      session.setCurrentCompanyFacility(sessioncompanyFacility);
    }

  }

  onAllowClear() {
    this.transitionValue = null;
    this.$emit('input', null);
  }

  private getItemGroup() {

  }

  private getFacility() {
  }

  private getFacilitysGroup() {
    this.priSelectdatas = this.getFacilityByUserSelect();
    if (this.priSelectdatas.length > 0) {
      let AssignedCompanyFacilitie = session.getCurrentCompanyFacility();
      this.$emit('input', AssignedCompanyFacilitie.Facility.accessUrl);
    }
  }
}
