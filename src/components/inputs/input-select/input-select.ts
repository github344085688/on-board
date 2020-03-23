import WiseVue from "../../../shared/wise-vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import tlp from "./input-select.vue";
import UnderLine from "../../common/under-line/under-line";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import itemServer from "../../../services/item-service";
import carrierService from "../../../services/carrier-service";
import organizationService from "../../../services/organization-service";
import { forEach, join, values, pick, clone, find, map } from 'lodash-es';

@Component({
  name: "DefaultSelect",
  mixins: [tlp],
  components: {
    UnderLine
  },
  filters: {
    filterName(value: any, filterKey: any, addToFilter: any, ) {
      if (value[filterKey] && addToFilter) return value[filterKey] + value[addToFilter];
      if (value[filterKey]) return value[filterKey];
      else return value;
    }
  }
})

export default class InputSelect extends WiseVue {

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
    default: 'id'
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
    default: ''
  })
  tag!: string;

  @Prop({
    default: false
  })
  disabled!: boolean;

  @Prop({
    default: ''
  })
  customerId!: string;

  @Prop({
    default: ''
  })
  prStyle!: string;

  @Prop({
    default: false
  })
  isReset!: boolean;

  @Prop({
    default: ''
  })
  addToFilter!: string;


  priSelectDatas: Array<any> = [];
  transitionIsValidate: boolean = false;
  isFocused: boolean = false;
  isSearch: boolean = false;
  isSelect: boolean = false;
  isHandleBin: boolean = false;
  transitionValue: any = '';
  cloneTtransitionValue: any = '';
  transitionSelectddatas: Array<any> = [];
  searchByInput: Subject<void> = new Subject();
  filterKey: string = 'name';
  isFirstTime: boolean = true;
  copyItem: any = '';

  @Watch('isReset')
  getReset(val: any, oldVal: any) {
    this.isFirstTime = val;
  }


  @Watch('isValidate')
  getValidate(val: any, oldVal: any) {
    if (val) this.transitionIsValidate = true;
    else this.transitionIsValidate = false;
  }

  @Watch('value')
  getValue(val: any, oldVal: any) {
    if (!val) {
      this.transitionValue = '';
      return;
    }
    if (this.filter) {
      if (this.isFirstTime && this.value && this.tag === 'item' && typeof (this.value) === 'string') {
        this.getItemSpec(this.value);
        return;
      }
      if (this.isFirstTime && this.value && this.tag === 'customer' && typeof (this.value) === 'string') {
        this.getOrganization(this.value);
        return;
      }
      if (this.isFirstTime && this.value && this.tag === 'carrier' && typeof (this.value) === 'string') {
        this.getCarrier(this.value);
        return;
      }
      let valObj = find(this.transitionSelectddatas, {[this.syncKey]: val});
      if (valObj) {
        if (this.addToFilter && valObj[this.addToFilter]) this.transitionValue = valObj[this.filterKey] + valObj[this.addToFilter];
        else this.transitionValue = valObj[this.filterKey];
      }
    } else {
      this.transitionValue = val;
    }
  }

  async mounted() {
    if (this.filter) this.filterKey = join(this.filter, '');
    if (typeof (this.value) == 'object' && this.addToFilter) this.transitionValue = this.value[this.filterKey] + this.value[this.addToFilter];
    else if (typeof (this.value) == 'object') this.transitionValue = this.value[this.filterKey];
    else this.transitionValue = this.value;
    if (this.priSelectDatas) this.transitionSelectddatas = this.selectdatas;
    this.cloneTtransitionValue = clone(this.transitionValue);
    this.searchByInput.debounceTime(1500).subscribe(
      this.searchInvoiceByPaging,
      err => {
        this.error(err);
      }
    );
  }

  private  searchItemGroup(params: any) {
    this.isSearch = true;
    if (this.cloneTtransitionValue != this.transitionValue) this.$emit('input', null);
    else this.$emit('input', this.copyItem.id);
    if (this.customerId) this.$set(params, 'customerIds', [this.customerId]);
    itemServer.search(params).subscribe(
      res => {
        this.transitionSelectddatas = [];
        this.isFirstTime = false;
        this.isSearch = false;
        this.transitionSelectddatas = res;
        if (this.copyItem && !params.name) this.transitionSelectddatas.unshift(this.copyItem);
        forEach(this.transitionSelectddatas, transitionSelectddata => {
          transitionSelectddata[this.filterKey] = join(values(pick(transitionSelectddata, this.filter)), '');
        });
      }, error => this.unitError(error)
    );
  }

  private  searchOrganizationGroup(params: any) {
    this.isSearch = true;
    if (this.cloneTtransitionValue != this.transitionValue) this.$emit('input', null);
    else this.$emit('input', this.copyItem.id);
    organizationService.searchAroundCustomerId(params).subscribe(
      res => {
        this.transitionSelectddatas = [];
        this.isFirstTime = false;
        this.isSearch = false;
        this.transitionSelectddatas = map(res, 'basic');
        if (this.copyItem && !params.partnerName) this.transitionSelectddatas.unshift(this.copyItem);
        forEach(this.transitionSelectddatas, transitionSelectddata => {
          transitionSelectddata[this.filterKey] = join(values(pick(transitionSelectddata, this.filter)), '');
        });
      }, error => this.unitError(error)
    );
  }

  private  searchCarrierGroup(params: any) {
    this.isSearch = true;
    if (this.cloneTtransitionValue != this.transitionValue) this.$emit('input', null);
    else this.$emit('input', this.copyItem.id);
    carrierService.searchCarrierByCustomer(params).subscribe(
      res => {
        this.transitionSelectddatas = [];
        this.isFirstTime = false;
        this.isSearch = false;
        this.transitionSelectddatas = map(res, 'basic');
        // if (this.copyItem && !params.partnerName) this.transitionSelectddatas.unshift(this.copyItem);
        forEach(this.transitionSelectddatas, transitionSelectddata => {
          transitionSelectddata[this.filterKey] = join(values(pick(transitionSelectddata, this.filter)), '');
        });
      }, error => this.unitError(error)
    );
  }

  private  getItemSpec(itemSpecId: string) {
    itemServer.getItemSpec(itemSpecId).subscribe(
      res => {
        this.copyItem = res;
        if (this.addToFilter) this.transitionValue = join(values(pick(res, [this.filter, this.addToFilter])), '');
        else  this.transitionValue = join(values(pick(res, this.filter)), '');
        this.cloneTtransitionValue = clone(this.transitionValue);
      }, error => this.unitError(error)
    );
  }

  private  getOrganization(orgId: string) {
    organizationService.get(orgId).subscribe(
      res => {
        if (!res.basic) return;
        let mapOrganization = res.basic;
        this.copyItem = mapOrganization;
        if (this.addToFilter) this.transitionValue = join(values(pick(res, [this.filter, this.addToFilter])), '');
        else  this.transitionValue = join(values(pick(res, this.filter)), '');
        this.cloneTtransitionValue = clone(this.transitionValue);
      }, error => this.unitError(error)
    );
  }

  private unitError(error: any) {
    this.error(error);
    this.isSearch = false;
    this.isSelect = false;
    this.isFocused = false;
    this.isHandleBin = false;
    this.isFocused = false;
  }

  private  getCarrier(carrierId: string) {
    carrierService.getCarrier(carrierId).subscribe(
      res => {
        this.copyItem = res;
        if (this.addToFilter) this.transitionValue = join(values(pick(res, [this.filter, this.addToFilter])), '');
        else  this.transitionValue = join(values(pick(res, this.filter)), '');
        this.cloneTtransitionValue = clone(this.transitionValue);
      }, error => this.unitError(error)
    );
  }

  private searchInvoiceByPaging() {
    if (this.tag === 'item') this.searchItemGroup({name: this.transitionValue});
    if (this.tag === 'customer') this.searchOrganizationGroup({partnerName: this.transitionValue});
    if (this.tag === 'carrier') {
      if (this.customerId) this.searchCarrierGroup({customerId: this.customerId, partnerName: this.transitionValue});
      else this.searchCarrierGroup({partnerName: this.transitionValue});
    }

  }

  handleFocus() {
    this.isSelect = true;
    this.isFocused = true;
    this.isHandleBin = true;
    if (this.tag === 'item' && this.isFirstTime) this.searchItemGroup({});
    if (this.tag === 'customer' && this.isFirstTime) this.searchOrganizationGroup({});
    if (this.tag === 'carrier' && this.isFirstTime) {
      if (this.customerId) this.searchCarrierGroup({customerId: this.customerId});
      else this.searchCarrierGroup({});
    }
    if (this.isReset) this.$emit('on-select', '');
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
    this.isHandleBin = false;
    this.copyItem = item;
    if (this.addToFilter && item[this.filterKey] && item[this.addToFilter]) this.transitionValue = item[this.filterKey] + item[this.addToFilter];
    else if (item[this.filterKey]) this.transitionValue = item[this.filterKey];
    else this.transitionValue = item;
    this.cloneTtransitionValue = clone(this.transitionValue);
    if (item[this.syncKey]) this.$emit('input', item[this.syncKey]);
    else if (item) this.$emit('input', item);
    this.$emit('on-select', item);
  }

  onAllowClear() {
    this.transitionValue = null;
    this.$emit('input', null);
  }

}
