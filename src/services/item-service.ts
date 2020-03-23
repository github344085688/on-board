
import BaseService from "./_base-service";

class Service extends BaseService {
    search(params: any) {
      let param = params;
      param.scenario = "Auto Complete";
        return this.resource$.post<any>("/bam/item-spec/basic-search", params);
    }

    getItemSpec(itemSpecId: string) {
      return this.resource$.get<any>(`/bam/item-spec/${itemSpecId}`);
    }

    searchItemUnit(params: any) {
      return this.resource$.post<any>(`/bam/item-unit/search`, params);
    }

    itemImportMappingSearch(params: any) {
      return this.resource$.post<any>(`/shared/fd-app/item-import/mapping/search`, params);
    }
}

let service = new Service();
export default service;

