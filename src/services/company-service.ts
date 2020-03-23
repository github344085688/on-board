import BaseService from "./_base-service";


class CompanyService extends BaseService {


    get(companyId: string) {
        return this.resource$.get<any>(`/shared/fd-app/company/${companyId}`);
    }
    search(params: any) {
        return this.resource$.post<any>(`/shared/fd-app/facility/search`, params);
    }
}

export default new CompanyService();
