'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _const = require('./const');

var _const2 = _interopRequireDefault(_const);

var _nextJsCore = require('next-js-core2');

var _nextJsCore2 = _interopRequireDefault(_nextJsCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReduxAppBase = function () {
  _createClass(ReduxAppBase, null, [{
    key: 'attachEmiterSystem',
    value: function attachEmiterSystem() {
      delete _nextJsCore2.default.event.init;
      _nextJsCore2.default.mix(ReduxAppBase.prototype, {
        __listeners__: {}
      }, _nextJsCore2.default.event);
    }
  }]);

  function ReduxAppBase() {
    _classCallCheck(this, ReduxAppBase);

    _nextJsCore2.default.mix(ReduxAppBase, this.commandMethods());
    this.attachCommands();
  }

  _createClass(ReduxAppBase, [{
    key: 'commandMethods',
    value: function commandMethods() {
      var _this = this;

      return {
        command: function command(inName, inData) {
          _this.command(inName, inData, _this);
        },
        onCommand: function onCommand(inName, inHandler) {
          return _this.onCommand(inName, inHandler, _this);
        }
      };
    }
  }, {
    key: 'attachCommands',
    value: function attachCommands() {
      var _this2 = this;

      this.on(_const2.default, function (_, inArgs) {
        _this2.command && _this2.command(inArgs.name, inArgs.data);
      });
    }
  }]);

  return ReduxAppBase;
}();

ReduxAppBase.attachEmiterSystem();

exports.default = ReduxAppBase;