export default {
    methods: {
        loadImg(path) {
            if (path) {
                return require(`/src/assets/img/${path}`);
            }
        },
    }
}
