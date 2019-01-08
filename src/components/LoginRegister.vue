<template>
  <div class="login_register">
    <el-dialog title="" :visible.sync="isShowModal" width="30%" center>
      <el-tabs v-model="activeName" class="expand_tab" @tab-click="handleClick">
        <el-tab-pane label="登录" name="login">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top" size="small">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" maxlength="20" type="password"></el-input>
            </el-form-item>
            <el-form-item size="medium" class="formitem_center">
              <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="ruleForm1" :rules="rules1" ref="ruleForm" label-width="100px" label-position="top" size="small">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm1.name" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm1.password" maxlength="20" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordConfirm">
              <el-input v-model="ruleForm1.passwordConfirm" maxlength="20" type="password"></el-input>
            </el-form-item>
            <el-form-item size="medium" class="formitem_center">
              <el-button type="success" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'LoginRegister',
    props: {
      isShowModal: Boolean,
      activeName:{
        type:String,
        default: 'first'
      }
    },
    data() {
      return {
        ruleForm: {
          name: '',
          password: ''
        },
        ruleForm1: {
          name: '',
          password: '',
          passwordConfirm: ''
        },
        rules: {
          name: [{
              required: true,
              message: '请输入用户名/邮箱',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 4 到 20 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请填写密码',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }
          ]
        },
        rules1: {
          name: [{
              required: true,
              message: '请输入用户名/邮箱',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 4 到 20 个字符',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请填写密码',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }
          ],
          passwordConfirm: [{
              required: true,
              message: '请填写密码',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      login(){

      },
      register(){

      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>

<style lang="less" scoped>
  @import '../assets/css/default.less';

  .login_register {
    .expand_tab {
      /deep/ .el-tabs__nav {
        width: 100%;

        .el-tabs__item {
          width: 50%;
          padding: 0;
          text-align: center;
        }
      }
    }

    .formitem_center {
      text-align: center;
    }
  }

</style>
