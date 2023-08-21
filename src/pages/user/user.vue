<template>
  <view class="user-content">
    <NavBarComponent :title="title"></NavBarComponent>
    <view class="user-card bgc1">
      <view class="user-info">
        <image src="../../static/20230815221417.jpg" mode="scaleToFill" class="avatar"></image>
        <view class="user-name">
          <text>来回三五七</text>
          <text class="phone">17671612595</text>
        </view>
      </view>
      <view class="update">修改信息</view>
    </view>
    <view class="user-data bgc1">
      <uni-section title="表单校验" type="line">
        <view class="example">
          <!-- 基础表单校验 -->
          <uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
            <uni-forms-item label="账号" required name="userName">
              <input class="uni-input" type="text" v-model="valiFormData.userName" placeholder="请输入账号" />
            </uni-forms-item>
            <uni-forms-item label="密码" required name="password">
              <input class="uni-input" password type="text" v-model="valiFormData.password" placeholder="这是一个密码输入框" />
            </uni-forms-item>
          </uni-forms>
          <button type="primary" @click="submit()">提交</button>
        </view>
      </uni-section>
    </view>
    <view class="user-operate bgc1">
      <view class="operate-item">
        <image src="../../static/icon/关于.png" mode="scaleToFill" class="operate-icon" />
        <text>关于</text>
      </view>
      <view class="operate-item">
        <image src="../../static/icon/反馈.png" mode="scaleToFill" class="operate-icon" />
        <text>反馈</text>
      </view>
      <view class="operate-item" @click="toPage('update-log')">
        <image src="../../static/icon/日志.png" mode="scaleToFill" class="operate-icon" />
        <text>更新日志</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBarComponent from '../components/nav-bar.vue';
import { loginPost } from '../../core/api-service/api/login';

const title = ref('我的');
const toPage = (path: string) => {
  console.log(path);
  uni.navigateTo({ url: path });
};

// 校验规则
const rules = {
  name: {
    rules: [
      {
        required: true,
        errorMessage: '姓名不能为空',
      },
    ],
  },
  age: {
    rules: [
      {
        required: true,
        errorMessage: '年龄不能为空',
      },
      {
        format: 'number',
        errorMessage: '年龄只能输入数字',
      },
    ],
  },
};
// 校验表单数据
const valiFormData = {
  userName: '',
  password: '',
};

// 提交登录
const submit = async () => {
  let res = await loginPost(valiFormData);
  console.log('res', res);
};
</script>

<style scoped lang="scss">
@import '../../shared//style.scss';
.user-content {
  height: 100vh;
  background-color: #1d2129;
  color: #f8f8f8;
}

.bgc1 {
  background-color: #4e5969;
}

.user-card {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .user-info {
    display: flex;
    font-size: 16px;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 6px;
    }
  }
  .update {
    font-size: 14px;
    padding: 6px;
    border: 1px solid #f8f8f8;
    border-radius: 16px;
  }

  .user-name {
    display: inline-grid;
    .phone {
      font-size: 14px;
      padding-top: 4px;
    }
  }
}
.user-data {
  margin: 12px;
  padding: 20px;
  border-radius: 20px;
}
.user-operate {
  margin: 12px;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .operate-item {
    text-align: center;
    text {
      display: block;
    }
  }
  .operate-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
  }
}
</style>
