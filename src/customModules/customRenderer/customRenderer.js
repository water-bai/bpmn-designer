import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate,
  // remove as svgRemove,
  classes as svgClasses,
} from 'tiny-svg';
import { query as domQuery } from 'min-dom';
import { isObject, forEach } from 'min-dash';
import {
  getSemantic,
  getFillColor,
  getStrokeColor,
  getLabelColor,
} from 'bpmn-js/lib/draw/BpmnRenderUtil';
import { transform } from 'diagram-js/lib/util/SvgTransformUtil';

import { is } from 'bpmn-js/lib/util/ModelUtil';
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import Ids from 'ids';

const HIGH_PRIORITY = 1500;
const DEFAULT_FILL_OPACITY = 0.95;
const HIGH_FILL_OPACITY = 0.35;
const RENDERER_IDS = new Ids();
const PARTICIPANT_LABEL_WIDTH = 30;
const TASK_BORDER_RADIUS = 5;
const TASK_OFFSET_Y = 6;
const CUSTOM_TYPES = [
  // 页面节点
  'bpmn:ServiceTask',
  // L3 节点
  'bpmn:Task',
  // 连线
  'bpmn:SequenceFlow',
  // 参与者：泳池
  'bpmn:Participant',
  // 泳道
  'bpmn:Lane',
];

export default class CustomRenderer extends BaseRenderer {
  constructor(config, eventBus, canvas, styles, bpmnRenderer, textRenderer) {
    super(eventBus, HIGH_PRIORITY);
    this.bpmnRenderer = bpmnRenderer;
    this.eventBus = eventBus;
    this.textRenderer = textRenderer;
    this.config = config;
    this.canvas = canvas;
    this.markers = {};
    this.rendererId = RENDERER_IDS.next();
    this.computeStyle = styles.computeStyle;
  }

  canRender(element) {
    // only render tasks (ignore labels)
    const result = isAny(element, CUSTOM_TYPES) && !element.labelTarget;
    return result;
  }

  renderer(type) {
    return this.bpmnRenderer?.handlers?.[type];
  }

  drawShape(parentNode, element) {
    if (is(element, 'bpmn:ServiceTask') && element?.businessObject?.$attrs?.isPage === 'true') {
      return this.drawPageTask(parentNode, element);
    } else if (is(element, 'bpmn:ServiceTask')) {
      svgClasses(parentNode).add('halo-service-task-visual');
    }

    // Task element
    if (is(element, 'bpmn:Task') && element?.type === 'bpmn:Task') {
      svgClasses(parentNode).add('halo-task-visual');
      return this.drawTask(parentNode, element);
    }

    if (is(element, 'bpmn:Participant')) {
      svgClasses(parentNode).add('halo--participant-visual');
      return this.drawParticipant(parentNode, element);
    }

    if (is(element, 'bpmn:Lane')) {
      svgClasses(parentNode).add('halo--lane-visual');
      return this.drawLane(parentNode, element);
    }
    return this.bpmnRenderer.drawShape(parentNode, element);
  }

  drawConnection(parentNode, element) {
    if (is(element, 'bpmn:SequenceFlow')) {
      return this.drawSequenceFlow(parentNode, element);
    }

    return this.bpmnRenderer.drawConnection(parentNode, element);
  }

  // custom draw
  drawPageTask(parentNode, element) {
    const pageInfo = this.config?.getPageInfo?.() || {};
    const { pageName, pageUrl } = pageInfo || {};
    const url = element?.businessObject?.$attrs?.url;
    const page = svgCreate('image', {
      x: 0,
      y: 0,
      width: element.width,
      height: element.height,
      href: pageUrl || url,
    });

    const text = this.textRenderer.createText(pageName || element?.businessObject?.name || '');

    svgAppend(parentNode, text);
    svgAppend(parentNode, page);

    return page;
  }

