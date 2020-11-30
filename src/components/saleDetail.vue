<template>
  <div class="sail-detail">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="商品售价" prop="price" required>
        <a-input v-model="form.price" placeholder="请输入商品售价" />
      </a-form-model-item>
      <a-form-model-item label="商品折扣价" prop="price_off">
        <a-input v-model="form.price_off" placeholder="请输入商品折扣价" />
      </a-form-model-item>

      <a-form-model-item label="商品库存" required prop="inventory">
        <a-input v-model="form.inventory" placeholder="请输入商品库存" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit" required>
        <a-input v-model="form.unit" placeholder="请输入商品库存" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prpo="images">
        <a-upload
          :action="
            'https://mallapi.duyiedu.com/upload/images?appkey=' +
            $store.state.user.appkey
          "
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">上传图片</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
        >
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item label="" :wrapperCol="{ span: 24 }">
        <a-button type="default" @click="prev">返回</a-button>
        <a-button type="primary" @click="next" style="margin-left: 50px"
          >提交</a-button
        >
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      labelCol: { span: 8 },
      wrapperCol: { span: 9 },
      rules: {},
      fileList: [],
    };
  },
  props: ['form'],
  created() {
    if (this.form.images.length > 0) {
      this.fileList = this.form.images.map((item, index) => ({
        uid: 'index',
        name: `image-${index}.png`,
        status: 'done',
        url: item,
      }));
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      const obj = file;
      if (!file.url && !file.preview) {
        obj.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ file, fileList }) {
      if (file.status === 'done') {
        this.form.images.push(file.response.data.url);
      } else if (file.status === 'remove') {
        const { url } = file.response.data;
        this.form.images = this.form.images.filter((item) => item !== url);
      }
      this.fileList = fileList;
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
    prev() {
      this.$emit('prev');
    },
  },
};
</script>

<style>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
