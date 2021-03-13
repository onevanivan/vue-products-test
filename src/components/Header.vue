<template>
    <header class="header" :class="{'dark':theme === 'dark'}">
        <div class="header_container">
            <RouterLink to="/home">
                <LogoDark class="header_logo" v-if="theme==='light'"/>
                <LogoLight class="header_logo" v-if="theme==='dark'"/>
            </RouterLink>
            <div class="header_ctrls">
                <RouterLink to="/home" class="btn-small header_btn">Sell</RouterLink>
            </div>
            <div class="header_enter">
                <RouterLink to="/" class="header_login">Login</RouterLink>
                <div class="header_favorite">
                    <Heart class="header_favorite-icon"/>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
    import LogoLight from '@/assets/img/logo-light.svg';
    import LogoDark from '@/assets/img/logo-dark.svg';
    import Heart from '@/assets/img/heart.svg';

    export default {
        name: 'Header',
        components: {
            LogoLight,
            LogoDark,
            Heart
        },
        data: () => ({
            theme: 'light',
            showSearch: false
        }),
        created() {
            if (this.$route.name === 'main') {
                this.showSearch = false;
                this.theme = 'light';
            }
            if (this.$route.name === 'home') {
                this.showSearch = true;
                this.theme = 'dark';
            }
        },
        watch: {
            '$route': {
                handler(to) {
                    if (to.name === 'main') {
                        this.showSearch = false;
                        this.theme = 'light';
                    }
                    if (to.name === 'home') {
                        this.showSearch = true;
                        this.theme = 'dark';
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    .header {
        width: 100%;

        &.dark {
            background: $black_gradient;

            .header_login {
                color: $white;
            }

            .header_favorite-icon {
                fill: $white;
            }
        }

        .header_container {
            max-width: 1240px;
            width: 100%;
            margin: 0 auto;
            padding: 18px 28px 15px 28px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }

        .header_ctrls {
            flex: 1;
            padding-top: 6px;
        }

        .header_enter {
            display: flex;
            align-items: center;
            padding-top: 6px;
            margin-left: 23px;
        }

        .header_favorite {
            flex-shrink: 0;
            margin-left: 25px;
            padding: 5px;
            cursor: pointer;
        }

        .header_favorite-icon {
            display: block;
            width: 20px;
            height: 18px;
        }

        .header_btn {
            flex-shrink: 0;
            margin-left: auto;
            text-decoration: none;
        }

        .header_logo {
            display: block;
            width: 102px;
            height: 42px;
            flex-shrink: 0;
        }

        .header_login {
            font-size: 12px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: $black_6;
            padding: 9px 10px;
            cursor: pointer;
            flex-shrink: 0;
            text-decoration: none;
        }
    }
</style>