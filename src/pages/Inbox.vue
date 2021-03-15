<template>
    <div class="page inbox">
        <div class="inbox_container">
            <div class="inbox_form">
                <h1 class="inbox_title">Add product</h1>
                <div class="form-item">
                    <div class="form-item_top">
                        <label class="form-item_label">Title <span class="required">*</span></label>
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
                        <label class="form-item_label">Location <span class="required">*</span></label>
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
                            <input type="file" accept="image/x-png,image/gif,image/jpeg" class="form-item_file-input">
                        </div>
                    </div>
                </div>
                <div class="form-item">
                    <el-dropdown trigger="click" @command="dropdown" class="dropdown"
                                 placement="bottom-start"
                                 size="medium">
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
                <div class="btn-big inbox_button" @click="add()">Submit</div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase/app";
    import "firebase/database";


    export default {
        name: 'Inbox',
        data: () => ({
            title: '',
            location: '',
            description: '',
            price: '',
            category: '',
            categories: [
                {
                    value: 'category_1',
                    title: 'Category 1'
                },
                {
                    value: 'category_2',
                    title: 'Category 2'
                },
                {
                    value: 'category_3',
                    title: 'Category 3'
                }
            ]
        }),
        methods: {
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
                if (this.title && this.location) {
                    const postListRef = firebase.database().ref('catalog');
                    const newPostRef = postListRef.push();
                    newPostRef.set({
                        title: this.title,
                        location: this.location,
                        description: this.description,
                        price: this.price,
                        img: 'item.png',
                        category: this.category
                    }).then(() => {
                        this.$router.push({name: 'home'});
                    });
                }
            }
        },
        computed: {
            categoryButton() {
                return this.category ? this.custom.find(this.categories, {value: this.category}).title : 'Выберите категорию';
            },
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
            max-width: 1136px;
            margin: 0 auto;
            background: $white;

            @media screen and(min-width: 600px) {
                padding-left: 16px;
                padding-right: 16px;
                border-radius: 7px;
                box-shadow: 0 2px 42px rgba(0, 0, 0, 0.111233);
            }
        }

        .inbox_form {
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
    }
</style>