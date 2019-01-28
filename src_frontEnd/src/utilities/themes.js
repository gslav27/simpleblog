export default {
  color: 'rgb(38,50,56)',
  colors: {
    active: 'green',
    inactive: '#777',
    // text: 'rgb(38,50,56)',
  },
  lineHeight: 1.8,
  
  // Mixins
  boldUppercaseMixin:
    color => `color: ${color};
      text-transform: uppercase;
      font-weight: bold;`,
  inputTextMixin: 'font-size: 1em',
  
  // MediaMixins
  hightResolutionMediaMixin:
    styles => `@media
      only screen and (-webkit-min-device-pixel-ratio: 1.3),
      only screen and (-o-min-device-pixel-ratio: 13/10),
      only screen and (min-resolution: 120dpi) {
        ${styles}
      }`,
};

