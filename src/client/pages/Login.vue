<template>
  <div class="login">
    <div class="login_con centerY">
      <Card style="width: 32rem">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登陆
        </p>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="userName">
            <Input type="text" v-model="formInline.userName" placeholder="Username">
            <Icon type="person" size="15" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="locked" size="15" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button class="login_btn" type="primary" @click="handleSubmit('formInline')">Signin</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>

  import API from '../http/API'
  export default {
    name: 'Login',
    data() {
      return {
        formInline: {
          userName: 'biubiupiu',
          password: '199815'
        },
        ruleInline: {
          userName: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      login() {
        this.$http.post(API.login, this.formInline)
          .then(function (res) {
            console.log(res);
            if(res.data.code === 100) {
              localStorage.setItem('token', res.data.token);
              this.$router.push('/')
            }
          }.bind(this))
          .catch(function (err) {
            console.log(err);
          });
      }
    }
  }
</script>

<style scoped>
  .login {
    background: url("../assets/login_bg.jpg") center;
    width: 100%;
    height: 100%;
    background-size: cover;
    position: relative;
  }

  .login_con {
    position: absolute;
    right: 12rem;
  }

  .login_btn {
    width: 100%;
  }
</style>
