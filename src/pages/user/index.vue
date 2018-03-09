<template>
    <div id="bber" class="app-container githuber-detail" v-loading="loading">

        <div class="hubber-box">
            <div class="avatar">
                <img :src="avatar">
            </div>

            <div class="name">
                {{name}}
            </div>
            <div class="location">
                <svg aria-hidden="true" class="octicon octicon-location" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
                {{location}}
            </div>
            <div class="bio">
                {{bio}}
            </div>

            <div class="follows">
                <div class="following">
                    <p>FOLLOWING</p>
                    <div class="count">{{following}}</div>
                </div>
                <div class="followers">
                    <p>FOLLOWERS</p>
                    <div class="count">{{followers}}</div>
                </div>
            </div>
        </div>

        <div class="starred">
            <div v-for="star in starred" class="star">
                <div class="name">{{star.name}}</div>
                <div class="description">{{star.description}}</div>

                <div class="short-view">
                    <span class="view">
                       Language: {{star.language}}
                    </span>
                    <span class="view">
                       Watches: {{star.watchers_count}}
                    </span>
                    <span class="view">
                       Forks: {{star.forks_count}}
                    </span>
                </div>

            </div>

        </div>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                loading: true,
                avatar: '',
                bio: '',
                name: '',
                location: '',
                following: 0,
                followers: 0,
                starred: []
            }
        },

        created: async function() {
            await this.fetchData();
        },

        methods: {
            fetchData: async function() {
                const ctx = this.ctx;
                ctx.data = await this.$nt.models.githuber.pageUserDetail(this.$route.params, this.ctx);
                //ctx.data = pageUserDetail(this.$route.params, ctx);
                /*this.pageUserDetail(this.$route.params, {
                    cache: true
                });*/
                //ctx.data = await PageUserDetail(this.$route.params, ctx);
                this.loading = false;
                this.name = ctx.data.detail.name;
                this.avatar = ctx.data.detail.avatar_url;
                this.bio = ctx.data.detail.bio;
                this.following = ctx.data.detail.following;
                this.followers = ctx.data.detail.followers;
                this.location = ctx.data.detail.location;
                this.starred = ctx.data.starred;
            }
        }
    }
</script>


<style lang="less">
    .app-container {
        padding: 20px;
    }

    .githuber-detail {
        display: flex;
    }
    .hubber-box {
        width: 240px;
        border-radius: 10px;
        border: 1px solid #e4e4e4;
        padding:20px;
        .avatar {
            padding: 10px;
            text-align: center;
            img {
                width: 120px;
                border-radius: 60px;
            }
        }

        .name {
            font-size: 22px;
            color: #999;
        }

        .bio {
            text-align: left;
            font-size: 14px;
            color: #888;
            margin-top: 9px;
        }

        .following, .followers {
            p {
                margin: 10px 0px;
                font-size: 14px;
            }

            .count {
                font-size: 26px;
            }
        }
    }

    .starred {
        margin-left: 10px;
        .star {
            padding: 10px;
            border-bottom: 1px solid #eee;
            .name {
                font-size: 20px;
            }

            .description {
                font-size: 14px;
                color: #666;
            }

            .short-view {
                .view {
                    margin-right: 20px;
                }
            }
        }
    }
</style>
