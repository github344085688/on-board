import { Component } from "vue-property-decorator";
import WiseVue from "../../shared/wise-vue";
import tlp from "./login.vue";
import userService from "../../services/user-service";
import { Subject } from "rxjs/Subject";
import BaselineInput from "../../components/inputs/baseline-input/baseline-input";
import auth from "../../shared/auth";

@Component({
  mixins: [tlp],
  components: {
    BaselineInput
  }
})
export default class Login extends WiseVue {

  userForm = {isSubmitting: false};
  user = {username: "", password: ""};
  signInSub: Subject<void> = new Subject();

  mounted() {
    this.signInSub.subscribe(
      this.signIn,
      err => this.error(err)
    );
  }

  signIn() {
    this.$validator.validateAll().then(
      res => {
        if (res) {
          this.userForm.isSubmitting = true;
          this.userForm.isSubmitting = true;
          this.unsubcribers.push(userService.login(this.user).subscribe(
            (res: any) => {
              auth.initialRequiredUserInfo(res).then(
                res => this.$router.replace({name: 'AddReceipt'}),
                error => this.error(error)
              );
            },
            err => {
              this.error(err);
              this.userForm.isSubmitting = false;
            }
          ));
        }

      }
    );
  }
}