  drawTask(parentNode, element) {
    const { defaultFillColor } = this.config || {};

    const attrs = {
      fill: getFillColor(element, defaultFillColor),
      // stroke: getStrokeColor(element, defaultStrokeColor),
      stroke: '#36415E',
      'stroke-width': '2px',
    };

    // 先绘制阴影
    const rect = this.drawRect(
      parentNode,
      element.width,
      element.height,
      TASK_BORDER_RADIUS,
      attrs,
    );
    this.drawRect(
      parentNode,
      element.width,
      element.height - TASK_OFFSET_Y,
      TASK_BORDER_RADIUS,
      attrs,
    );

    this.renderEmbeddedLabel(parentNode, element, 'center-middle');
    this.attachTaskMarkers(parentNode, element, attrs);

    this.attachIcons(parentNode, element);
    return rect;
  }

  drawParticipant(parentNode, element) {
    const lane = this.drawLane(parentNode, element);
    this.drawRect(parentNode, PARTICIPANT_LABEL_WIDTH, element.height, 0, {
      fill: '#DBDFE7',
      stroke: '#979797',
      'stroke-width': '0px',
    });
    const text = element.businessObject?.name;
    this.renderLaneLabel(parentNode, text, element);

    return lane;
  }

  // helper functions, render elements
  drawSequenceFlow(parentGfx, element) {
    // console.log('drawSequenceFlow');
    const pathData = this.createPathFromConnection(element);

    const fill = '#BFBFBF';
    const stroke = '#BFBFBF';

    const attrs = {
      strokeLinejoin: 'round',
      markerEnd: this.marker('sequenceflow-end', fill, stroke),
      stroke,
    };

    const path = this.drawPath(parentGfx, pathData, attrs);

    const sequenceFlow = getSemantic(element);

    let source;

    if (element.source) {
      source = element.source.businessObject;

      // conditional flow marker
      if (sequenceFlow.conditionExpression && source.$instanceOf('bpmn:Activity')) {
        svgAttr(path, {
          markerStart: this.marker('conditional-flow-marker', fill, stroke),
        });
      }

      // default marker
      if (
        source.default &&
        (source.$instanceOf('bpmn:Gateway') || source.$instanceOf('bpmn:Activity')) &&
        source.default === sequenceFlow
      ) {
        svgAttr(path, {
          markerStart: this.marker('conditional-default-flow-marker', fill, stroke),
        });
      }
    }

    return path;
  }

  drawLane(parentGfx, element) {
    const attrs = {
      fillOpacity: DEFAULT_FILL_OPACITY,
      fill: '#ffffff',
      stroke: '#DBDFE7',
      'stroke-width': '1px',
    };

    const { defaultFillColor, defaultStrokeColor } = this.config || {};
    const rect = this.drawRect(
      parentGfx,
      element.width,
      element.height,
      0,
      Object.assign(
        {},
        {
          fill: getFillColor(element, defaultFillColor),
          fillOpacity: HIGH_FILL_OPACITY,
          stroke: getStrokeColor(element, defaultStrokeColor),
        },
        attrs,
      ),
    );

    const semantic = getSemantic(element);

    if (semantic.$type === 'bpmn:Lane') {
      const text = semantic.name;
      this.renderLaneLabel(parentGfx, text, element);
    }

    return rect;
  }

  marker(type, fill, stroke) {
    const id = `${type}-${fill}-${stroke}-${this.rendererId}`;

    if (!this.markers[id]) {
      this.createMarker(type, fill, stroke);
    }

    return `url(#${id})`;
  }

  addMarker(id, options) {
    const attrs = Object.assign(
      {},
      {
        fill: 'black',
        strokeWidth: 1,
        strokeLinecap: 'round',
        strokeDasharray: 'none',
      },
      options.attrs,
    );

    const ref = options.ref || { x: 0, y: 0 };

    const scale = options.scale || 1;

    // fix for safari / chrome / firefox bug not correctly
    // resetting stroke dash array
    if (attrs.strokeDasharray === 'none') {
      attrs.strokeDasharray = [10000, 1];
    }

    const marker = svgCreate('marker');

    svgAttr(options.element, attrs);

    svgAppend(marker, options.element);

    svgAttr(marker, {
      id,
      viewBox: '0 0 20 20',
      refX: ref.x,
      refY: ref.y,
      markerWidth: 20 * scale,
      markerHeight: 20 * scale,
      orient: 'auto',
    });

    let defs = domQuery('defs', this.canvas._svg);

    if (!defs) {
      defs = svgCreate('defs');

      svgAppend(this.canvas._svg, defs);
    }

    svgAppend(defs, marker);

    this.markers[id] = marker;
  }

