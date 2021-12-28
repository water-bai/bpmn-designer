import * as React from 'react';
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
import ModelingModule from 'bpmn-js/lib/features/modeling';
import ContextPadModule from 'bpmn-js/lib/features/context-pad';
import customViewerModule from '@/utils/bpmn/customRenderer';
import minimapModule from 'diagram-js-minimap';
import { IProps, IState } from './index.d';
import './index.scss';

// 导入ModelingModule，方便使用bpmnjs自带的方法获取点击的节点位置
NavigatedViewer.prototype._modelingModules = [ModelingModule];
NavigatedViewer.prototype._modules = NavigatedViewer.prototype._modules.concat(
  NavigatedViewer.prototype._modelingModules
);

class BpmnViewer extends React.Component<IProps, IState> {
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

  constructor(props: IProps) {
    super(props);

    this.state = {};
    this.reset = this.reset.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  componentDidMount() {
    const { height, useMiniMap } = this.props;
    const additionalModules = [customViewerModule, ContextPadModule];
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
  // 获取弹层位置信息
  getReplaceMenuPosition(element: any) {
    const OFFSET_X = 10;
    const OFFSET_Y = 10;

    const canvas = this.bpmnViewer.get('canvas');
    const contextPad = this.bpmnViewer.get('contextPad');

    const diagramContainer = canvas.getContainer();
    const pad = contextPad.getPad(element).html;

    const diagramRect = diagramContainer.getBoundingClientRect();
    const padRect = pad.getBoundingClientRect();

    const top = padRect.top - diagramRect.top;
    const left = padRect.left - diagramRect.left;

    const pos = {
      left: left - element?.width - OFFSET_X,
      top: top + element?.height + OFFSET_Y,
    };

    return pos;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.value !== this.props.value ||
      prevProps?.L4Infos !== this?.props?.L4Infos
    ) {
      this.renderBpmn(this.props.value);
    }
  }

  // 任务事件
  eleClick(e: any) {
    const pos = this.getReplaceMenuPosition(e?.element);
    console.log('eleClick', pos);
  }
  eleChange() {
    console.log('eleChange');
  }
  eleHover() {
    console.log('eleHover');
  }

  // 监听任务
  addEventBusListener() {
    const eventBus = this.bpmnViewer.get('eventBus'); // 需要使用eventBus
    const eventTypes = ['element.click']; // 需要监听的事件集合

    eventTypes.forEach((eventType) => {
      eventBus.on(eventType, (e: any) => {
        switch (eventType) {
          case 'element.click':
            this.eleClick(e);
            break;
          case 'element.changed':
            this.eleChange(e);
            break;
          case 'element.hover':
            this.eleHover(e);
            break;
          default:
            break;
        }
      });
    });
  }

  // 对外透出的方案
  reset() {
    const { center } = this.props;
    this.bpmnViewer.get('canvas').zoom('fit-viewport', center ? 'auto' : '');
  }

  zoomIn() {
    this.bpmnViewer.get('zoomScroll').stepZoom(-1);
  }

  zoomOut() {
    this.bpmnViewer.get('zoomScroll').stepZoom(1);
  }

  getBpmnViewer() {
    return this.bpmnViewer;
  }

  async renderBpmn(content: any) {
    if (content) {
      // 异常如何处理？
      await this.bpmnViewer?.importXML(content);
      this.reset();
    }
  }

  render() {
    return (
      <div className='designer-container-viewer'>
        <div className='epoch-halo-bpmn-container' ref={this.containerRef} />
      </div>
    );
  }
}

export default BpmnViewer;
