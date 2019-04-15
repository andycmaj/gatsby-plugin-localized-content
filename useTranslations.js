"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _reactI18next = require("react-i18next");

var _default = function _default(ns, opts) {
  return (0, _reactI18next.useTranslation)(ns, (0, _objectSpread2["default"])({}, opts, {
    useSuspense: false
  }));
};

exports["default"] = _default;