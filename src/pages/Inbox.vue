<template>
    <div class="page inbox">
        <div class="inbox_container">
            <div class="inbox_loading" v-if="loading">
                <img class="inbox_loading-icon" :src="require('/src/assets/img/loading.jpg')" alt="">
            </div>
            <div class="inbox_form">
                <h1 class="inbox_title">Add product</h1>
                <div class="form-item">
                    <div class="form-item_top">
                        <label class="form-item_label">Title</label>
                        <span class="form-item_error">{{ errors.first('title') }}</span>
                    </div>
                    <input class="form-item_input"
                           v-model="title"
                           v-validate="'required'"
                           name="title"
                           type="text"
                           placeholder="For example: Iron man suit">
                </div>
                <div class="form-item">
                    <div class="form-item_top">
                        <label class="form-item_label">Location</label>
                        <span class="form-item_error">{{ errors.first('location') }}</span>
                    </div>
                    <input class="form-item_input"
                           v-model="location"
                           v-validate="'required'"
                           name="location"
                           type="text"
                           placeholder="For example: Los Angeles, CA">
                </div>
                <div class="form-item">
                    <label class="form-item_label">Description</label>
                    <textarea class="form-item_input area inbox_description"
                              v-model="description"
                              name="description"
                              placeholder="For example: Iron man suit"></textarea>
                </div>
                <div class="form-item">
                    <label class="form-item_label">Photo</label>
                    <div class="form-item_file">
                        <div class="form-item_file-add">
                            <input type="file" accept="image/x-png,image/gif,image/jpeg"
                                   @change="uploadFile"
                                   class="form-item_file-input">
                        </div>
                        <img v-if="tmpUrl" :src="tmpUrl" class="form-item_file-result">
                    </div>
                </div>
                <div class="form-item">
                    <el-dropdown trigger="click" @command="dropdown" class="dropdown"
                                 placement="bottom-start">
                      <span class="el-dropdown-link dropdown_button">
                        {{categoryButton}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown" class="dropdown_list">
                            <el-dropdown-item
                                    v-for="cat in categories"
                                    :key="cat.value"
                                    :command="cat.value">{{cat.title}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="form-item">
                    <label class="form-item_label">Price</label>
                    <input class="form-item_input"
                           v-model="price"
                           name="price"
                           @keypress="isNumber($event)"
                           type="text"
                           placeholder="For example: 500">
                </div>
                <div class="btn-big inbox_button" @click.once="add()">Submit</div>
                <p class="inbox_error">{{errorMessage}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import global from '../mixins/global'
    import firebase from "firebase/app";
    import "firebase/database";
    import "firebase/storage";


    export default {
        name: 'Inbox',
        mixins: [global],
        data: () => ({
            loading: false,
            title: '',
            location: '',
            description: '',
            price: '',
            category: '',
            file: null,
            tmpUrl: '',
            errorMessage: ''
        }),
        methods: {
            uploadFile(e) {
                this.file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(this.file);
                reader.onload = () => {
                    this.tmpUrl = reader.result;
                };
            },
            dropdown(value) {
                this.category = value;
            },
            isNumber: function (evt) {
                let charCode = evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            },
            add() {
                if (this.title && this.location
                    && this.category
                    && this.price
                    && this.file
                    && this.file instanceof File) {
                    this.loading = true;
                    // upload file
                    let storageRef = firebase.storage().ref();
                    let child = storageRef.child(`images/${this.getFilename}`);
                    child.put(this.file).then(() => {
                        child.getDownloadURL().then((url) => {
                            // save item
                            const postListRef = firebase.database().ref('catalog');
                            const newPostRef = postListRef.push();
                            newPostRef.set({
                                title: this.title,
                                location: this.location,
                                description: this.description,
                                price: this.price,
                                img: url,
                                category: this.category
                            }).then(() => {
                                this.$router.push({name: 'home'});
                            });
                        });
                    });
                } else {
                    this.errorMessage = 'fill in all fields except description';
                }
            }
        },
        computed: {
            categoryButton() {
                return this.category ? this.custom.find(this.categories, {value: this.category}).title : 'Select category';
            },
            getFilename() {
                return Math.random().toString(36).substring(2, 15)
                    + Math.random().toString(36).substring(2, 15);
            }
        }
    }
</script>

<style lang="scss">
    .inbox {
        @media screen and(min-width: 600px) {
            padding-left: 16px;
            padding-right: 16px;
            padding-top: 34px;
        }

        @media screen and(min-width: 1024px) {
            padding-bottom: 95px;
        }

        .inbox_title {
            font-size: 22px;
            line-height: 25px;
            color: $black_2;
            text-align: center;
            margin-bottom: 24px;
            font-weight: 400;
        }

        .inbox_container {
            position: relative;
            max-width: 1136px;
            margin: 0 auto;
            background: $white;
            overflow: hidden;

            @media screen and(min-width: 600px) {
                padding-left: 16px;
                padding-right: 16px;
                border-radius: 7px;
                box-shadow: 0 2px 42px rgba(0, 0, 0, 0.111233);
            }
        }

        .inbox_form {
            position: relative;
            max-width: 696px;
            margin: 0 auto;
            padding: 36px 16px 32px 16px;
        }

        .inbox_description {
            height: 120px;

            @media screen and(min-width: 600px) {
                height: 183px;
            }
        }

        .inbox_button {
            max-width: 377px;
            margin: 32px auto 0;
        }

        .form-item {
            margin-bottom: 24px;
        }

        .inbox_loading {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 4;
            background: rgba(0, 0, 0, 0.5);
        }

        .inbox_loading-icon {
            display: block;
            width: 50px;
            height: 50px;

            @media screen and (min-width: 768px) {
                width: 100px;
                height: 100px;
            }
        }

        .inbox_error {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 10px;
            z-index: 1;
            font-size: 14px;
            color: $red;
            text-align: center;
        }
    }
</style>