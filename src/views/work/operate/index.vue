<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="电影源id" prop="movieSourceId">
        <el-input
          v-model="queryParams.movieSourceId"
          placeholder="请输入电影源id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电影源名称" prop="movieSourceName">
        <el-input
          v-model="queryParams.movieSourceName"
          placeholder="请输入电影源名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电影名称" prop="movieName">
        <el-input
          v-model="queryParams.movieName"
          placeholder="请输入电影名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电影路径" prop="moviePath">
        <el-input
          v-model="queryParams.moviePath"
          placeholder="请输入电影路径"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电影长度/秒" prop="movieLength">
        <el-input
          v-model="queryParams.movieLength"
          placeholder="请输入电影长度/秒"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电影处理步骤" prop="movieStep">
        <el-select v-model="queryParams.movieStep" placeholder="请选择电影处理步骤" clearable>
          <el-option
            v-for="dict in dict.type.movie_step"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="电影处理状态" prop="movieOperateState">
        <el-select v-model="queryParams.movieOperateState" placeholder="请选择电影处理状态" clearable>
          <el-option
            v-for="dict in dict.type.movie_operate_state"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="电影发布状态" prop="movieReleaseState">
        <el-select v-model="queryParams.movieReleaseState" placeholder="请选择电影发布状态" clearable>
          <el-option
            v-for="dict in dict.type.movie_release_state"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="电影分部" prop="movieNo">
        <el-select v-model="queryParams.movieNo" placeholder="请选择电影分部" clearable>
          <el-option
            v-for="dict in dict.type.movie_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['work:operate:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['work:operate:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['work:operate:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['work:operate:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="operateList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="电影操作id" align="center" prop="movieOperateId" />
      <el-table-column label="电影源id" align="center" prop="movieSourceId" />
      <el-table-column label="电影源名称" align="center" prop="movieSourceName" />
      <el-table-column label="电影名称" align="center" prop="movieName" />
      <el-table-column label="电影路径" align="center" prop="moviePath" />
      <el-table-column label="电影长度/秒" align="center" prop="movieLength" />
      <el-table-column label="电影处理步骤" align="center" prop="movieStep">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.movie_step" :value="scope.row.movieStep"/>
        </template>
      </el-table-column>
      <el-table-column label="电影处理状态" align="center" prop="movieOperateState">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.movie_operate_state" :value="scope.row.movieOperateState"/>
        </template>
      </el-table-column>
      <el-table-column label="电影发布状态" align="center" prop="movieReleaseState">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.movie_release_state" :value="scope.row.movieReleaseState"/>
        </template>
      </el-table-column>
      <el-table-column label="电影分部" align="center" prop="movieNo">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.movie_no" :value="scope.row.movieNo"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['work:operate:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['work:operate:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改电影操作对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="电影源id" prop="movieSourceId">
          <el-input v-model="form.movieSourceId" placeholder="请输入电影源id" />
        </el-form-item>
        <el-form-item label="电影源名称" prop="movieSourceName">
          <el-input v-model="form.movieSourceName" placeholder="请输入电影源名称" />
        </el-form-item>
        <el-form-item label="电影名称" prop="movieName">
          <el-input v-model="form.movieName" placeholder="请输入电影名称" />
        </el-form-item>
        <el-form-item label="电影路径" prop="moviePath">
          <el-input v-model="form.moviePath" placeholder="请输入电影路径" />
        </el-form-item>
        <el-form-item label="电影长度/秒" prop="movieLength">
          <el-input v-model="form.movieLength" placeholder="请输入电影长度/秒" />
        </el-form-item>
        <el-form-item label="电影处理步骤" prop="movieStep">
          <el-select v-model="form.movieStep" placeholder="请选择电影处理步骤">
            <el-option
              v-for="dict in dict.type.movie_step"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电影处理状态" prop="movieOperateState">
          <el-select v-model="form.movieOperateState" placeholder="请选择电影处理状态">
            <el-option
              v-for="dict in dict.type.movie_operate_state"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电影发布状态" prop="movieReleaseState">
          <el-select v-model="form.movieReleaseState" placeholder="请选择电影发布状态">
            <el-option
              v-for="dict in dict.type.movie_release_state"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电影分部" prop="movieNo">
          <el-select v-model="form.movieNo" placeholder="请选择电影分部">
            <el-option
              v-for="dict in dict.type.movie_no"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listOperate, getOperate, delOperate, addOperate, updateOperate } from "@/api/work/operate";

export default {
  name: "Operate",
  dicts: ['movie_release_state', 'movie_operate_state', 'movie_step', 'movie_no'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 电影操作表格数据
      operateList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        movieSourceId: null,
        movieSourceName: null,
        movieName: null,
        moviePath: null,
        movieLength: null,
        movieStep: null,
        movieOperateState: null,
        movieReleaseState: null,
        movieNo: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询电影操作列表 */
    getList() {
      this.loading = true;
      listOperate(this.queryParams).then(response => {
        this.operateList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        movieOperateId: null,
        movieSourceId: null,
        movieSourceName: null,
        movieName: null,
        moviePath: null,
        movieLength: null,
        movieStep: null,
        movieOperateState: null,
        movieReleaseState: null,
        movieNo: null,
        createTime: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.movieOperateId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加电影操作";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const movieOperateId = row.movieOperateId || this.ids
      getOperate(movieOperateId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改电影操作";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.movieOperateId != null) {
            updateOperate(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOperate(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const movieOperateIds = row.movieOperateId || this.ids;
      this.$modal.confirm('是否确认删除电影操作编号为"' + movieOperateIds + '"的数据项？').then(function() {
        return delOperate(movieOperateIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('work/operate/export', {
        ...this.queryParams
      }, `operate_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
