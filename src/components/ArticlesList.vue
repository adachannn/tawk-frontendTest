<template>
  <div class="flex-grow-1" :class="publishedArticles.length ? '': 'd-flex justify-content-center align-items-center'" >
    <div v-if="publishedArticles.length">
      <div class="articles-container" ref="articlesContainer">

        <!-- Loop each article -->
        <div class="article-div box-format" v-for="article in publishedArticles" :key="article.id">
          <div class="left-content">
            <div class="fa-solid fa-2x fa-format" :class="`fa-${article.icon}`" ></div>
            <div class="article-info">
              <div><h6>{{ article.title }}</h6></div>
              <div class="updated-date-format">{{ formattedDateTime(article.updatedOn)}}</div>
            </div>
          </div>
          <div class="right-content">
            <i class="fa-solid fa-chevron-right fa-1x fa-format"></i>
          </div>
        </div>

      </div>
    </div>

    <div v-else>
      <div class="no-content-msg">No related articles found.</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { formattedDateTime } from '../utils/dateUtils';

export default {
  props: ["categoryId"],
  data() {
    return {
      articles: []
    }
  },
  watch: {
    categoryId: {
      handler(newVal) {
        console.log('[ArticlesList.vue] categoryId updated, fetching new articles from fetchCategoryInformationAPI...');
        this.fetchCategoryInformationAPI();
        this.scrollArticlesListToTop();
      },
      immediate: true, // Ensures the watcher triggers on component mount as well
      deep: true // If categoryInfo is an object, this will detect changes to its nested properties
    }
  },
  methods: {
    formattedDateTime,
    // Method: Get Specific Category Information by API via CategoryId
    async fetchCategoryInformationAPI(){
      const getCategoryInformationUrl = "http://localhost:9000/api/category/" + this.categoryId;
      await axios.get(getCategoryInformationUrl)
          .then(response => {
            this.articles = response.data

          }).catch(error => {
            console.log("[ArticlesList.vue] fetchCategoryInformationAPI error: " + error);
          })
    },
    // Method: Scroll the Articles-List to Top(overflow-y)
    scrollArticlesListToTop(){
      if (this.$refs.articlesContainer){
        this.$refs.articlesContainer.scrollTop = 0;
      }
    },

  },
  computed: {
    // Filter articles, which article.status == 'published'
    publishedArticles() {
      return this.articles.filter(a => a.status === 'published');
    }
  }
}
</script>

<style scoped lang="scss">
h6{
  margin-bottom: 0;
}
.articles-container{
  overflow-y: auto;
  overflow-x: hidden;
  height: auto; /* Dynamic height based on the content */
  max-height: 500px;
}
.article-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 25px;
  margin: 0 auto 10px auto;
  cursor: pointer;
  border: solid 1px #e4e4e4;
  border-radius: 5px;
  background-color: white;
  min-height: 90px;
}
.left-content {
  display: flex;
  align-items: center;
}
.article-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
}
</style>