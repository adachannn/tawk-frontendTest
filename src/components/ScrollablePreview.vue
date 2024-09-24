<template>
  <div class="container">
    <div class="section-title"><h4>Other categories</h4></div>
    <div class="slider-wrapper">
      <!--Left Button-->
      <div id="prev-slide" class="slide-button" @click="clickImageSliderBtn($event)">
        <i class="fa-solid fa-chevron-left fa-1x"></i>
      </div>

      <!--Categories List-->
      <div class="image-list" @scroll="scrollImageList">
        <CategoriesList :displayPreview="true" :removeCategoryId="categoryId"></CategoriesList>
      </div>

      <!--Right Button-->
      <div id="next-slide" class="slide-button" @click="clickImageSliderBtn($event)">
        <i class="fa-solid fa-chevron-right fa-1x"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CategoriesList from "./CategoriesList.vue";
import CategoryInfo from "./CategoryInfo.vue";
export default{
  components: {
    CategoryInfo,
    CategoriesList
  },
  props: ["categoryId"],
  data() {
    return {
    }
  },
  updated() {
    this.handleSlideButton();
  },
  watch: {
    categoryId: {
      handler(newVal) {
        this.handleSlideButton();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // Method: Handle Image-list
    clickImageSliderBtn(event) {
      const imageList = document.querySelector(".slider-wrapper .image-list");
      const btnDirection = event.target.id
      const direction = btnDirection === 'prev-slide' ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({left: scrollAmount, behavior: "smooth"});
    },
    // Method: Handle Left/Right Button Display
    handleSlideButton() {
      const imageList = document.querySelector(".slider-wrapper .image-list");
      const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
      if (imageList && slideButtons.length) {
        const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
      }
    },
    scrollImageList() {
      this.handleSlideButton();
    },
  },
}
</script>

<style lang="scss">
.container {
  max-width: 1200px;
  width: 95%;
  margin-top: 0;
  margin-left: 15px;
  margin-right: 15px;
}

.slider-wrapper {
  position: relative;
}

.slider-wrapper .slide-button {
  position: absolute;
  top: 50%;
  height: 40px;
  width: 40px;
  background: grey;
  color: white;
  opacity: 1;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  transform: translateY(-70%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-wrapper .slide-button:hover {
  background: grey;
  color: white;
  height: 42px;
  width: 42px;
}

.slider-wrapper .slide-button#prev-slide {
  display: none; /* Initially, the button is not shown */
  left: -60px;
  z-index: 2;
  @media (max-width: 600px) {
    left: 0;
  }
  @media (min-width: 601px) and (max-width: 767px) {
    left: calc(-60px + (600px - 80vw) / 2);
  }
}

.slider-wrapper .slide-button#next-slide {
  right: -60px;
  z-index: 2;
  @media (max-width: 600px) {
    right: 0;
  }
  @media (min-width: 601px) and (max-width: 767px) {
    right: calc(-60px + (600px - 80vw) / 2);
  }
}

.slider-wrapper .slide-button i{
  pointer-events: none;
}

.slider-wrapper .image-list {
  display: grid;
  gap: 20px;
  grid-auto-flow: column; /* Make the grid flow horizontally */
  grid-auto-columns: minmax(350px, 1fr); /* Set the width of each column */
  overflow-x: auto;
  scrollbar-width: none;
  margin-top: 20px;
  margin-bottom: 20px;
}

.slider-wrapper .image-list::-webkit-scrollbar {
  display: none;
}

</style>
