import Vue from 'vue'
import Router from 'vue-router'
import CategoriesList from '../components/CategoriesList.vue';
import CategoryView from "../components/CategoryView.vue";
import SearchResult from "../components/SearchResult.vue";

Vue.use(Router)

const router = new Router({
    mode: 'history', // Enables history mode for cleaner URLs
    routes: [
        {
            path: '/',
            name: 'categories',
            component: CategoriesList,
            // meta: { breadcrumb: 'All categories' },
        },
        {
            path: '/:categoryId',
            name: 'category',
            component: CategoryView,
            props: (route) => ({ categoryId: route.params.categoryId, categoryTitle: route.params.categoryTitle }),
            meta: { breadcrumb: null },
        },
        {
            path: '/search',
            name: 'search',
            component: SearchResult,
            props: (route) => ({ searchTitle: route.params.searchTitle }),
            meta: { breadcrumb:
                    [
                        {text: "All categories", link: '/'},
                        {text: "Search results"}
                    ]
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.name === 'category') {
        to.meta.breadcrumb = [
            {text: "All categories", link: '/'},
            {text:  to.params.categoryTitle }
        ]
    }
    next();
});

export default router;