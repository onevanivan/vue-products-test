<template>
    <div class="catalog">
        <div class="catalog_container">
            <div class="catalog_list" v-if="Object.keys(items).length">
                <Item v-for="(item, key) in items"
                      :id="key"
                      :item="item"
                      :key="key"/>
            </div>
            <p class="catalog_empty" v-if="loading">Loading...</p>
            <p class="catalog_empty" v-if="!items && !loading">You still have no products</p>
        </div>
    </div>
</template>

<script>
    import Item from './Item';
    import firebase from "firebase/app";
    import "firebase/database";

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
        created() {
            firebase.database().ref().child('catalog').get().then((snapshotCat) => {
                let items = snapshotCat.val();
                if (this.favorites) {
                    firebase.database().ref().child('favorites').get().then((snapshot) => {
                        const data = snapshot.val();
                        let resultData = {};
                        for (let [itemKey, itemValue] of Object.entries(items)) {
                            this.custom.forEach(data, (value, key) => {
                                console.log(key)
                                if (itemKey == value.itemId && this.user.id == value.uid) {
                                    resultData[itemKey] = itemValue;
                                }
                            });
                        }
                        this.items = resultData;
                    });
                } else {
                    this.items = items;
                }
                this.loading = false;
            });
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