import React, { Component } from 'react';
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
import minimapModule from 'diagram-js-minimap';
import customRenderer from '@/customModules/customRenderer';
import { getListenEvents } from '@/utils';
import { ListenEvent } from '@/common';
import { IBpmnViewerProps, IBpmnViewerState } from './interface';
import './index.scss';

class BpmnViewer extends Component<IBpmnViewerProps, IBpmnViewerState> {
  static displayName = 'BpmnViewer';

  // 组件属性
  static defaultProps = {
    // 名称
    height: 600,
    center: true,
    useMiniMap: false,
  };

  containerRef = React.createRef<HTMLDivElement>();
  bpmnViewer: any = null;

  constructor(props: IBpmnViewerProps) {
    super(props);

    this.state = {};
    this.reset = this.reset.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  componentDidMount() {
    const { height, useMiniMap } = this.props;
    const additionalModules = [customRenderer];
    if (useMiniMap) {
      additionalModules.push(minimapModule);
    }
    this.bpmnViewer = new NavigatedViewer({
      container: this.containerRef.current,
      height,
      additionalModules,
    });

    this.bpmnViewer.on('import.done', (event: any) => {
      console.log('import.done', event);
    });

    // this.bpmnViewer.get('minimap').open();

    this.addEventBusListener();
    this.renderBpmn(this.props.value);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.renderBpmn(this.props.value);
    }
  }

  // 监听节点事件
  addEventBusListener() {
    const eventBus = this.bpmnViewer.get('eventBus');

    // 根据绑定的element事件获取监听的事件类型
    const listenEvents: ListenEvent[] = getListenEvents(this.props);

    listenEvents.forEach((event: ListenEvent) => {
      eventBus.on(event.type, (e) => {
        event?.action(e);
      });
    });
  }

  // 对外透出的方案
  reset() {
    const { center } = this.props;
    this.bpmnViewer.get('canvas').zoom('fit-viewport', center ? 'auto' : '');
  }
  // 缩小
  zoomIn() {
    this.bpmnViewer.get('zoomScroll').stepZoom(-1);
  }
  // 放大
  zoomOut() {
    this.bpmnViewer.get('zoomScroll').stepZoom(1);
  }
  // 导出
  async exportXML() {
    return this.bpmnViewer.saveXML({ format: true });
  }

  async renderBpmn(content: any) {
    try {
      await this.bpmnViewer?.importXML(content);
      this.reset();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="bpmn-viewer-container">
        <div className="bpmn-container" ref={this.containerRef} />
      </div>
    );
  }
}

export default BpmnViewer;
