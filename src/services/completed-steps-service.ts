
class SideBarService  {
  warehousing() {
    return  [
      {
        "title": "Onboarding Wizard",
        "imgSrc": "static/img/inventory.svg",
        "url": "",
        "state": "OnboardingWizard",
        "display": "block",
         "subMenus": [
          {
            "title": "Progress Board",
            "routerName": "ProgressBoard",
            "display": "none",
            "path": 'inventory/progressBoard',
          },
           {
             "title": "Create Account",
             "routerName": "CreateAccount",
             "display": "none",
             "path": 'create/CreateAccount',
           }
        ]
      }
    ];
  }

}

let sideBarService = new SideBarService();
export default sideBarService;
