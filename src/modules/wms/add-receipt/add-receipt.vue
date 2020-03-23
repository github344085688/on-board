<template>
  <section class="add-receipt">
    <form @submit.stop.prevent="onSubmit('form-1')" data-vv-scope="form-1">
      <article>
        <div class="d-flex">
          <div><h2>Inbound Receipt Entry</h2></div>
          <div class="ml-auto p-2 mr-5 col-1">
          </div>
        </div>
        <div class="d-flex flex-wrap mb-4">
          <div class="col-12 d-flex">
            <button type="button" style="background: #D5E9FA; color: #56A7FD;"
                    class="unis-btn unis-btn-secondary ml-auto"
                    @click.stop.prevent="onAttachment()">Attachment Upload
            </button>
          </div>
          <div class="col-12">
            <multiple-drag-and-drop  :is-show="isAttachment"
              :customerId="addReceipt.customerId"
              v-model="addReceipt.filesIds"
              :facility="facilityId"
              @onUpload="isAttachment=false"
              :accept="'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel'"
            ></multiple-drag-and-drop>
          </div>
        </div>
        <div class="d-flex flex-wrap">
          <div class="col-3 pl-0 mt-4" v-show="facilityId">
            <label>Facility  <span style="color: #ff6040">*</span></label>
            <default-select
              :filter="'name'"
              :tag="'facility'"
              :syncKey="'accessUrl'"
              v-model="facilityId"
              @emitChoose="onSelectFacility"
              :name="'facility'"
              v-validate="'required'"
              :isValidate="errors.has('form-1.facility')"
            ></default-select>
          </div>
          <div class="col-3 pl-0 mt-4">
            <label>Customer  <span style="color: #ff6040">*</span></label>
            <input-select :syncKey="'id'"
                          :filter="'name'"
                          :tag="'customer'"
                          v-model="addReceipt.customerId"
                          @on-select="onSelectCustomer"
                          :disabled="isCustomerDisabled"
                          :name="'customer'"
                          :isReset="isReset['customer']"
                          v-validate="'required'"
                          :isValidate="errors.has('form-1.customer')"
            ></input-select>
          </div>
          <div class="col-3 pl-0 mt-4">
            <label>Carrier  </label>
            <input-select :syncKey="'id'"
                          :filter="'name'"
                          :tag="'carrier'"
                          :allow-clear="true"
                          :customerId="addReceipt.customerId"
                          @on-select="onSelectCarrier"
                          :isReset="isReset['carrier']"
                          v-model="addReceipt.carrierId"
                          :disabled="isCarrierDisabled"
                          :name="'carrier'"
            ></input-select>
          </div>
          <div class="col-3 pl-0 mt-4">
            <label>Purchase Order No.   <span style="color: #ff6040">*</span></label>
            <baseline-input :placeholder="'Full Name'"
                            v-model="addReceipt.purchaseOrderNo"
                            :name="'purchaseOrderNo'"
                            v-validate="'required'"
                            :isValidate="errors.has('form-1.purchaseOrderNo')"
            ></baseline-input>
          </div>
          <div class="col-3 pl-0 mt-4">
            <label>ContainerNo</label>
            <baseline-input :placeholder="'Enter Container No'"
                            v-model="addReceipt.containerNo"
                            :name="'containerNo'"
                            v-validate="'required'"
                            :isValidate="errors.has('form-1.containerNo')"
            ></baseline-input>
          </div>
          <div class="col-3 pl-0 mt-4">
            <label>Reference </label>
            <baseline-input :placeholder="'Full Name'"
                            v-model="addReceipt.reference"
                            :name="'reference'"
            ></baseline-input>
          </div>
          <div class="col-3 pl-0 mt-4">
            <label>Container Size  </label>
            <default-select v-model="addReceipt.containerSize"
                            :selectdatas="containerSizeData"
                            :name="'containerSize'"
            ></default-select>
          </div>
          <div class="col-3 pl-0 mt-4">
            <label>Trailer No. </label>
            <baseline-input :placeholder="'Enter Trailer No'"
                            v-model="addReceipt.trailerNo"
                            :name="'trailerNo'"
            ></baseline-input>
          </div>

          <div class="col-3 pl-0 mt-4">
            <label>Receive Type </label>
            <default-select v-model="addReceipt.receiveType"
                            :selectdatas="receiveType"
                            :name="'receiveType'"
            ></default-select>
          </div>
          <div class="col-3 pl-0 mt-4">
            <label>Seal  </label>
            <baseline-input v-model="addReceipt.sealNo"
                            :placeholder="'Enter Seal'"
                            :name="'sealNo'"
            ></baseline-input>
          </div>
          <div class="col-3 pl-0 mt-4">
            <label></label>
            <label>BOL   </label>
            <baseline-input v-model="addReceipt.bolNo"
                            :placeholder="'Enter Bol'"
                            :name="'bolNo'"
            ></baseline-input>
          </div>
          <div class="col-3 pl-0 mt-4">
            <label>Receipt Type </label>
            <input-select-filter v-model="addReceipt.receiptType"
                                 :selectdatas="receiptType"
                                 :allow-clear="true"
                                 :name="'receiptType'"
            ></input-select-filter>
          </div>
          <div class="col-3 pl-0 mt-4">
            <label>Transload </label>
            <switch-button v-model="addReceipt.transload"
                           :disabled="addReceipt.istransload"
            ></switch-button>
          </div>

          <div class="col-9 pl-0 mt-4">
            <label>Notes </label>
            <baseline-input v-model="addReceipt.notes"
                            :placeholder="'Enter Notes'"
                            :name="'Notes'"
            ></baseline-input>
          </div>
        </div>
        <div class="d-flex mt-5 flex-wrap">
          <div class="col-9"><h4>Item List</h4></div>
        </div>
        <div class="d-flex mt-1 flex-wrap">
          <div class="col-1">
            <h4 class="blue">{{itemListTotal}}</h4>
            Total
          </div>
          <div class="col-1">
            <h4 class="blue">{{itemListPallets}}</h4>
            Pallets
          </div>
        </div>
        <div class="mt-5 mb-5" style="position: relative" >

          <table class="table table-bordered">
            <thead>
            <tr>
              <th class="neutrals" style="width: 25px">#</th>
              <th class="neutrals">Item</th>
              <th class="neutrals">UOM</th>
              <th class="neutrals">Expected Qty</th>
              <th class="neutrals">Lot #</th>
              <th class="neutrals">Pallet Qty</th>
              <th class="neutrals">Expiration Date</th>
              <th class="neutrals">Action</th>
              <th class="neutrals"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for=" (item, index) in itemLists" :key="item.id">
              <th class="neutrals">{{index + 1}} </th>
              <td>{{item.ItemName}}</td>
              <td><span v-if="item.unit"></span>{{item.unit.name}}</td>
              <td>{{item.qty}}</td>
              <td>{{item.lotNo}}</td>
              <td>{{item.palletQty}}</td>
              <td>{{item.expirationDate}}</td>
              <td class="action-td" @click.stop.prevent=controlActionShow(item.itemSpecId,item.qty,item.unitId,item.state)>
                <h3 class="neutrals">...</h3>
                <button class="nav-box" :class="{'dis-blk': actionShowIndex[item.itemSpecId + item.qty + item.unitId + item.state]}">
                  <div @click.stop.prevent="duplicateItemList(item)">Duplicate</div>
                  <div @click.stop.prevent="editItemList(item,index)">Edit</div>
                  <div @click.stop.prevent="removeItemList(item,index)">Remove</div>
                </button>
              </td>
              <td class="neutrals">{{item.state}}</td>

            </tr>

            </tbody>
          </table>
          <button type="button" @click.stop="addItemList()" :disabled="!addReceipt.customerId" class="unis-btn unis-btn-primary unis-ex-sm" style="position: absolute; top: -30px; right: 0">
            Add
          </button>
        </div>
        <div class="mt-5 mb-5b d-flex justify-content-end">
          <button class="unis-btn unis-btn-primary"> Submit  <span class="loading" v-if="isSubmit" style="margin-left: 25px"></span></button>
        </div>
      </article>
    </form>
    <form @submit.stop.prevent="onSubmitItem('form-2')" data-vv-scope="form-2">
      <pop-up-windows v-if = "isAddItemPopup" :tlitle="popupTlitle"  @cancel="emitCancel">
        <div class="d-flex flex-wrap">
          <div class="col-3  mt-4">
            <label>Item  <span style="color: #ff6040">*</span></label>
            <input-select :placeholder="'Full Name'"
                          :syncKey="'id'"
                          :filter="'name'"
                          :tag="'item'"
                          :addToFilter="'desc'"
                          v-model="addItem.itemSpecId"
                          :name="'itemSpecId'"
                          :customerId="addReceipt.customerId"
                          @on-select="onSelectItem"
                          :disabled="isItemDisabled"
                          :isReset="isReset['item']"
                          v-validate="'required'"
                          :isValidate="errors.has('form-2.itemSpecId')"
            ></input-select>
          </div>
          <div class="col-3 mt-4">
            <label>UOM  <span style="color: #ff6040">*</span></label>
            <default-select v-model="addItem.unitId"
                            :selectdatas="selectItemListUoms"
                            :syncKey="'id'"
                            :disabled="isSelectItemListUom"
                            :filter="'name'"
                            :name="'unitId'"
                            :placeholder="'Select'"
                            :loading="islistUomloading"
                            @emitChoose="unitChoose"
                            v-validate="'required'"
                            :isValidate="errors.has('form-2.unitId')"
            ></default-select>
          </div>
          <div class="col-3 mt-4">
            <label>Qty  <span style="color: #ff6040">*</span></label>
            <baseline-input v-model="addItem.qty"
                            :name="'qty'"
                            :type="'number'"
                            :min="'0'"
                            :placeholder="'Enter Qty'"
                            v-validate="'required'"
                            :isValidate="errors.has('form-2.qty')"
            ></baseline-input>
          </div>
          <div class="col-3 mt-4"><label>lotNo  <span style="color: #ff6040">*</span></label>
            <baseline-input v-model="addItem.lotNo"
                            :name="'lotNo'"
                            :placeholder="'EnterLot #'"
            ></baseline-input>
          </div>
          <div class="col-3 mt-4"><label>palletQty  <span style="color: #ff6040">*</span></label>
            <baseline-input v-model="addItem.palletQty"
                            :name="'palletQty'"
                            :type="'number'"
                            :min="'0'"
                            :placeholder="'Enter Qty'"
            ></baseline-input>
          </div>
          <div class="col-3 mt-4">
            <label>Date  <span style="color: #ff6040">*</span></label>
            <date-picker v-model="addItem.expirationDate"
                         :placeholder="'Date'"
                         :name="'expirationDate'"
            >
            </date-picker>
          </div>
          <div class="col-3 mt-4">
            <label>Notes  <span style="color: #ff6040">*</span></label>
            <baseline-input v-model="addItem.notes"
                            :placeholder="'Enter Notes'"
                            :name="'Notes'"
            ></baseline-input>
          </div>
        </div>

      </pop-up-windows>

    </form>

  </section>
</template>
<style lang="scss" src="./add-receipt.scss"/>
