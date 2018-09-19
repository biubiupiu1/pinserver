<template>
  <div class="topics">
    <Table stripe @on-selection-change="selectionChange" :current.sync="current" :columns="columns" :data="data"></Table>
    <div class="btn">
      <Button type="error" v-if="isCheck" @click="hanDel">删除选择</Button>
    </div>
    <div class="page">
      <Page :total="total" show-total :page-size="pageSize" @on-change="changePage"></Page>
    </div>
    <Modal v-model="isModalEdit" width="360">
      <p slot="header" style="color:#55a2f3;text-align:center">
        <span>编辑</span>
      </p>
      <div style="text-align:center">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="ans">
            <Input type="text" v-model="formInline.ans" placeholder="题目">
            </Input>
          </FormItem>
          <FormItem prop="des">
            <Input type="text" v-model="formInline.des" placeholder="描述">
            </Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="isModalLoading" @click="handleSubmit('formInline')">保存</Button>
      </div>
    </Modal>
    <Modal v-model="isModalDel" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>删除后不可恢复</p>
        <p>是否需要删除</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="isModalLoading" @click="delMany">Delete</Button>
      </div>
    </Modal>
    <Modal v-model="isModalAdd" width="360">
      <p slot="header" style="color:#47cb89;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>添加确认</span>
      </p>
      <div style="text-align:center">
        <p>是否需要添加</p>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long :loading="isModalLoading" @click="addTopic">Add</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import API from '../../http/API'

  export default {
    name: "topic",
    data() {
      return {
        columns: [
          {
            title: '题目',
            key: 'ans',
            width: 300,
          },
          {
            title: '描述',
            key: 'des',
          },
          {
            title: '操作',
            key: 'action',
            width: 400,
            align: 'center',
            render: (h, params) => {
              let dom = [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.isModalAdd = true;
                      this.waitAdd = params.row;
                    }
                  }
                }, '添加'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.formInline.ans = params.row.ans;
                      this.formInline.des = params.row.des.split('，')[1];
                      this.formInline._id = params.row._id;
                      this.isModalEdit = true;
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.isModalDel = true;
                      this.waitDel = [params.row];
                    }
                  }
                }, '删除'),
              ];
              if (this.type === 'online') {
                dom.shift();
              }
              return h('div', dom);
            }
          },
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
        ],
        data: [],
        total: 0,
        current: 1,
        isCheck: false,
        isModalDel: false,
        isModalAdd: false,
        isModalEdit: false,
        isModalLoading: false,
        selection: [],
        waitDel: [],
        waitAdd: {},
        waitEdit: {},
        formInline: {
          ans: '',
          des: '',
          _id: '',
        },
        ruleInline: {
          ans: [
            {required: true, message: '此项必填', trigger: 'blur'},
            {type: 'string', max: 6, message: '长度超过6了', trigger: 'blur'}
          ],
          des: [
            {required: true, message: '此项必填', trigger: 'blur'},
            {type: 'string', max: 6, message: '长度超过6了', trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      pageSize() {
        return Math.ceil(document.body.clientHeight / 60);
      },
    },
    created() {
      this.type = this.$route.params.type;
      //this.getTopics();
    },
    watch: {
      '$route'(val) {
        this.type = val.params.type;
        this.getTopics();
      }
    },
    methods: {
      getTopics(page) {
        let _page = page || 1;
        this.$http.post(API.get_topics, {
          type: this.type,
          page: _page,
          limit: this.pageSize
        })
          .then(function (res) {
            this.total = res.data.data.total;
            this.data = res.data.data.lists;
          }.bind(this))
          .catch(function (err) {
            console.log(err);
          });
      },
      changePage(page) {
        this.getTopics(page);
        this.isCheck = false;
      },
      selectionChange(selection) {
        this.isCheck = selection.length !== 0;
        this.selection = selection;
      },
      removeLists(data) {
        data.forEach((e) => {
          this.data.splice(this.data.findIndex(item => item._id === e._id), 1)
        });
      },
      hanDel() {
        this.isModalDel = true;
        this.waitDel = this.selection;
      },
      delMany() {
        let id = [];
        this.waitDel.forEach((e) => {
          id.push(e._id);
        });
        this.isModalLoading = true;
        this.$http.post(API.del_topics, {
          type: this.type,
          id
        })
          .then(function (res) {
            if (res.data.code === 100) {
              this.$Message.success('删除成功');
              this.removeLists(this.waitDel);
            } else {
              this.$Message.error('删除失败');
            }
            this.isModalLoading = false;
            this.isModalDel = false;
          }.bind(this))
          .catch(function (err) {
            this.$Message.error('删除失败');
          });
      },
      addTopic() {
        this.isModalLoading = true;
        this.$http.post(API.add_topic, Object.assign({type: 'online'}, this.waitAdd))
          .then(function (res) {
            switch (res.data.code) {
              case 100:
                this.$Message.success('添加成功');
                this.isModalDel = false;
                this.removeLists([this.waitAdd]);
                break;
              case 101:
                this.$Message.warning('题目重复');
                break;
              case 102:
                this.$Message.warning('题目或描述过长');
                break;
              default:
                this.$Message.error('添加失败');
            }
            this.isModalLoading = false;
            this.isModalAdd = false;
          }.bind(this))
          .catch(function (err) {
            this.$Message.error('添加失败');
          });
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('请填完整表单');
          }
        })
      }
    }
  }
</script>

<style scoped>
  .page {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }

  .btn {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    min-height: 5rem;
  }

  .btn button {
    flex-shrink: 0;
    flex-grow: 0;
    margin: 1rem 1rem 0 0;
  }
</style>
