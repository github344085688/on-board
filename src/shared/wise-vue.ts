import { Vue } from "vue-property-decorator";
import { Subscription } from "rxjs/Subscription";
import { map, keyBy } from "lodash-es";
import session from './session';

export default class WiseVue extends Vue {

  unsubcribers: Subscription[] = [];

  getFacilityByUserSelect() {
    let facility = session.getFacilityByUserSelect();
    if (!facility) {
      facility = this.getAssignedCompanyFacilities()[0];
    }
    return facility;
  }

  getAssignedCompanyFacilities() {
    let assignedCompanyFacilities = session.getAssignedCompanyFacilities();
    let facilities = map(assignedCompanyFacilities, "facility");
    return facilities;
  }

  routerSetUserCompletionSteps(step: any, isSesson: boolean = false) {
    if (isSesson) {
      session.setUserCompletionSteps(step);
      return;
    }
    if (session.getUserCompletionSteps() < step) session.setUserCompletionSteps(step);
  }

}
