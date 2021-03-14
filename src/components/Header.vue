<template>
    <header class="header" :class="{'dark':theme === 'dark'}">
        <div class="header_wrap">
            <div class="header_container">
                <RouterLink to="/home">
                    <LogoDark class="header_logo" v-if="theme==='light'"/>
                    <LogoLight class="header_logo" v-if="theme==='dark'"/>
                </RouterLink>
                <div class="header_ctrls">
                    <RouterLink v-if="showAdd && authenticated" to="/inbox" class="btn-small header_btn">+Add
                    </RouterLink>
                    <RouterLink v-if="showSell" to="/home" class="btn-small header_btn">Sell</RouterLink>
                </div>
                <div class="header_enter">
                    <div class="header_auth" @click="logout()" v-if="authenticated">Logout</div>
                    <RouterLink to="/" class="header_auth" v-else>Login</RouterLink>
                    <RouterLink to="/favorite" class="header_favorite">
                        <Heart class="header_favorite-icon"/>
                    </RouterLink>
                </div>
                <div class="header_hamburger" @click.stop="toggleMenu()" :class="{active:openMenu}">
                    <div class="header_hamburger-box">
                        <div class="header_hamburger-line"></div>
                    </div>
                </div>
            </div>
        </div>
        <nav class="header_menu" :class="{active:openMenu}">
            <div class="header_menu-item" v-if="showAdd && authenticated">
                <RouterLink to="/inbox">+Add</RouterLink>
            </div>
            <div class="header_menu-item" v-if="showSell">
                <RouterLink to="/home">Sell</RouterLink>
            </div>
            <div class="header_menu-item">
                <RouterLink to="/favorite">Favorite</RouterLink>
            </div>
            <div class="header_menu-item" v-if="authenticated">
                <div @click="logout()">Logout</div>
            </div>
            <div class="header_menu-item" v-else>
                <RouterLink to="/">Login</RouterLink>
            </div>
        </nav>
    </header>
</template>

<script>
    import LogoLight from '@/assets/img/logo-light.svg';
    import LogoDark from '@/assets/img/logo-dark.svg';
    import Heart from '@/assets/img/heart.svg';
    import firebase from "firebase/app";
    import "firebase/auth";

    export default {
        name: 'Header',
        components: {
            LogoLight,
            LogoDark,
            Heart
        },
        data: () => ({
            theme: 'light',
            showSearch: false,
            showAdd: false,
            showSell: false,
            openMenu: false
        }),
        created() {
            if (this.$route.name === 'main') {
                this.theme = 'light';
                this.showSell = true;
            }
            if (this.$route.name === 'home') {
                this.showSearch = true;
                this.showAdd = true;
                this.theme = 'dark';
            }
            if (this.$route.name === 'favorite') {
                this.showSearch = true;
                this.showSell = true;
                this.theme = 'dark';
            }
            if (this.$route.name === 'inbox') {
                this.theme = 'dark';
                this.showSell = true;
            }
        },
        watch: {
            '$route': {
                handler(to) {
                    this.openMenu = false;
                    this.showSearch = false;
                    this.showAdd = false;
                    this.showSell = false;

                    if (to.name === 'main') {
                        this.showSell = true;
                        this.theme = 'light';
                    }
                    if (to.name === 'home') {
                        this.showSearch = true;
                        this.showAdd = true;
                        this.theme = 'dark';
                    }
                    if (to.name === 'favorite') {
                        this.showSearch = true;
                        this.showSell = true;
                        this.theme = 'dark';
                    }
                    if (to.name === 'inbox') {
                        this.theme = 'dark';
                        this.showSell = true;
                    }
                }
            }
        },
        computed: {
            authenticated() {
                return this.$store.state.user.authenticated
            }
        },
        methods: {
            logout() {
                firebase.auth().signOut().then(() => {
                    let data = {
                        email: '',
                        authenticated: false,
                        fullName: ''
                    };
                    this.$store.commit('setUser', data);
                    this.$router.push('/');
                }).catch((error) => {
                    console.log(error)
                });
            },
            toggleMenu() {
                if (!this.openMenu) {
                    document.documentElement.classList.add('body-fixed');
                } else {
                    document.documentElement.classList.remove('body-fixed');
                }
                this.openMenu = !this.openMenu;
            },
        }
    }
