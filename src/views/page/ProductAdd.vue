<template>
  <div class="product-detail">
    <a-steps :current="current" class="product-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <besic-detail v-if="current === 0" @next="next" :form="form" />
      <sale-detail
        v-else-if="current === 1"
        @next="next"
        @prev="prev"
        :form="form"
      />
    </div>
  </div>
</template>

<script>
import BesicDetail from '@/components/besicDetail.vue';
import saleDetail from '@/components/saleDetail.vue';
import producetApi from '@/api/producet';

export default {
  data() {
    return {
      form: {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: [],
        price: '',
        price_off: '',
        unit: '',
        inventory: '',
        images: [],
      },
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },

  components: {
    BesicDetail,
    saleDetail,
  },
  created() {
    const { id } = this.$route.params;
    if (id) {
      // 读取商品详情
      producetApi.detail(id).then((res) => {
        this.form = res;
      });
    }
  },
  methods: {
    next(form) {
      this.form = {
        ...this.form,
        form,
      };
      if (this.current === 1) {
        // 提交数据
        if (this.$route.params.id) {
          // 编辑
          producetApi.edit(this.form).then(() => {
            this.$message.success('修改成功！');
            this.$router.push({
              name: 'ProductList',
            });
          });
        } else {
          // 新增
          producetApi.add(this.form).then(() => {
            this.$message.success('提交成功！');
            this.$router.push({
              name: 'ProductList',
            });
          });
        }
      } else {
        this.current += 1;
      }
    },
    prev() {
      this.current -= 1;
    },
  },
};
</script>
<style lang="less" scoped>
.product-detail {
  .product-steps {
    width: 50%;
    margin: 20px auto;
  }
}
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
