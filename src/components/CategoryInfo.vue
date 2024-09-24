<template>
  <div class="categories-container" :class="displayDetail? '' : 'box-format'" @click="displayDetail? '': navigateToCategory(category.id)">

    <!-- Category's Article Numbers Icon (Top-right) -->
    <div v-if="displayDetail" class="top-right-btn" >
      <span :class="['fa-regular', `fa-1x`, `fa-file-lines`, 'fa-format']"></span>
      <span class="category-updates">{{category.totalArticle}}</span>
    </div>

    <!-- Category's Icon -->
    <div class="fa-format fa-format-height fa-shadow">
      <div class="fa-solid fa-3x" :class="`fa-${category.icon}`"></div>
    </div>

    <!-- Category Title -->
    <div :class="displayDetail ? '' : 'category-title'">
      <h6 :class="displayDetail ? 'h6-remove-margin': ''">{{ category.title }}</h6>
    </div>

    <!-- Category Total Articles -->
    <div v-if="!displayDetail" class="category-articles" >{{ category.totalArticle }} articles</div>

    <!--Category Updated On -->
    <div class="updated-date-format">{{ formattedDateTime(category.updatedOn)}}</div>

    <!-- Border Line -->
    <div v-if="displayDetail" class="border-line-remove-padding"></div>

    <!-- Category's Description -->
    <div v-if="displayDetail">
      <div class="fa-format">
        <div class="fa-solid fa-1x fa-circle-info"></div>
      </div>
      <div class="category-desc">
        {{ category.description }} articles
      </div>
    </div>

  </div>
</template>

<script>
import { formattedDateTime } from '../utils/dateUtils';
export default {
  props: ["category", "displayDetail"],
  data() {
    return {
    }
  },
  methods: {
    formattedDateTime,
    navigateToCategory(){
      this.$router.push({
        name: 'category',
        params: { categoryId: this.category.id, categoryTitle: this.category.title }
      });
    }
  }
}
</script>

<style scoped lang="scss">
.h6-remove-margin{
  margin-bottom: 0;
}
.border-line-remove-padding{
  border-bottom: 1px solid lightgray;
  margin: 20px -30px 20px -30px;
}
.category-title{
  height: 40px;
}
.category-articles{
  color: #21ae59;
  font-size: 14px;
}
.category-desc{
  color: grey;
  font-size: 14px;
}
</style>