  createMarker(type, fill, stroke) {
    const id = `${type}-${fill}-${stroke}-${this.rendererId}`;

    if (type === 'sequenceflow-end') {
      const sequenceflowEnd = svgCreate('path');
      svgAttr(sequenceflowEnd, { d: 'M 1 5 L 11 10 L 1 15 Z' });

      this.addMarker(id, {
        element: sequenceflowEnd,
        ref: { x: 11, y: 10 },
        scale: 0.5,
        attrs: {
          fill: stroke,
          stroke,
        },
      });
    }

    if (type === 'messageflow-start') {
      const messageflowStart = svgCreate('circle');
      svgAttr(messageflowStart, { cx: 6, cy: 6, r: 3.5 });

      this.addMarker(id, {
        element: messageflowStart,
        attrs: {
          fill,
          stroke,
        },
        ref: { x: 6, y: 6 },
      });
    }

    if (type === 'messageflow-end') {
      const messageflowEnd = svgCreate('path');
      svgAttr(messageflowEnd, { d: 'm 1 5 l 0 -3 l 7 3 l -7 3 z' });

      this.addMarker(id, {
        element: messageflowEnd,
        attrs: {
          fill,
          stroke,
          strokeLinecap: 'butt',
        },
        ref: { x: 8.5, y: 5 },
      });
    }

    if (type === 'association-start') {
      const associationStart = svgCreate('path');
      svgAttr(associationStart, { d: 'M 11 5 L 1 10 L 11 15' });

      this.addMarker(id, {
        element: associationStart,
        attrs: {
          fill: 'none',
          stroke,
          strokeWidth: 1.5,
        },
        ref: { x: 1, y: 10 },
        scale: 0.5,
      });
    }

    if (type === 'association-end') {
      const associationEnd = svgCreate('path');
      svgAttr(associationEnd, { d: 'M 1 5 L 11 10 L 1 15' });

      this.addMarker(id, {
        element: associationEnd,
        attrs: {
          fill: 'none',
          stroke,
          strokeWidth: 1.5,
        },
        ref: { x: 12, y: 10 },
        scale: 0.5,
      });
    }

    if (type === 'conditional-flow-marker') {
      const conditionalflowMarker = svgCreate('path');
      svgAttr(conditionalflowMarker, { d: 'M 0 10 L 8 6 L 16 10 L 8 14 Z' });

      this.addMarker(id, {
        element: conditionalflowMarker,
        attrs: {
          fill,
          stroke,
        },
        ref: { x: -1, y: 10 },
        scale: 0.5,
      });
    }

    if (type === 'conditional-default-flow-marker') {
      const conditionaldefaultflowMarker = svgCreate('path');
      svgAttr(conditionaldefaultflowMarker, { d: 'M 6 4 L 10 16' });

      this.addMarker(id, {
        element: conditionaldefaultflowMarker,
        attrs: {
          stroke,
        },
        ref: { x: 0, y: 10 },
        scale: 0.5,
      });
    }
  }

  // help functions, code copied from bpmn-js
  createPathFromConnection(connection) {
    const { waypoints } = connection;

    let pathData = `m  ${waypoints[0].x},${waypoints[0].y}`;
    for (let i = 1; i < waypoints.length; i++) {
      pathData += `L${waypoints[i].x},${waypoints[i].y} `;
    }
    return pathData;
  }

  drawPath(parentGfx, d, attrs) {
    attrs = this.computeStyle(attrs, ['no-fill'], {
      strokeWidth: 1,
      stroke: 'black',
    });

    const path = svgCreate('path');
    svgAttr(path, { d });
    svgAttr(path, attrs);

    svgAppend(parentGfx, path);

    return path;
  }

