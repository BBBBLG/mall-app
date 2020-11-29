<template>
  <div class="products-list">
    <!-- 搜索 -->
    <search-box @submit="searchSubmit" :data="categoryList" />
    <a-button class="addProduct" @click="addPrduct">新增商品</a-button>
    <!-- 表格 -->
    <producet-table
      :data="tableData"
      :page="page"
      @change="changePage"
      :categoryList="categoryList"
      @edit="editProduct"
      @remove="removeProduct"
    />
  </div>
</template>

<script>
import searchBox from '@/components/search.vue';
import producetTable from '@/components/producetTable.vue';
import producetApi from '@/api/producet';
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },
  components: {
    searchBox,
    producetTable,
  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
      this.getTableData();
    },
    getTableData() {
      producetApi
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          this.page.total = res.total;
          this.tableData = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryObj[item.category].name,
          }));
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '操作提示',
        cancelText: '取消',
        okText: '确定删除',
        content: () => (
          <div style="color:red;">{`确认删除ID为${record.id}的商品吗？`}</div>
        ),
        onOk: () => {
          producetApi
            .remove({
              id: record.id,
            })
            .then(() => {
              this.$message.success('删除成功');
              this.getTableData();
            });
        },
        class: 'confiirm-box',
      });
    },
    addPrduct() {
      this.$router.push({
        name: 'ProductAdd',
      });
    },
  },
};
</script>

<style lang="less">
.products-list {
  position: relative;
  .addProduct {
    position: absolute;
    top: 14px;
    right: 35px;
  }
}
.remove {
  margin-left: 5px;
}
</style>
