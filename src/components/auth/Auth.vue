<template>
    <div class="auth">
        <Register v-if="showRegister"/>
        <Login v-else/>
        <div class="auth_toggle">
            <p v-if="!showRegister">I have no account,
                <span class="auth_toggle-btn"
                      @click="authToggle">
                    REGISTER NOW
                </span>
            </p>
            <p v-else>I already have an account,
                <span class="auth_toggle-btn"
                      @click="authToggle">
                    LOG IN
                </span>
            </p>
        </div>
    </div>
</template>

<script>
    import Login from './Login';
    import Register from './Register';

    export default {
        name: 'Auth',
        components: {
            Login,
            Register
        },
        data: () => ({
            showRegister: false
        }),
        methods: {
            authToggle() {
                this.showRegister = !this.showRegister;
            }
        }
    }
</script>

<style lang="scss">
    .auth {
        width: 100%;
        max-width: 457px;
        padding-left: 16px;
        padding-right: 16px;

        .auth_form {
            position: relative;
            width: 100%;
            background: $white;
            box-shadow: 0 2px 42px rgba(0, 0, 0, 0.111233);
            border-radius: 7px;
            margin-bottom: 21px;
            padding: 25px 24px 21px 24px;
        }

        .auth_form-error {
            position: absolute;
            bottom: 2px;
            left: 0;
            right: 0;
            z-index: 2;
            font-size: 12px;
            color: $red;
            text-align: center;
        }

        .auth_title {
            font-size: 22px;
            line-height: 25px;
            color: $black_2;
            text-align: center;
            margin-bottom: 17px;

            @media screen and (min-width: 600px) {
                margin-bottom: 32px;
            }
        }

        .form-item {
            margin-bottom: 15px;
        }

        .auth_toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 76px;
            background: $white;
            box-shadow: 0 2px 42px rgba(0, 0, 0, 0.111233);
            border-radius: 7px;
            color: $black_5;
            font-size: 14px;
            line-height: 16px;
            text-align: center;
            letter-spacing: 0.4px;
        }

        .auth_toggle-btn {
            text-transform: uppercase;
            color: $green;
            cursor: pointer;
        }

        .auth_note {
            display: block;
            width: fit-content;
            margin-left: auto;
            font-size: 14px;
            line-height: 16px;
            text-align: right;
            letter-spacing: 0.4px;
            color: $gray_4;
            padding-top: 5px;
            padding-bottom: 1px;
            cursor: pointer;
        }
    }
</style>