---
title: BpmnEditor
order: 1
---

本 Demo 演示基本用法

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BpmnEditor } from 'white-bpmn-designer';

const mockXml = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" isExecutable="false" />
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1" />
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.bpmn = React.createRef();

    this.state = {
      value: '',
    };
  }

  handleExportXML = async () => {
    console.log(this.bpmn.current);
    const data = await this.bpmn?.current?.exportXML();
    console.log(data?.xml);
  };
  handleZoomIn = () => {
    this.bpmn.current?.zoomIn();
  };
  handleZoomOut = () => {
    this.bpmn.current?.zoomOut();
  };
  handleReset = () => {
    this.bpmn.current?.reset();
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <button onClick={this.handleExportXML}>导出xml</button>
        <button onClick={this.handleZoomOut}>放大</button>
        <button onClick={this.handleZoomIn}>缩小</button>
        <button onClick={this.handleReset}>重置</button>
        <BpmnEditor ref={this.bpmn} value={value} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
```

## API

| 参数名         | 说明             | 必填 | 类型     | 默认值 | 备注 |
| -------------- | ---------------- | ---- | -------- | ------ | ---- |
| value          | 流程图 value     | 是   | xml      | -      | -    |
| height         | 流程图高度       | 否   | number   | 600    | -    |
| center         | 是否居中展示     | 否   | boolean  | true   | -    |
| elementClick   | 节点点击事件     | 否   | function | -      | -    |
| elementHover   | 节点 hover 事件  | 否   | function | -      | -    |
| elementChanged | 节点信息改变事件 | 否   | function | -      | -    |
