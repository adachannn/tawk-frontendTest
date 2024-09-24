<template>
  <div :class="displayPreview ? '': 'container'">
    <div :class="displayPreview ? 'preview-row': 'row'">
      <div :class="displayPreview ? '' : 'col-12 col-md-4 justify-content-center align-items-center'" v-for="category in formattedCategories" :key="category.id">
        <CategoryInfo :category="category"></CategoryInfo>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CategoryInfo from "./CategoryInfo.vue";

export default {
  props: ['displayPreview', 'removeCategoryId'],
  name: 'categories',
  components: {
    CategoryInfo
  },
  data(){
    return {
      categories: []
    };
  },
  watch: {
    removeCategoryId: {
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
          })
          .catch(error => {
            console.log("[CategoriesList.vue] fetchAllCategoriesAPI error: " + error);
          });
    },
  },
  computed: {
    //Filter 'enabled' category && filter out 'removeCategoryId', and return the sorted categories by 'order'
    formattedCategories() {
      return this.categories
          .filter(o => o.enabled && (this.removeCategoryId === null || o.id !== this.removeCategoryId)) // filter enabled and exclude current category
          .slice()
          .sort((a, b) => a.order - b.order); // sort by 'order'
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-row{
  display: grid;
  gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: minmax(350px, 1fr);
}
</style>