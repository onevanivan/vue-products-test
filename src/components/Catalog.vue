<template>
    <div class="catalog">
        <div class="catalog_container">
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
    import Item from './Item';
    import firebase from "firebase/app";
    import "firebase/database";
    import {eventBus} from '/src/main'

    export default {
        name: 'Catalog',
        components: {
            Item
        },
        props: {
            favorites: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            items: {},
            loading: true
        }),
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {
            getData(search = null, location = null) {
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
                            this.loading = false;
                            this.items = this.favorites ? resultData : items;
                            // search
                            if (search || location) {
                                this.searchHandler(search, location);
                            }
                        }
                    });
                });
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
            }
        },
        created() {
            this.getData();
        },
        mounted() {
            eventBus.$on('search', data => {
                this.loading = true;
                let {search, location} = data;
                this.getData(search, location);
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
    }
</style>