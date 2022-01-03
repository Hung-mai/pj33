<template>
  <router-view
    :user="user"
    :hospitalList="hospitalList"
    :roleList="roleList"
  ></router-view>
</template>

<script>
import {store} from '../script/store'

export default {
  name: "TheContent",
  props: ["hospitalList", "roleList"],
  data() {
    return {
      user: store.state.user
    }
  }
};
</script>