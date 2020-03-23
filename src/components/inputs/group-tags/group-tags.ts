import WiseVue from "../../../shared/wise-vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import tlp from "./group-tags.vue";
import UnderLine from "../../common/under-line/under-line";
import { filter, map, forEach } from 'lodash-es';
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

export default class GroupTags extends WiseVue {

  @Prop({
    default: () => []
  })
  tags!: Array<any>;

  @Prop({
    default: ''
  })
  value!: any;

  privateTags: Array<any> = [];

  @Watch('value')
  getValue(val: any, oldVal: any) {
    if (val.length == 0) {
      this.fillCheckedTags();
    }
  }

  mounted() {
     this.fillCheckedTags();
  }

  private fillCheckedTags() {
    this.privateTags = [];
    if (this.tags.length > 0) {
      forEach(this.tags, (item: any) => {
        if (this.value.indexOf(item) > -1) this.privateTags.push({"name": item, isChecked: true});
        else  this.privateTags.push({"name": item, isChecked: false});
      });
    }
  }

  onChecked(tag: any) {
    tag.isChecked = !tag.isChecked;
    this.$emit('input', map(filter(this.privateTags, 'isChecked'), 'name'));
  }
}
