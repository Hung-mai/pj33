<template>
  <div class="m-row m-header">
    <div class="m-col m-col-9">
      <div class="m-row app-title align-items-center">
        Hospital Mangement System
      </div>
    </div>

    <div class="m-col m-col-3">
      <div class="m-row name align-items-center">{{user.staffName}}</div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  props: ['user']
};
</script>