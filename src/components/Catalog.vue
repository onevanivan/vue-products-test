<template>
    <div class="catalog">
        <div class="catalog_container">
            <!--            catalog filter-->
            <div class="catalog_filter-wrap">
                <div class="catalog_filter">
                    <div class="catalog_category">
                        <el-dropdown trigger="click" @command="dropdown" class="dropdown"
                                     placement="bottom-start">
                            <span class="el-dropdown-link dropdown_button">
                                <Grid class="catalog_filter-icon"/>
                                {{categoryButton}}<i
                                    class="el-icon-arrow-down el-icon--right dropdown_button-arrow"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" class="dropdown_list">
                                <el-dropdown-item
                                        key="not_category"
                                        command="">Choose category
                                </el-dropdown-item>
                                <el-dropdown-item
                                        v-for="cat in categories"
                                        :key="cat.value"
                                        :command="cat.value">{{cat.title}}
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                    <input type="text" class="catalog_filter_input from"
                           @input="filterInputHandler"
                           @keypress="isNumber($event)"
                           v-model="from"
                           placeholder="Price from (USD)">
                    <div class="catalog_filter-sep"></div>
                    <input type="text" class="catalog_filter_input to"
                           @input="filterInputHandler()"
                           @keypress="isNumber($event)"
                           v-model="to"
                           placeholder="Price to (USD)">
                </div>
            </div>

            <div class="catalog_list" v-if="Object.keys(items).length && !loading">
                <Item v-for="(item, key) in items"
                      :id="key"
                      :item="item"
                      :key="key"/>
            </div>
            <p class="catalog_empty" v-if="loading">Loading...</p>
            <p class="catalog_empty" v-if="!Object.keys(items).length && !loading">You still have no products</p>
        </div>
    </div>
</template>

<script>
    import global from '../mixins/global'
    import Item from './Item';
    import firebase from "firebase/app";
    import "firebase/database";
    import {eventBus} from '/src/main'
    import Grid from '@/assets/img/grid.svg';
    import {mapGetters} from "vuex";

    export default {
        name: 'Catalog',
        mixins: [global],
        components: {
            Item,
            Grid
        },
        props: {
            favorites: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            items: {},
            loading: true,
            category: '',
            from: '',
            to: '',
            search: '',
            location: ''
        }),
        computed: {
            ...mapGetters(["user"]),
            categoryButton() {
                return this.category ? this.custom.find(this.categories, {value: this.category}).title : 'Choose category';
            }
        },
        methods: {
            getData() {
                firebase.database().ref().child('catalog').get().then((snapshotCat) => {
                    let items = snapshotCat.val();
                    firebase.database().ref().child('favorites').get().then((snapshot) => {
                        const data = snapshot.val();
                        let resultData = {};
                        // items each
                        if (items) {
                            for (let [itemKey, itemValue] of Object.entries(items)) {
                                // favorites each
                                this.custom.forEach(data, (value) => {
                                    if (itemKey == value.itemId && this.user.id == value.uid) {
                                        itemValue.isFavorite = true;
                                        if (this.favorites) {
                                            resultData[itemKey] = itemValue;
                                        }
                                    }
                                });
                            }
                            this.items = this.favorites ? resultData : items;
                            // search
                            if (this.search || this.location) {
                                this.searchHandler(this.search, this.location);
                            }
                            if (this.category || this.from || this.to) {
                                this.filterHandler();
                            }
                        }
                        this.loading = false;
                    });
                });
            },
            filterInputHandler() {
                let timeout = setTimeout(() => {
                    this.getData();
                    clearTimeout(timeout);
                }, 1000);
            },
            isNumber: function (evt) {
                let charCode = evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            },
            dropdown(value) {
                this.category = value;
                this.getData();
            },
            searchHandler(search, location) {
                if (search && location) {
                    let searchItems = {};
                    this.custom.forEach(this.items, (value, key) => {
                        if (value.title.toLowerCase().indexOf(search.toLowerCase()) != -1
                            && value.location.toLowerCase().indexOf(location.toLowerCase()) != -1) {
                            searchItems[key] = value;
                        }
                    });
                    this.items = searchItems;
                }
                if (search) {
                    let searchItems = {};
                    this.custom.forEach(this.items, (value, key) => {
                        if (value.title.toLowerCase().indexOf(search.toLowerCase()) != -1) {
                            searchItems[key] = value;
                        }
                    });
                    this.items = searchItems;
                }
                if (location) {
                    let searchItems = {};
                    this.custom.forEach(this.items, (value, key) => {
                        if (value.location.toLowerCase().indexOf(location.toLowerCase()) != -1) {
                            searchItems[key] = value;
                        }
                    });
                    this.items = searchItems;
                }
            },
            filterHandler() {
                if (this.category) {
                    let searchItems = {};
                    this.custom.forEach(this.items, (value, key) => {
                        if (value.category == this.category) {
                            searchItems[key] = value;
                        }
                    });
                    this.items = searchItems;
                }
                if (this.from && !this.to || !this.from && this.to) {
                    let searchItems = {};
                    this.custom.forEach(this.items, (value, key) => {
                        if (this.from && !this.to) {
                            if (parseInt(value.price) >= parseInt(this.from)) {
                                searchItems[key] = value;
                            }
                        }
                        if (!this.from && this.to) {
                            if (parseInt(value.price) <= parseInt(this.to)) {
                                searchItems[key] = value;
                            }
                        }
                    });
                    this.items = searchItems;
                }
                if (this.from && this.to) {
                    let searchItems = {};
                    this.custom.forEach(this.items, (value, key) => {
                        if ((parseInt(value.price) >= parseInt(this.from))
                            && (parseInt(value.price) <= parseInt(this.to))) {
                            searchItems[key] = value;
                        }
                    });
                    this.items = searchItems;
                }
            }
        },
        created() {
            this.getData();
        },
        mounted() {
            eventBus.$on('search', data => {
                this.loading = true;
                this.search = data.search;
                this.location = data.location;
                this.getData();
            });
        },
        beforeDestroy() {
            eventBus.$off('search');
        }
    }
