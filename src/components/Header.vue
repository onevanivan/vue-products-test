<template>
    <header class="header" :class="{'dark':theme === 'dark'}">
        <div class="header_wrap">
            <div class="header_container">
                <div class="header_container-top">
                    <div class="header_logo-wrap">
                        <RouterLink to="/home">
                            <LogoDark class="header_logo" v-if="theme==='light'"/>
                            <LogoLight class="header_logo" v-if="theme==='dark'"/>
                        </RouterLink>
                    </div>
                    <div class="header_center">
                        <div class="header_ctrls">
                            <RouterLink v-if="showAdd && isAuthenticated" to="/inbox" class="btn-small header_btn">+Add
                            </RouterLink>
                            <RouterLink v-if="showSell" to="/home" class="btn-small header_btn">Sell</RouterLink>
                        </div>
                    </div>
                    <div class="header_enter">
                        <div class="header_user" v-if="isAuthenticated" @click="toggleUserMenu">
                            {{nameInitials}}
                            <div class="header_user-menu" v-show="userMenu">
                                <div class="header_user-menu-item">Edit</div>
                                <div class="header_user-menu-item" @click.stop="logout()" v-if="isAuthenticated">Logout
                                </div>
                            </div>
                        </div>
                        <RouterLink to="/" class="header_auth" v-if="!isAuthenticated">Login</RouterLink>
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
                <div class="header_search-wrap">
                    <div class="header_search" v-if="showSearch">
                        <div class="header_search-input-wrap name">
                            <input type="text" class="header_search-input"
                                   v-model="search"
                                   placeholder="Search products by name">
                            <Search class="header_search-icon"/>
                        </div>
                        <div class="header_search-input-wrap location">
                            <input type="text" class="header_search-input"
                                   v-model="location"
                                   placeholder="Location">
                            <Location class="header_search-icon"/>
                        </div>
                        <div class="header_search-btn btn-middle" @click="searchEmit()">Search</div>
                    </div>
                </div>
            </div>
        </div>
        <nav class="header_menu" :class="{active:openMenu,'mod-top':showSearch}">
            <div class="header_menu-item" v-if="isAuthenticated">
                <RouterLink to="/inbox">+Add</RouterLink>
            </div>
            <div class="header_menu-item" v-if="showSell">
                <RouterLink to="/home">Sell</RouterLink>
            </div>
            <div class="header_menu-item">
                <RouterLink to="/favorite">Favorite</RouterLink>
            </div>
            <div class="header_menu-item" v-if="isAuthenticated">
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
    import Location from '@/assets/img/location.svg';
    import Search from '@/assets/img/search.svg';
    import firebase from "firebase/app";
    import {eventBus} from '/src/main'
    import { mapGetters } from "vuex";

    export default {
        name: 'Header',
        components: {
            LogoLight,
            LogoDark,
            Heart,
            Location,
            Search
        },
        data: () => ({
            theme: 'light',
            showSearch: false,
            showAdd: false,
            showSell: false,
            openMenu: false,
            userMenu: false,
            search: '',
            location: ''
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
            ...mapGetters(["isAuthenticated", 'user']),
            nameInitials() {
                if (this.user?.fullName) {
                    return this.user.fullName.split(' ').map((val, key) => {
                        if (key < 2) {
                            return val.charAt(0);
                        }
                    }).join('');
                }
                return '';
            }
        },
        methods: {
            logout() {
                firebase.auth().signOut().then(() => {
                    this.userMenu = false;
                    this.$store.commit('setUser', false);
                    this.$store.commit('setAuth', false);
                    this.$router.replace({name: 'main'});
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
            toggleUserMenu() {
                this.userMenu = !this.userMenu;
            },
            searchEmit() {
                eventBus.$emit('search', {search: this.search, location: this.location});
            }
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
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            padding: 18px 28px 15px 28px;

            @media screen and (min-width: 768px) {
                padding: 18px 28px 15px 28px;
            }
        }

        .header_container-top {
            display: flex;
            align-items: center;
            justify-content: space-between;

            @media screen and (min-width: 768px) {
                align-items: flex-start;
            }
        }

        .header_center {
            flex: 1;
            max-width: 848px;

            display: none;

            @media screen and (min-width: 768px) {
                display: block;
                margin: 0 auto;
            }
        }


        .header_ctrls {
            padding-top: 6px;
        }

        .header_search-wrap {
            flex: 1;
            max-width: 848px;
            margin: 0 auto;
        }

        .header_search {
            display: flex;
            align-items: center;
            margin-top: 10px;

            @media screen and (min-width: 768px) {
                margin-top: 44px;
            }
        }

        .header_search-btn {
            margin-left: auto;
            height: 35px;
            width: 90px;

            @media screen and (min-width: 768px) {
                height: 50px;
                width: 131px;
            }
        }

        .header_search-icon {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        .header_search-input-wrap {
            position: relative;

            &.name {
                flex: 1;

                .header_search-icon {
                    display: none;
                    width: 17px;
                    height: 18px;
                    left: 22px;

                    @media screen and (min-width: 768px) {
                        display: block;
                    }
                }

                .header_search-input {
                    padding-left: 10px;
                    height: 35px;
                    @media screen and (min-width: 768px) {
                        padding-left: 52px;
                        height: 50px;
                    }
                }
            }

            &.location {
                max-width: 198px;
                flex: 1;
                margin-right: 7px;
                margin-left: 7px;

                .header_search-icon {
                    display: none;
                    width: 13px;
                    height: 19px;
                    left: 10px;

                    @media screen and (min-width: 768px) {
                        display: block;
                    }
                }

                .header_search-input {
                    padding-left: 10px;
                    height: 35px;
                    @media screen and (min-width: 768px) {
                        padding-left: 38px;
                        height: 50px;
                    }
                }
            }
        }

        .header_search-input {
            display: block;
            font-size: 15px;
            width: 100%;
            height: 50px;
            background: $white;
            border-radius: 4px;
            padding-right: 16px;
            border: none;

            &::-webkit-input-placeholder {
                font-family: 'Helvetica';
                font-size: 14px;
                color: rgba(123, 123, 123, 0.776523);

                @media screen and (min-width: 600px) {
                    font-size: 15px;
                }
            }

            &:-ms-input-placeholder {
                font-family: 'Helvetica';
                font-size: 14px;
                color: rgba(123, 123, 123, 0.776523);

                @media screen and (min-width: 600px) {
                    font-size: 15px;
                }
            }

            &::placeholder {
                font-family: 'Helvetica';
                font-size: 14px;
                color: rgba(123, 123, 123, 0.776523);

                @media screen and (min-width: 600px) {
                    font-size: 15px;
                }
            }
        }

        .header_enter {
            display: none;
            align-items: center;
            margin-left: 23px;

            @media screen and (min-width: 768px) {
                display: flex;
                justify-content: flex-end;
                width: 148px;
                margin-left: 0;
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
            margin-top: 6px;
        }

        .header_hamburger {
            padding: 10px;
            flex-shrink: 0;
            cursor: pointer;
            margin-right: -10px;

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
            height: 100vh;
            z-index: 100;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            transition: all 0.25s;
            transform: translateY(-100%);
            background: white;
            opacity: 0;
            visibility: hidden;
            cursor: pointer;
            background: $gray;

            &.mod-top {
                height: calc(100vh - 120px);
            }

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

        .header_user {
            position: relative;
            width: 40px;
            height: 40px;
            background: #f1c40f;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: rgba(19, 15, 2, 0.72);
            cursor: pointer;
        }

        .header_user-menu {
            position: absolute;
            top: 46px;
            left: 0;
            font-size: 14px;
            width: 100px;
            background: $gray;
            border-radius: 4px;
            overflow: hidden;
        }

        .header_user-menu-item {
            padding: 5px 8px;
            cursor: pointer;
            transition: all 0.25s;

            &:hover {
                color: $black_1;
                background: $gray_1;
            }
        }

        .header_logo-wrap {
            @media screen and (min-width: 768px) {
                width: 148px;
            }
        }
    }
</style>