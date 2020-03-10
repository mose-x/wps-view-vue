<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      :style='marginStyle'
      v-bind="$attrs"
      small="small"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '../utils/scroll-to'

export default {
  name: 'Pagination',
  data () {
    return {
      marginStyle: {
        marginRight: 0,
        float: 'right'
      }
    }
  },
  mounted () {
  },
  watch: {
  },
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default () {
        return this.$PageSizeRange
      }
    },
    layout: {
      type: String,
      default: 'sizes, total, prev, pager, next'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get () {
        return this.limit
      },
      set (val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('pagination', { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange (val) {
      this.$emit('pagination', { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
}
.pagination-container .el-pagination{
  padding-top: 20px;
}
.pagination-container.hidden {
  display: none;
}
</style>
