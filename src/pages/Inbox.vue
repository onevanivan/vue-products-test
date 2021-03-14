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
                            <input type="file" class="form-item_file-input">
                        </div>
                    </div>
                </div>
                <div class="form-item">
                    <label class="form-item_label">Price</label>
                    <input class="form-item_input"
                           v-model="price"
                           name="price"
                           type="text"
                           placeholder="For example: 500">
                </div>
                <div class="btn-big inbox_button">Submit</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Inbox',
        data: () => ({
            title: '',
            location: '',
            description: '',
            price: ''
        })
    }
</script>

<style lang="scss">
    .inbox {
        padding-top: 34px;

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
            box-shadow: 0 2px 42px rgba(0, 0, 0, 0.111233);
            border-radius: 7px;
        }

        .inbox_form {
            max-width: 696px;
            margin: 0 auto;
            padding: 36px 16px 32px 16px;
        }

        .inbox_description {
            height: 183px;
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