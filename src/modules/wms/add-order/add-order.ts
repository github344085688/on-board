import WiseVue from "../../../shared/wise-vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import tlp from "./add-order.vue";
import InputSelect from "../../../components/inputs/input-select/input-select";
import BaselineInput from "../../../components/inputs/baseline-input/baseline-input";
import DefaultSelect from "../../../components/inputs/default-select/default-select";
import SwitchButton from "../../../components/buttons/switch-button/switch-button";
import InputSelectFilter from "../../../components/inputs/input-select-filter/input-select-filter";
import DatePicker from "../../../components/common/datepickers/date-picker";
import PopUpWindows from "../../../components/common/pop-up-windows/pop-up-windows";
import MultipleDragAndDrop from "../../../components/common/multiple-drag-and-drop/multiple-drag-and-drop";
import util from "../../../shared/util";
import itemService from "../../../services/item-service";
import receiptService from "../../../services/receipt-service";
import { forEach, clone, find, cloneDeep } from 'lodash-es';

@Component({
  mixins: [tlp],
  components: {
    BaselineInput,
    InputSelect,
    DefaultSelect,
    InputSelectFilter,
    SwitchButton,
    DatePicker,
    PopUpWindows,
    MultipleDragAndDrop
  }
})
export default class AddOrder extends WiseVue {
  facilityId: any = '';
  addOrder: any = {};
  orderTypes: Array<any> = ['Regular Order', 'Title Transfer Order', 'Migo Transfer Order', 'DropShip Order', 'Blur Order', 'CrossDock', 'Auto Process Order'];
  itemListTotal: any = null;
  itemListPallets: any = null;
  isCarrierDisabled: boolean = true;
  isCustomerDisabled: boolean = false;
  isItemDisabled: boolean = false;
  isReset: any = {};
  actionShowIndex: any = {};
  copyActionShowIndex: any = [];
  containerSizeData: Array<any> = ["20'", "40'", "40'H", "45'"];
  receiveType: Array<any> = ['Bulk Receiving', 'Regular Receiving'];
  receiptType: Array<any> = ['Regular Receipt', 'Title Transfer Receipt', 'Migo Transfer Receipt', 'Inventory Receipt', 'CrossDock', 'Return', 'RDN', 'Auto Process Receipt', 'Customer Transfer'];
  selectItemListUoms: Array<any> = [];
  isSelectItemListUom: boolean = true;
  islistUomloading: boolean = false;
  addItem: any = {};
  itemLists: Array<any> = [];
  isAddItemPopup: boolean =  false;
  popupTlitle: string =  '';
  isEdit: boolean = false;
  isSubmit: boolean = false;
  isAttachment: boolean = false;
  editIndex: any = '';

  mounted() {
    this.addOrder.isCategory = true;
    this.addOrder.isLoading = true;
     this.addOrder.carrier = true;
    forEach(this.itemLists, list => this.$set(this.actionShowIndex, (list.itemSpecId + list.qty + list.unitId + 'new'), false));
    this.copyActionShowIndex = clone(this.actionShowIndex);
    document.addEventListener('click', (e: any) => this.actionShowIndex = clone(this.copyActionShowIndex));

  }

  controlActionShow(...item: Array<any>) {
    this.actionShowIndex = clone(this.copyActionShowIndex);
    this.actionShowIndex[item.join('')] = true;
  }

  onSelectCustomer(customer: any) {
    this.isCarrierDisabled = false;
    this.isReset['customer'] = false;
    this.$set(this.isReset, 'carrier', true);
    this.$delete( this.addOrder, "carrierId");
  }

  onSelectCarrier(customer: any) {
    this.isReset['carrier'] = false;
  }

  onSelectFacility(facility: any) {
    this.$delete( this.addOrder, "customerId");
    this.$delete( this.addOrder, "carrierId");
    this.$delete(this.addItem, "itemSpecId");
    this.$set(this.isReset, 'customer', true);
    this.$set(this.isReset, 'item', true);
  }

  unitChoose(unit: any) {
    this.$set(this.addItem, 'unit', unit);
  }

