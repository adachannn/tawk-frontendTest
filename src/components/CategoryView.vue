<template>
  <div class="container">
    <div class="row d-flex">

      <!-- Category's Information (Upper-Left)-->
      <div class="col-12 col-md-4 d-flex flex-column">
        <CategoryInfo :category="currentCategory" :displayDetail="true"></CategoryInfo>
      </div>

      <!-- Category's Articles (Upper-Right)-->
      <div class="col-12 col-md-8 d-flex flex-column">
        <ArticlesList :categoryId="categoryId"></ArticlesList>
      </div>
    </div>

    <!-- Full-width horizontal line -->
    <div class="row">
      <div class="col-12">
        <div class="full-width-border-line"></div>
      </div>
    </div>

    <!-- Display Scrollable Preview for Other-Categories (Down section)-->
    <div class="row">
      <ScrollablePreview :categoryId="categoryId"></ScrollablePreview>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CategoryInfo from "./CategoryInfo.vue";
import ScrollablePreview from "./ScrollablePreview.vue";
import ArticlesList from "./ArticlesList.vue";

export default {
  props: ["categoryId", "categoryTitle"],
  data() {
    return {
      currentCategory: {}
    }
  },
  components: {
    CategoryInfo,
    ScrollablePreview,
    ArticlesList
  },
  watch: {
    categoryId: {
      handler(newVal) {
        this.fetchAllCategoriesAPI();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // Method: Get all categories by API
    async fetchAllCategoriesAPI() {
      const getAllCategoriesUrl = "http://localhost:9000/api/categories"
      await axios.get(getAllCategoriesUrl)
          .then(response => {
            this.categories = response.data;
            this.currentCategory = this.categories.find(category => category.id === this.categoryId);
          })
          .catch(error => {
            console.log("[CategoryView.vue] fetchAllCategoriesAPI error: " + error);
          });
    },
  }
}

</script>

<style scoped lang="scss">

.full-width-border-line {
  width: 100vw; /* Force the line to take full viewport width */
  position: relative; /* Remain in flow but still expand */
  left: 49%; /* Position it centered */
  transform: translateX(-55%); /* Adjust position to center */
  border-bottom: 1px solid lightgray;
  margin: 40px;
}
</style>