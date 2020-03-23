import { Component, Prop, Watch } from "vue-property-decorator";
import WiseVue from "../../../shared/wise-vue";
import tlp from './date-picker.vue';
import Datepicker from 'vuejs-datepicker';
import UnderLine from "../../common/under-line/under-line";
import moment from 'moment';

@Component({
  mixins: [tlp],
  components: {
    Datepicker,
    UnderLine
  }
})
export default class DatePicker extends WiseVue {

  @Prop({
    default: false
  })
  disabled!: number;

  @Prop({
    default: false
  })
  required!: number;

  @Prop({
    default: ''
  })
  name!: string;

  @Prop({
    default: false
  })
  isValidate!: boolean;

  @Prop({
    default: ''
  })
  value!: any;

  @Prop({
    default: 'Select Date'
  })
  placeholder!: any;

  @Prop({
    default: ''
  })
  prStyle!: any;

  @Prop({
    default: ''
  })
  alignDateTimePicker!: any;

  isFocused: boolean = false;
  startDate: any = null;
  isHandleBin: boolean = false;
  isSelect: boolean = false;
  transitionIsValidate: boolean = false;

  @Watch('isValidate')
  getValidate(val: any, oldVal: any) {
    if (val) this.transitionIsValidate = true;
    else this.transitionIsValidate = false;
  }

  @Watch('value')
  getValue(val: any, oldVal: any) {
    if (!val) {
      this.startDate = '';
    }
  }

  mounted() {
    if (this.value)  this.startDate = this.value;
  }

  clearDate() {
    this.$emit('input', null);
  }

  handleClick() {
    if (!this.disabled) {
      this.isFocused = true;
      this.isHandleBin = true;
      this.isSelect = true;
      (this as any).$refs.programaticOpen.showCalendar();
    }
  }

  customFormatter(date: any) {
    this.isSelect = false;
    this.isFocused = false;
    this.isHandleBin = false;
    (this as any).$refs.programaticOpen.close();
    this.startDate = moment(date).format('YYYY-MM-DD');
    this.$emit('input', this.startDate);
    return  this.startDate;
  }
}
