import React, { Component, createRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import customPalette from '@/customModules/customPalette';
import customRenderer from '@/customModules/customRenderer';
import elementFactory from '@/customModules/elementFactory';
import customTranslate from '@/customModules/i18n';
import { ListenEvent } from '@/common';
import { getListenEvents } from '@/utils';
import { initXml } from '@/utils/constant';
// import Panel from './components/Panel';
import { IBpmnEditorProps, IBpmnEditorState } from './interface';
import './index.scss';

class BpmnEditor extends Component<IBpmnEditorProps, IBpmnEditorState> {
  static displayName = 'BpmnEditor';

  static defaultProps = {
    height: 600,
    value: '',
    center: true,
  };

  containerRef = createRef<HTMLDivElement>();
  bpmnModeler = null;

  constructor(props: IBpmnEditorProps) {
    super(props);
    this.state = {};
    this.reset = this.reset.bind(this);
    this.zoomIn = this.zoomOut.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.exportXML = this.exportXML.bind(this);
  }

  componentDidMount(): void {
    const { height } = this.props;
    const customTranslateModule = {
      translate: ['value', customTranslate],
    };
    this.bpmnModeler = new BpmnModeler({
      container: this.containerRef?.current,
      height,
      additionalModules: [customRenderer, customPalette, elementFactory, customTranslateModule],
    });

    this.bpmnModeler.on('import.done', (event: any) => {
      console.log('import.done', event);
    });

    this.renderBpmn(this.props?.value || initXml);
  }
  // 对外透出的方案
  // 重置
  reset() {
    const { center } = this.props;
    this.bpmnModeler.get('canvas').zoom('fit-viewport', center ? 'auto' : '');
  }
  // 缩小
  zoomIn() {
    this.bpmnModeler.get('zoomScroll').stepZoom(-1);
  }
  // 增大
  zoomOut() {
    this.bpmnModeler.get('zoomScroll').stepZoom(1);
  }
  // 导出
  async exportXML() {
    return this.bpmnModeler.saveXML({ format: true });
  }

  // 监听节点事件
  addEventBusListener() {
    const eventBus = this.bpmnModeler.get('eventBus');

    // 根据绑定的element事件获取监听的事件类型
    const listenEvents: ListenEvent[] = getListenEvents(this.props);

    listenEvents.forEach((event: ListenEvent) => {
      eventBus.on(event.type, (e) => {
        event?.action(e);
      });
    });
  }

  async renderBpmn(content: any) {
    try {
      await this.bpmnModeler?.importXML(content);
      this.reset();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="bpmn-editor-container">
        <div className="bpmn-editor-content" ref={this.containerRef} />
        {/* <Panel /> */}
      </div>
    );
  }
}

export default BpmnEditor;
