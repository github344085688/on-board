class SideBarService {
  warehousing() {
    return [
      {
        "title": "Inbound",
        "icon": ` <i class="unis-r-inbound unis-icon"><span class="path1 white"></span><span class="path2 blue"></span></i>`,
        "state": "InboundReceipt",
        "display": "block",
        "subMenus": [
          {
            "title": "Receipt Entry",
            "icon": 'unis-plus unis-icon',
            "routerName": "AddReceipt",
            "display": "block",
            "path": 'inventory/AddReceipt',
          }
        ]
      },
      {
        "title": "Outbound",
        "icon": `<i class="unis-l-inbound unis-icon"></i>`,
        "url": "",
        "state": "OutboundOrder",
        "display": "none",
        "subMenus": [
          {
            "title": "Order Entry",
            "icon": 'unis-plus unis-icon',
            "routerName": "AddOrder",
            "display": "none",
            "path": 'outbound/AddOrde',
          }
        ]
      },
    ];
  }

}

let sideBarService = new SideBarService();
export default sideBarService;
