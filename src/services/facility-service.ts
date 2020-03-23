
import BaseService from "./_base-service";

class Service extends BaseService {

  get(facilityId: string) {
    return this.resource$.get<any>(`/shared/fd-app/facility/${facilityId}`);
  }
  search(params: any) {
    return this.resource$.post<any>(`/shared/fd-app/facility/search`, params);
  }
}

let service = new Service();
export default service;
