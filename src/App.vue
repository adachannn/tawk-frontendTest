<template>
	<div class="container-wrapper">
		<tawk-header></tawk-header>

    <!-- Search Input Bar -->
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-12 col-md-7">
          <div class="search-container d-flex">
            <input class="search-input flex-grow-1" type="text" v-model="search" placeholder="Search for answers" @keyup.enter="searchResult">
            <div class="green-box search-icon" @click="searchResult">
              <div class="fa-solid fa-1x fa-search"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dynamic box content (Gray Section) -->
    <div class="dynamic-box">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-12 col-md-10">
            <!-- Display Navigation Bar-->
            <Breadcrumb />
            <!-- Display Content-->
            <router-view />
          </div>
        </div>
      </div>
    </div>

	</div>
</template>

<script>
import Header from './components/Header.vue'
import Breadcrumb from "./components/Breadcrumb/Breadcrumb.vue";
import SpecificCategory from "./components/CategoryView.vue";

export default {
	components:{
    Breadcrumb,
		'tawk-header': Header
	},
  data() {
    return {
      search: null,
    };
  },
  methods: {
    searchResult() {
      // this.$router.push({name: 'search', params: {'searchTitle': this.search}});
      if (this.$route.name === 'search') {
        this.$router.push({ name: 'dummy' }); // Navigate to a dummy route first
      }
      this.$router.push({
        name: 'search',
        params: { 'searchTitle': this.search }
      });
      this.search = ''
    }
  }
}
</script>

<style lang="scss">
	@import 'scss/main.scss';
  .container-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .dynamic-box{
    background-color: #f1f1f1;
    padding: 70px 0;
    flex-grow: 1; /* This makes it take up the remaining space */
  }

  /* Search Bar */
  .search-container {
    margin-bottom: 30px;
  }
  .search-input {
    padding: 15px 30px;
    border: 1px solid #e4e4e4;
    color: gray;
    outline: 0;
  }
  .search-icon {
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
</style>