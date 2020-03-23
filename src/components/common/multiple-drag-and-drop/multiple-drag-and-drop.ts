import { Component, Prop, Watch } from "vue-property-decorator";
import WiseVue from "../../../shared/wise-vue";
import tlp from './multiple-drag-and-drop.vue';
import fileUploadService from "../../../services/file-upload-service";
import { forEach, map, findIndex, keys, find } from 'lodash-es';
import Util from "../../../shared/util";
import * as XLSX from 'xlsx';

@Component({
    mixins: [tlp]
})

export default class MultipleDragAndDrop extends WiseVue {

  @Prop({ default: 43})
  height!: number;

  @Prop({ default: null})
  img!: number;

  @Prop({ default: false})
  analysis!: boolean;

  @Prop({ default: ''})
  imports!: any;

  @Prop({ default: ''})
  customerId!: string;

  @Prop({ default: 'image/*'})
  accept!: string;

  @Prop({ default: ''})
  facility!: string;

  @Prop({ default: '' })
  required!: any ;

  @Prop({ default: '' })
  isShow!: any ;

  @Prop({ default: '' })
  value!: any ;

  @Watch('value')
  getValue(val: any, oldVal: any) {
    if (!val) {
      this.filesNames = [];
      this.fds = [];
    }

  }

  isLoading: boolean = false;
  isImage: boolean = false;
  files: Array<any> = [];
  fd: any = null;
  excelDataFile: any = null;
  imgs: Array<any> = [];
  file: any = {};
  filesNames: Array<any> = [];
  fds: Array<any> = [];

  @Watch('facility')
  WatchValue(val: any, oldVal: any) {
  }

  mounted() {
    let dropbox: any = document.querySelector('.dropbox');
    dropbox.addEventListener('dragenter', this.onDrag, false);
    dropbox.addEventListener('dragover', this.onDrag, false);
    dropbox.addEventListener('drop', this.onDrop, false);
  }

  uploadFile(file: any) {
    this.fd = new FormData();
    this.filesNames.push({name: file.name});
    this.fd.append("myFile", file);
    this.fd.append("app", "fd-app");
    this.fd.append("module", "organization");
    this.fd.append("service", "logofile");
    this.fd.append("name", file.name);
    this.fds.push(this.fd);
  }

  onDrag(e: any) {
    e.stopPropagation();
    e.preventDefault();
  }

  onDrop(e: any) {
    e.stopPropagation();
    e.preventDefault();
    let dt = e.dataTransfer;
    forEach(dt.files, item => this.uploadFile(item));
  }

  async onUpload() {
    this.isLoading = true;
    if (this.fds.length < 1) {
      this.isLoading = false;
      return;
    }
    let onUploads: Array<any> = [];
    forEach(this.fds, fd => {
      onUploads.push(
        fileUploadService.fileUpload("/file-app/file-upload", fd).toPromise()
      );
    });
    let mapUploadFile = await Promise.all(onUploads);
    let filesIds = map(mapUploadFile, 'filesId');
    this.isLoading = false;
    this.$emit('input', filesIds);
    this.$emit('onUpload');
  }

  addImg() {
    let inputDOM: any = this.$refs.inputer;
    forEach(inputDOM.files, (item: any) => {
      if (item.type.indexOf('image') > -1) this.isImage = true;
      this.uploadFile(item);
    });
  }

  removeFile(item: any, index: any) {
    let fdIndex: any = null;
    forEach(this.fds, (fd, index) => {
      if (fd.get("name") === item.name) fdIndex = index;
    });
    this.fds.splice(fdIndex, 1);
    this.filesNames.splice(index, 1);
  }

  private initialization() {
    this.isLoading = false;
    this.files = [];
    this.fd = null;
    this.excelDataFile = null;
    this.file = {};
  }

}
