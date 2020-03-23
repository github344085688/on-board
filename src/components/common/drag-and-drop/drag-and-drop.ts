import { Component, Prop, Watch } from "vue-property-decorator";
import WiseVue from "../../../shared/wise-vue";
import tlp from './drag-and-drop.vue';
import fileUploadService from "../../../services/file-upload-service";
import itemService from "../../../services/item-service";
import { forEach, join, keys, find } from 'lodash-es';
import Util from "../../../shared/util";
import * as XLSX from 'xlsx';
import session from '../../../shared/session';

@Component({
    mixins: [tlp]
})

export default class DragAndDrop extends WiseVue {

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

  isLoading: boolean = false;
  isImage: boolean = false;
  files: Array<any> = [];
  fd: any = null;
  excelDataFile: any = null;
  imgs: Array<any> = [];
  file: any = {};

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

    this.files = [];
    this.fd = new FormData();
    this.files.push({
      name: file.name,
      uploadPercentage: 67
    });
    this.fd.append("myFile", file);
    this.fd.append("app", "fd-app");
    this.fd.append("module", "organization");
    this.fd.append("service", "logofile");
    if (this.imports) {
      this.file = file;
      this.excelDataFile = new FormData();
      this.excelDataFile.append("excelDataFile", file);
      if (this.customerId) this.excelDataFile.append("customerId", this.customerId);
    }
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

  addImg() {
    let inputDOM: any = this.$refs.inputer;
    forEach(inputDOM.files, (item: any) => {
      if (item.type.indexOf('image') > -1) this.isImage = true;
      this.uploadFile(item);
    });
  }

  async onUpload() {
    if (this.imports.mustFacility && !this.facility) {
      this.error('Please select a facility !');
      return;
    }
    this.isLoading = true;
    if (!this.fd) {
      this.isLoading = false;
      return;
    }
    if (this.imports.importTemplate === 'item') {
      fileUploadService.fileUpload('/shared/bam/fd-app/import-item', this.excelDataFile).subscribe(
        (res: any) => {
          this.initialization();
          if (res) this.succeed('succeed');
        },
        err => {
          this.initialization();
          this.error(err);
        }
      );
      return;
    }
    if (this.imports.importTemplate === 'location') {
      fileUploadService.fileUpload(`/${this.facility}/bam/fd-app/import-location`, this.excelDataFile).subscribe(
        (res: any) => {
          this.initialization();
          if (res) this.succeed('succeed');
        },
        err => {
          this.error(err);
        }
      );
      return;
    }
    if (this.imports.importTemplate === 'organization') {
      fileUploadService.fileUpload('/shared/bam/fd-app/import-organization', this.excelDataFile).subscribe(
        (res: any) => {
          this.initialization();
          if (res) this.succeed('succeed');
        },
        err => {
          this.initialization();
          this.error(err);
        }
      );
      return;
    }
    if (this.imports.importTemplate === 'inventory') {
      fileUploadService.fileUpload(`/${this.facility}/bam/fd-app/import-inventory`, this.excelDataFile).subscribe(
        (res: any) => {
          this.initialization();
          if (res) this.succeed('succeed');
        },
        err => {
          this.initialization();
          this.error(err);
        }
      );
      return;
    }
    fileUploadService.fileUpload("/file-app/file-upload", this.fd).subscribe(
      (res: any) => {
        if (this.isImage) forEach(res.filesId, filesId => this.getImage(filesId));
        this.$emit('input', join(res.filesId));
        this.initialization();
        this.succeed('succeed');
      },
      err => {
        this.initialization();
        this.error(err);
      }
    );
  }



  private async getImage(filesId: any) {
    fileUploadService.getFile(`/shared/file-app/file-download/${filesId}`).subscribe(
      (res: any) => {
        if (res) {
          this.imgs = [];
          this.imgs.push(Util.getBlob(res));
        }
      }, err => this.error(err)
    );
  }

  private initialization() {
    this.isLoading = false;
    this.files = [];
    this.fd = null;
    this.excelDataFile = null;
    this.file = {};
  }

  private importAnalysis(obj: any) {
    return new Promise((resolve, reject) => {
      if (!(obj.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || obj.type === 'application/vnd.ms-excel')) reject('Then Fild Is Not Excel');
      let rABS = false;
      let reader = new FileReader();
      FileReader.prototype.readAsBinaryString = obj => {
        let binary = "";
        let outdata;
        let reader = new FileReader();
        reader.onload = () => {
          let bytes: any = new Uint8Array(reader.result);
          let length = bytes.byteLength;
          for (let i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          let XLSX = require("xlsx");
          const wb: XLSX.WorkBook = XLSX.read(binary, {
            type: "binary"
          });
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          resolve(outdata);
        };
        reader.readAsArrayBuffer(obj);
      };
      if (rABS) {
        reader.readAsArrayBuffer(obj);
      } else {
        reader.readAsBinaryString(obj);
      }
    });
  }



}
