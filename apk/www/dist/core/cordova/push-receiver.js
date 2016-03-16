System.register([], function (_export) {
    "use strict";

    var __awaiter, PushEvents, PushReceiver;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [],
        execute: function () {
            __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
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

            PushEvents = function PushEvents() {
                _classCallCheck(this, PushEvents);
            };

            PushEvents.registration = 'registration';
            PushEvents.notification = 'notification';
            PushEvents.error = 'error';

            PushReceiver = (function () {
                function PushReceiver() {
                    _classCallCheck(this, PushReceiver);

                    this._options = {
                        android: {
                            senderID: '158532792965',
                            sound: true,
                            vibrate: true,
                            clearNotifications: false
                        }
                    };
                }

                _createClass(PushReceiver, [{
                    key: "initialize",
                    value: function initialize() {
                        var _this = this;

                        document.addEventListener('deviceready', (function () {
                            _this._puller = window.PushNotification.init(_this._options);
                            _this.register();
                        }).bind(this));
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
            })();

            _export("PushReceiver", PushReceiver);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvY29yZG92YS9wdXNoLXJlY2VpdmVyLmpzIiwiY29yZS9jb3Jkb3ZhL3B1c2gtcmVjZWl2ZXIudHMiXSwibmFtZXMiOlsiUHVzaFJlY2VpdmVyIiwiUHVzaFJlY2VpdmVyLmNvbnN0cnVjdG9yIiwiUHVzaFJlY2VpdmVyLmluaXRpYWxpemUiLCJQdXNoUmVjZWl2ZXIucmVnaXN0ZXIiLCJQdXNoUmVjZWl2ZXIudW5yZWdpc3RlciIsIlB1c2hSZWNlaXZlci5vblJlZ2lzdHJhdGlvbiIsIlB1c2hSZWNlaXZlci5vbk5vdGlmaWNhdGlvbiIsIlB1c2hSZWNlaXZlci5vbkVycm9yIiwiUHVzaFJlY2VpdmVyLnB1bGxlciIsIlB1c2hSZWNlaXZlci5vcHRpb25zIl0sIm1hcHBpbmdzIjoiOzs7UUFBSSxTQUFTLEVDTWIsVUFBQSxFQU1BLFlBQUE7Ozs7Ozs7OztBRFpJLHFCQUFTLEdBQUcsQUFBQyxhQUFRLFVBQUssU0FBUyxJQUFLLFVBQVUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO0FBQzNGLHVCQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMxQyw2QkFBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELDZCQUFTLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFBRSwrQkFBTyxLQUFLLFlBQVksT0FBTyxJQUFJLEtBQUssQ0FBQyxXQUFXLEtBQUssT0FBTyxHQUFHLEtBQUssR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRTtBQUFFLG1DQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQUUsQ0FBQyxDQUFDO3FCQUFFO0FBQ3hKLDZCQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUU7QUFBRSw0QkFBSTtBQUFFLGdDQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFBRSxr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QkFFYUwsd0JBQUNBLElBQStCQSxFQUFBQTtBQUM1Q00sK0JBQU9BLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO0FBQ3hCQSwrQkFBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQUE7QUFDekJBLDZCQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFDQSxZQUFZQSxHQUFFQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQTtxQkFDOUNBOzs7MkJBRU1OLGlCQUFDQSxLQUFZQSxFQUFBQTtBQUNsQk8sK0JBQU9BLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO3FCQUNwQkE7Ozt5QkF2RFNQLGVBQUFBO0FBQ1JRLCtCQUFPQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtxQkFDckJBOzs7eUJBRVVSLGVBQUFBO0FBQ1RTLCtCQUFPQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtxQkFDdEJBOzs7dUJBUEgsWUFBQSIsImZpbGUiOiJjb3JlL2NvcmRvdmEvcHVzaC1yZWNlaXZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xuICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgfSk7XG59O1xuY2xhc3MgUHVzaEV2ZW50cyB7XG59XG5QdXNoRXZlbnRzLnJlZ2lzdHJhdGlvbiA9ICdyZWdpc3RyYXRpb24nO1xuUHVzaEV2ZW50cy5ub3RpZmljYXRpb24gPSAnbm90aWZpY2F0aW9uJztcblB1c2hFdmVudHMuZXJyb3IgPSAnZXJyb3InO1xuZXhwb3J0IGNsYXNzIFB1c2hSZWNlaXZlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICAgICAgICBhbmRyb2lkOiB7XG4gICAgICAgICAgICAgICAgc2VuZGVySUQ6ICcxNTg1MzI3OTI5NjUnLFxuICAgICAgICAgICAgICAgIHNvdW5kOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZpYnJhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgY2xlYXJOb3RpZmljYXRpb25zOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXQgcHVsbGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHVsbGVyO1xuICAgIH1cbiAgICBnZXQgb3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgfVxuICAgIGluaXRpYWxpemUoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3B1bGxlciA9IHdpbmRvdy5QdXNoTm90aWZpY2F0aW9uLmluaXQodGhpcy5fb3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyKCk7XG4gICAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgdGhpcy5fcHVsbGVyLm9uKFB1c2hFdmVudHMucmVnaXN0cmF0aW9uLCB0aGlzLm9uUmVnaXN0cmF0aW9uLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLl9wdWxsZXIub24oUHVzaEV2ZW50cy5ub3RpZmljYXRpb24sIHRoaXMub25Ob3RpZmljYXRpb24uYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuX3B1bGxlci5vbihQdXNoRXZlbnRzLmVycm9yLCB0aGlzLm9uRXJyb3IuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHVucmVnaXN0ZXIoKSB7XG4gICAgICAgIHRoaXMuX3B1bGxlci51bnJlZ2lzdGVyKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQdXNoIE5vdGlmaWNhdGlvbnMgdW5yZWdpc3RlcmVkJyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvblJlZ2lzdHJhdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEucmVnaXN0cmF0aW9uSWQpO1xuICAgIH1cbiAgICBvbk5vdGlmaWNhdGlvbihkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEudGl0bGUpO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLm1lc3NhZ2UpO1xuICAgICAgICBhbGVydChkYXRhLnRpdGxlICsgXCIgTWVzc2FnZTogXCIgKyBkYXRhLm1lc3NhZ2UpO1xuICAgIH1cbiAgICBvbkVycm9yKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgQWxleCBvbiAwOC8wMy8yMDE2LlxuICovXG5pbXBvcnQge0luaXRPcHRpb25zLCBOb3RpZmljYXRpb25FdmVudFJlc3BvbnNlLCBSZWdpc3RyYXRpb25FdmVudFJlc3BvbnNlLCBQdXNoTm90aWZpY2F0aW9ufSBmcm9tICdQaG9uZWdhcFBsdWdpblB1c2gnO1xuaW1wb3J0IHtJUHVzaFJlY2VpdmVyfSBmcm9tIFwicHVzaC1ub3RpZmljYXRpb25zXCI7XG5cbmNsYXNzIFB1c2hFdmVudHN7XG4gIHB1YmxpYyBzdGF0aWMgcmVnaXN0cmF0aW9uID0gJ3JlZ2lzdHJhdGlvbic7XG4gIHB1YmxpYyBzdGF0aWMgbm90aWZpY2F0aW9uID0gJ25vdGlmaWNhdGlvbic7XG4gIHB1YmxpYyBzdGF0aWMgZXJyb3IgPSAnZXJyb3InO1xufVxuXG5leHBvcnQgY2xhc3MgUHVzaFJlY2VpdmVyIGltcGxlbWVudHMgSVB1c2hSZWNlaXZlcntcbiAgZ2V0IHB1bGxlcigpOlB1c2hOb3RpZmljYXRpb257XG4gICAgcmV0dXJuIHRoaXMuX3B1bGxlcjtcbiAgfVxuXG4gIGdldCBvcHRpb25zKCk6SW5pdE9wdGlvbnN7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIF9wdWxsZXI6IFB1c2hOb3RpZmljYXRpb247XG4gIHByaXZhdGUgX29wdGlvbnM6IEluaXRPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgIGFuZHJvaWQ6IHtcbiAgICAgICAgc2VuZGVySUQ6ICcxNTg1MzI3OTI5NjUnLFxuICAgICAgICAvL2ljb246ICcnLFxuICAgICAgICAvL2ljb25Db2xvcjogJycsXG4gICAgICAgIHNvdW5kOiB0cnVlLFxuICAgICAgICB2aWJyYXRlOiB0cnVlLFxuICAgICAgICBjbGVhck5vdGlmaWNhdGlvbnM6IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZSgpe1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgKCgpPT57XG4gICAgICB0aGlzLl9wdWxsZXIgPSAoPGFueT53aW5kb3cpLlB1c2hOb3RpZmljYXRpb24uaW5pdCh0aGlzLl9vcHRpb25zKTtcbiAgICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgICB9KS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHJlZ2lzdGVyKCl7XG4gICAgdGhpcy5fcHVsbGVyLm9uKFB1c2hFdmVudHMucmVnaXN0cmF0aW9uLCB0aGlzLm9uUmVnaXN0cmF0aW9uLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3B1bGxlci5vbihQdXNoRXZlbnRzLm5vdGlmaWNhdGlvbiwgdGhpcy5vbk5vdGlmaWNhdGlvbi5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9wdWxsZXIub24oUHVzaEV2ZW50cy5lcnJvciwgdGhpcy5vbkVycm9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgdW5yZWdpc3Rlcigpe1xuICAgIHRoaXMuX3B1bGxlci51bnJlZ2lzdGVyKCgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdQdXNoIE5vdGlmaWNhdGlvbnMgdW5yZWdpc3RlcmVkJyk7XG4gICAgfSk7XG4gIH1cblxuICBvblJlZ2lzdHJhdGlvbihkYXRhOiBSZWdpc3RyYXRpb25FdmVudFJlc3BvbnNlKXtcbiAgICBjb25zb2xlLmxvZyhkYXRhLnJlZ2lzdHJhdGlvbklkKTtcbiAgfVxuXG4gIG9uTm90aWZpY2F0aW9uKGRhdGE6IE5vdGlmaWNhdGlvbkV2ZW50UmVzcG9uc2Upe1xuICAgIGNvbnNvbGUubG9nKGRhdGEudGl0bGUpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEubWVzc2FnZSlcbiAgICBhbGVydChkYXRhLnRpdGxlK1wiIE1lc3NhZ2U6IFwiICtkYXRhLm1lc3NhZ2UpO1xuICB9XG5cbiAgb25FcnJvcihlcnJvcjogRXJyb3Ipe1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
