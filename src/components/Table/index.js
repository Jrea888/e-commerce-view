import T from 'ant-design-vue/es/table/Table';
import get from 'lodash.get';

export default {
  data() {
    return {
      needTotalList: [],

      selectedRows: [],
      selectedRowKeys: [],

      localLoading: false,
      localDataSource: [],
      localPagination: Object.assign({}, this.pagination)
    };
  },
  props: Object.assign({}, T.props, {
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    data: {
      type: Function,
      required: true
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'default'
    },
    /**
     * alert: {
     *   show: true,
     *   clear: Function
     * }
     */
    alert: {
      type: [Object, Boolean],
      default: null
    },
    rowSelection: {
      type: Object,
      default: null
    },
    /** @Deprecated */
    showAlertInfo: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: String | Boolean,
      default: 'auto'
    },
    // 是否延迟加载,适用场景: 需要加载完其它条件后再去请求接口; 设置为 true 第一次列表不会去执行 loadData
    isLazyLoad: {
      type: Boolean,
      default: false
    },
    /**
     * enable page URI mode
     *
     * e.g:
     * /users/1
     * /users/2
     * /users/3?queryParam=test
     * ...
     */
    pageURI: {
      type: Boolean,
      default: false
    }
  }),
  watch: {
    'localPagination.current'(val) {
      this.pageURI &&
        this.$router.push({
          ...this.$route,
          name: this.$route.name,
          params: Object.assign({}, this.$route.params, {
            pageNo: val
          })
        });
    },
    pageNum(val) {
      Object.assign(this.localPagination, {
        current: val
      });
    },
    pageSize(val) {
      Object.assign(this.localPagination, {
        pageSize: val
      });
    },
    showSizeChanger(val) {
      Object.assign(this.localPagination, {
        showSizeChanger: val
      });
    }
  },
  created() {
    const { pageNo } = this.$route.params;
    const localPageNum = (this.pageURI && pageNo && parseInt(pageNo)) || this.pageNum;
    this.localPagination =
      (['auto', true].includes(this.showPagination) &&
        Object.assign({}, this.localPagination, {
          current: localPageNum,
          pageSize: this.pageSize,
          showTotal: (total) => `共 ${total} 条`,
          showSizeChanger: this.showSizeChanger
        })) ||
      false;
    console.log('this.localPagination', this.localPagination);
    this.needTotalList = this.initTotalList(this.columns);
    !this.isLazyLoad && this.loadData();
  },
  methods: {
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh(bool = false) {
      bool &&
        (this.localPagination = Object.assign(
          {},
          {
            current: 1,
            pageSize: this.pageSize
          }
        ));
      this.loadData();
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData(pagination, filters, sorter) {
      let that = this;
      that.localLoading = true;
      const parameter = Object.assign(
        {
          pageNo: (pagination && pagination.current) || (this.showPagination && this.localPagination.current) || this.pageNum,
          pageSize: (pagination && pagination.pageSize) || (this.showPagination && this.localPagination.pageSize) || this.pageSize
        },
        (sorter && sorter.field && { sortField: sorter.field }) || {},
        (sorter && sorter.order && { sortOrder: sorter.order }) || {},
        { ...filters }
      );
      console.log('parameter', parameter);
      const result = that.data(parameter);
      // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
      // eslint-disable-next-line
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result
          .then((r) => {
            that.localPagination =
              (that.showPagination &&
                Object.assign({}, that.localPagination, {
                  current: r.pageNo, // 返回结果中的当前分页数
                  total: r.totalCount, // 返回结果中的总记录数
                  showSizeChanger: that.showSizeChanger,
                  pageSize: (pagination && pagination.pageSize) || that.localPagination.pageSize
                })) ||
              false;
            // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
            if (r.data.length === 0 && that.showPagination && that.localPagination.current > 1) {
              that.localPagination.current--;
              that.loadData();
              return;
            }

            // 这里用于判断接口是否有返回 r.totalCount 且 that.showPagination = true 且 pageNo 和 pageSize 存在 且 totalCount 小于等于 pageNo * pageSize 的大小
            // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
            try {
              if (['auto', true].includes(that.showPagination) && r.totalCount <= r.pageNo * that.localPagination.pageSize) {
                that.localPagination.hideOnSinglePage = true;
              }
            } catch (e) {
              that.localPagination = false;
            }
            console.log('loadData -> that.localPagination', that.localPagination);
            that.localDataSource = r.data; // 返回结果中的数组数据
            that.localLoading = false;
          })
          .catch(function () {
            that.localLoading = false;
          });
      }
    },
    initTotalList(columns) {
      const totalList = [];
      columns &&
        columns instanceof Array &&
        columns.forEach((column) => {
          if (column.needTotal) {
            totalList.push({
              ...column,
              total: 0
            });
          }
        });
      return totalList;
    },
    /**
     * 用于更新已选中的列表数据 total 统计
     * @param selectedRowKeys
     * @param selectedRows
     */
    updateSelect(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
      this.selectedRowKeys = selectedRowKeys;
      const list = this.needTotalList;
      this.needTotalList = list.map((item) => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            const total = sum + parseInt(get(val, item.dataIndex));
            return isNaN(total) ? 0 : total;
          }, 0)
        };
      });
    },
    /**
     * 清空 table 已选中项
     */
    clearSelected() {
      if (this.rowSelection) {
        this.rowSelection.onChange([], []);
        this.updateSelect([], []);
      }
    },
    /**
     * 处理交给 table 使用者去处理 clear 事件时，内部选中统计同时调用
     * @param callback
     * @returns {*}
     */
    renderClear(callback) {
      if (this.selectedRowKeys.length <= 0) return null;
      return (
        <a
          style="margin-left: 24px"
          onClick={() => {
            callback();
            this.clearSelected();
          }}
        >
          清空
        </a>
      );
    },
    renderAlert() {
      // 绘制统计列数据
      const needTotalItems = this.needTotalList.map((item) => {
        return (
          <span style="margin-right: 12px">
            {item.title}总计 <a style="font-weight: 600">{!item.customRender ? item.total : item.customRender(item.total)}</a>
          </span>
        );
      });

      // 绘制 清空 按钮
      const clearItem = typeof this.alert.clear === 'boolean' && this.alert.clear ? this.renderClear(this.clearSelected) : this.alert !== null && typeof this.alert.clear === 'function' ? this.renderClear(this.alert.clear) : null;

      // 绘制 alert 组件
      return (
        <a-alert showIcon={true} style="margin-bottom: 16px">
          <template slot="message">
            <span style="margin-right: 12px">
              已选择: <a style="font-weight: 600">{this.selectedRows.length}</a>
            </span>
            {needTotalItems}
            {clearItem}
          </template>
        </a-alert>
      );
    }
  },

  render() {
    const props = {};
    const localKeys = Object.keys(this.$data);
    const showAlert = (typeof this.alert === 'object' && this.alert !== null && this.alert.show && typeof this.rowSelection.selectedRowKeys !== 'undefined') || this.alert;

    Object.keys(T.props).forEach((k) => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`;
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey];
        return props[k];
      }
      if (k === 'rowSelection') {
        if (showAlert && this.rowSelection) {
          // 如果需要使用alert，则重新绑定 rowSelection 事件
          console.log('this.rowSelection', this.rowSelection);
          props[k] = {
            ...this.rowSelection,
            selectedRows: this.selectedRows,
            selectedRowKeys: this.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.updateSelect(selectedRowKeys, selectedRows);
              typeof this[k].onChange !== 'undefined' && this[k].onChange(selectedRowKeys, selectedRows);
            }
          };
          return props[k];
        } else if (!this.rowSelection) {
          // 如果没打算开启 rowSelection 则清空默认的选择项
          props[k] = null;
          return props[k];
        }
      }
      this[k] && (props[k] = this[k]);
      return props[k];
    });
    const table = (
      <a-table
        {...{ props, scopedSlots: { ...this.$scopedSlots } }}
        onChange={this.loadData}
        onExpand={(expanded, record) => {
          this.$emit('expand', expanded, record);
        }}
      >
        {Object.keys(this.$slots).map((name) => (
          <template slot={name}>{this.$slots[name]}</template>
        ))}
      </a-table>
    );

    return (
      <div class="table-wrapper">
        {showAlert ? this.renderAlert() : null}
        {table}
      </div>
    );
  }
};
