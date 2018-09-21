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
                <Input v-model="formValidate.title" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="商品价格" prop="price">
                <InputNumber :min="1" v-model="formValidate.price"></InputNumber>
            </FormItem>
            <FormItem label="商品介绍" prop="content">
                <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="商品图片" prop="imgPath">
                <Upload
                        multiple
                        type="drag"
                        action="//jsonplaceholder.typicode.com/posts/"
                        v-model="formValidate.imgPath">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>Click or drag files here to upload</p>
                    </div>
                </Upload>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "add-goods",
        data() {
            return {
                formValidate: {
                    title: '',
                    price: 1,
                    content: '',
                    imgPath: ''
                },
                ruleValidate: {
                    title: [
                        {required: true, message: '商品名称是必需的', trigger: 'blur'}
                    ],
                    price: [
                        {required: true, message: '商品价格是必需的', trigger: 'blur'},
                        {type: 'number', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '商品介绍是必需的', trigger: 'blur'},
                        {type: 'string', min: 5, max: 50, message: '介绍介于5到50个字', trigger: 'blur'}
                    ],
                    img: [
                        {
                            validator: (rule, value, callback) => {
                                if (this.formInline.img === '') {
                                    callback(new Error('请上传照片'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'blur', required: true
                        },
                    ],
                }
            }
        },
        created() {

        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