  onSelectItem(item: any) {
    this.isReset['item'] = false;
    this.isSelectItemListUom = true;
    this.islistUomloading = true;
    this.selectItemListUoms = [];
     this.addOrder.listUom = '';
    this.$set(this.addItem, 'ItemName', (item.name + item.desc));
    this.$set(this.addItem, 'desc', item.desc);
    itemService.searchItemUnit({itemSpecId: item.id}).subscribe(
      res => {
        this.selectItemListUoms = res.units;
        this.isSelectItemListUom = false;
        this.islistUomloading = false;
      }
    );
  }

  onSubmitItem(scope: any) {
    this.$validator.validateAll(scope).then(
      res => {
        if (res) {
          if (find(this.itemLists, {
              itemSpecId: this.addItem.itemSpecId,
              unitId: this.addItem.unitId,
              qty: this.addItem.qty,
              state: this.addItem.state
            })) {
            this.error('The itemList already exists !');
            return;
          }
          this.$set(this.addItem, 'state', 'new');
          if (this.addItem.expirationDate) this.addItem.expirationDate = this.addItem.expirationDate + 'T00:00:00';
          if (this.isEdit) this.itemLists.splice(this.editIndex, 1, this.addItem);
          else  this.itemLists.push(this.addItem);
          this._sumItemList();
          forEach(this.itemLists, list => this.$set(this.actionShowIndex, (list.itemSpecId + list.qty + list.unitId + list.state), false));
          this.isAddItemPopup = false;
        }
      }
    );
  }

  editItemList(item: any, index: any) {
    this.popupTlitle = 'Edit Item List';
    if (item) this.addItem = cloneDeep(item);
    this.isAddItemPopup = true;
    this.isEdit = true;
    this.editIndex = index;
    this._recoverActionShow();
  }

  removeItemList(item: any, index: any) {
    this._recoverActionShow();
    this.popups({
      title: 'Delete Confirm ',
      content: 'Would you like to remove this order plan',
      cancel: 'No',
      confirm: 'Yes'
    }).then(
      (res: any) => {
        this.itemLists.splice(index, 1);
        this._sumItemList();
      }
    );
  }

  duplicateItemList(item: any) {
    let findObj: any = {
      itemSpecId: item.itemSpecId,
      qty: item.qty,
      lotNo: item.lotNo,
      palletQty: item.palletQty,
      state: 'duplicate'
    };
    let duplicateItem: any = find(this.itemLists, findObj);
    if (duplicateItem) {
      this.error('The itemList already exists !');
      return;
    }
    let prItem = cloneDeep(item);
    this.$set(prItem, 'state', 'duplicate');
    this.itemLists.push(prItem);
    this._recoverActionShow();
    this._sumItemList();
  }

  onSubmit(scope: any) {
    this.$validator.validateAll(scope).then(
      res => {
        if (res) {
          let addReceipt = cloneDeep( this.addOrder);
          addReceipt.itemLines = cloneDeep(this.itemLists);
          forEach(addReceipt.itemLines, itemList => {
            this.$delete(itemList, 'state');
          });
          receiptService.createdReceipt(addReceipt).subscribe(
            res => {
               this.addOrder = {};
              this.itemLists = [];
              this.itemListTotal = null;
              this.itemListPallets = null;
              this.succeed('succeed');
            },
            erry => {
            }
          );
        }
      }
    );
  }

  addItemList(item: any) {
    this.popupTlitle = 'Add Item List';
    this.isAddItemPopup = true;
    this.isEdit = false;
    this.addItem = {};
  }

  emitCancel() {
    this.isAddItemPopup = false;
  }

  private _recoverActionShow() {
    this.actionShowIndex = clone(this.copyActionShowIndex);
  }


  private _sumItemList() {
    this.itemListTotal = util.sum(this.itemLists, 'qty');
    this.itemListPallets = util.sum(this.itemLists, 'palletQty');
  }


  onAttachment() {
    this.isAttachment = !this.isAttachment;
  }

}
