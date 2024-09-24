<template>
  <div class="container">
    <ol class="breadcrumb">
      <li v-for="(breadcrumb, index) in breadcrumbList" :key="index" class="breadcrumb-item">
        <router-link v-if="breadcrumb.link" :to="breadcrumb.link" class="previous-breadcrumb-items">{{ breadcrumb.text }}</router-link>
        <span v-else>{{breadcrumb.text}}</span>
      </li>
    </ol>
  </div>
</template>


<script>
export default {
  data(){
    return {
      breadcrumbList: []
    }
  },
  watch: {
    $route: {
      handler(newVal) {
        this.updateList();
      },
      immediate: true,
      deep: true
    }
  },
  methods:{
    // Method: Retrieve breadcrumb according to page
    updateList(){
      this.breadcrumbList = this.$route.meta.breadcrumb
    }
  }
};
</script>

<style scoped lang="scss">
.breadcrumb {
  margin-bottom: 1rem;
  list-style: none;
  color: grey;
  font-size: 14px;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: ">";
}
.previous-breadcrumb-items{
  color: #21ae59;
  text-decoration: none;
}
</style>