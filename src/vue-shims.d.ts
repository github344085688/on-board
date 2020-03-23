declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}


declare const API_CONTEXT_PATH: string;
declare const STATIC_CONTENT_CONTEXT_PATH: string;
declare const TMS_DOMAIN: string;
declare const isPermissionDisabled: boolean;



declare module 'vuejs-datepicker' {
  const datepicker: any;
  export default datepicker;
}

declare module 'vue-airbnb-style-datepicker' {
  const AirbnbStyleDatepicker: any;
  export default AirbnbStyleDatepicker;
}
declare module 'v-tooltip' {
  const vtooltip: any;
  export default vtooltip;
}

declare module 'moment' {
  const moment: any;
  export default moment;
}

