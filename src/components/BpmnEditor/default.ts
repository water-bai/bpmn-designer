export const newDiagram = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1"/>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`;

export const mockXml = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:collaboration id="Collaboration_03ae65w">
    <bpmn:participant id="Participant_0qbh2pr" name="正向流程" processRef="Process_1" />
  </bpmn:collaboration>
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:laneSet id="LaneSet_0iykj7o">
      <bpmn:lane id="Lane_1nob5yh" name="11">
        <bpmn:flowNodeRef>Task_com.alibaba.business.scenario.manual.buyer.BuyerPlaceOrderActivity</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>StartEvent_0bu4wov</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>ParallelGateway_1si58t0</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_com.alibaba.business.scenario.manual.buyer.BuyerViewOrderActivity</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_com.alibaba.business.scenario.manual.buyer.BuyerCloseOrderActivity</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_com.alibaba.business.scenario.manual.buyer.BuyerOrderCheckoutActivity</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_com.alibaba.business.scenario.manual.buyer.BuyerConfirmGoodsActivity</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>EndEvent_00ugdzb</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>EndEvent_01cvh6c</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_1sfhmuw" name="3333">
        <bpmn:flowNodeRef>Task_com.alibaba.business.scenario.manual.buyer.BuyerModifyOrderActivity</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_com.alibaba.business.scenario.manual.seller.SellerViewOrderActivity</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_com.alibaba.business.scenario.manual.seller.SellerModifyOrderActivity</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Task_com.alibaba.business.scenario.manual.seller.SellerSendGoodsActivity</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>
    <bpmn:task id="Task_com.alibaba.business.scenario.manual.buyer.BuyerPlaceOrderActivity" name="买家下单" activityCode="com.alibaba.business.scenario.manual.buyer.BuyerPlaceOrderActivity" hasUI="true">
      <bpmn:incoming>SequenceFlow_07nhzrj</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1k242a1</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_0bt4ipy</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_0z3jw41</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_1955xie</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_0fqj1pf</bpmn:outgoing>
    </bpmn:task>
    <bpmn:startEvent id="StartEvent_0bu4wov">
      <bpmn:outgoing>SequenceFlow_07nhzrj</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="SequenceFlow_1k242a1" sourceRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerPlaceOrderActivity" targetRef="ParallelGateway_1si58t0" />
    <bpmn:parallelGateway id="ParallelGateway_1si58t0">
      <bpmn:incoming>SequenceFlow_1k242a1</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1wapbk8</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_1cams6u</bpmn:outgoing>
    </bpmn:parallelGateway>
    <bpmn:task id="Task_com.alibaba.business.scenario.manual.buyer.BuyerViewOrderActivity" name="买家查看订单" activityCode="com.alibaba.business.scenario.manual.buyer.BuyerViewOrderActivity" hasAI="true" hasUI="true">
      <bpmn:incoming>SequenceFlow_0bt4ipy</bpmn:incoming>
    </bpmn:task>
    <bpmn:task id="Task_com.alibaba.business.scenario.manual.buyer.BuyerCloseOrderActivity" name="买家关闭订单" activityCode="com.alibaba.business.scenario.manual.buyer.BuyerCloseOrderActivity">
      <bpmn:incoming>SequenceFlow_0z3jw41</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0deiss3</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_com.alibaba.business.scenario.manual.buyer.BuyerOrderCheckoutActivity" name="买家付款" activityCode="com.alibaba.business.scenario.manual.buyer.BuyerOrderCheckoutActivity">
      <bpmn:incoming>SequenceFlow_1wapbk8</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1ab4hcu</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_0vcyw7d</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1wapbk8" sourceRef="ParallelGateway_1si58t0" targetRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerOrderCheckoutActivity" />
    <bpmn:sequenceFlow id="SequenceFlow_0bt4ipy" sourceRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerPlaceOrderActivity" targetRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerViewOrderActivity" />
    <bpmn:sequenceFlow id="SequenceFlow_0z3jw41" sourceRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerPlaceOrderActivity" targetRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerCloseOrderActivity" />
    <bpmn:sequenceFlow id="SequenceFlow_07nhzrj" sourceRef="StartEvent_0bu4wov" targetRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerPlaceOrderActivity" />
    <bpmn:task id="Task_com.alibaba.business.scenario.manual.buyer.BuyerConfirmGoodsActivity" name="买家确认收货/交付" activityCode="com.alibaba.business.scenario.manual.buyer.BuyerConfirmGoodsActivity">
      <bpmn:incoming>SequenceFlow_1ab4hcu</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0uogiwm</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_022ctaw</bpmn:outgoing>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_00ugdzb">
      <bpmn:incoming>SequenceFlow_0uogiwm</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="SequenceFlow_1ab4hcu" sourceRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerOrderCheckoutActivity" targetRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerConfirmGoodsActivity" />
    <bpmn:sequenceFlow id="SequenceFlow_0uogiwm" sourceRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerConfirmGoodsActivity" targetRef="EndEvent_00ugdzb" />
    <bpmn:task id="Task_com.alibaba.business.scenario.manual.buyer.BuyerModifyOrderActivity" name="买家修改订单" activityCode="com.alibaba.business.scenario.manual.buyer.BuyerModifyOrderActivity">
      <bpmn:incoming>SequenceFlow_1955xie</bpmn:incoming>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1955xie" sourceRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerPlaceOrderActivity" targetRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerModifyOrderActivity" />
    <bpmn:task id="Task_com.alibaba.business.scenario.manual.seller.SellerViewOrderActivity" name="卖家查看订单" activityCode="com.alibaba.business.scenario.manual.seller.SellerViewOrderActivity">
      <bpmn:incoming>SequenceFlow_0fqj1pf</bpmn:incoming>
    </bpmn:task>
    <bpmn:endEvent id="EndEvent_01cvh6c">
      <bpmn:incoming>SequenceFlow_0deiss3</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="SequenceFlow_0deiss3" sourceRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerCloseOrderActivity" targetRef="EndEvent_01cvh6c" />
    <bpmn:sequenceFlow id="SequenceFlow_1cams6u" sourceRef="ParallelGateway_1si58t0" targetRef="Task_com.alibaba.business.scenario.manual.seller.SellerModifyOrderActivity" />
    <bpmn:task id="Task_com.alibaba.business.scenario.manual.seller.SellerModifyOrderActivity" name="卖家修改订单" activityCode="com.alibaba.business.scenario.manual.seller.SellerModifyOrderActivity">
      <bpmn:incoming>SequenceFlow_1cams6u</bpmn:incoming>
    </bpmn:task>
    <bpmn:task id="Task_com.alibaba.business.scenario.manual.seller.SellerSendGoodsActivity" name="卖家发货" activityCode="com.alibaba.business.scenario.manual.seller.SellerSendGoodsActivity">
      <bpmn:incoming>SequenceFlow_0vcyw7d</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_022ctaw</bpmn:incoming>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_0vcyw7d" sourceRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerOrderCheckoutActivity" targetRef="Task_com.alibaba.business.scenario.manual.seller.SellerSendGoodsActivity" />
    <bpmn:sequenceFlow id="SequenceFlow_022ctaw" sourceRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerConfirmGoodsActivity" targetRef="Task_com.alibaba.business.scenario.manual.seller.SellerSendGoodsActivity" />
    <bpmn:sequenceFlow id="SequenceFlow_0fqj1pf" sourceRef="Task_com.alibaba.business.scenario.manual.buyer.BuyerPlaceOrderActivity" targetRef="Task_com.alibaba.business.scenario.manual.seller.SellerViewOrderActivity" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_03ae65w">
      <bpmndi:BPMNShape id="Participant_0qbh2pr_di" bpmnElement="Participant_0qbh2pr">
        <dc:Bounds x="85" y="28" width="892" height="338" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_1nob5yh_di" bpmnElement="Lane_1nob5yh" isHorizontal="true">
        <dc:Bounds x="115" y="28" width="862" height="169" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_1sfhmuw_di" bpmnElement="Lane_1sfhmuw" isHorizontal="true">
        <dc:Bounds x="115" y="197" width="862" height="169" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0fqj1pf_di" bpmnElement="SequenceFlow_0fqj1pf">
        <di:waypoint x="287" y="88" />
        <di:waypoint x="287" y="313" />
        <di:waypoint x="313" y="313" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_022ctaw_di" bpmnElement="SequenceFlow_022ctaw">
        <di:waypoint x="822" y="88" />
        <di:waypoint x="822" y="313" />
        <di:waypoint x="725" y="313" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0vcyw7d_di" bpmnElement="SequenceFlow_0vcyw7d">
        <di:waypoint x="685" y="88" />
        <di:waypoint x="685" y="293" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1cams6u_di" bpmnElement="SequenceFlow_1cams6u">
        <di:waypoint x="552" y="93" />
        <di:waypoint x="552" y="293" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0deiss3_di" bpmnElement="SequenceFlow_0deiss3">
        <di:waypoint x="393" y="194" />
        <di:waypoint x="456" y="194" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1955xie_di" bpmnElement="SequenceFlow_1955xie">
        <di:waypoint x="287" y="88" />
        <di:waypoint x="287" y="248" />
        <di:waypoint x="313" y="248" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0uogiwm_di" bpmnElement="SequenceFlow_0uogiwm">
        <di:waypoint x="862" y="68" />
        <di:waypoint x="904" y="68" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1ab4hcu_di" bpmnElement="SequenceFlow_1ab4hcu">
        <di:waypoint x="725" y="68" />
        <di:waypoint x="782" y="68" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_07nhzrj_di" bpmnElement="SequenceFlow_07nhzrj">
        <di:waypoint x="201" y="68" />
        <di:waypoint x="247" y="68" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0z3jw41_di" bpmnElement="SequenceFlow_0z3jw41">
        <di:waypoint x="287" y="88" />
        <di:waypoint x="287" y="194" />
        <di:waypoint x="313" y="194" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0bt4ipy_di" bpmnElement="SequenceFlow_0bt4ipy">
        <di:waypoint x="287" y="88" />
        <di:waypoint x="287" y="137" />
        <di:waypoint x="313" y="137" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1wapbk8_di" bpmnElement="SequenceFlow_1wapbk8">
        <di:waypoint x="577" y="68" />
        <di:waypoint x="645" y="68" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1k242a1_di" bpmnElement="SequenceFlow_1k242a1">
        <di:waypoint x="327" y="68" />
        <di:waypoint x="527" y="68" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_com.alibaba.business.scenario.manual.buyer.BuyerPlaceOrderActivity_di" bpmnElement="Task_com.alibaba.business.scenario.manual.buyer.BuyerPlaceOrderActivity">
        <dc:Bounds x="247" y="48" width="80" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="StartEvent_0bu4wov_di" bpmnElement="StartEvent_0bu4wov">
        <dc:Bounds x="185" y="60" width="16" height="16" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ParallelGateway_1si58t0_di" bpmnElement="ParallelGateway_1si58t0">
        <dc:Bounds x="527" y="43" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_com.alibaba.business.scenario.manual.buyer.BuyerViewOrderActivity_di" bpmnElement="Task_com.alibaba.business.scenario.manual.buyer.BuyerViewOrderActivity">
        <dc:Bounds x="313" y="117" width="80" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_com.alibaba.business.scenario.manual.buyer.BuyerCloseOrderActivity_di" bpmnElement="Task_com.alibaba.business.scenario.manual.buyer.BuyerCloseOrderActivity">
        <dc:Bounds x="313" y="174" width="80" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_com.alibaba.business.scenario.manual.buyer.BuyerOrderCheckoutActivity_di" bpmnElement="Task_com.alibaba.business.scenario.manual.buyer.BuyerOrderCheckoutActivity">
        <dc:Bounds x="645" y="48" width="80" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_com.alibaba.business.scenario.manual.buyer.BuyerConfirmGoodsActivity_di" bpmnElement="Task_com.alibaba.business.scenario.manual.buyer.BuyerConfirmGoodsActivity">
        <dc:Bounds x="782" y="48" width="80" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_00ugdzb_di" bpmnElement="EndEvent_00ugdzb">
        <dc:Bounds x="904" y="60" width="16" height="16" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_com.alibaba.business.scenario.manual.buyer.BuyerModifyOrderActivity_di" bpmnElement="Task_com.alibaba.business.scenario.manual.buyer.BuyerModifyOrderActivity">
        <dc:Bounds x="313" y="228" width="80" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_com.alibaba.business.scenario.manual.seller.SellerViewOrderActivity_di" bpmnElement="Task_com.alibaba.business.scenario.manual.seller.SellerViewOrderActivity">
        <dc:Bounds x="313" y="293" width="80" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_01cvh6c_di" bpmnElement="EndEvent_01cvh6c">
        <dc:Bounds x="456" y="186" width="16" height="16" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_com.alibaba.business.scenario.manual.seller.SellerModifyOrderActivity_di" bpmnElement="Task_com.alibaba.business.scenario.manual.seller.SellerModifyOrderActivity">
        <dc:Bounds x="512" y="293" width="80" height="40" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_com.alibaba.business.scenario.manual.seller.SellerSendGoodsActivity_di" bpmnElement="Task_com.alibaba.business.scenario.manual.seller.SellerSendGoodsActivity">
        <dc:Bounds x="645" y="293" width="80" height="40" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;
