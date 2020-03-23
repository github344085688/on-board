<template id="login-form">
  <div class="d-flex flex-wrap" id="top_container">
    <div class="col-6 ">
      <div class="d-flex ">
        <div class="col-7 ml-auto mag-140">
          <div >
            <label class="first-title">Login to On Board</label>
          </div>
          <div>
            <label class="input-label" for="email_input">EMAIL OR USERNAME</label>
            <input class="input-class" type="text" id="email_input" name="userName" v-model='user.username'
                   v-validate="'required'" :class="{'is-danger': errors.has('userName')}">
            <pre v-if="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</pre>
          </div>
          <div>
            <label class="input-label" for="password_input">PASSWORD</label>
            <input class="input-class input" type="password" id="password_input" name="passWord" v-model='user.password'
                   v-validate="'required'" :class="{ 'is-danger': errors.has('passWord')}">
            <pre v-if="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</pre>
          </div>
          <div class="d-flex mag-30">
            <div class="align-self-center">
              <a @click.stop.prevent="showModal" class="checkbox a-forgot-password ">Forgot Password</a>
            </div>
              <button class=" ml-auto col-4 align-self-center unis-btn unis-btn-primary unis-lag"  style="background:#f7b020; " v-rx-event:click="signInSub">LOGIN</button>

          </div>
          <div>
            <div v-show="userForm.isSubmitting">
              <transition name="fade">
                <p>Logging you in...hang tight!</p>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>
<style lang="scss" src="./login.scss"/>
