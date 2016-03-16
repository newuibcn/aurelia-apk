System.register(["bootstrap", "./core/cordova/push-receiver"], function (_export) {
    "use strict";

    var PushReceiver, __awaiter;

    _export("configure", configure);

    function configure(aurelia) {
        aurelia.use.standardConfiguration().developmentLogging();
        aurelia.start().then(function () {
            return aurelia.setRoot();
        });
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            var pushReceiver = new PushReceiver();
            pushReceiver.initialize();
        }
    }

    return {
        setters: [function (_bootstrap) {}, function (_coreCordovaPushReceiver) {
            PushReceiver = _coreCordovaPushReceiver.PushReceiver;
        }],
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJtYWluLnRzIl0sIm5hbWVzIjpbImNvbmZpZ3VyZSJdLCJtYXBwaW5ncyI6Ijs7O3NCQUFJLFNBQVM7Ozs7QUNJYixhQUFBLFNBQUEsQ0FBMEIsT0FBZ0IsRUFBQTtBQUN4Q0EsZUFBT0EsQ0FBQ0EsR0FBR0EsQ0FDUkEscUJBQXFCQSxFQUFFQSxDQUN2QkEsa0JBQWtCQSxFQUFFQSxDQUFDQTtBQVF4QkEsZUFBT0EsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7bUJBQU1BLE9BQU9BLENBQUNBLE9BQU9BLEVBQUVBO1NBQUFBLENBQUNBLENBQUNBO0FBRTlDQSxZQUFJQSxnRUFBZ0VBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUVBLEVBQUVBO0FBQy9GQSxnQkFBSUEsWUFBWUEsR0FBR0EsSUFBSUEsWUFBWUEsRUFBRUEsQ0FBQ0E7QUFDdENBLHdCQUFZQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtTQUMzQkE7S0FDRkE7Ozs7b0RBbkJPLFlBQVk7OztBREZoQixxQkFBUyxHQUFHLEFBQUMsYUFBUSxVQUFLLFNBQVMsSUFBSyxVQUFVLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRTtBQUMzRix1QkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDMUMsNkJBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNoRCw2QkFBUyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQUUsK0JBQU8sS0FBSyxZQUFZLE9BQU8sSUFBSSxLQUFLLENBQUMsV0FBVyxLQUFLLE9BQU8sR0FBRyxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUU7QUFBRSxtQ0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUFFLENBQUMsQ0FBQztxQkFBRTtBQUN4Siw2QkFBUyxTQUFTLENBQUMsS0FBSyxFQUFFO0FBQUUsNEJBQUk7QUFBRSxnQ0FBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQzt5QkFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQUUsa0NBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFBRTtxQkFBRTtBQUNuRiw2QkFBUyxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQUUsNEJBQUk7QUFBRSxnQ0FBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQzt5QkFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQUUsa0NBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFBRTtxQkFBRTtBQUNuRiw2QkFBUyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUN2Qiw0QkFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLDhCQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUN0RjtBQUNELHdCQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQ3hCLENBQUMsQ0FBQzthQUNOIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQcm9taXNlLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgZnVuY3Rpb24gY2FzdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlID8gdmFsdWUgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAodmVyYiwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgIH0pO1xufTtcbmltcG9ydCAnYm9vdHN0cmFwJztcbmltcG9ydCB7IFB1c2hSZWNlaXZlciB9IGZyb20gXCIuL2NvcmUvY29yZG92YS9wdXNoLXJlY2VpdmVyXCI7XG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGF1cmVsaWEpIHtcbiAgICBhdXJlbGlhLnVzZVxuICAgICAgICAuc3RhbmRhcmRDb25maWd1cmF0aW9uKClcbiAgICAgICAgLmRldmVsb3BtZW50TG9nZ2luZygpO1xuICAgIGF1cmVsaWEuc3RhcnQoKS50aGVuKCgpID0+IGF1cmVsaWEuc2V0Um9vdCgpKTtcbiAgICBpZiAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAgIGxldCBwdXNoUmVjZWl2ZXIgPSBuZXcgUHVzaFJlY2VpdmVyKCk7XG4gICAgICAgIHB1c2hSZWNlaXZlci5pbml0aWFsaXplKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICdib290c3RyYXAnO1xuaW1wb3J0IHtBdXJlbGlhfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQge1B1c2hSZWNlaXZlcn0gZnJvbSBcIi4vY29yZS9jb3Jkb3ZhL3B1c2gtcmVjZWl2ZXJcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShhdXJlbGlhOiBBdXJlbGlhKSB7XG4gIGF1cmVsaWEudXNlXG4gICAgLnN0YW5kYXJkQ29uZmlndXJhdGlvbigpXG4gICAgLmRldmVsb3BtZW50TG9nZ2luZygpO1xuXG4gIC8vVW5jb21tZW50IHRoZSBsaW5lIGJlbG93IHRvIGVuYWJsZSBhbmltYXRpb24uXG4gIC8vYXVyZWxpYS51c2UucGx1Z2luKCdhdXJlbGlhLWFuaW1hdG9yLWNzcycpO1xuXG4gIC8vQW55b25lIHdhbnRpbmcgdG8gdXNlIEhUTUxJbXBvcnRzIHRvIGxvYWQgdmlld3MsIHdpbGwgbmVlZCB0byBpbnN0YWxsIHRoZSBmb2xsb3dpbmcgcGx1Z2luLlxuICAvL2F1cmVsaWEudXNlLnBsdWdpbignYXVyZWxpYS1odG1sLWltcG9ydC10ZW1wbGF0ZS1sb2FkZXInKVxuXG4gIGF1cmVsaWEuc3RhcnQoKS50aGVuKCgpID0+IGF1cmVsaWEuc2V0Um9vdCgpKTtcblxuICBpZiggL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICkge1xuICAgIGxldCBwdXNoUmVjZWl2ZXIgPSBuZXcgUHVzaFJlY2VpdmVyKCk7XG4gICAgcHVzaFJlY2VpdmVyLmluaXRpYWxpemUoKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
