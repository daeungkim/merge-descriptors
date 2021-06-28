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
 * Object.create(null)을 통해 개체를 만든경우 데이터 타입은 개체이지만 prototype이 undefined로 설정이 됨
 * 따라서 hasOwnProperty()함수에 접근할 수 없다.
 *
 * 또한 자바스크립트의 경우 hasOwnProperty 프로퍼티를 보호하지 않는다.
 * 따라서 해당 프로퍼티를 얼마든지 수정할 수 있다.
 *
 * https://stackoverflow.com/questions/12017693/why-use-object-prototype-hasownproperty-callmyobj-prop-instead-of-myobj-hasow
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
      // Skip descriptor
      return
    }
    /**
     * redefine이 false이고 dest에 src의 프로퍼티와 동일한 프로퍼티가 있는경우
     * 복사를 하지 않는다.
     */

    // Copy descriptor
    var descriptor = Object.getOwnPropertyDescriptor(src, name)
    Object.defineProperty(dest, name, descriptor)
    /**
     * src의 프로퍼티를 dest에 복사한다.
     */
  })

  return dest
}
