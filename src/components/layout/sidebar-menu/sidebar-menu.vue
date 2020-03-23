<template>
  <div class="unis-aside ">
    <ul>
      <li v-for="menuData in privateMenuData" :key="menuData.id">
        <input type="radio" name="nav" :checked="menuData.display==='block' ? true : false ">
        <i class="bors unis-icon"></i>
        <div class="moudeIcom" v-html="menuData.icon"></div>
         {{menuData.title}}
        <i class="unis-arrow right unis-icon"></i>
        <ul>
          <li v-for="childMenuData in menuData.subMenus" :key="childMenuData.id">
            <div class="a" @click.stop.prevent="routeGoTo(childMenuData.routerName)">
              <i :class="childMenuData.icon"></i>{{childMenuData.title}}</div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" src="./sidebar-menu.scss"/>
