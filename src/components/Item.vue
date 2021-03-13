<template>
    <div class="item">
        <div class="item_img-wrap">
            <img class="item_img"
                 :src="loadImg(item.img)" alt="">
        </div>
        <p class="item_title" v-if="item.title">{{item.title}}</p>
        <p class="item_price" v-if="parseInt(item.price)>0">${{item.price}}</p>
    </div>
</template>

<script>
    import global from '../mixins/global'

    export default {
        name: 'Item',
        props: ['item'],
        mixins: [global]
    }
</script>

<style lang="scss">
    .item {
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
            padding-bottom: 148px;
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
    }
</style>