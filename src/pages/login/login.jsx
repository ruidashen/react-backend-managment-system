import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { Redirect } from "react-router-dom";
import "./login.less";
import logo from "../../assests/images/icon.png";
import { connect } from "react-redux";
import { login } from "../../redux/actions";
/*
    Login page 
 */
class Login extends Component {
  Pwdvalidator = (rule, value, callback) => {
    if (!value) {
      callback("Please input your password!");
    } else if (value.length > 12) {
      callback("Password must be less than 12 characters!");
    } else if (value.length < 4) {
      callback("Password must be at least 4 characters long!");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback("Password can only contain numbers,letters and underscore.");
    } else {
      callback();
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values;
        this.props.login(username, password);
      } else {
        console.log(err);
      }
    });
  };
  render() {
    const user = this.props.user;
    if (user && user._id) {
      return <Redirect to="/"></Redirect>;
    }

    const errorMsg = this.props.user.errorMsg;
    const form = this.props.form;
    const { getFieldDecorator } = form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React Content Management System</h1>
        </header>
        <section className="login-content">
          <div>{errorMsg}</div>
          <h2>Login</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "Please input your username!",
                  },
                  {
                    max: 12,
                    message: "Username must be less than 12 characters!",
                  },
                  {
                    min: 4,
                    message: "Username must be at least 4 characters long!",
                  },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message:
                      "Username can only contain numbers,letters and underscore.",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ validator: this.Pwdvalidator }],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Password"
                  type="password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}

const WrapFormLogin = Form.create()(Login);

export default connect((state) => ({ user: state.user }), { login })(
  WrapFormLogin
);
