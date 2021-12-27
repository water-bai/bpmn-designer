// import Cat from '../cat';

/**
 * A provider for quick service task production
 */
export default function CustomPaletteProvider(palette, create, elementFactory) {
  this._create = create;
  this._elementFactory = elementFactory;

  palette.registerProvider(this);
}

CustomPaletteProvider.$inject = ['palette', 'create', 'elementFactory'];

CustomPaletteProvider.prototype.getPaletteEntries = function () {
  const elementFactory = this._elementFactory;
  const create = this._create;

  function startCreate(event) {
    const serviceTask = elementFactory.create('shape', { type: 'bpmn:ServiceTask' });

    create.start(event, serviceTask);
  }

  return {
    'create-service-task': {
      group: 'activity',
      title: 'Create a page task',
      imageUrl:
        'https://gw.alicdn.com/imgextra/i3/O1CN01418Hj11Z8HwJGkfIZ_!!6000000003149-55-tps-30-30.svg',
      action: {
        dragstart: startCreate,
        click: startCreate,
      },
    },
  };
};