</script>

<style lang="scss">
    .catalog {
        padding-top: 18px;

        .catalog_container {
            max-width: 880px;
            padding: 0 16px;
            margin: 0 auto;
        }

        .catalog_list {
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            margin-left: -3px;
            margin-right: -3px;

            & > * {
                width: calc(50% - 6px);
                margin-left: 3px;
                margin-right: 3px;

                @media screen and(min-width: 600px) {
                    width: calc(33.33% - 6px);
                }

                @media screen and(min-width: 1024px) {
                    width: calc(25% - 6px);
                }
            }
        }

        .catalog_empty {
            font-size: 20px;
            text-align: center;
            padding-top: 40px;
        }

        .catalog_filter-wrap {
            padding: 12px;
            background: $white;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.217111);
            border-radius: 4px;
            max-width: 400px;
            margin: 0 auto 15px;

            @media screen and(min-width: 768px) {
                max-width: 100%;
            }
        }

        .catalog_filter {
            @media screen and(min-width: 768px) {
                display: flex;
                align-items: center;
            }
        }

        .catalog_filter-sep {
            display: block;
            position: relative;
            width: 26px;

            &:after {
                content: "";
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 12px;
                height: 1px;
                background: #dedee0;

            }
        }

        .catalog_filter-icon {
            display: block;
            width: 17px;
            height: 17px;
            margin-right: 11px;
        }

        .dropdown {
            width: 100%;
            margin-bottom: 10px;

            @media screen and(min-width: 768px) {
                margin-right: 23px;
                margin-bottom: 0;
                width: auto;
            }
        }

        .dropdown_button {
            width: 100%;
            height: 35px;
            justify-content: flex-start;
            font-size: 14px;

            @media screen and(min-width: 768px) {
                width: 285px;
            }
        }

        .dropdown_button-arrow {
            margin-left: auto;
        }

        .catalog_filter_input {
            display: block;
            width: 100%;
            height: 35px;
            font-size: 14px;
            letter-spacing: 0.4px;
            color: #101010;
            background: #f9fafb;
            border: 1px solid #dedee0;
            border-radius: 5px;
            padding: 10px 9px 9px 9px;
            margin-bottom: 10px;

            @media screen and(min-width: 768px) {
                width: 143px;
                margin-bottom: 0;
            }
        }
    }
</style>