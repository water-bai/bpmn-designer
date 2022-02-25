export default function CustomPaletteProvider(palette, create, elementFactory, modeling) {
  this._create = create;
  this._elementFactory = elementFactory;
  this._modeling = modeling;
  palette.registerProvider(this);
}

CustomPaletteProvider.$inject = ['palette', 'create', 'elementFactory', 'modeling'];

CustomPaletteProvider.prototype.getPaletteEntries = function () {
  const elementFactory = this._elementFactory;
  const create = this._create;
  const modeling = this._modeling;

  function startCreate(event) {
    const serviceTask = elementFactory.create('shape', {
      type: 'bpmn:ServiceTask',
      width: 160,
      height: 375,
    });
    modeling.updateProperties(serviceTask, { isPage: 'true' });
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
