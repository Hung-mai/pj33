<template>
  <router-view
    :user="user"
    :hospitalList="hospitalList"
    :roleList="roleList"
  ></router-view>
</template>

<script>
export default {
  name: "TheContent",
  props: ["hospitalList", "roleList", "user"]
};
</script>