import React, { Component } from "react";
import { Button, Card, Icon, Table, message, Modal } from "antd";
import LinkButton from "../../components/link-button";
import AddForm from "./addForm";
import UpdateForm from "./updateForm";
import {
  reqUpdateCategory,
  reqAddCategory,
  reqCategories
} from "../../api/index";
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.initColumns();
  }
  state = {
    categories: [], // Level one category list
    subCategories: [],
    isLoading: false,
    parentId: "0",
    parentName: "",
    showStatus: 0 // 1 -> display add category modal, 2 -> display update category modal, 0 -> none
  };

  initColumns = () => {
    this.columns = [
      {
        title: "Category Name",
        dataIndex: "name"
      },
      {
        title: "Action",
        width: 300,
        render: category => (
          <span>
            <LinkButton
              onClick={() => {
                this.showUpdate(category);
              }}
            >
              Modify Category
            </LinkButton>
            {this.state.parentId === "0" ? (
              <LinkButton
                onClick={() => {
                  this.getSubCategories(category);
                }}
              >
                View Subcategory
              </LinkButton>
            ) : null}
          </span>
        )
      }
    ];
  };

  getCategories = async parentId => {
    parentId = parentId || this.state.parentId;
    this.setState({ isLoading: true });

    const result = await reqCategories(parentId);
    if (result.status === 0) {
      const categories = result.data;
      if (parentId === "0") {
        this.setState({ categories, isLoading: false });
      } else {
        this.setState({ subCategories: categories, isLoading: false });
      }
    } else {
      message.error("Retreive category lists failed");
    }
  };

  getSubCategories = async category => {
    this.setState({ parentId: category._id, parentName: category.name }, () => {
      this.getCategories();
    });
  };

  // Show level one category listing
  showCategories = () => {
    this.setState({
      parentName: "",
      parentId: "0",
      subCategories: []
    });
  };

  // When user clicks cancel on modal
  handleCancel = () => {
    // Reset input data
    this.form.resetFields();

    this.setState({ showStatus: 0 });
  };

  // Display add category modal
  showAdd = () => {
    this.setState({ showStatus: 1 });
  };

  addCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // Hide modal
        this.setState({ showStatus: 0 });

        // Getting data ready
        const { categoryName, parentId } = this.form.getFieldsValue();

        this.form.resetFields();

        const result = await reqAddCategory({ parentId, categoryName });

        if (result.status === 0) {
          if (parentId === this.state.parentId) {
            // Refresh page
            this.getCategories();
          } else if (parentId === "0") {
            // Adding primary category on secondary category page
            this.getCategories("0");
          }
        }
      }
    });
  };

  // Display update category modal
  showUpdate = category => {
    this.category = category;
    this.setState({ showStatus: 2 });
  };
  updateCategory = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        // Hide modal
        this.setState({ showStatus: 0 });

        // Getting data ready
        const categoryId = this.category._id;
        const categoryName = this.form.getFieldValue("categoryName");

        // Reset input data
        this.form.resetFields();

        // Request update category
        const result = await reqUpdateCategory({ categoryId, categoryName });
        if (result.status === 0) {
          // Refresh page
          this.getCategories();
        }
      }
    });
  };

  componentDidMount() {
    this.getCategories();
  }
  render() {
    const {
      categories,
      parentId,
      parentName,
      subCategories,
      isLoading,
      showStatus
    } = this.state;
    const category = this.category || {};
    const title =
      parentId === "0" ? (
        "Category List"
      ) : (
        <span>
          <LinkButton onClick={this.showCategories}>Category List</LinkButton>
          <Icon type="arrow-right" style={{ marginRight: 5 }}></Icon>
          <span>{parentName}</span>
        </span>
      );
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus"></Icon>
        Add
      </Button>
    );

    const data = this.state.categories;
    return (
      <div>
        <Card title={title} extra={extra}>
          <Table
            bordered
            columns={this.columns}
            dataSource={parentId === "0" ? data : subCategories}
            rowKey="_id"
            pagination={{
              defaultPageSize: 5,
              showQuickJumper: true,
              showSizeChanger: true
            }}
            loading={isLoading}
          />
          <Modal
            title="Add Category"
            visible={showStatus === 1}
            onOk={this.addCategory}
            onCancel={this.handleCancel}
          >
            <AddForm
              categories={categories}
              parentId={parentId}
              setForm={form => {
                this.form = form;
              }}
            ></AddForm>
          </Modal>
          <Modal
            title="Update Category"
            visible={showStatus === 2}
            onOk={this.updateCategory}
            onCancel={this.handleCancel}
          >
            <UpdateForm
              categoryName={category.name}
              setForm={form => {
                this.form = form;
              }}
            ></UpdateForm>
          </Modal>
        </Card>
      </div>
    );
  }
}
