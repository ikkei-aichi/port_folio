import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HistoryView from '../views/HistoryView.vue'
import BlogView from '../views/BlogView.vue'
import SettingView from '../views/SettingView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'
import SkillsView from '@/views/SkillsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView,
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/skills',
      name: 'skills',
      component: SkillsView,
    },
  ],
})

export default router
