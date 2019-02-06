export default class PropsDataApi {
  constructor(types = {}, defaultValues = {}) {
    this.types = types;
    this.defaultValues = (
      Object.keys(types).reduce((acc, key) => { acc[key] = defaultValues[key]; return acc; }, {})
    );
  }

  getTypesSetToRequired(requiredKeys = []) {
    const { types } = this;
    return (
      Object.keys(types).reduce((modTypes, key) => {
        requiredKeys.length
          ? (modTypes[key] = requiredKeys.includes(key) ? types[key].isRequired : types[key])
          : (modTypes[key] = types[key].isRequired);
        return modTypes;
      }, {})
    );
  }
}
