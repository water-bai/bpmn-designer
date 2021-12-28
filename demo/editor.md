---
title: Editor
order: 1
---

本 Demo 演示基本用法

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BpmnEditor } from '@white/bpmn-designer';

class App extends Component {
  constructor(props) {
    super(props);

    this.bpmn = React.createRef();

    this.state = {};
  }
  handleExportXML = async () => {
    const data = await this.bpmn?.current?.exportXML();
    console.log(data?.xml);
  }
  render() {
    return (
      <div>
        <button onClick={this.handleExportXML}>导出xml</button>
        <BpmnEditor ref={this.bpmn} />
      </div>
    );
  }
}

ReactDOM.render((
  <App />
), mountNode);
```



## API
| 参数名 | 说明 | 必填 | 类型 | 默认值 | 备注 |
| ------ | ---- | ---- | ---- | ------ | ---- |
|        |      |      |      |        |      |
