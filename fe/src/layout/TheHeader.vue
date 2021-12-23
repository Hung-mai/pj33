<template>
  <div class="x-row x-header">
    <div class="x-col x-col-9">
      <div class="x-row app-title align-items-center">
        Hospital Mangement System
      </div>
    </div>

    <div class="x-col x-col-3">
      <div class="x-row name align-items-center">{{user.staffName}}</div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  props: ['user']
};
</script>