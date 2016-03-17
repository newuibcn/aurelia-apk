"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configure = configure;

require("bootstrap");

var _pushReceiver = require("./core/cordova/push-receiver");

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
function configure(aurelia) {
    aurelia.use.standardConfiguration().developmentLogging();
    aurelia.start().then(function () {
        return aurelia.setRoot();
    });
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        var pushReceiver = new _pushReceiver.PushReceiver();
        pushReceiver.initialize();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiLCJtYWluLmpzIl0sIm5hbWVzIjpbImNvbmZpZ3VyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFJQTs7QUNTQTs7QUFDQTs7QUFkQSxJQUFJLFlBQVksU0FBQyxJQUFRLFVBQUssU0FBTCxJQUFtQixVQUFVLE9BQVYsRUFBbUIsVUFBbkIsRUFBK0IsT0FBL0IsRUFBd0MsU0FBeEMsRUFBbUQ7QUFDM0YsV0FBTyxJQUFJLE9BQUosQ0FBWSxVQUFVLE9BQVYsRUFBbUIsTUFBbkIsRUFBMkI7QUFDMUMsb0JBQVksVUFBVSxJQUFWLENBQWUsT0FBZixFQUF3QixVQUF4QixDQUFaLENBRDBDO0FBRTFDLGlCQUFTLElBQVQsQ0FBYyxLQUFkLEVBQXFCO0FBQUUsbUJBQU8saUJBQWlCLE9BQWpCLElBQTRCLE1BQU0sV0FBTixLQUFzQixPQUF0QixHQUFnQyxLQUE1RCxHQUFvRSxJQUFJLE9BQUosQ0FBWSxVQUFVLE9BQVYsRUFBbUI7QUFBRSx3QkFBUSxLQUFSLEVBQUY7YUFBbkIsQ0FBaEYsQ0FBVDtTQUFyQjtBQUNBLGlCQUFTLFNBQVQsQ0FBbUIsS0FBbkIsRUFBMEI7QUFBRSxnQkFBSTtBQUFFLHFCQUFLLE1BQUwsRUFBYSxLQUFiLEVBQUY7YUFBSixDQUE2QixPQUFPLENBQVAsRUFBVTtBQUFFLHVCQUFPLENBQVAsRUFBRjthQUFWO1NBQXpEO0FBQ0EsaUJBQVMsUUFBVCxDQUFrQixLQUFsQixFQUF5QjtBQUFFLGdCQUFJO0FBQUUscUJBQUssT0FBTCxFQUFjLEtBQWQsRUFBRjthQUFKLENBQThCLE9BQU8sQ0FBUCxFQUFVO0FBQUUsdUJBQU8sQ0FBUCxFQUFGO2FBQVY7U0FBekQ7QUFDQSxpQkFBUyxJQUFULENBQWMsSUFBZCxFQUFvQixLQUFwQixFQUEyQjtBQUN2QixnQkFBSSxTQUFTLFVBQVUsSUFBVixFQUFnQixLQUFoQixDQUFULENBRG1CO0FBRXZCLG1CQUFPLElBQVAsR0FBYyxRQUFRLE9BQU8sS0FBUCxDQUF0QixHQUFzQyxLQUFLLE9BQU8sS0FBUCxDQUFMLENBQW1CLElBQW5CLENBQXdCLFNBQXhCLEVBQW1DLFFBQW5DLENBQXRDLENBRnVCO1NBQTNCO0FBSUEsYUFBSyxNQUFMLEVBQWEsS0FBSyxDQUFMLENBQWIsQ0FUMEM7S0FBM0IsQ0FBbkIsQ0FEMkY7Q0FBbkQ7QURJNUMsU0FBQSxTQUFBLENBQTBCLE9BQTFCLEVBQTBDO0FBQ3hDQSxZQUFRQSxHQUFSQSxDQUNHQSxxQkFESEEsR0FFR0Esa0JBRkhBLEdBRHdDO0FBV3hDQSxZQUFRQSxLQUFSQSxHQUFnQkEsSUFBaEJBLENBQXFCQTtlQUFNQSxRQUFRQSxPQUFSQTtLQUFOQSxDQUFyQkEsQ0FYd0M7QUFheENBLFFBQUlBLGlFQUFpRUEsSUFBakVBLENBQXNFQSxVQUFVQSxTQUFWQSxDQUExRUEsRUFBaUdBO0FBQy9GQSxZQUFJQSxlQUFlQSxnQ0FBZkEsQ0FEMkZBO0FBRS9GQSxxQkFBYUEsVUFBYkEsR0FGK0ZBO0tBQWpHQTtDQWJGIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2Jvb3RzdHJhcCc7XG5pbXBvcnQge0F1cmVsaWF9IGZyb20gJ2F1cmVsaWEtZnJhbWV3b3JrJztcbmltcG9ydCB7UHVzaFJlY2VpdmVyfSBmcm9tIFwiLi9jb3JlL2NvcmRvdmEvcHVzaC1yZWNlaXZlclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWE6IEF1cmVsaWEpIHtcbiAgYXVyZWxpYS51c2VcbiAgICAuc3RhbmRhcmRDb25maWd1cmF0aW9uKClcbiAgICAuZGV2ZWxvcG1lbnRMb2dnaW5nKCk7XG5cbiAgLy9VbmNvbW1lbnQgdGhlIGxpbmUgYmVsb3cgdG8gZW5hYmxlIGFuaW1hdGlvbi5cbiAgLy9hdXJlbGlhLnVzZS5wbHVnaW4oJ2F1cmVsaWEtYW5pbWF0b3ItY3NzJyk7XG5cbiAgLy9BbnlvbmUgd2FudGluZyB0byB1c2UgSFRNTEltcG9ydHMgdG8gbG9hZCB2aWV3cywgd2lsbCBuZWVkIHRvIGluc3RhbGwgdGhlIGZvbGxvd2luZyBwbHVnaW4uXG4gIC8vYXVyZWxpYS51c2UucGx1Z2luKCdhdXJlbGlhLWh0bWwtaW1wb3J0LXRlbXBsYXRlLWxvYWRlcicpXG5cbiAgYXVyZWxpYS5zdGFydCgpLnRoZW4oKCkgPT4gYXVyZWxpYS5zZXRSb290KCkpO1xuXG4gIGlmKCAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgKSB7XG4gICAgbGV0IHB1c2hSZWNlaXZlciA9IG5ldyBQdXNoUmVjZWl2ZXIoKTtcbiAgICBwdXNoUmVjZWl2ZXIuaW5pdGlhbGl6ZSgpO1xuICB9XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQcm9taXNlLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgZnVuY3Rpb24gY2FzdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlID8gdmFsdWUgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAodmVyYiwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgIH0pO1xufTtcbmltcG9ydCAnYm9vdHN0cmFwJztcbmltcG9ydCB7IFB1c2hSZWNlaXZlciB9IGZyb20gXCIuL2NvcmUvY29yZG92YS9wdXNoLXJlY2VpdmVyXCI7XG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWEpIHtcbiAgICBhdXJlbGlhLnVzZVxuICAgICAgICAuc3RhbmRhcmRDb25maWd1cmF0aW9uKClcbiAgICAgICAgLmRldmVsb3BtZW50TG9nZ2luZygpO1xuICAgIGF1cmVsaWEuc3RhcnQoKS50aGVuKCgpID0+IGF1cmVsaWEuc2V0Um9vdCgpKTtcbiAgICBpZiAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgIGxldCBwdXNoUmVjZWl2ZXIgPSBuZXcgUHVzaFJlY2VpdmVyKCk7XG4gICAgICAgIHB1c2hSZWNlaXZlci5pbml0aWFsaXplKCk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
