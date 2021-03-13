export default {
    methods: {
        loadImg(path) {
            return require(`/src/assets/img/${path}`);
        },
    }
}