</script>

<style lang="scss">
    .header {
        width: 100%;
        flex-shrink: 0;

        &.dark {
            .header_wrap {
                background: $black_gradient;
            }

            .header_hamburger-line {
                background: $white;

                &:after, &:before {
                    background: $white;
                }
            }

            .header_auth {
                color: $white;
            }

            .header_favorite-icon {
                fill: $white;
            }
        }

        .header_wrap {
            position: relative;
            z-index: 101;
        }

        .header_container {
            max-width: 1182px;
            width: 100%;
            margin: 0 auto;
            padding: 18px 10px 15px 28px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            @media screen and (min-width: 768px) {
                align-items: flex-start;
                padding: 18px 28px 15px 28px;
            }
        }

        .header_ctrls {
            flex: 1;
            padding-top: 6px;
            display: none;

            @media screen and (min-width: 768px) {
                display: block;
            }
        }

        .header_enter {
            display: none;
            align-items: center;
            padding-top: 6px;
            margin-left: 23px;

            @media screen and (min-width: 768px) {
                display: flex;
            }
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

        .header_auth {
            font-size: 12px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: $black_6;
            padding: 9px 10px;
            cursor: pointer;
            flex-shrink: 0;
            text-decoration: none;
        }


        .header_hamburger {
            padding: 10px;
            flex-shrink: 0;
            cursor: pointer;

            @media screen and (min-width: 768px) {
                display: none;
            }

            &.active {
                .header_hamburger-line {
                    transition-delay: .12s;
                    transition-timing-function: cubic-bezier(.215, .61, .355, 1);
                    transform: rotate(45deg);
                    width: 22px;
                    top: 5px;

                    &::before {
                        top: 0;
                        transition: top 75ms ease, opacity 75ms ease .12s;
                        opacity: 0;
                    }

                    &::after {
                        transition: bottom 75ms ease, transform 75ms cubic-bezier(.215, .61, .355, 1) .12s;
                        transform: rotate(-90deg);
                        width: 22px;
                        top: 0;
                    }
                }

                .header_hamburger-box {
                    right: 0;
                }
            }
        }

        .header_hamburger-box {
            position: relative;
            width: 22px;
            height: 15px;
        }

        .header_hamburger-line {
            position: relative;
            width: 22px;
            height: 2px;
            background: $black_2;
            transition-timing-function: cubic-bezier(.55, .055, .675, .19);
            transition-duration: 75ms;

            &::after {
                content: '';
                position: absolute;
                right: 0;
                top: 6px;
                display: block;
                width: 22px;
                height: 2px;
                background: $black_2;
                transition: bottom 75ms ease .12s, transform 75ms cubic-bezier(.55, .055, .675, .19);
            }

            &::before {
                content: '';
                position: absolute;
                right: 0;
                top: 12px;
                display: block;
                width: 22px;
                height: 2px;
                background: $black_2;
                transition: top 75ms ease .12s, opacity 75ms ease;
            }
        }

        .header_menu {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            height: calc(100vh - 74px);
            z-index: 100;
            display: flex;
            align-items: center;
            flex-direction: column;
            transition: all 0.25s;
            transform: translateY(-100%);
            background: white;
            opacity: 0;
            visibility: hidden;
            cursor: pointer;
            padding-top: 74px;
            background: $gray;

            @media screen and (min-width: 768px) {
                display: none;
            }

            &.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
        }

        .header_menu-item {
            display: block;
            position: relative;
            font-size: 22px;
            text-decoration: none;
            margin-bottom: 32px;
            width: 100%;
            text-align: center;
        }
    }
</style>