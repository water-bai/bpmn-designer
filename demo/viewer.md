---
title: Viewer
order: 1
---

本 Demo 演示基本用法

```jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BpmnViewer } from 'white-bpmn-designer';
const initXml = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:task id="Activity_14bgr3v" name="s">
      <bpmn2:outgoing>Flow_01sysze</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:task id="Activity_1w1bdu3" name="d">
      <bpmn2:incoming>Flow_01sysze</bpmn2:incoming>
      <bpmn2:outgoing>Flow_04k3am7</bpmn2:outgoing>
    </bpmn2:task>
    <bpmn2:task id="Activity_00364hp" name="f">
      <bpmn2:incoming>Flow_04k3am7</bpmn2:incoming>
    </bpmn2:task>
    <bpmn2:sequenceFlow id="Flow_01sysze" sourceRef="Activity_14bgr3v" targetRef="Activity_1w1bdu3" />
    <bpmn2:sequenceFlow id="Flow_04k3am7" sourceRef="Activity_1w1bdu3" targetRef="Activity_00364hp" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNEdge id="Flow_01sysze_di" bpmnElement="Flow_01sysze">
        <di:waypoint x="250" y="150" />
        <di:waypoint x="320" y="150" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_04k3am7_di" bpmnElement="Flow_04k3am7">
        <di:waypoint x="400" y="150" />
        <di:waypoint x="470" y="150" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Activity_14bgr3v_di" bpmnElement="Activity_14bgr3v">
        <dc:Bounds x="170" y="130" width="80" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1w1bdu3_di" bpmnElement="Activity_1w1bdu3">
        <dc:Bounds x="320" y="130" width="80" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_00364hp_di" bpmnElement="Activity_00364hp">
        <dc:Bounds x="470" y="130" width="80" height="40" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`
class App extends Component {
  constructor(props) {
    super(props);

    this.bpmn = React.createRef();

    this.state = {
      value: initXml
    };
  }
  render() {
    const { value } = this.state;
    return (
      <div>
        <BpmnViewer ref={this.bpmn} value={value} />
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
|   value     |   流程图数据   |   否   |   xml   |    -    |   -   |
|   useMiniMap     |   是否使用小地图   |   否   |   boolean   |   false     |   -   |
|   center     |   是否居中展示   |   否   |   boolean   |   true     |   -   |
|   height     |   流程图高度   |   否   |   number   |   600     |   -   |