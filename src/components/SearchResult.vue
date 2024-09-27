<template>
  <div v-if="publishedArticles.length">
    <!-- Loop each article -->
    <h4>Showing results for "<span class="search-keywords">{{searchTitle}}</span>"</h4>
    <div class="article-div box-format" v-for="article in publishedArticles" :key="article.id">
      <div class="left-content">
        <div class="fa-solid fa-2x fa-format" :class="`fa-${article.icon}`" ></div>
        <div class="article-info">
          <div><h6>{{ article.title }}</h6></div>
          <div>{{ article.content }}</div>
        </div>
      </div>
      <div class="right-content">
        <i class="fa-solid fa-chevron-right fa-1x fa-format"></i>
      </div>
    </div>
  </div>
  <div v-else class="d-flex justify-content-center align-items-center">
    <div class="no-content-msg">
      <div class="fa-solid fa-9x fa-search"></div>
      <div>No search results</div>
      <div>Please, try again or Submit a ticket</div>
    </div>
  </div>

</template>

<script>

import axios from "axios";

export default {
  props: ["searchTitle"],
  data(){
    return {
      articles: []
    }
  },
  mounted() {
    this.fetcharticlesInformationAPI();
  },
  methods: {
    async fetcharticlesInformationAPI(){
      const getCategoryInformationUrl = "http://localhost:9000/api/search/" + this.searchTitle;
      console.log('fetcharticlesInformationAPI: ' + getCategoryInformationUrl);
      await axios.get(getCategoryInformationUrl)
          .then(response => {
            this.articles = response.data

          }).catch(error => {
            console.log("[SearchResult.vue] fetcharticlesInformationAPI error: " + error);
          })
    },
  },
  computed: {
    // Filter articles, which article.status == 'published' and articles.title.includes("...")
    publishedArticles() {
      return this.articles
          .filter(a => a.status === 'published' && a.title.toLowerCase().includes(this.searchTitle.toLowerCase()))
          .map(a => {
            // Truncate content if longer than 15 characters
            const truncatedContent = a.content.length > 15 ? a.content.slice(0, 40) + "..." : a.content;

            // Return a new object with the truncated content
            return {
              ...a, // Spread the original article properties
              content: truncatedContent // Replace the content with the truncated content
            };
          });
    },
  }

}

</script>
<style scoped lang="scss">
.search-keywords{
  color: #21ae59;
}
</style>