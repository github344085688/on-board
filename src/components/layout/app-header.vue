<template>
  <header class="obd-header">
    <div class="unis-header">
      <div class="nav">
        <i class="unis-apps"></i>Apps
        <i class="unis-arrow"></i>
        <div class="drop-box">
          <ul>
            <!--<li>-->
              <!--<a href="https://stage.logisticsteam.com/" target="_blank"><i class="unis-transportation"></i>Transportation</a>-->
            <!--</li>-->
            <!--<li>-->
              <!--<a href="https://stage.logisticsteam.com/" target="_blank"><i class="unis-warehouse"></i>Warehouse</a>-->
            <!--</li>-->
            <!--<li>-->
              <!--<button>-->
                <!--<i class="unis-field-service"></i>Field Service-->
              <!--</button>-->
            <!--</li>-->
            <!--<li>-->
              <!--<button>-->
                <!--<i class="unis-returns"></i>Returns-->
              <!--</button>-->
            <!--</li>-->
          </ul>
        </div>
      </div>
      <div class="nav not">
        <i class="unis-tool"></i>Tools
        <i class="unis-arrow"></i>
        <div class="drop-box">
          <ul>
            <li>Sorry! This feature is not available yet.</li>
          </ul>
        </div>
      </div>
      <div class="nav not">
        <i class="unis-analytics"></i>Analytics
        <i class="unis-arrow"></i>
        <div class="drop-box left">
          <ul>
            <li>Sorry! This feature is not available yet.</li>
          </ul>
        </div>
      </div>
      <div class="user accents-bg">{{userName}}
        <div class="drop-box">
          <ul>
            <li>
              <button  @click.stop.prevent="loginOut">Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
<style lang="scss" src="./app-header.scss"/>
