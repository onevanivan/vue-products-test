<template>
    <div class="item">
        <div class="item_img-wrap">
            <img class="item_img"
                 :src="item.img" alt="">
            <div class="item_favorite"
                 :class="{selected:isFavorite}"
                 @click="toggleFavorite(id)">
                <HeartFilled class="item_favorite-icon filled"/>
                <HeartNoFilled class="item_favorite-icon no-filled"/>
            </div>
        </div>
        <p class="item_title" v-if="item.title">{{item.title}}</p>
        <p class="item_title" v-if="item.category">{{category}}</p>
        <p class="item_title" v-if="item.location">{{item.location}}</p>
        <p class="item_price" v-if="parseInt(item.price)>0">${{item.price}}</p>
    </div>
</template>

<script>
    import global from '../mixins/global'
    import HeartFilled from '@/assets/img/heart-filled.svg';
    import HeartNoFilled from '@/assets/img/heart-no-filled.svg';
    import firebase from "firebase/app";
    import "firebase/database";

    export default {
        name: 'Item',
        props: ['item', 'id'],
        mixins: [global],
        components: {
            HeartFilled,
            HeartNoFilled
        },
        data: () => ({
            isFavorite: false
        }),
        created() {
            this.isFavorite = this.item.isFavorite
        },
        methods: {
            toggleFavorite(id) {
                if (!this.authenticated) {
                    this.$router.push({name: 'main'});
                } else {
                    if (this.isFavorite) {
                        // get all favorites
                        firebase.database().ref().child('favorites').get().then((snapshot) => {
                            const data = snapshot.val();
                            let favoriteKey = this.custom.findKey(data, {'itemId': id, 'uid': this.user.id});
                            let favoriteItem = firebase.database().ref(`favorites/${favoriteKey}`);
                            favoriteItem.remove()
                                .then(() => {
                                    this.isFavorite = false;
                                    console.log("Remove favorite succeeded.")
                                })
                                .catch(function (error) {
                                    console.log("Removefavorite failed: " + error.message)
                                });
                        });

                    } else {
                        const postListRef = firebase.database().ref('favorites');
                        const newPostRef = postListRef.push();
                        newPostRef.set({
                            uid: this.user.id,
                            itemId: id
                        }).then(() => {
                            this.isFavorite = true;
                            console.log("Set favorite succeeded.")
                        })
                    }
                }
            }
        },
        computed: {
            authenticated() {
                return this.$store.state.authenticated;
            },
            user() {
                return this.$store.state.user;
            },
            category() {
                if (this.item.category) {
                    return this.categories.find(item => this.item.category === item.value)?.title;
                }
                return '';
            }
        },
    }
</script>

<style lang="scss">
    .item {
        position: relative;
        background: $white;
        box-sizing: border-box;
        box-shadow: 0 4px 14px rgba(121, 121, 121, 0.0527344);
        border-radius: 4px;
        border: 1px solid $gray_5;
        margin-bottom: 10px;
        padding: 3.5px 3.5px 10px 3.5px;

        .item_img-wrap {
            position: relative;
            margin-bottom: 6px;
            padding-bottom: 75%;
        }

        .item_img {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
            object-fit: cover;
            object-position: center;
            display: block;
            width: 100%;
            height: 100%;
        }

        .item_title {
            font-size: 15px;
            line-height: 17px;
            color: $black_4;
            padding-left: 9px;
            margin-bottom: 7px;
        }

        .item_price {
            font-size: 18px;
            font-weight: 700;
            line-height: 21px;
            color: $black_1;
            padding-left: 9px;
        }

        .item_favorite {
            position: absolute;
            right: 3.5px;
            bottom: -15px;
            z-index: 3;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: $white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.163407);
            cursor: pointer;

            &.selected {
                .item_favorite-icon {
                    &.filled {
                        opacity: 1;
                    }

                    &.no-filled {
                        opacity: 0;
                    }
                }
            }
        }

        .item_favorite-icon {
            display: block;
            width: 17px;
            height: 15px;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: 1px;
            transform: translateY(-50%) translateX(-50%);
            transition: all 0.25s;

            &.filled {
                opacity: 0;
                fill: $green;
            }

            &.no-filled {
                opacity: 1;
                fill: $gray_6;
            }
        }
    }
</style>