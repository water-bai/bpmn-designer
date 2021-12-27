import BpmnElementFactory from 'bpmn-js/lib/features/modeling/ElementFactory';
import { is } from 'bpmn-js/lib/util/ModelUtil';

export default class HaloElementFactory extends BpmnElementFactory {
  constructor(bpmnFactory, moddle, translate) {
    super();
    this._bpmnFactory = bpmnFactory;
    this._moddle = moddle;
    this._translate = translate;
    this._mark = 'halo';
  }

  _getDefaultSize(semantic) {
    if (is(semantic, 'bpmn:ServiceTask')) {
      return { width: 160, height: 375 };
    }

    if (is(semantic, 'bpmn:Task')) {
      return { width: 80, height: 40 };
    }

    if (is(semantic, 'bpmn:StartEvent')) {
      return { width: 16, height: 16 };
    }

    if (is(semantic, 'bpmn:EndEvent')) {
      return { width: 16, height: 16 };
    }

    if (is(semantic, 'bpmn:Event')) {
      return { width: 36, height: 36 };
    }

    return BpmnElementFactory.prototype._getDefaultSize(semantic);
  }
}

HaloElementFactory.$inject = ['bpmnFactory', 'moddle', 'translate'];
