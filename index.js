/*!
 * merge-descriptors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

module.exports = merge

/**
 * Module variables.
 * @private
 */

var hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * hasOwnProperty : 개체가 특정 프로퍼티를 소유하고 있는지 판단하는데 사용한다. / 개체의 프로토타입 체인을 확인하지 않는다.
 */

/**
 * Merge the property descriptors of `src` into `dest`
 *
 * @param {object} dest Object to add descriptors to
 * @param {object} src Object to clone descriptors from
 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
 * @returns {object} Reference to dest
 * @public
 */

function merge (dest, src, redefine) {
  if (!dest) {
    throw new TypeError('argument dest is required')
  }

  if (!src) {
    throw new TypeError('argument src is required')
  }

  if (redefine === undefined) {
    // Default to true
    redefine = true
  }
  /**
   * merge-descriptors함수를 사용하기 위해서는 기본적으로 인자 두개를 넣어주어야함
   * redefine의 경우 디폴트 값은 true로 설정한다.
   */

  /**
   * src에 있는 프로퍼티가 dest에도 있는경우
   * redefine이 true이면 src에 있는 프로퍼티를 dest로 복사한다.
   * redefine이 false이면 src에 있는 프로퍼티를 dest로 복사하지 않는다.
   */

  Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName (name) {
    if (!redefine && hasOwnProperty.call(dest, name)) {
      /**
       * Function.prototype.call : 첫번째 매개변수를 this, 나머지 매개변수를 인수로 하여 함수를 호출한다.
       */
      // Skip descriptor
      return
    }
    /**
     * redefine이 false이고 dest에 src의 프로퍼티와 동일한 프로퍼티가 있는경우
     * 복사를 하지 않는다.
     */

    // Copy descriptor
    var descriptor = Object.getOwnPropertyDescriptor(src, name)
    /**
     * Object.getOwnPropertyDescriptor : 주어진 개체의 프로퍼티에 대한 속성 설명자(descriptor)를 반환한다.
     */
    Object.defineProperty(dest, name, descriptor)
    /**
     * Object.defineProperty : 개체에 직접 새로운 속성을 정의하거나 이미 존재하는 속성을 수정한 후, 그 개체를 반환한다.
     */
    /**
     * src의 프로퍼티를 dest에 복사한다.
     */
  })

  return dest
}
