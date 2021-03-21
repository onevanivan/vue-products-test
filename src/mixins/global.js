export default {
    data:()=>({
        categories:[
            {
                value: 'cats',
                title: 'Cats'
            },
            {
                value: 'cars',
                title: 'Cars'
            },
            {
                value: 'forest',
                title: 'Forest'
            }
        ]
    }),
    methods: {
        loadImg(path) {
            if (path) {
                return require(`/src/assets/img/${path}`);
            }
        },
    }
}
