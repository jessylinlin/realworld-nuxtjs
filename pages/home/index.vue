<template>
<div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">
      <!-- tab -->
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link class="nav-link" exact
              :class="{
                active: !tag && tab === 'your_feed'
              }"
              :to="{
                name:'home',
                query: {
                  tab: 'your_feed'
                }
              }"
            >Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" exact
              :class="{
                active: !tag && tab === 'global_feed'
              }"
              :to="{
                name: 'home',
                query: {
                  tab: 'global_feed'
                }
              }" 
            >Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link class="nav-link" exact
              :class="{
                active: tag
              }"
              :to="{
                name: 'home',
                query: {
                  tag: tag
                }
              }"
            >#{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="article in articles" :key="article.slug">
          <div class="article-meta">
            <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
             }"><img :src="article.author.image" /></nuxt-link>
            <div class="info">
              <nuxt-link class="author" :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
             }">
             {{article.author.username}}
              </nuxt-link>
              <span class="date">{{article.createdAt}}</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right"
            :class="{
              active: articles.favorited
            }"
            >
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="{
            name: 'article',
            params: {
              slug: article.slug
            }
          }" class="preview-link"
          >
            <h1>{{article.title}}</h1>
            <p>{{article.description}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>
        <div class="article-preview" v-if="!articles || articles.length === 0">No articles are here... yet.</div>
        <!-- 翻页处理 -->
        <nav>
          <ul class="pagination">
            <li 
            class="page-item ng-scope" 
            :class="{
              active: page === item
            }"
            v-for="item in totalPage"
            :key="item"
            >
              <nuxt-link class="page-link ng-binding" :to="{
                name: 'home',
                query: {
                  page: item,
                  tag: $route.query.tag
                }
              }">{{item}}</nuxt-link>
            </li>  

          </ul>
        </nav>
      </div>

      <!-- 标签列表 -->
      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link :to="{
              name: 'home',
              query: {
                tag: item
              }
            }" 
            class="tag-pill tag-default"
            v-for="item in tags"
            :key="item"
            >{{item}}</nuxt-link>            
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import {getArticles, getFeedArticles} from '@/api/article'
import { getTags } from '@/api/tag'
import { mapState } from 'vuex'
export default {
  name: 'HomeIndex',
  watchQuery: ['page', 'tag', 'tab'],
  data() {
    return {
      
    }
  },
  computed:{
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    },
    ...mapState(['user'])
  },
  //服務器端+客戶端
  async asyncData({query, store}) {
    // console.log(store)
    const page = Number.parseInt(query.page || 1)
    const limit = 10
    const tag = query.tag 
    const tab = query.tab  
    const loadArticles = store.state.user && tab === 'your_feed'
      ? getFeedArticles
      : getArticles

    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit: limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])

    const {articles, articlesCount} = articleRes.data
    const { tags } = tagRes.data

    return {
      articles: articles,
      articlesCount: articlesCount,
      limit,
      page,
      tags, //标签列表
      tag,
      tab: tab || "global_feed"
    }
    // console.log(data)
  }
}
</script>

<style>

</style>