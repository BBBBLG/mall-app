<template>
  <div class="besic-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="标题" prop="title" required>
        <a-input v-model="form.title" placeholder="请输入商品标题" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc" required>
        <a-input
          v-model="form.desc"
          type="textarea"
          placeholder="请输入商品描述"
        />
      </a-form-model-item>

      <a-form-model-item label="商品类目" required prop="category">
        <a-select
          v-model="form.category"
          placeholder="请选择商品二级类目"
          @change="categoryChange"
        >
          <a-select-option v-for="c in categoryList" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="请选择商品二级类目">
          <a-select-option v-for="c in categoryItems" :key="c" :value="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
        <a-select
          mode="tags"
          placeholder="请选择或输入商品标签"
          :default-value="['包邮，最晚次日达']"
          v-model="form.tags"
        >
          <a-select-option value="包邮，最晚次日达">
            {{ "包邮，最晚次日达" }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="" :wrapperCol="{ span: 24 }">
        <a-button type="primary" @click="next">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import catagoryApi from '@/api/category';

export default {
  data() {
    return {
      // form: {
      //   title: "",
      //   desc: "",
      //   category: "",
      //   c_items: [],
      //   tags: [],
      // },
      rules: {},
      categoryList: [],
      categoryItems: [],
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
  },
  props: ['form'],
  created() {
    catagoryApi.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    categoryChange(category) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) this.categoryItems = this.categoryList[i].c_items;
      }
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        return false;
      });
    },
  },
};
</script>
