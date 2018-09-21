<template>
    <div class="index">
        <Menu mode="horizontal" theme="primary" active-name="1-1">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    商品管理
                </template>
                <MenuItem name="1-1" @click.native="toTopics('online')">线上商品</MenuItem>
                <MenuItem name="1-2" @click.native="toTopics('temp')">待审核商品</MenuItem>
                <MenuItem name="1-3" @click.native="toAddGoods">添加商品</MenuItem>
            </Submenu>
            <MenuItem name="2">
                <Icon type="ios-people"></Icon>
                留言管理
            </MenuItem>
            <MenuItem name="3">
                <Icon type="settings"></Icon>
                综合设置
            </MenuItem>
        </Menu>
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: "Index",
        data() {
            return {}
        },
        created() {
        },
        methods: {
            toTopics(type) {
                this.$router.push({name: 'Topics', params: {type}});
            },
            toAddGoods() {
                this.$router.push({name: 'AddGoods'});
            }
        }
    }
</script>

<style scoped>

</style>
