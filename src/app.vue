<template>
    <transition>
        <div v-cloak class="ln-wrapper" v-show="isShown">
            >
            <div class="ln-bg" @click="isShown = false"></div>
            <div class="ln-body">
                <h2>LINE通知送信</h2>
                <div class="ln-input">
                    <div>
                        <span>
                            送信先
                            <select v-model="room">
                                <option
                                    v-for="room in rooms"
                                    :key="room.id"
                                    :value="room.id"
                                >
                                    {{ room.name }}
                                </option>
                            </select>
                        </span>
                    </div>
                    <div class="ls-notice">
                        <toggle-button
                            v-model="alart"
                            :sync="true"
                        ></toggle-button>
                        <label class="ls-notice-label" @click="alart = !alart"
                            >PUSH通知送信</label
                        >
                    </div>
                </div>
                <div class="ln-ctrl">
                    <input
                        type="button"
                        value="送信"
                        class="ln-b ln-yes"
                        @click="send"
                    />
                    <input
                        type="button"
                        value="キャンセル"
                        class="ln-b ln-no"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from "axios";
import ToggleButton from "vue-js-toggle-button";
Vue.use(ToggleButton);

export default {
    props: {
        rooms: {
            type: Array,
            required: true,
        },
        userid: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        EndPoint: {
            type: String,
            // default: "/contents/line-notify/t",  
            default: "/HumenFinder/php/ctrl/LINEMessage",
        },
        message: {
            type: String,
            required: false,
            default: "TEST",
        },
    },
    data() {
        return {
            room: "",
            alart: true,
            isShown: false,
        };
    },
    methods: {
        show() {
            this.isShown = true;
        },
        hide() {
            this.isShown = false;
        },
        send() {
            let body = {
                Method: "sendMsg",
                Body: {
                    TalkRoomID: this.room,
                    Message: this.message,
                    NotificationDisabled: String(!this.alart),
                },
                UserID: this.userid,
            };
            axios
                .post(this.EndPoint,body , {
                    headers: {
                        Auth: "Bearer " + this.token,
                        Authorization: "Bearer " + this.token,
                    },
                })
                .then((res) => {
                    this.hide();
                });
        },
    },
    watch: {
        rooms: function (newVal, oldVal) {
            this.room = newVal[0].id;
        },
    },
};
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s;
}

.v-enter,
.v-leave-to {
    opacity: 0;
}
.ln-wrapper {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .ln-bg {
        width: 100%;
        height: 100%;
        background-color: rgba(30, 30, 30, 0.9);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5000;
    }
    .ln-body {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 98%;
        max-width: 400px;
        padding: 15px;
        background-color: #fff;
        z-index: 5001;
        border-radius: 5px;
    }
    .ln-input {
        border-bottom: 2px solid #e1e6ea;
        padding-bottom: 15px;
    }
    .ln-ctrl {
        padding: 15px 0 0;
        display: flex;
        justify-content: space-between;
    }
    .ln-b {
        display: inline-block;
        height: 40px;
        min-width: 80px;
        text-align: center;
        border-radius: 4px;
        font-weight: 700;
        font-size: 16px;
        padding: 6px 20px;
        cursor: pointer;
        &.ln-yes {
            background-color: white;
            color: #0096d9;
            border: #0096d9 2px solid;
        }
        &.ln-no {
            background-color: #0096d9;
            color: white;
            border: none;
        }
    }
    .ls-notice {
        display: flex;
        align-items: center;
        .ls-notice-label {
            margin-left: 10px;
        }
    }
}
</style>
