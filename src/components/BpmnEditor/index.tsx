import * as React from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
// import minimapModule from 'diagram-js-minimap';
import customViewerModule from '../../utils/bpmn/customRenderer';
import HaloElementFactoryModule from '../../utils/bpmn/elementFactory';
import CustomPalette from '../../utils/bpmn/customPalette';
import customTranslate from '../../utils/bpmn/i18n';
import { newDiagram } from './default';
import { IProps, IState } from './index.d';
import './index.scss';

const { Component, createRef } = React;

class BpmnEditor extends Component<IProps, IState> {
  static displayName = 'BpmnEditor';

  static defaultProps = {
    value: newDiagram,
    height: 600,
    center: true,
  };
  containerRef = createRef<HTMLDivElement>();
  bpmnModeler: any = null;
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { height } = this.props;
    const customTranslateModule = {
      translate: ['value', customTranslate],
    };
    this.bpmnModeler = new BpmnModeler({
      container: this.containerRef?.current,
      height,
      additionalModules: [
        customViewerModule,
        customTranslateModule,
        // minimapModule,
        HaloElementFactoryModule,
        CustomPalette,
      ],
    });

    this.bpmnModeler.on('import.done', (event: any) => {
      console.log('import.done', event);
    });

    this.renderBpmn(this.props.value);
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

  async renderBpmn(content: any) {
    if (content) {
      // 异常如何处理？
      await this.bpmnModeler?.importXML(content);
      this.reset();
      // this.bpmnModeler.get('minimap').open();
    }
  }
  render() {
    return (
      <div className='bpmn-editor-container'>
        <div className='bpmn-editor-content' ref={this.containerRef} />
      </div>
    );
  }
}

export default BpmnEditor;
