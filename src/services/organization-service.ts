import BaseService from "./_base-service";

class OrganizationService extends BaseService {
      get(organizationId: string) {
        return this.resource$.get<any>(`/shared/fd-app/organization/${organizationId}`);
      }

      search(params: any) {
        return this.resource$.post<any>("/shared/fd-app/organization/search", params);
      }

      searchAroundCustomerId(params: any) {
        params.scenario = "Auto Complete";
        params.searchScenario = "Auto Complete";
        params.relationship = "Customer";
        return this.resource$.post<any>("/bam/organization/search-around-customerId", params);
      }


}

export default new OrganizationService();