  drawRect(parentGfx, width, height, r, offset, attrs) {
    if (isObject(offset)) {
      attrs = offset;
      offset = 0;
    }

    offset = offset || 0;

    attrs = this.computeStyle(attrs, {
      stroke: 'black',
      strokeWidth: 2,
      fill: 'white',
    });

    const rect = svgCreate('rect');
    svgAttr(rect, {
      x: offset,
      y: offset,
      width: width - offset * 2,
      height: height - offset * 2,
      rx: r,
      ry: r,
    });
    svgAttr(rect, attrs);

    svgAppend(parentGfx, rect);

    return rect;
  }

  renderLabel(parentGfx, label, options) {
    options = Object.assign(
      {
        size: {
          width: 100,
        },
      },
      options,
    );

    const text = this.textRenderer.createText(label || '', options);

    svgClasses(text).add('djs-label');

    svgAppend(parentGfx, text);

    return text;
  }

  renderLaneLabel(parentGfx, text, element) {
    // const defaultStrokeColor = this.config?.defaultStrokeColor;
    const textBox = this.renderLabel(parentGfx, text, {
      box: {
        height: PARTICIPANT_LABEL_WIDTH,
        width: element.height,
        color: '#36415E',
      },
      align: 'center-middle',
      style: {
        fill: '#36415E',
        'font-size': '14px',
      },
    });

    const top = -1 * element.height;

    transform(textBox, 0, -top, 270);
  }

  renderEmbeddedLabel(parentGfx, element, align, attrs) {
    const semantic = getSemantic(element);
    const { defaultLabelColor, defaultStrokeColor } = this.config || {};

    return this.renderLabel(parentGfx, semantic.name, {
      box: {
        width: element.width,
        height: element.height - TASK_OFFSET_Y,
      },
      align,
      padding: 0,
      style: {
        fill: getLabelColor(element, defaultLabelColor, defaultStrokeColor),
        ...attrs,
      },
    });
  }

  attachTaskMarkers(parentGfx, element, attrs, taskMarkers) {
    const obj = getSemantic(element);

    const subprocess = taskMarkers && taskMarkers.indexOf('SubProcessMarker') !== -1;
    let position;

    if (subprocess) {
      position = {
        seq: -21,
        parallel: -22,
        compensation: -42,
        loop: -18,
        adhoc: 10,
      };
    } else {
      position = {
        seq: -3,
        parallel: -6,
        compensation: -27,
        loop: 0,
        adhoc: 10,
      };
    }

    forEach(taskMarkers, function (marker) {
      this.renderer(marker)(parentGfx, element, attrs, position);
    });

    if (obj.isForCompensation) {
      this.renderer('CompensationMarker')(parentGfx, element, attrs, position);
    }

    if (obj.$type === 'bpmn:AdHocSubProcess') {
      this.renderer('AdhocMarker')(parentGfx, element, attrs, position);
    }

    const { loopCharacteristics } = obj;
    const isSequential = loopCharacteristics && loopCharacteristics.isSequential;

    if (loopCharacteristics) {
      if (isSequential === undefined) {
        this.renderer('LoopMarker')(parentGfx, element, attrs, position);
      }

      if (isSequential === false) {
        this.renderer('ParallelMarker')(parentGfx, element, attrs, position);
      }

      if (isSequential === true) {
        this.renderer('SequentialMarker')(parentGfx, element, attrs, position);
      }
    }
  }

  attachIcons(parentGfx, element) {
    const eleIcons = this.config?.getElementIcons?.(element);
    eleIcons?.forEach((item) => {
      svgClasses(parentGfx?.parentNode).add('element-icon');
      const customInactiveIcon = svgCreate('image', item);
      svgAppend(parentGfx, customInactiveIcon);
    });
  }
}

CustomRenderer.$inject = ['config', 'eventBus', 'canvas', 'styles', 'bpmnRenderer', 'textRenderer'];
