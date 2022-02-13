import { getOwner } from '@ember/application';
import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

/**
 * Helper for injecting service into template:
 * https://github.com/emberjs/rfcs/issues/543#issuecomment-531383478
 */
export default class GetServiceHelper extends Helper {
  compute([serviceName]) {
    const service = getOwner(this).lookup(`service:${serviceName}`);
    assert(`The service '${serviceName}' does not exist`, service);

    return service;
  }
}
