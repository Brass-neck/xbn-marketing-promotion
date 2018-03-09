<template>
    <div class="app-container">
        <div class="git-huber-search">
            <H2 class="example">{{ msg }}</H2>
            <div>
                <nt-input
                        placeholder="搜索Git用户名"
                        :icon="searchIcon"
                        v-model="githuberName"
                        :on-icon-click="handleReset">
                </nt-input>
                <nt-button type="primary" icon="search" @click="handleIconClick">搜索</nt-button>
            </div>
        </div>

        <div class="search-result" v-if="searched">
            <div class="total" v-if="total_count">共{{total_count}}条记录</div>
            <div class="nt-list">
                <div class="userEntry" v-for="(githuber, index) in items">
                    <div class="order">
                       <div class="seq" :class="(index<3)?'top':''">{{index+1}}</div>
                       <div class="score">{{githuber.score}}</div>
                    </div>
                    <div class="thumb">
                        <img :src="githuber.avatar_url">
                    </div>
                    <router-link :to="'../detail/' + githuber.login">
                        <div class="name">
                            {{githuber.login}}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                searchIcon: 'close',
                searched: false,
                total_count: 0,
                items: [],
                githuberName: '',
                msg: 'APP Githuber'
            }
        },

        beforeCreate: function() {

        },

        created: async function() {
            await this.searchByUser();
        },

        watch: {
            '$route' :async function (to, from) {
                await this.searchByUser();
            }
        },

        methods: {
            searchByUser: async function() {
                if(this.$route.params.user) {
                    this.githuberName = this.$route.params.user;
                    //设置为搜索样式
                    this.searchIcon = 'loading';
                    const {total_count, items} = await this.$nt.models.githuber.searchGitUser({
                        user: this.githuberName
                    }, this.ctx);

                    this.searched = true;
                    this.total_count = total_count;
                    this.items = items;
                    //恢复搜索图标的样式
                    this.searchIcon = 'close';
                } else {
                    this.searched = true;
                    this.total_count = 0;
                    this.items = [];
                    return;
                }
            },

            handleReset: function() {
                this.githuberName = '';
                this.$router.replace('./');
            },

            handleIconClick: function(ev) {
                if (this.searchIcon==='loading') {
                    return;
                }
                //设置搜索图标为loading形态
                this.searchIcon = 'loading';

                //执行路由替代， 更改url
                this.$router.replace(this.githuberName);
                //this.searchByUser();
                //路由修改地址
                //this.ctx.replace(this.githuberName);
                //this.ctx.page('#!/githuber/search/' + this.githuberName);
            }
        }
    }
</script>


<style lang="less">

    .app-container {
        padding: 20px;

        .el-input {
            width: 400px;
        }
    }

    .example {
        color: red;
    }

    .userEntry {
        display: flex;
        border-bottom: 1px solid #eee;
        padding: 5px;

        &:hover {
            cursor: pointer;
            background-color: rgba(50, 65, 87, 0.03);
        }
        .order {
            width: 70px;
            border: 1px solid #eee;
            text-align: center;

            .seq {
                height: 35px;
                font-size: 24px;
                color: #666;
                border-bottom: 1px solid #eee;
                line-height: 35px;
                &.top {
                    color: green;
                }
            }
            .score {
                color: #999;
            }
        }
        .thumb {
            width: 60px;
            margin: 0px 10px;
            img {
                width: 60px;
                height: 60px;
                border-radius: 30px;
            }
        }
        .name {
            padding: 5px;
            font-size: 18px;
        }
    }
</style>


<custom1>
    This could be e.g. documentation for the component.
</custom1>