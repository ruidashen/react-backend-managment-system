import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  Cascader,
  Upload,
  Button,
  Icon,
  message
} from "antd";
import LinkButton from "../../components/link-button";
import { reqCategories, reqAddOrUpdateProduct } from "../../api";
import PicturesWall from "./pictures-wall";
import RichTextEditor from "./richTextEditor";
const { Item } = Form;
const { TextArea } = Input;

class ProductAddUpdate extends Component {
  constructor(props) {
    super(props);

    this.pw = React.createRef();
    this.ed = React.createRef();
    const product = this.props.location.state;
    // Flag for add / modify
    this.isUpdate = !!product;
    this.product = product || {};
  }

  state = {
    options: []
  };

  initOptions = async categories => {
    // Initialize options array based on categories
    const options = categories.map(category => ({
      value: category._id,
      label: category.name,
      isLeaf: false
    }));

    // If user requested a modify
    const { isUpdate, product } = this;
    const { pCategoryId, categoryId } = product;
    if (isUpdate && pCategoryId !== "0") {
      const subCategory = await this.getCategories(pCategoryId);
      // Generate lv2 category list
      const childOptions = subCategory.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }));
      const targetOption = options.find(option => option.value === pCategoryId);
      targetOption.children = childOptions;
    }
    // Update options in state
    this.setState({
      options
    });
  };

  // Used to load next level category
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;

    const subCategories = await this.getCategories(targetOption.value);
    targetOption.loading = false;
    if (subCategories && subCategories.length > 0) {
      const childOptions = subCategories.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }));
      targetOption.children = childOptions;
    } else {
      targetOption.isLeaf = true;
    }

    this.setState({
      options: [...this.state.options]
    });
  };

  submit = () => {
    this.props.form.validateFields(async (error, values) => {
      if (!error) {
        // collect data
        const { name, desc, price, categoryIds } = values;
        let pCategoryId, categoryId;
        if (categoryIds.length === 1) {
          pCategoryId = "0";
          categoryId = categoryIds[0];
        } else {
          pCategoryId = categoryIds[0];
          categoryId = categoryIds[1];
        }
        const imgs = this.pw.current.getImgs();
        const detail = this.ed.current.getDetail();
        const product = {
          name,
          desc,
          price,
          pCategoryId,
          categoryId,
          imgs,
          detail
        };

        if (this.isUpdate) {
          product._id = this.product._id;
        }
        const result = await reqAddOrUpdateProduct(product);

        if (result.status === 0) {
          message.success(
            `${this.isUpdate ? "Product Update " : "Product Add "} Succeeded!`
          );
          this.props.history.goBack();
        } else {
          message.error(
            `${this.isUpdate ? "Product Update " : "Product Add "} Failed!`
          );
        }
      }
    });
  };

  validatePrice = (rule, value, callback) => {
    if (value * 1 <= 0) {
      callback("Price must be greater than 0!");
    } else {
      callback();
    }
  };

  getCategories = async parentId => {
    const result = await reqCategories(parentId);
    if (result.status === 0) {
      const categories = result.data;

      if (parentId === "0") {
        this.initOptions(categories);
      } else {
        return categories;
      }
    }
  };

  componentDidMount() {
    this.getCategories("0");
  }

  render() {
    const { isUpdate, product } = this;
    const { pCategoryId, categoryId, imgs, detail } = product;
    const categoryIds = [];

    if (isUpdate) {
      if (pCategoryId === "0") {
        categoryIds.push(categoryId);
      } else {
        categoryIds.push(pCategoryId);
        categoryIds.push(categoryId);
      }
    }
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left" style={{ fontSize: 20 }}></Icon>
        </LinkButton>
        <span>{isUpdate ? "Modify Product" : "Add Product"}</span>
      </span>
    );

    // Item layout style
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 8 }
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label="Product Name">
            {getFieldDecorator("name", {
              initialValue: this.product.name,
              rules: [{ required: true, message: "Product name required!" }]
            })(<Input placeholder="Please Enter Product Name"></Input>)}
          </Item>
          <Item label="Product Description:">
            {getFieldDecorator("desc", {
              initialValue: this.product.desc,
              rules: [
                { required: true, message: "Product description required!" }
              ]
            })(
              <TextArea
                autosize={{ minRows: 2, maxRows: 6 }}
                placeholder="Please Enter Product Description!"
              ></TextArea>
            )}
          </Item>
          <Item label="Product Price">
            {getFieldDecorator("price", {
              initialValue: this.product.price,
              rules: [
                { required: true, message: "Price is required!" },
                { validator: this.validatePrice }
              ]
            })(
              <Input
                addonAfter="USD"
                type="number"
                placeholder="Please Enter Product Price"
              ></Input>
            )}
          </Item>
          <Item label="Product Category">
            {getFieldDecorator("categoryIds", {
              initialValue: categoryIds,
              rules: [{ required: true, message: "Category is required!" }]
            })(
              <Cascader
                placeholder="Please select product category"
                options={this.state.options}
                loadData={this.loadData}
              ></Cascader>
            )}
          </Item>
          <Item label="Product Pictures">
            <PicturesWall ref={this.pw} imgs={imgs}></PicturesWall>
          </Item>
          <Item
            label="Product Detail"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 20 }}
          >
            <RichTextEditor ref={this.ed} detail={detail}></RichTextEditor>
          </Item>
          <Item>
            <Button type="primary" onClick={this.submit}>
              Submit
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(ProductAddUpdate);
