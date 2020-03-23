import session from './session';
import facilityService from "../services/facility-service";
import { map, keyBy, forEach } from 'lodash-es';
import WiseVue from "../shared/wise-vue";
export class Auth extends WiseVue {
    isSignIn() {
        return session.getUserId();
    }

  async setUserCompletion(params: any, form: any, to: any) {
    session.setUserCompletionSteps(Number(params.step));
    if (params.orgId) session.setOrgId(params.orgId);
  }

  async initialRequiredUserInfo(userLoginedResult: any) {
    session.setUserToken(userLoginedResult.oAuthToken);
    session.setUserId(userLoginedResult.idmUserId);
    session.setUserPermission(map(userLoginedResult.userPermissions, 'name'));
    session.setAssignedCompanyFacilities(userLoginedResult.userView.assignedCompanyFacilities);
    session.setCurrentCompanyFacility(userLoginedResult.userView.defaultCompanyFacility);
    await this.assignedCompanyFacilities();
  }

   private  assignedCompanyFacilities() {
    return new Promise((resolve, reject) => {
      let sessioncompanyFacility = session.getCurrentCompanyFacility();
      facilityService.search({ids: map(session.getAssignedCompanyFacilities(), 'facilityId')}).subscribe(
        (res: any) => {
          session.setFacilityByUserSelect(res);
          let keyBycompanyFacilitys = keyBy(res, 'id');
          sessioncompanyFacility.Facility = keyBycompanyFacilitys[sessioncompanyFacility.facilityId];
          session.setCurrentCompanyFacility(sessioncompanyFacility);
          resolve(res);
        },
        err => {
          reject(err);
        },
      );
    });

    }

}

export default new Auth();
