<script setup>
import ocLogo from "/oc-logo-white.png";

const logoURL = ocLogo;
const title = "Course Listing";
</script>

<template>
  <div id="app">
    <nav class="navbar shadow">
      <ul class="nav-links">
        <div class="title">
          <li>
            <router-link :to="{ name: 'list' }">
              <img :src="logoURL" contain />
            </router-link>
          </li>
          <li>
            <a>{{ title }}</a>
          </li>
        </div>
      </ul>
      <ul class="nav-links">
        <div class="menu">
          <li>
            <router-link :to="{ name: 'list' }"
            ><a>LIST</a></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'add' }"
              ><a>ADD COURSE</a></router-link
            >
          </li>
        </div>
      </ul>
    </nav>
    <router-view />
  </div>
</template>
