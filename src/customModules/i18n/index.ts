import zn from './zn';

export default function customTranslate(template, replacements) {
  replacements = replacements || {};

  // Translate
  template = zn[template] || template;

  // Replace
  return template.replace(/{([^}]+)}/g, (_, key) => {
    return replacements[key] || `{${key}}`;
  });
}
