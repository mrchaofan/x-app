<template>
    <div class="screen-record-control-panel">
        <div class="screen-record-control-panel-flex-layer">
            <div class="screen-record-control-panel-format">
                <div class="screen-record-control-panel-format-flex-layer">
                    <div class="format-text">
                        MP4
                    </div>
                    <div class="format-icon">
                        <img :src="MORE">
                    </div>
                </div>
            </div>
            <div class="spliter">
                <img :src="SPLITER">
            </div>
            <div class="record-status">
                <div class="record-status-flex-layer">
                    <div class="record-status-icon">
                        <img :src="PLAY">
                    </div>
                    <div class="record-status-text">
                        <div class="record-status-text-text">开始录制</div>
                    </div>
                </div>
            </div>
            <div class="record-length">
                <div class="record-length-inner">
                    <div class="record-length-inner-inner">
                        <div class="record-length-text">
                            00:11/10:00
                        </div>
                    </div>
                </div>
            </div>
            <div class="record-btn">
                <div class="btn-wrapper">
                    <img :src="CONFIRM">
                </div>
            </div>
            <div class="record-btn">
                <div class="btn-wrapper">
                    <img :src="CANCEL">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import More from './more.svg'
import Spliter from './spliter.svg'
import Play from './play.svg'
import Confirm from './confirm.svg'
import Cancel from './cancel.svg'


export default {
    name: 'ScreenRecordControlPanel',
    data() {
        return {
            MORE: More,
            SPLITER: Spliter,
            PLAY: Play,
            CONFIRM: Confirm,
            CANCEL: Cancel,
        }
    }
}
</script>

<style scoped lang="scss">
.screen-record-control-panel {
    display: inline-flex;
    padding: 6px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    border-radius: 8px;
    border: 1px solid var(--ato-white-3, #EBEEF5);
    background: #FFF;

    /* 投影-S2 */
    box-shadow: 0 2px 16px 2px rgba(73, 83, 102, 0.16);
    box-sizing: border-box;
    user-select: none;

    .screen-record-control-panel-flex-layer {
        display: flex;
        align-items: center;
        gap: 8px;
        align-self: stretch;

        .screen-record-control-panel-format {
            display: flex;
            padding: 4px;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;

            border-radius: 4px;

            &:hover {
                background: var(--ato-white-2, #F5F7FA);
            }

            .screen-record-control-panel-format-flex-layer {
                display: flex;
                align-items: center;
                gap: 4px;
                align-self: stretch;

                .format-text {
                    color: var(--ato-gray-2, #030B1A);
                    font-family: "PingFang SC";
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 16px;
                    /* 114.286% */
                }

                .format-icon {
                    width: 16px;
                    height: 16px;

                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .spliter {
            width: 1px;
            height: 18px;

            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

        .record-status {
            display: flex;
            padding: 4px;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            border-radius: 4px;

            &:hover {
                background: var(--ato-white-2, #F5F7FA);
            }

            .record-status-flex-layer {
                display: flex;
                align-items: center;
                gap: 4px;
                align-self: stretch;

                .record-status-icon {
                    width: 20px;
                    height: 20px;

                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }

                .record-status-text {
                    display: flex;
                    align-items: center;
                    gap: 4px;

                    .record-status-text-text {
                        color: var(--ato-gray-2, #030B1A);
                        font-family: "PingFang SC";
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 16px;
                        /* 114.286% */
                    }
                }
            }
        }

        .record-length {
            display: flex;
            padding: 4px;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;

            .record-length-inner {
                display: flex;
                align-items: center;
                gap: 8px;

                .record-length-inner-inner {
                    display: flex;
                    align-items: center;
                    gap: 4px;

                    .record-length-text {
                        color: var(--ato-gray-2, #030B1A);
                        font-family: "PingFang SC";
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 16px;
                        /* 114.286% */
                    }
                }
            }
        }

        .record-btn {
            display: flex;
            padding: 4px;
            align-items: center;
            gap: 10px;
            border-radius: 4px;

            &:hover {
                background: var(--ato-white-2, #F5F7FA);
            }

            .btn-wrapper {
                width: 20px;
                height: 20px;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }


        }
    }
}
</style>