"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PushReceiver = undefined;

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};

var PushEvents = function PushEvents() {
    (0, _classCallCheck3.default)(this, PushEvents);
};

PushEvents.registration = 'registration';
PushEvents.notification = 'notification';
PushEvents.error = 'error';

var PushReceiver = exports.PushReceiver = function () {
    function PushReceiver() {
        (0, _classCallCheck3.default)(this, PushReceiver);

        this._options = {
            android: {
                senderID: '158532792965',
                sound: true,
                vibrate: true,
                clearNotifications: false
            }
        };
    }

    (0, _createClass3.default)(PushReceiver, [{
        key: "initialize",
        value: function initialize() {
            var _this = this;

            document.addEventListener('deviceready', function () {
                _this._puller = window.PushNotification.init(_this._options);
                _this.register();
            }.bind(this));
        }
    }, {
        key: "register",
        value: function register() {
            this._puller.on(PushEvents.registration, this.onRegistration.bind(this));
            this._puller.on(PushEvents.notification, this.onNotification.bind(this));
            this._puller.on(PushEvents.error, this.onError.bind(this));
        }
    }, {
        key: "unregister",
        value: function unregister() {
            this._puller.unregister(function () {
                console.log('Push Notifications unregistered');
            });
        }
    }, {
        key: "onRegistration",
        value: function onRegistration(data) {
            console.log(data.registrationId);
        }
    }, {
        key: "onNotification",
        value: function onNotification(data) {
            console.log(data.title);
            console.log(data.message);
            alert(data.title + " Message: " + data.message);
        }
    }, {
        key: "onError",
        value: function onError(error) {
            console.log(error);
        }
    }, {
        key: "puller",
        get: function get() {
            return this._puller;
        }
    }, {
        key: "options",
        get: function get() {
            return this._options;
        }
    }]);
    return PushReceiver;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvY29yZG92YS9wdXNoLXJlY2VpdmVyLmpzIiwiY29yZS9jb3Jkb3ZhL3B1c2gtcmVjZWl2ZXIudHMiXSwibmFtZXMiOlsiUHVzaFJlY2VpdmVyIiwiUHVzaFJlY2VpdmVyLmNvbnN0cnVjdG9yIiwiUHVzaFJlY2VpdmVyLmluaXRpYWxpemUiLCJQdXNoUmVjZWl2ZXIucmVnaXN0ZXIiLCJQdXNoUmVjZWl2ZXIudW5yZWdpc3RlciIsIlB1c2hSZWNlaXZlci5vblJlZ2lzdHJhdGlvbiIsIlB1c2hSZWNlaXZlci5vbk5vdGlmaWNhdGlvbiIsIlB1c2hSZWNlaXZlci5vbkVycm9yIiwiUHVzaFJlY2VpdmVyLnB1bGxlciIsIlB1c2hSZWNlaXZlci5vcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUksWUFBWSxTQUFDLElBQVEsVUFBSyxTQUFMLElBQW1CLFVBQVUsT0FBVixFQUFtQixVQUFuQixFQUErQixPQUEvQixFQUF3QyxTQUF4QyxFQUFtRDtBQUMzRixXQUFPLElBQUksT0FBSixDQUFZLFVBQVUsT0FBVixFQUFtQixNQUFuQixFQUEyQjtBQUMxQyxvQkFBWSxVQUFVLElBQVYsQ0FBZSxPQUFmLEVBQXdCLFVBQXhCLENBQVosQ0FEMEM7QUFFMUMsaUJBQVMsSUFBVCxDQUFjLEtBQWQsRUFBcUI7QUFBRSxtQkFBTyxpQkFBaUIsT0FBakIsSUFBNEIsTUFBTSxXQUFOLEtBQXNCLE9BQXRCLEdBQWdDLEtBQTVELEdBQW9FLElBQUksT0FBSixDQUFZLFVBQVUsT0FBVixFQUFtQjtBQUFFLHdCQUFRLEtBQVIsRUFBRjthQUFuQixDQUFoRixDQUFUO1NBQXJCO0FBQ0EsaUJBQVMsU0FBVCxDQUFtQixLQUFuQixFQUEwQjtBQUFFLGdCQUFJO0FBQUUscUJBQUssTUFBTCxFQUFhLEtBQWIsRUFBRjthQUFKLENBQTZCLE9BQU8sQ0FBUCxFQUFVO0FBQUUsdUJBQU8sQ0FBUCxFQUFGO2FBQVY7U0FBekQ7QUFDQSxpQkFBUyxR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Y2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQcm9taXNlLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgZnVuY3Rpb24gY2FzdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlID8gdmFsdWUgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAodmVyYiwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgIH0pO1xufTtcbmNsYXNzIFB1c2hFdmVudHMge1xufVxuUHVzaEV2ZW50cy5yZWdpc3RyYXRpb24gPSAncmVnaXN0cmF0aW9uJztcblB1c2hFdmVudHMubm90aWZpY2F0aW9uID0gJ25vdGlmaWNhdGlvbic7XG5QdXNoRXZlbnRzLmVycm9yID0gJ2Vycm9yJztcbmV4cG9ydCBjbGFzcyBQdXNoUmVjZWl2ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0ge1xuICAgICAgICAgICAgYW5kcm9pZDoge1xuICAgICAgICAgICAgICAgIHNlbmRlcklEOiAnMTU4NTMyNzkyOTY1JyxcbiAgICAgICAgICAgICAgICBzb3VuZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2aWJyYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNsZWFyTm90aWZpY2F0aW9uczogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0IHB1bGxlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3B1bGxlcjtcbiAgICB9XG4gICAgZ2V0IG9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICAgIH1cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsICgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9wdWxsZXIgPSB3aW5kb3cuUHVzaE5vdGlmaWNhdGlvbi5pbml0KHRoaXMuX29wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlcigpO1xuICAgICAgICB9KS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgcmVnaXN0ZXIoKSB7XG4gICAgICAgIHRoaXMuX3B1bGxlci5vbihQdXNoRXZlbnRzLnJlZ2lzdHJhdGlvbiwgdGhpcy5vblJlZ2lzdHJhdGlvbi5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5fcHVsbGVyLm9uKFB1c2hFdmVudHMubm90aWZpY2F0aW9uLCB0aGlzLm9uTm90aWZpY2F0aW9uLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl9wdWxsZXIub24oUHVzaEV2ZW50cy5lcnJvciwgdGhpcy5vbkVycm9yLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICB1bnJlZ2lzdGVyKCkge1xuICAgICAgICB0aGlzLl9wdWxsZXIudW5yZWdpc3RlcigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUHVzaCBOb3RpZmljYXRpb25zIHVucmVnaXN0ZXJlZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25SZWdpc3RyYXRpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnJlZ2lzdHJhdGlvbklkKTtcbiAgICB9XG4gICAgb25Ob3RpZmljYXRpb24oZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLnRpdGxlKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgYWxlcnQoZGF0YS50aXRsZSArIFwiIE1lc3NhZ2U6IFwiICsgZGF0YS5tZXNzYWdlKTtcbiAgICB9XG4gICAgb25FcnJvcihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEFsZXggb24gMDgvMDMvMjAxNi5cbiAqL1xuaW1wb3J0IHtJbml0T3B0aW9ucywgTm90aWZpY2F0aW9uRXZlbnRSZXNwb25zZSwgUmVnaXN0cmF0aW9uRXZlbnRSZXNwb25zZSwgUHVzaE5vdGlmaWNhdGlvbn0gZnJvbSAnUGhvbmVnYXBQbHVnaW5QdXNoJztcbmltcG9ydCB7SVB1c2hSZWNlaXZlcn0gZnJvbSBcInB1c2gtbm90aWZpY2F0aW9uc1wiO1xuXG5jbGFzcyBQdXNoRXZlbnRze1xuICBwdWJsaWMgc3RhdGljIHJlZ2lzdHJhdGlvbiA9ICdyZWdpc3RyYXRpb24nO1xuICBwdWJsaWMgc3RhdGljIG5vdGlmaWNhdGlvbiA9ICdub3RpZmljYXRpb24nO1xuICBwdWJsaWMgc3RhdGljIGVycm9yID0gJ2Vycm9yJztcbn1cblxuZXhwb3J0IGNsYXNzIFB1c2hSZWNlaXZlciBpbXBsZW1lbnRzIElQdXNoUmVjZWl2ZXJ7XG4gIGdldCBwdWxsZXIoKTpQdXNoTm90aWZpY2F0aW9ue1xuICAgIHJldHVybiB0aGlzLl9wdWxsZXI7XG4gIH1cblxuICBnZXQgb3B0aW9ucygpOkluaXRPcHRpb25ze1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHVsbGVyOiBQdXNoTm90aWZpY2F0aW9uO1xuICBwcml2YXRlIF9vcHRpb25zOiBJbml0T3B0aW9ucztcblxuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICBhbmRyb2lkOiB7XG4gICAgICAgIHNlbmRlcklEOiAnMTU4NTMyNzkyOTY1JyxcbiAgICAgICAgLy9pY29uOiAnJyxcbiAgICAgICAgLy9pY29uQ29sb3I6ICcnLFxuICAgICAgICBzb3VuZDogdHJ1ZSxcbiAgICAgICAgdmlicmF0ZTogdHJ1ZSxcbiAgICAgICAgY2xlYXJOb3RpZmljYXRpb25zOiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxpemUoKXtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsICgoKT0+e1xuICAgICAgdGhpcy5fcHVsbGVyID0gKDxhbnk+d2luZG93KS5QdXNoTm90aWZpY2F0aW9uLmluaXQodGhpcy5fb3B0aW9ucyk7XG4gICAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gICAgfSkuYmluZCh0aGlzKSk7XG4gIH1cblxuICByZWdpc3Rlcigpe1xuICAgIHRoaXMuX3B1bGxlci5vbihQdXNoRXZlbnRzLnJlZ2lzdHJhdGlvbiwgdGhpcy5vblJlZ2lzdHJhdGlvbi5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9wdWxsZXIub24oUHVzaEV2ZW50cy5ub3RpZmljYXRpb24sIHRoaXMub25Ob3RpZmljYXRpb24uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fcHVsbGVyLm9uKFB1c2hFdmVudHMuZXJyb3IsIHRoaXMub25FcnJvci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHVucmVnaXN0ZXIoKXtcbiAgICB0aGlzLl9wdWxsZXIudW5yZWdpc3RlcigoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnUHVzaCBOb3RpZmljYXRpb25zIHVucmVnaXN0ZXJlZCcpO1xuICAgIH0pO1xuICB9XG5cbiAgb25SZWdpc3RyYXRpb24oZGF0YTogUmVnaXN0cmF0aW9uRXZlbnRSZXNwb25zZSl7XG4gICAgY29uc29sZS5sb2coZGF0YS5yZWdpc3RyYXRpb25JZCk7XG4gIH1cblxuICBvbk5vdGlmaWNhdGlvbihkYXRhOiBOb3RpZmljYXRpb25FdmVudFJlc3BvbnNlKXtcbiAgICBjb25zb2xlLmxvZyhkYXRhLnRpdGxlKTtcbiAgICBjb25zb2xlLmxvZyhkYXRhLm1lc3NhZ2UpXG4gICAgYWxlcnQoZGF0YS50aXRsZStcIiBNZXNzYWdlOiBcIiArZGF0YS5tZXNzYWdlKTtcbiAgfVxuXG4gIG9uRXJyb3IoZXJyb3I6IEVycm9yKXtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
