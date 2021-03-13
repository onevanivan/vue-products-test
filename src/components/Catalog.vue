<template>
    <div class="catalog">
        <div class="catalog_container">
            <div class="catalog_list">
                <Item v-for="(item) in items"
                      :item="item"
                      :key="item.name"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Item from './Item';

    export default {
        name: 'Catalog',
        components: {
            Item
        },
        data: () => ({
            items: [
                {
                    title: 'Item name 1',
                    img:'item.png',
                    price:500.54
                },
                {
                    title: 'Item name 2',
                    img:'item.png',
                    price:500.54
                },
                {
                    title: 'Item name 3',
                    img:'item.png',
                    price:500.54
                },
                {
                    title: 'Item name 4',
                    img:'item.png',
                    price:500.54
                },
                {
                    title: 'Item name 5',
                    img:'item.png',
                    price:500.54
                }
            ]
        })
    }
</script>

<style lang="scss">
    .catalog {
        padding-top: 18px;

        .catalog_container {
            max-width: 887px;
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
                width: calc(25% - 6px);
                margin-left: 3px;
                margin-right: 3px;
            }
        }
    }
</style>