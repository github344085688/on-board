
import BaseService from "./_base-service";

class Service extends BaseService {
    searchCarrierByCustomer(params: any) {
      let param = params;
      param.scenario = "Auto Complete";
      param.relationship = "Carrier";
      param.scenario = "Auto Complete";
      param.searchScenario = "Auto Complete";
        return this.resource$.post<any>("/bam/carrier/search-around-customerId", params);
    }

    getCarrier(carrierId: string) {
      return this.resource$.get<any>(`/fd-app/carrier/${carrierId}`);
    }
}

let service = new Service();
export default service;

