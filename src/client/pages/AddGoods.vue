<style scoped>
    .add_goods {
        width: 50rem;
        padding: 25px 10px;
    }
</style>

<template>
    <div class="add_goods">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="商品标题" prop="title">
                <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
            </FormItem>
            <FormItem label="商品价格" prop="price">
                <InputNumber :min="0" v-model="formValidate.price"></InputNumber>
            </FormItem>
            <FormItem label="商品介绍" prop="content">
                <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 3,maxRows: 6}" placeholder="请输入商品描述"></Input>
            </FormItem>
            <FormItem label="提供者id" prop="user">
                <Input v-model="formValidate.user" disabled></Input>
            </FormItem>
            <FormItem label="商品图片" prop="imgPath">
                <Upload
                        type="drag"
                        :action="uploadPath"
                        v-model="formValidate.imgPath"
                        :on-success="uploadSuccess"
                        :on-error="uploadError">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                    </div>
                </Upload>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import API from '../http/API'

    export default {
        name: "add-goods",
        data() {
            return {
                formValidate: {
                    title: '',
                    price: 1,
                    content: '',
                    imgPath: '',
                    user: '5b2e60948282493364918dbd'
                },
                ruleValidate: {
                    title: [
                        {required: true, message: '商品名称是必需的', trigger: 'blur'}
                    ],
                    price: [
                        {
                            validator: (rule, value, callback) => {
                                if (!value) {
                                    return callback(new Error('Age cannot be empty'));
                                }
                                if (!Number.isInteger(value)) {
                                    callback(new Error('Please enter a numeric value'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur', required: true
                        },
                    ],
                    content: [
                        {required: true, message: '商品介绍是必需的', trigger: 'blur'},
                        {type: 'string', min: 5, max: 100, message: '介绍介于5到100个字', trigger: 'blur'}
                    ],
                    user: [
                        {required: true, message: '商品名称是必需的', trigger: 'blur'}
                    ],
                    imgPath: [
                        {
                            validator: (rule, value, callback) => {
                                if (this.formValidate.imgPath === '') {
                                    callback(new Error('请上传照片'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur', required: true
                        },
                    ],
                },
                selectLoading: false,
                options: [],
                uploadPath: API.upload
            }
        },
        created() {

        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.addGoods();
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            },
            uploadSuccess(res) {
                if (Number(res.code) === 200) {
                    this.formValidate.imgPath = res.imgPath;
                }
            },
            uploadError(err) {
                console.log(err);
            },
            addGoods() {
                this.$http({
                    method: 'post',
                    url: API.addGoods,
                    data: this.formValidate,
                }).then(res => {
                    if (res.data.code === 200) {
                        this.$Message.success('保存成功');
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                }).catch(err => {
                    this.$Message.error('提交错误');
                })
            }
        }
    }
</script>
