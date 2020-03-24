import React, { Component } from "react";
import { Card, Select, Input, Button, Icon, Table } from "antd";
import LinkButton from "../../components/link-button";
import { reqProducts, reqSearchProducts } from "../../api/";
import { PAGE_SIZE } from "../../utils/constants";
const Option = Select.Option;
export default class ProductHome extends Component {
  state = {
    products: [], // Array containing all products
    total: 0, // Total number of products
    loading: false,
    keywords: '', // Search keywords
    searchType: 'productName'  // Name or Description
  };

  constructor(props) {
    super(props);
    this.initColumns();
  }

  initColumns = () => {
    this.columns = [
      {
        title: "Name",
        dataIndex: "name"
      },
      {
        title: "Description",
        dataIndex: "desc"
      },
      {
        title: "Price",
        dataIndex: "price",
        render: price => {
          return "$" + price;
        }
      },
      {
        width: 100,
        title: "Status",
        dataIndex: "status",
        render: status => {
          return (
            <span>
              <Button type="primary">Remove</Button>
              <span>On sale</span>
            </span>
          );
        }
      },
      {
        width: 100,
        title: "Action",
        render: product => {
          return (
            <span>
              <LinkButton onClick={() => this.props.history.push('/product/detail', { product })}>Details</LinkButton>
              <LinkButton>Modify</LinkButton>
            </span>
          );
        }
      }
    ];
  };
  getProducts = async pageNum => {
    this.setState({ loading: true });

    const { keywords, searchType } = this.state;
    let result;
    if (keywords) {
      result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, keywords, searchType })
    } else {
      result = await reqProducts(pageNum, PAGE_SIZE);

    }
    this.setState({ loading: false });
    if (result.status === 0) {
      const { total, list } = result.data;
      this.setState({ total, products: list });
    }

  };

  componentDidMount() {
    this.getProducts(1);
  }
  render() {
    const { products, total, loading, searchType, keywords } = this.state;
    const title = (
      <span>
        <Select value={searchType} onChange={value => this.setState({ searchType: value })} style={{ width: '150px' }}>
          <Option value="productName">Search by name</Option>
          <Option value="productDesc">Search by description</Option>
        </Select>
        <Input
          placeholder="keyword"
          style={{ width: 150, margin: "0 15px" }}
          value={keywords}
          onChange={event => { this.setState({ keywords: event.target.value }) }}
        ></Input>
        <Button type="primary" onClick={() => this.getProducts(1)}>Search</Button>
      </span>
    );

    const extra = <Button type="primary">Add product</Button>;
    return (
      <Card title={title} extra={extra}>
        <Table bordered dataSource={products} columns={this.columns} pagination={{
          total,
          defaultPageSize: PAGE_SIZE,
          showQuickJumper: true,
          onChange: this.getProducts,
          loading: { loading }
        }}></Table>
      </Card>
    );
  }
}
