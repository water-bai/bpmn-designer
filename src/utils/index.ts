export function getListenEvents(props = {}) {
  const ListenEvents = [];
  const events = {
    elementClick: 'element.click',
    elementHover: 'element.hover',
    elementChanged: 'element.changed',
  };
  const keys = Object.keys(events);
  keys.forEach((item) => {
    if (props?.[item] && typeof props?.[item] === 'function') {
      ListenEvents?.push({
        type: events[item],
        action: props?.[item],
      });
    }
  });
  return ListenEvents;
}
