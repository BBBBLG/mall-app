<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="page"
    @change="changePage"
  >
    <div slot="operation" slot-scope="text, record">
      <a-button @click="editProduct(record)">编辑</a-button>
      <a-button @click="removeProduct(record)" class="remove">删除</a-button>
    </div>
  </a-table>
</template>
<script>

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: 300,
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    // dataIndex: 'category',
    key: 'category',
    width: 100,
    // ellipsis: true,
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    width: 80,
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
    width: 100,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '库存',
    dataIndex: 'inventory',
    key: 'inventory',
    width: 80,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    width: 180,
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  data() {
    return {
      columns,
    };
  },
  props: ['data', 'page'],
  computed: {
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    changePage(page) {
      this.$emit('change', page);
    },
    editProduct(record) {
      this.$emit('edit', record);
    },
    removeProduct(record) {
      this.$emit('remove', record);
    },
  },
};
</script>
