import Transform from '@ember-data/serializer/transform';
import { isArray, A } from '@ember/array';

export default class ArrayTransform extends Transform {
  deserialize(serialized) {
    if (isArray(serialized)) {
      return A(serialized);
    } else {
      return A();
    }
  }
  serialize(deserialized) {
    if (isArray(deserialized)) {
      return A(deserialized);
    } else {
      return A();
    }
  }
}
