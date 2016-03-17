"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Autoupdater = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

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

var Autoupdater = exports.Autoupdater = function () {
    function Autoupdater(_fileTransfer, _fileSystem, _networkInformation, _rootDirectory, _serverUrl) {
        (0, _classCallCheck3.default)(this, Autoupdater);

        this._fileTransfer = _fileTransfer;
        this._fileSystem = _fileSystem;
        this._networkInformation = _networkInformation;
        this._rootDirectory = _rootDirectory;
        this._serverUrl = _serverUrl;
    }

    (0, _createClass3.default)(Autoupdater, [{
        key: "autoupdate",
        value: function autoupdate(localStorageDirectory, localManifestPath, remoteManifestPath) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
                var result;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.copyManifestToLocalStorage(this._rootDirectory, localStorageDirectory, localManifestPath);

                            case 2:
                                result = _context.sent;

                                if (!result) {
                                    _context.next = 40;
                                    break;
                                }

                                _context.next = 6;
                                return this.checkNewVersion(localManifestPath, remoteManifestPath);

                            case 6:
                                result = _context.sent;

                                if (!result) {
                                    _context.next = 39;
                                    break;
                                }

                                _context.prev = 8;
                                _context.next = 11;
                                return this.doBackup(localStorageDirectory);

                            case 11:
                                result = _context.sent;

                                if (!result) {
                                    _context.next = 25;
                                    break;
                                }

                                _context.next = 15;
                                return this.updateFiles(this._serverUrl, localStorageDirectory);

                            case 15:
                                result = _context.sent;

                                if (!result) {
                                    _context.next = 20;
                                    break;
                                }

                                return _context.abrupt("return", _promise2.default.resolve());

                            case 20:
                                _context.next = 22;
                                return this.restoreBackup(localStorageDirectory + '-backup');

                            case 22:
                                result = _context.sent;

                                if (!result) {
                                    _context.next = 25;
                                    break;
                                }

                                return _context.abrupt("return", _promise2.default.resolve());

                            case 25:
                                _context.next = 37;
                                break;

                            case 27:
                                _context.prev = 27;
                                _context.t0 = _context["catch"](8);
                                _context.prev = 29;
                                _context.next = 32;
                                return this.restoreBackup(this._rootDirectory + '-backup');

                            case 32:
                                _context.next = 37;
                                break;

                            case 34:
                                _context.prev = 34;
                                _context.t1 = _context["catch"](29);
                                return _context.abrupt("return", _promise2.default.reject(null));

                            case 37:
                                _context.next = 40;
                                break;

                            case 39:
                                return _context.abrupt("return", _promise2.default.resolve());

                            case 40:
                                return _context.abrupt("return", _promise2.default.reject(null));

                            case 41:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[8, 27], [29, 34]]);
            }));
        }
    }, {
        key: "copyManifestToLocalStorage",
        value: function copyManifestToLocalStorage(rootDirectory, localStorageDirectory, localManifestPath) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
                var localManifestContent, localManifest, files, file, result, i;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this._fileSystem.openFile(localManifestPath);

                            case 2:
                                localManifestContent = _context2.sent;
                                localManifest = JSON.parse(localManifestContent);
                                files = [];

                                for (file in localManifest.files) {
                                    files.push(localManifest.files[file]);
                                }
                                result = void 0;
                                i = 0;

                            case 8:
                                if (!(i < files.length)) {
                                    _context2.next = 17;
                                    break;
                                }

                                _context2.next = 11;
                                return this._fileSystem.downloadFile(rootDirectory + '/' + files[i].filename, localStorageDirectory + '/' + files[i].filename);

                            case 11:
                                result = _context2.sent;

                                if (result) {
                                    _context2.next = 14;
                                    break;
                                }

                                return _context2.abrupt("return", result);

                            case 14:
                                i++;
                                _context2.next = 8;
                                break;

                            case 17:
                                _context2.next = 19;
                                return this._fileSystem.downloadFile(rootDirectory + '/manifest.json', localStorageDirectory + '/manifest.json');

                            case 19:
                                result = _context2.sent;
                                return _context2.abrupt("return", result);

                            case 21:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "doBackup",
        value: function doBackup(path) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
                var result;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this._fileSystem.copyDirectory(path, path + '-backup');

                            case 2:
                                result = _context3.sent;
                                return _context3.abrupt("return", result);

                            case 4:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: "restoreBackup",
        value: function restoreBackup(backupPath) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee4() {
                var result;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this._fileSystem.copyDirectory(backupPath, backupPath.substr(0, backupPath.indexOf('-')));

                            case 2:
                                result = _context4.sent;
                                return _context4.abrupt("return", result);

                            case 4:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }, {
        key: "checkNewVersion",
        value: function checkNewVersion(localPath, remotePath) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee5() {
                var remoteManifestContent, localManifestContent;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (this._networkInformation.isConnected) {
                                    _context5.next = 4;
                                    break;
                                }

                                return _context5.abrupt("return", false);

                            case 4:
                                _context5.prev = 4;
                                _context5.next = 7;
                                return this._fileSystem.openFile(remotePath);

                            case 7:
                                remoteManifestContent = _context5.sent;

                                this.remoteManifest = JSON.parse(remoteManifestContent);
                                _context5.next = 11;
                                return this._fileSystem.openFile(localPath);

                            case 11:
                                localManifestContent = _context5.sent;

                                this.localManifest = JSON.parse(localManifestContent);
                                return _context5.abrupt("return", this.remoteManifest.version !== this.localManifest.version);

                            case 16:
                                _context5.prev = 16;
                                _context5.t0 = _context5["catch"](4);
                                return _context5.abrupt("return", false);

                            case 19:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[4, 16]]);
            }));
        }
    }, {
        key: "updateFiles",
        value: function updateFiles(server, localStoragePath) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee6() {
                var localFiles, remoteFiles, result, file, _file, filesToRemove, i, filesToUpdate, _i, filesToAdd, _i2;

                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                localFiles = [];
                                remoteFiles = [];
                                result = void 0;

                                for (file in this.localManifest.files) {
                                    localFiles.push(this.localManifest.files[file]);
                                }
                                for (_file in this.remoteManifest.files) {
                                    remoteFiles.push(this.remoteManifest.files[_file]);
                                }
                                filesToRemove = localFiles.filter(function (lf) {
                                    var founds = remoteFiles.filter(function (rf) {
                                        return rf.filename == lf.filename;
                                    });
                                    return founds.length == 0;
                                });
                                i = 0;

                            case 7:
                                if (!(i < filesToRemove.length)) {
                                    _context6.next = 16;
                                    break;
                                }

                                _context6.next = 10;
                                return this._fileSystem.removeFile(localStoragePath + '/' + filesToRemove[i].filename);

                            case 10:
                                result = _context6.sent;

                                if (result) {
                                    _context6.next = 13;
                                    break;
                                }

                                return _context6.abrupt("return", result);

                            case 13:
                                i++;
                                _context6.next = 7;
                                break;

                            case 16:
                                filesToUpdate = remoteFiles.filter(function (rf) {
                                    var founds = localFiles.filter(function (lf) {
                                        return rf.filename == lf.filename && rf.version != lf.version;
                                    });
                                    return founds.length > 0;
                                });
                                _i = 0;

                            case 18:
                                if (!(_i < filesToUpdate.length)) {
                                    _context6.next = 27;
                                    break;
                                }

                                _context6.next = 21;
                                return this._fileTransfer.download(server + filesToUpdate[_i].filename, localStoragePath + '/' + filesToUpdate[_i].filename);

                            case 21:
                                result = _context6.sent;

                                if (result) {
                                    _context6.next = 24;
                                    break;
                                }

                                return _context6.abrupt("return", result);

                            case 24:
                                _i++;
                                _context6.next = 18;
                                break;

                            case 27:
                                filesToAdd = remoteFiles.filter(function (rf) {
                                    var founds = localFiles.filter(function (lf) {
                                        return rf.filename == lf.filename;
                                    });
                                    return founds.length == 0;
                                });
                                _i2 = 0;

                            case 29:
                                if (!(_i2 < filesToAdd.length)) {
                                    _context6.next = 38;
                                    break;
                                }

                                _context6.next = 32;
                                return this._fileTransfer.download(server + filesToAdd[_i2].filename, localStoragePath + '/' + filesToAdd[_i2].filename);

                            case 32:
                                result = _context6.sent;

                                if (result) {
                                    _context6.next = 35;
                                    break;
                                }

                                return _context6.abrupt("return", result);

                            case 35:
                                _i2++;
                                _context6.next = 29;
                                break;

                            case 38:
                                return _context6.abrupt("return", true);

                            case 39:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));
        }
    }]);
    return Autoupdater;
}();

var FileSystemService = function () {
    function FileSystemService() {
        (0, _classCallCheck3.default)(this, FileSystemService);

        this.xhr = new XMLHttpRequest();
        this._fs = new FileSystemImpl();
        this._ft = new FileTransferService();
    }

    (0, _createClass3.default)(FileSystemService, [{
        key: "openFile",
        value: function openFile(path) {
            var _this = this;

            this.xhr.open('GET', path);
            this.xhr.send();
            return new _promise2.default(function (resolve, reject) {
                _this.xhr.onerror = function (ev) {
                    reject('Error getting file from ' + path);
                };
                _this.xhr.onreadystatechange = function (ev) {
                    if (_this.xhr.readyState == 4) {
                        var response;
                        if (_this.xhr.status === 0 || _this.xhr.status === 200) {
                            resolve(_this.xhr.response);
                        } else {
                            reject(_this.xhr.responseText);
                        }
                    }
                };
            });
        }
    }, {
        key: "removeFile",
        value: function removeFile(path) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee7() {
                var _this2 = this;

                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                return _context7.abrupt("return", new _promise2.default(function (resolve, reject) {
                                    _this2._fs.getFile(path, { create: false, exclusive: false }).then(function (fileEntry) {
                                        fileEntry.remove(function () {
                                            resolve(true);
                                        }, function (e) {
                                            resolve(false);
                                        });
                                    }).catch(function (e) {
                                        resolve(false);
                                    });
                                }));

                            case 1:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));
        }
    }, {
        key: "downloadFile",
        value: function downloadFile(origPath, destPath) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee8() {
                var _this3 = this;

                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                return _context8.abrupt("return", new _promise2.default(function (resolve, reject) {
                                    _this3._ft.download(origPath, destPath).then(function (r) {
                                        resolve(r);
                                    }).catch(function (e) {
                                        resolve(false);
                                    });
                                }));

                            case 1:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));
        }
    }, {
        key: "copyFile",
        value: function copyFile(directory, entry) {
            var _this4 = this;

            return new _promise2.default(function (resolve, reject) {
                entry.copyTo(directory, entry.name, function (entry) {
                    resolve(true);
                }, function (error) {
                    if (error.code == 12) {
                        _this4.removeFile(directory.fullPath + entry.name).then(function (r) {
                            if (r) {
                                _this4.copyFile(directory, entry).then(function (r) {
                                    resolve(r);
                                });
                            } else {
                                resolve(false);
                            }
                        }).catch(function (e) {
                            resolve(false);
                        });
                    } else {
                        resolve(false);
                    }
                });
            });
        }
    }, {
        key: "copyDirectory",
        value: function copyDirectory(origPath, destPath) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee9() {
                var entries, destDirectory, i, entry, result, _result;

                return _regenerator2.default.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return this._fs.getDirectoryEntries(origPath, { create: false, exclusive: false });

                            case 2:
                                entries = _context9.sent;
                                _context9.next = 5;
                                return this._fs.getDirectory(destPath, { create: true, exclusive: false });

                            case 5:
                                destDirectory = _context9.sent;

                                if (!(entries && destDirectory)) {
                                    _context9.next = 29;
                                    break;
                                }

                                i = 0;

                            case 8:
                                if (!(i < entries.length)) {
                                    _context9.next = 26;
                                    break;
                                }

                                entry = entries[i];

                                if (!entry.isDirectory) {
                                    _context9.next = 18;
                                    break;
                                }

                                _context9.next = 13;
                                return this.copyDirectory(origPath + '/' + entry.name, destPath + '/' + entry.name);

                            case 13:
                                result = _context9.sent;

                                if (result) {
                                    _context9.next = 16;
                                    break;
                                }

                                return _context9.abrupt("return", false);

                            case 16:
                                _context9.next = 23;
                                break;

                            case 18:
                                _context9.next = 20;
                                return this.copyFile(destDirectory, entry);

                            case 20:
                                _result = _context9.sent;

                                if (_result) {
                                    _context9.next = 23;
                                    break;
                                }

                                return _context9.abrupt("return", false);

                            case 23:
                                i++;
                                _context9.next = 8;
                                break;

                            case 26:
                                return _context9.abrupt("return", true);

                            case 29:
                                return _context9.abrupt("return", false);

                            case 30:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));
        }
    }]);
    return FileSystemService;
}();

var FileTransferService = function () {
    function FileTransferService() {
        (0, _classCallCheck3.default)(this, FileTransferService);

        this._transfer = new FileTransferImpl();
    }

    (0, _createClass3.default)(FileTransferService, [{
        key: "download",
        value: function download(src, target, trustAllHosts, options) {
            var _this5 = this;

            return new _promise2.default(function (resolve, reject) {
                _this5._transfer.download(src, target).then(function () {
                    resolve(true);
                }).catch(function (e) {
                    resolve(false);
                });
            });
        }
    }, {
        key: "fail",
        value: function fail(e) {
            console.log(e);
            return false;
        }
    }]);
    return FileTransferService;
}();

var FileTransferImpl = function () {
    function FileTransferImpl() {
        (0, _classCallCheck3.default)(this, FileTransferImpl);

        this._fs = new FileSystemImpl();
    }

    (0, _createClass3.default)(FileTransferImpl, [{
        key: "download",
        value: function download(source, target, headers) {
            var w = window;
            var transfer = new w.FileTransfer();
            return this._fs.getFile(target, { create: true, exclusive: false }).then(function (file) {
                return new _promise2.default(function (resolve, reject) {
                    transfer.download(source, file.nativeURL, function (s) {
                        resolve(void 0);
                    }, function (e) {
                        file.remove(function () {}, function () {});
                        reject(e);
                    }, true, headers);
                }).then(function () {
                    return void 0;
                });
            }).then(function () {
                return void 0;
            });
        }
    }]);
    return FileTransferImpl;
}();

var FileSystemImpl = function () {
    function FileSystemImpl() {
        (0, _classCallCheck3.default)(this, FileSystemImpl);
    }

    (0, _createClass3.default)(FileSystemImpl, [{
        key: "getDirectory",
        value: function getDirectory(path, options) {
            var _this6 = this;

            return new _promise2.default(function (resolve, reject) {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                    _this6.getPath([path], fileSystem.root, options).then(function (directory) {
                        resolve(directory);
                    }).catch(function (error) {
                        resolve(null);
                    });
                });
            });
        }
    }, {
        key: "getDirectoryEntries",
        value: function getDirectoryEntries(path, options) {
            var _this7 = this;

            return new _promise2.default(function (resolve, reject) {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                    _this7.getPath([path], fileSystem.root, options).then(function (directory) {
                        var reader = directory.createReader();
                        reader.readEntries(function (entries) {
                            resolve(entries);
                        }, function (error) {
                            resolve(null);
                        });
                    }).catch(function (error) {
                        resolve(null);
                    });
                });
            });
        }
    }, {
        key: "getFile",
        value: function getFile(path, options) {
            var _this8 = this;

            return new _promise2.default(function (resolve, reject) {
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                    var folders = path.split('/');
                    var fileName = folders[folders.length - 1];
                    folders = folders.slice(0, folders.length - 1);
                    _this8.getPath(folders, fileSystem.root, options).then(function (directory) {
                        directory.getFile(fileName, options, function (file) {
                            resolve(file);
                        }, function (e) {
                            if (options.create) reject(e);else {
                                resolve(null);
                            }
                        });
                    }, function (e) {
                        reject(e);
                    });
                });
            });
        }
    }, {
        key: "getPath",
        value: function getPath(folders, parent, options) {
            var _this9 = this;

            return new _promise2.default(function (resolve, reject) {
                _this9.getSubDirectory(folders, parent, options, 0, resolve, reject);
            });
        }
    }, {
        key: "getSubDirectory",
        value: function getSubDirectory(folders, parentDirectory, options, index, resolve, reject) {
            var _this10 = this;

            if (folders.length > index) {
                parentDirectory.getDirectory(folders[index], options, function (directory) {
                    index++;
                    _this10.getSubDirectory(folders, directory, options, index, resolve, reject);
                }, function (error) {
                    reject(error);
                });
            } else {
                resolve(parentDirectory);
            }
        }
    }]);
    return FileSystemImpl;
}();

var NetworkInformationService = function () {
    function NetworkInformationService() {
        (0, _classCallCheck3.default)(this, NetworkInformationService);
    }

    (0, _createClass3.default)(NetworkInformationService, [{
        key: "isConnected",
        get: function get() {
            var connection = navigator.connection;
            return connection.type != "NONE" && connection.type != "none";
        }
    }]);
    return NetworkInformationService;
}();

document.addEventListener('deviceready', function () {
    var fs = new FileSystemService();
    var ft = new FileTransferService();
    var ni = new NetworkInformationService();
    var params = document.querySelector('script[manifest]');
    if (params) {
        var autoupdater = new Autoupdater(ft, fs, ni, cordova.file.applicationDirectory + 'www', params.getAttribute('server'));
        window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            var nativeURL = fileSystem.root.nativeURL;
            window.nativeURL = nativeURL;
            autoupdater.autoupdate('mys', params.getAttribute('manifest'), params.getAttribute('server') + 'manifest.json').then(function () {
                console.log('Load updated APK');
            }).catch(function () {
                console.log('Load local APK');
            });
        }, function (e) {
            console.log(e);
        });
    }
}, false);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvY29yZG92YS9hdXRvLXVwZGF0ZS5qcyIsImNvcmUvY29yZG92YS9hdXRvLXVwZGF0ZS50cyJdLCJuYW1lcyI6WyJBdXRvdXBkYXRlciIsIkF1dG91cGRhdGVyLmNvbnN0cnVjdG9yIiwiQXV0b3VwZGF0ZXIuYXV0b3VwZGF0ZSIsIkF1dG91cGRhdGVyLmNvcHlNYW5pZmVzdFRvTG9jYWxTdG9yYWdlIiwiQXV0b3VwZGF0ZXIuZG9CYWNrdXAiLCJBdXRvdXBkYXRlci5yZXN0b3JlQmFja3VwIiwiQXV0b3VwZGF0ZXIuY2hlY2tOZXdWZXJzaW9uIiwiQXV0b3VwZGF0ZXIudXBkYXRlRmlsZXMiLCJGaWxlU3lzdGVtU2VydmljZSIsIkZpbGVTeXN0ZW1TZXJ2aWNlLmNvbnN0cnVjdG9yIiwiRmlsZVN5c3RlbVNlcnZpY2Uub3BlbkZpbGUiLCJGaWxlU3lzdGVtU2VydmljZS5yZW1vdmVGaWxlIiwiRmlsZVN5c3RlbVNlcnZpY2UuZG93bmxvYWRGaWxlIiwiRmlsZVN5c3RlbVNlcnZpY2UuY29weUZpbGUiLCJGaWxlU3lzdGVtU2VydmljZS5jb3B5RGlyZWN0b3J5IiwiRmlsZVRyYW5zZmVyU2VydmljZSIsIkZpbGVUcmFuc2ZlclNlcnZpY2UuY29uc3RydWN0b3IiLCJGaWxlVHJhbnNmZXJTZXJ2aWNlLmRvd25sb2FkIiwiRmlsZVRyYW5zZmVyU2VydmljZS5mYWlsIiwiRmlsZVRyYW5zZmVySW1wbCIsIkZpbGVUcmFuc2ZlckltcGwuY29uc3RydWN0b3IiLCJGaWxlVHJhbnNmZXJJbXBsLmRvd25sb2FkIiwiRmlsZVN5c3RlbUltcGwiLCJGaWxlU3lzdGVtSW1wbC5nZXREaXJlY3RvcnkiLCJGaWxlU3lzdGVtSW1wbC5nZXREaXJlY3RvcnlFbnRyaWVzIiwiRmlsZVN5c3RlbUltcGwuZ2V0RmlsZSIsIkZpbGVTeXN0ZW1JbXBsLmdldFBhdGgiLCJGaWxlU3lzdGVtSW1wbC5nZXRTdWJEaXJlY3RvcnkiLCJOZXR3b3JrSW5mb3JtYXRpb25TZXJ2aWNl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LENBQXVCLEtBQXZCLEVBQThCLE9BQU8sWUFBUCxDQUFvQixVQUFwQixDQUE5QixFQUErRCxPQUFPLFlBQVAsQ0FBb0IsUUFBcEIsSUFBZ0MsZUFBaEMsQ0FBL0QsQ0FDSyxJQURMLENBQ1UsWUFBQTtBQUNGLHdCQUFRLEdBQVIsQ0FBWSxrQkFBWixFQURFO2FBQUEsQ0FEVixDQUtLLEtBTEwsQ0FLVyxZQUFBO0FBQ0gsd0JBQVEsR0FBUixDQUFZLGdCQUFaLEVBREc7YUFBQSxDQUxYLENBSHNFO1NBQVgsRUFZNUQsVUFBQyxDQUFELEVBQUU7QUFDRCxvQkFBUSxHQUFSLENBQVksQ0FBWixFQURDO1NBQUYsQ0FaRyxDQUhBO0tBQVY7Q0FOcUMsRUF5QnRDLEtBekJIIiwiZmlsZSI6ImNvcmUvY29yZG92YS9hdXRvLXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xuICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIEF1dG91cGRhdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihfZmlsZVRyYW5zZmVyLCBfZmlsZVN5c3RlbSwgX25ldHdvcmtJbmZvcm1hdGlvbiwgX3Jvb3REaXJlY3RvcnksIF9zZXJ2ZXJVcmwpIHtcbiAgICAgICAgdGhpcy5fZmlsZVRyYW5zZmVyID0gX2ZpbGVUcmFuc2ZlcjtcbiAgICAgICAgdGhpcy5fZmlsZVN5c3RlbSA9IF9maWxlU3lzdGVtO1xuICAgICAgICB0aGlzLl9uZXR3b3JrSW5mb3JtYXRpb24gPSBfbmV0d29ya0luZm9ybWF0aW9uO1xuICAgICAgICB0aGlzLl9yb290RGlyZWN0b3J5ID0gX3Jvb3REaXJlY3Rvcnk7XG4gICAgICAgIHRoaXMuX3NlcnZlclVybCA9IF9zZXJ2ZXJVcmw7XG4gICAgfVxuICAgIGF1dG91cGRhdGUobG9jYWxTdG9yYWdlRGlyZWN0b3J5LCBsb2NhbE1hbmlmZXN0UGF0aCwgcmVtb3RlTWFuaWZlc3RQYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHlpZWxkIHRoaXMuY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2UodGhpcy5fcm9vdERpcmVjdG9yeSwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5LCBsb2NhbE1hbmlmZXN0UGF0aCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5jaGVja05ld1ZlcnNpb24obG9jYWxNYW5pZmVzdFBhdGgsIHJlbW90ZU1hbmlmZXN0UGF0aCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5kb0JhY2t1cChsb2NhbFN0b3JhZ2VEaXJlY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkIHRoaXMudXBkYXRlRmlsZXModGhpcy5fc2VydmVyVXJsLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5yZXN0b3JlQmFja3VwKGxvY2FsU3RvcmFnZURpcmVjdG9yeSArICctYmFja3VwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMucmVzdG9yZUJhY2t1cCh0aGlzLl9yb290RGlyZWN0b3J5ICsgJy1iYWNrdXAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2Uocm9vdERpcmVjdG9yeSwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5LCBsb2NhbE1hbmlmZXN0UGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxldCBsb2NhbE1hbmlmZXN0Q29udGVudCA9IHlpZWxkIHRoaXMuX2ZpbGVTeXN0ZW0ub3BlbkZpbGUobG9jYWxNYW5pZmVzdFBhdGgpO1xuICAgICAgICAgICAgbGV0IGxvY2FsTWFuaWZlc3QgPSBKU09OLnBhcnNlKGxvY2FsTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgICAgIGxldCBmaWxlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBpbiBsb2NhbE1hbmlmZXN0LmZpbGVzKSB7XG4gICAgICAgICAgICAgICAgZmlsZXMucHVzaChsb2NhbE1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5fZmlsZVN5c3RlbS5kb3dubG9hZEZpbGUocm9vdERpcmVjdG9yeSArICcvJyArIGZpbGVzW2ldLmZpbGVuYW1lLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkgKyAnLycgKyBmaWxlc1tpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgPSB5aWVsZCB0aGlzLl9maWxlU3lzdGVtLmRvd25sb2FkRmlsZShyb290RGlyZWN0b3J5ICsgJy9tYW5pZmVzdC5qc29uJywgbG9jYWxTdG9yYWdlRGlyZWN0b3J5ICsgJy9tYW5pZmVzdC5qc29uJyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZG9CYWNrdXAocGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB5aWVsZCB0aGlzLl9maWxlU3lzdGVtLmNvcHlEaXJlY3RvcnkocGF0aCwgcGF0aCArICctYmFja3VwJyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzdG9yZUJhY2t1cChiYWNrdXBQYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHlpZWxkIHRoaXMuX2ZpbGVTeXN0ZW0uY29weURpcmVjdG9yeShiYWNrdXBQYXRoLCBiYWNrdXBQYXRoLnN1YnN0cigwLCBiYWNrdXBQYXRoLmluZGV4T2YoJy0nKSkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNoZWNrTmV3VmVyc2lvbihsb2NhbFBhdGgsIHJlbW90ZVBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX25ldHdvcmtJbmZvcm1hdGlvbi5pc0Nvbm5lY3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3RlTWFuaWZlc3RDb250ZW50ID0geWllbGQgdGhpcy5fZmlsZVN5c3RlbS5vcGVuRmlsZShyZW1vdGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVNYW5pZmVzdCA9IEpTT04ucGFyc2UocmVtb3RlTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsTWFuaWZlc3RDb250ZW50ID0geWllbGQgdGhpcy5fZmlsZVN5c3RlbS5vcGVuRmlsZShsb2NhbFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsTWFuaWZlc3QgPSBKU09OLnBhcnNlKGxvY2FsTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3RlTWFuaWZlc3QudmVyc2lvbiAhPT0gdGhpcy5sb2NhbE1hbmlmZXN0LnZlcnNpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGVGaWxlcyhzZXJ2ZXIsIGxvY2FsU3RvcmFnZVBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBsZXQgbG9jYWxGaWxlcyA9IFtdO1xuICAgICAgICAgICAgbGV0IHJlbW90ZUZpbGVzID0gW107XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBpbiB0aGlzLmxvY2FsTWFuaWZlc3QuZmlsZXMpIHtcbiAgICAgICAgICAgICAgICBsb2NhbEZpbGVzLnB1c2godGhpcy5sb2NhbE1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGZpbGUgaW4gdGhpcy5yZW1vdGVNYW5pZmVzdC5maWxlcykge1xuICAgICAgICAgICAgICAgIHJlbW90ZUZpbGVzLnB1c2godGhpcy5yZW1vdGVNYW5pZmVzdC5maWxlc1tmaWxlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsZXNUb1JlbW92ZSA9IGxvY2FsRmlsZXMuZmlsdGVyKChsZikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb3VuZHMgPSByZW1vdGVGaWxlcy5maWx0ZXIoKHJmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZi5maWxlbmFtZSA9PSBsZi5maWxlbmFtZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmRzLmxlbmd0aCA9PSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzVG9SZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCB0aGlzLl9maWxlU3lzdGVtLnJlbW92ZUZpbGUobG9jYWxTdG9yYWdlUGF0aCArICcvJyArIGZpbGVzVG9SZW1vdmVbaV0uZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZpbGVzVG9VcGRhdGUgPSByZW1vdGVGaWxlcy5maWx0ZXIoKHJmKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kcyA9IGxvY2FsRmlsZXMuZmlsdGVyKChsZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmYuZmlsZW5hbWUgPT0gbGYuZmlsZW5hbWUgJiYgcmYudmVyc2lvbiAhPSBsZi52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZHMubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlc1RvVXBkYXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5fZmlsZVRyYW5zZmVyLmRvd25sb2FkKHNlcnZlciArIGZpbGVzVG9VcGRhdGVbaV0uZmlsZW5hbWUsIGxvY2FsU3RvcmFnZVBhdGggKyAnLycgKyBmaWxlc1RvVXBkYXRlW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBmaWxlc1RvQWRkID0gcmVtb3RlRmlsZXMuZmlsdGVyKChyZikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb3VuZHMgPSBsb2NhbEZpbGVzLmZpbHRlcigobGYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJmLmZpbGVuYW1lID09IGxmLmZpbGVuYW1lO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZHMubGVuZ3RoID09IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXNUb0FkZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkIHRoaXMuX2ZpbGVUcmFuc2Zlci5kb3dubG9hZChzZXJ2ZXIgKyBmaWxlc1RvQWRkW2ldLmZpbGVuYW1lLCBsb2NhbFN0b3JhZ2VQYXRoICsgJy8nICsgZmlsZXNUb0FkZFtpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuY2xhc3MgRmlsZVN5c3RlbVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB0aGlzLl9mcyA9IG5ldyBGaWxlU3lzdGVtSW1wbCgpO1xuICAgICAgICB0aGlzLl9mdCA9IG5ldyBGaWxlVHJhbnNmZXJTZXJ2aWNlKCk7XG4gICAgfVxuICAgIG9wZW5GaWxlKHBhdGgpIHtcbiAgICAgICAgdGhpcy54aHIub3BlbignR0VUJywgcGF0aCk7XG4gICAgICAgIHRoaXMueGhyLnNlbmQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMueGhyLm9uZXJyb3IgPSAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoJ0Vycm9yIGdldHRpbmcgZmlsZSBmcm9tICcgKyBwYXRoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy54aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueGhyLnN0YXR1cyA9PT0gMCB8fCB0aGlzLnhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnhoci5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QodGhpcy54aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW1vdmVGaWxlKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZzLmdldEZpbGUocGF0aCwgeyBjcmVhdGU6IGZhbHNlLCBleGNsdXNpdmU6IGZhbHNlIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChmaWxlRW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZUVudHJ5LnJlbW92ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZG93bmxvYWRGaWxlKG9yaWdQYXRoLCBkZXN0UGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnQuZG93bmxvYWQob3JpZ1BhdGgsIGRlc3RQYXRoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29weUZpbGUoZGlyZWN0b3J5LCBlbnRyeSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZW50cnkuY29weVRvKGRpcmVjdG9yeSwgZW50cnkubmFtZSwgKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRmlsZShkaXJlY3RvcnkuZnVsbFBhdGggKyBlbnRyeS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3B5RmlsZShkaXJlY3RvcnksIGVudHJ5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29weURpcmVjdG9yeShvcmlnUGF0aCwgZGVzdFBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBsZXQgZW50cmllcyA9IHlpZWxkIHRoaXMuX2ZzLmdldERpcmVjdG9yeUVudHJpZXMob3JpZ1BhdGgsIHsgY3JlYXRlOiBmYWxzZSwgZXhjbHVzaXZlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIGxldCBkZXN0RGlyZWN0b3J5ID0geWllbGQgdGhpcy5fZnMuZ2V0RGlyZWN0b3J5KGRlc3RQYXRoLCB7IGNyZWF0ZTogdHJ1ZSwgZXhjbHVzaXZlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIGlmIChlbnRyaWVzICYmIGRlc3REaXJlY3RvcnkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVudHJ5ID0gZW50cmllc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0geWllbGQgdGhpcy5jb3B5RGlyZWN0b3J5KG9yaWdQYXRoICsgJy8nICsgZW50cnkubmFtZSwgZGVzdFBhdGggKyAnLycgKyBlbnRyeS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB5aWVsZCB0aGlzLmNvcHlGaWxlKGRlc3REaXJlY3RvcnksIGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuY2xhc3MgRmlsZVRyYW5zZmVyU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3RyYW5zZmVyID0gbmV3IEZpbGVUcmFuc2ZlckltcGwoKTtcbiAgICB9XG4gICAgZG93bmxvYWQoc3JjLCB0YXJnZXQsIHRydXN0QWxsSG9zdHMsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zZmVyLmRvd25sb2FkKHNyYywgdGFyZ2V0KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmFpbChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuY2xhc3MgRmlsZVRyYW5zZmVySW1wbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2ZzID0gbmV3IEZpbGVTeXN0ZW1JbXBsKCk7XG4gICAgfVxuICAgIGRvd25sb2FkKHNvdXJjZSwgdGFyZ2V0LCBoZWFkZXJzKSB7XG4gICAgICAgIHZhciB3ID0gd2luZG93O1xuICAgICAgICB2YXIgdHJhbnNmZXIgPSBuZXcgdy5GaWxlVHJhbnNmZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZzLmdldEZpbGUodGFyZ2V0LCB7IGNyZWF0ZTogdHJ1ZSwgZXhjbHVzaXZlOiBmYWxzZSB9KS50aGVuKChmaWxlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyYW5zZmVyLmRvd25sb2FkKHNvdXJjZSwgZmlsZS5uYXRpdmVVUkwsIChzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodm9pZCAoMCkpO1xuICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGUucmVtb3ZlKCgpID0+IHsgfSwgKCkgPT4geyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH0sIHRydWUsIGhlYWRlcnMpO1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgKDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgKDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5jbGFzcyBGaWxlU3lzdGVtSW1wbCB7XG4gICAgZ2V0RGlyZWN0b3J5KHBhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBhdGgoW3BhdGhdLCBmaWxlU3lzdGVtLnJvb3QsIG9wdGlvbnMpLnRoZW4oKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXREaXJlY3RvcnlFbnRyaWVzKHBhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBhdGgoW3BhdGhdLCBmaWxlU3lzdGVtLnJvb3QsIG9wdGlvbnMpLnRoZW4oKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVhZGVyID0gZGlyZWN0b3J5LmNyZWF0ZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEVudHJpZXMoKGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZW50cmllcyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRGaWxlKHBhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZm9sZGVycyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSBmb2xkZXJzW2ZvbGRlcnMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgZm9sZGVycyA9IGZvbGRlcnMuc2xpY2UoMCwgZm9sZGVycy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBhdGgoZm9sZGVycywgZmlsZVN5c3RlbS5yb290LCBvcHRpb25zKS50aGVuKChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5LmdldEZpbGUoZmlsZU5hbWUsIG9wdGlvbnMsIChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0UGF0aChmb2xkZXJzLCBwYXJlbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0U3ViRGlyZWN0b3J5KGZvbGRlcnMsIHBhcmVudCwgb3B0aW9ucywgMCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFN1YkRpcmVjdG9yeShmb2xkZXJzLCBwYXJlbnREaXJlY3RvcnksIG9wdGlvbnMsIGluZGV4LCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKGZvbGRlcnMubGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgICAgICAgIHBhcmVudERpcmVjdG9yeS5nZXREaXJlY3RvcnkoZm9sZGVyc1tpbmRleF0sIG9wdGlvbnMsIChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3ViRGlyZWN0b3J5KGZvbGRlcnMsIGRpcmVjdG9yeSwgb3B0aW9ucywgaW5kZXgsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShwYXJlbnREaXJlY3RvcnkpO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgTmV0d29ya0luZm9ybWF0aW9uU2VydmljZSB7XG4gICAgZ2V0IGlzQ29ubmVjdGVkKCkge1xuICAgICAgICBsZXQgY29ubmVjdGlvbiA9IG5hdmlnYXRvci5jb25uZWN0aW9uO1xuICAgICAgICByZXR1cm4gY29ubmVjdGlvbi50eXBlICE9IFwiTk9ORVwiICYmIGNvbm5lY3Rpb24udHlwZSAhPSBcIm5vbmVcIjtcbiAgICB9XG59XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsICgpID0+IHtcbiAgICB2YXIgZnMgPSBuZXcgRmlsZVN5c3RlbVNlcnZpY2UoKTtcbiAgICB2YXIgZnQgPSBuZXcgRmlsZVRyYW5zZmVyU2VydmljZSgpO1xuICAgIHZhciBuaSA9IG5ldyBOZXR3b3JrSW5mb3JtYXRpb25TZXJ2aWNlKCk7XG4gICAgdmFyIHBhcmFtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFttYW5pZmVzdF0nKTtcbiAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgIHZhciBhdXRvdXBkYXRlciA9IG5ldyBBdXRvdXBkYXRlcihmdCwgZnMsIG5pLCBjb3Jkb3ZhLmZpbGUuYXBwbGljYXRpb25EaXJlY3RvcnkgKyAnd3d3JywgcGFyYW1zLmdldEF0dHJpYnV0ZSgnc2VydmVyJykpO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEZpbGVTeXN0ZW0gPSB3aW5kb3cucmVxdWVzdEZpbGVTeXN0ZW0gfHwgd2luZG93LndlYmtpdFJlcXVlc3RGaWxlU3lzdGVtO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmF0aXZlVVJMID0gZmlsZVN5c3RlbS5yb290Lm5hdGl2ZVVSTDtcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmVVUkwgPSBuYXRpdmVVUkw7XG4gICAgICAgICAgICBhdXRvdXBkYXRlci5hdXRvdXBkYXRlKCdteXMnLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdtYW5pZmVzdCcpLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdzZXJ2ZXInKSArICdtYW5pZmVzdC5qc29uJylcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvYWQgdXBkYXRlZCBBUEsnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTG9hZCBsb2NhbCBBUEsnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0sIGZhbHNlKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBhbGV4dml6Y2Fpbm8gb24gMTEvMy8xNi5cbiAqL1xuaW1wb3J0IHtJRmlsZVRyYW5zZmVyLCBJRmlsZVN5c3RlbSwgVHJhY2tlZEZpbGUsIE1hbmlmZXN0LCBOZXR3b3JrSW5mb3JtYXRpb24sIEZpbGVFbnRyeSwgRmlsZVN5c3RlbSwgRGlyZWN0b3J5RW50cnksIEVudHJ5fSBmcm9tIFwiYXV0by11cGRhdGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBBdXRvdXBkYXRlcntcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9maWxlVHJhbnNmZXI6IElGaWxlVHJhbnNmZXIsIHByaXZhdGUgX2ZpbGVTeXN0ZW06IElGaWxlU3lzdGVtLCBwcml2YXRlIF9uZXR3b3JrSW5mb3JtYXRpb246IE5ldHdvcmtJbmZvcm1hdGlvbixcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9yb290RGlyZWN0b3J5OiBzdHJpbmcsIHByaXZhdGUgX3NlcnZlclVybDogc3RyaW5nKXtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgYXV0b3VwZGF0ZShsb2NhbFN0b3JhZ2VEaXJlY3Rvcnk6IHN0cmluZywgbG9jYWxNYW5pZmVzdFBhdGg6IHN0cmluZywgcmVtb3RlTWFuaWZlc3RQYXRoOiBzdHJpbmcpOlByb21pc2U8dm9pZD57XG4gICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCB0aGlzLmNvcHlNYW5pZmVzdFRvTG9jYWxTdG9yYWdlKHRoaXMuX3Jvb3REaXJlY3RvcnksIGxvY2FsU3RvcmFnZURpcmVjdG9yeSwgbG9jYWxNYW5pZmVzdFBhdGgpO1xuICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5jaGVja05ld1ZlcnNpb24obG9jYWxNYW5pZmVzdFBhdGgsIHJlbW90ZU1hbmlmZXN0UGF0aCk7XG4gICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5kb0JhY2t1cChsb2NhbFN0b3JhZ2VEaXJlY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy51cGRhdGVGaWxlcyh0aGlzLl9zZXJ2ZXJVcmwsIGxvY2FsU3RvcmFnZURpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLnJlc3RvcmVCYWNrdXAobG9jYWxTdG9yYWdlRGlyZWN0b3J5ICsgJy1iYWNrdXAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZXN0b3JlQmFja3VwKHRoaXMuX3Jvb3REaXJlY3RvcnkgKyAnLWJhY2t1cCcpO1xuICAgICAgICAgICAgICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobnVsbCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGNvcHlNYW5pZmVzdFRvTG9jYWxTdG9yYWdlKHJvb3REaXJlY3Rvcnk6IHN0cmluZywgbG9jYWxTdG9yYWdlRGlyZWN0b3J5OiBzdHJpbmcsIGxvY2FsTWFuaWZlc3RQYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICBsZXQgbG9jYWxNYW5pZmVzdENvbnRlbnQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLm9wZW5GaWxlKGxvY2FsTWFuaWZlc3RQYXRoKTtcbiAgICAgICAgbGV0IGxvY2FsTWFuaWZlc3QgPSA8TWFuaWZlc3Q+SlNPTi5wYXJzZShsb2NhbE1hbmlmZXN0Q29udGVudCk7XG4gICAgICAgIGxldCBmaWxlczogVHJhY2tlZEZpbGVbXSA9IFtdO1xuXG4gICAgICAgIGZvcihsZXQgZmlsZSBpbiBsb2NhbE1hbmlmZXN0LmZpbGVzKXtcbiAgICAgICAgICAgIGZpbGVzLnB1c2gobG9jYWxNYW5pZmVzdC5maWxlc1tmaWxlXSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5kb3dubG9hZEZpbGUocm9vdERpcmVjdG9yeSArICcvJyArIGZpbGVzW2ldLmZpbGVuYW1lLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkgKyAnLycgKyBmaWxlc1tpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLmRvd25sb2FkRmlsZShyb290RGlyZWN0b3J5ICsgJy9tYW5pZmVzdC5qc29uJywgbG9jYWxTdG9yYWdlRGlyZWN0b3J5ICsgJy9tYW5pZmVzdC5qc29uJyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGRvQmFja3VwKHBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLmNvcHlEaXJlY3RvcnkocGF0aCwgcGF0aCArICctYmFja3VwJyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlc3RvcmVCYWNrdXAoYmFja3VwUGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0uY29weURpcmVjdG9yeShiYWNrdXBQYXRoLCBiYWNrdXBQYXRoLnN1YnN0cigwLCBiYWNrdXBQYXRoLmluZGV4T2YoJy0nKSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdGVNYW5pZmVzdDogTWFuaWZlc3Q7XG4gICAgcHVibGljIGxvY2FsTWFuaWZlc3Q6IE1hbmlmZXN0O1xuXG4gICAgcHVibGljIGFzeW5jIGNoZWNrTmV3VmVyc2lvbihsb2NhbFBhdGg6IHN0cmluZywgcmVtb3RlUGF0aDogc3RyaW5nKTpQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYoIXRoaXMuX25ldHdvcmtJbmZvcm1hdGlvbi5pc0Nvbm5lY3RlZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBsZXQgcmVtb3RlTWFuaWZlc3RDb250ZW50ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5vcGVuRmlsZShyZW1vdGVQYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZU1hbmlmZXN0ID0gPE1hbmlmZXN0PkpTT04ucGFyc2UocmVtb3RlTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxNYW5pZmVzdENvbnRlbnQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLm9wZW5GaWxlKGxvY2FsUGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbE1hbmlmZXN0ID0gPE1hbmlmZXN0PkpTT04ucGFyc2UobG9jYWxNYW5pZmVzdENvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdmVyc2lvbnMgb2YgbWFuaWZlc3RzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3RlTWFuaWZlc3QudmVyc2lvbiAhPT0gdGhpcy5sb2NhbE1hbmlmZXN0LnZlcnNpb247XG4gICAgICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlRmlsZXMoc2VydmVyOiBzdHJpbmcsIGxvY2FsU3RvcmFnZVBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIGxldCBsb2NhbEZpbGVzOiBUcmFja2VkRmlsZVtdID0gW107XG4gICAgICAgIGxldCByZW1vdGVGaWxlczogVHJhY2tlZEZpbGVbXSA9IFtdO1xuICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuO1xuXG4gICAgICAgIGZvcihsZXQgZmlsZSBpbiB0aGlzLmxvY2FsTWFuaWZlc3QuZmlsZXMpe1xuICAgICAgICAgICAgbG9jYWxGaWxlcy5wdXNoKHRoaXMubG9jYWxNYW5pZmVzdC5maWxlc1tmaWxlXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBmaWxlIGluIHRoaXMucmVtb3RlTWFuaWZlc3QuZmlsZXMpe1xuICAgICAgICAgICAgcmVtb3RlRmlsZXMucHVzaCh0aGlzLnJlbW90ZU1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbGVzIHRvIGJlIHJlbW92ZWRcbiAgICAgICAgbGV0IGZpbGVzVG9SZW1vdmU6IFRyYWNrZWRGaWxlW10gPSBsb2NhbEZpbGVzLmZpbHRlcigobGY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICBsZXQgZm91bmRzID0gcmVtb3RlRmlsZXMuZmlsdGVyKChyZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmYuZmlsZW5hbWUgPT0gbGYuZmlsZW5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZHMubGVuZ3RoID09IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlc1RvUmVtb3ZlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0ucmVtb3ZlRmlsZShsb2NhbFN0b3JhZ2VQYXRoICsgJy8nICsgZmlsZXNUb1JlbW92ZVtpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaWxlcyB0byBiZSB1cGRhdGVkXG4gICAgICAgIGxldCBmaWxlc1RvVXBkYXRlOiBUcmFja2VkRmlsZVtdID0gcmVtb3RlRmlsZXMuZmlsdGVyKChyZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgIGxldCBmb3VuZHMgPSBsb2NhbEZpbGVzLmZpbHRlcigobGY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJmLmZpbGVuYW1lID09IGxmLmZpbGVuYW1lICYmIHJmLnZlcnNpb24gIT0gbGYudmVyc2lvbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kcy5sZW5ndGggPiAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZXNUb1VwZGF0ZS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlVHJhbnNmZXIuZG93bmxvYWQoc2VydmVyICsgZmlsZXNUb1VwZGF0ZVtpXS5maWxlbmFtZSwgbG9jYWxTdG9yYWdlUGF0aCArICcvJyArIGZpbGVzVG9VcGRhdGVbaV0uZmlsZW5hbWUpO1xuICAgICAgICAgICAgaWYoIXJlc3VsdClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlsZXMgdG8gYmUgZG93bmxvYWRlZFxuICAgICAgICBsZXQgZmlsZXNUb0FkZDogVHJhY2tlZEZpbGVbXSA9IHJlbW90ZUZpbGVzLmZpbHRlcigocmY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICBsZXQgZm91bmRzID0gbG9jYWxGaWxlcy5maWx0ZXIoKGxmOiBUcmFja2VkRmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZi5maWxlbmFtZSA9PSBsZi5maWxlbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kcy5sZW5ndGggPT0gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGVzVG9BZGQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVRyYW5zZmVyLmRvd25sb2FkKHNlcnZlciArIGZpbGVzVG9BZGRbaV0uZmlsZW5hbWUsIGxvY2FsU3RvcmFnZVBhdGggKyAnLycgKyBmaWxlc1RvQWRkW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNsYXNzIEZpbGVTeXN0ZW1TZXJ2aWNlIGltcGxlbWVudHMgSUZpbGVTeXN0ZW17XG4gICAgcHJpdmF0ZSB4aHI6IFhNTEh0dHBSZXF1ZXN0O1xuICAgIHByaXZhdGUgX2ZzOiBGaWxlU3lzdGVtSW1wbDtcbiAgICBwcml2YXRlIF9mdDogRmlsZVRyYW5zZmVyU2VydmljZTtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIC8vdGhpcy54aHIuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiLCAnKicpO1xuICAgICAgICAvL3RoaXMueGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgIHRoaXMuX2ZzID0gbmV3IEZpbGVTeXN0ZW1JbXBsKCk7XG4gICAgICAgIHRoaXMuX2Z0ID0gbmV3IEZpbGVUcmFuc2ZlclNlcnZpY2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbkZpbGUocGF0aDpzdHJpbmcpOlByb21pc2U8c3RyaW5nPntcbiAgICAgICAgdGhpcy54aHIub3BlbignR0VUJywgcGF0aCk7XG4gICAgICAgIHRoaXMueGhyLnNlbmQoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy54aHIub25lcnJvciA9IChldikgPT57XG4gICAgICAgICAgICAgICAgcmVqZWN0KCdFcnJvciBnZXR0aW5nIGZpbGUgZnJvbSAnICsgcGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKnRoaXMueGhyLm9ubG9hZCA9IChldikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnhoci5yZXNwb25zZSA9PSBudWxsIHx8ICh0aGlzLnhoci5zdGF0dXMgPCAyMDAgfHwgdGhpcy54aHIuc3RhdHVzID49IDMwMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRoaXMueGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy54aHIucmVzcG9uc2UpO1xuICAgICAgICAgICAgfSovXG4gICAgICAgICAgICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnhoci5yZWFkeVN0YXRlID09IDQpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMueGhyLnN0YXR1cyA9PT0gMCB8fCB0aGlzLnhoci5zdGF0dXMgPT09IDIwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMueGhyLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aGlzLnhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZW1vdmVGaWxlKHBhdGg6c3RyaW5nKTpQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZnMuZ2V0RmlsZShwYXRoLCB7Y3JlYXRlOmZhbHNlLCBleGNsdXNpdmU6IGZhbHNlfSlcbiAgICAgICAgICAgICAgICAudGhlbigoZmlsZUVudHJ5OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZUVudHJ5LnJlbW92ZSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZG93bmxvYWRGaWxlKG9yaWdQYXRoOiBzdHJpbmcsIGRlc3RQYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICAvKipcbiAgICAgICAgICogMS4gQ2hlY2sgaWYgZmlsZSBleGlzdHMgaW4gb3JpZ2luXG4gICAgICAgICAqIDIuIElmIG5vdCwgcmVzb2x2ZShmYWxzZSlcbiAgICAgICAgICogMy4gRWxzZVxuICAgICAgICAgKiA0LiBEb3dubG9hZCBpbiBkZXN0aW5hdGlvbiBmb2xkZXJcbiAgICAgICAgICovXG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2Z0LmRvd25sb2FkKG9yaWdQYXRoLCBkZXN0UGF0aClcbiAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb3B5RmlsZShkaXJlY3Rvcnk6IERpcmVjdG9yeUVudHJ5LCBlbnRyeTogRW50cnkpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZW50cnkuY29weVRvKGRpcmVjdG9yeSwgZW50cnkubmFtZSwgKGVudHJ5OiBFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9LCAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGVycm9yLmNvZGUgPT0gMTIpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZpbGUoZGlyZWN0b3J5LmZ1bGxQYXRoICsgZW50cnkubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29weUZpbGUoZGlyZWN0b3J5LCBlbnRyeSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGNvcHlEaXJlY3Rvcnkob3JpZ1BhdGg6IHN0cmluZywgZGVzdFBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIGxldCBlbnRyaWVzOiBFbnRyeVtdID0gYXdhaXQgdGhpcy5fZnMuZ2V0RGlyZWN0b3J5RW50cmllcyhvcmlnUGF0aCwge2NyZWF0ZTogZmFsc2UsIGV4Y2x1c2l2ZTogZmFsc2V9KTtcbiAgICAgICAgbGV0IGRlc3REaXJlY3Rvcnk6IERpcmVjdG9yeUVudHJ5ID0gYXdhaXQgdGhpcy5fZnMuZ2V0RGlyZWN0b3J5KGRlc3RQYXRoLCB7Y3JlYXRlOiB0cnVlLCBleGNsdXNpdmU6IGZhbHNlfSk7XG4gICAgICAgIGlmKGVudHJpZXMgJiYgZGVzdERpcmVjdG9yeSl7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IGVudHJ5ID0gZW50cmllc1tpXTtcbiAgICAgICAgICAgICAgICBpZihlbnRyeS5pc0RpcmVjdG9yeSl7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLmNvcHlEaXJlY3Rvcnkob3JpZ1BhdGggKyAnLycgKyBlbnRyeS5uYW1lLCBkZXN0UGF0aCArICcvJyArIGVudHJ5Lm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLmNvcHlGaWxlKGRlc3REaXJlY3RvcnksIGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmRlY2xhcmUgdmFyIExvY2FsRmlsZVN5c3RlbTtcbmRlY2xhcmUgdmFyIGNvcmRvdmE7XG5jbGFzcyBGaWxlVHJhbnNmZXJTZXJ2aWNlIGltcGxlbWVudHMgSUZpbGVUcmFuc2ZlcntcbiAgICBwcml2YXRlIF90cmFuc2ZlcjogYW55O1xuICAgIHByaXZhdGUgX3N5c3RlbTogYW55O1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5fdHJhbnNmZXIgPSBuZXcgRmlsZVRyYW5zZmVySW1wbCgpO1xuICAgIH1cblxuICAgIGRvd25sb2FkKHNyYzpzdHJpbmcsIHRhcmdldDpzdHJpbmcsIHRydXN0QWxsSG9zdHM/OmJvb2xlYW4sIG9wdGlvbnM/OmFueSk6UHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+e1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNmZXIuZG93bmxvYWQoc3JjLCB0YXJnZXQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmFpbChlKXtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jbGFzcyBGaWxlVHJhbnNmZXJJbXBse1xuICAgIHByaXZhdGUgX2ZzOiBGaWxlU3lzdGVtSW1wbDtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuX2ZzID0gbmV3IEZpbGVTeXN0ZW1JbXBsKCk7XG4gICAgfVxuICAgIGRvd25sb2FkKHNvdXJjZTogc3RyaW5nLCB0YXJnZXQ6IHN0cmluZywgaGVhZGVyczogYW55KTogUHJvbWlzZTx2b2lkPntcbiAgICAgICAgdmFyIHcgPSA8YW55PndpbmRvdztcbiAgICAgICAgdmFyIHRyYW5zZmVyID0gbmV3IHcuRmlsZVRyYW5zZmVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9mcy5nZXRGaWxlKHRhcmdldCwge2NyZWF0ZTogdHJ1ZSwgZXhjbHVzaXZlOiBmYWxzZX0pLnRoZW4oKGZpbGU6IGFueSkgPT57XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT57XG4gICAgICAgICAgICAgICAgdHJhbnNmZXIuZG93bmxvYWQoc291cmNlLCBmaWxlLm5hdGl2ZVVSTCwgKHMpID0+e1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZvaWQoMCkpO1xuICAgICAgICAgICAgICAgIH0sIChlKSA9PntcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5yZW1vdmUoKCkgPT57fSwgKCkgPT57fSk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKVxuICAgICAgICAgICAgICAgIH0sIHRydWUsIGhlYWRlcnMpO1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkudGhlbigoKSA9PntcbiAgICAgICAgICAgIHJldHVybiB2b2lkICgwKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY2xhc3MgRmlsZVN5c3RlbUltcGx7XG4gICAgZ2V0RGlyZWN0b3J5KHBhdGg6IHN0cmluZywgb3B0aW9ucyk6IFByb21pc2U8RGlyZWN0b3J5RW50cnk+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgKDxhbnk+d2luZG93KS5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW06IEZpbGVTeXN0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBhdGgoW3BhdGhdLCBmaWxlU3lzdGVtLnJvb3QsIG9wdGlvbnMpLnRoZW4oKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkaXJlY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXREaXJlY3RvcnlFbnRyaWVzKHBhdGg6IHN0cmluZywgb3B0aW9ucyk6IFByb21pc2U8RW50cnlbXT57XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAoPGFueT53aW5kb3cpLnJlcXVlc3RGaWxlU3lzdGVtKExvY2FsRmlsZVN5c3RlbS5QRVJTSVNURU5ULCAwLCAoZmlsZVN5c3RlbTogRmlsZVN5c3RlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGF0aChbcGF0aF0sIGZpbGVTeXN0ZW0ucm9vdCwgb3B0aW9ucykudGhlbigoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVhZGVyID0gZGlyZWN0b3J5LmNyZWF0ZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRFbnRyaWVzKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlbnRyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0RmlsZShwYXRoOnN0cmluZywgb3B0aW9ucyk6UHJvbWlzZTxGaWxlRW50cnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtOkZpbGVTeXN0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZm9sZGVycyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSBmb2xkZXJzW2ZvbGRlcnMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgZm9sZGVycyA9IGZvbGRlcnMuc2xpY2UoMCwgZm9sZGVycy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBhdGgoZm9sZGVycywgZmlsZVN5c3RlbS5yb290LCBvcHRpb25zKS50aGVuKChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5LmdldEZpbGUoZmlsZU5hbWUsIG9wdGlvbnMsIChmaWxlOkZpbGVFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9wdGlvbnMuY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFBhdGgoZm9sZGVyczpzdHJpbmdbXSwgcGFyZW50OkRpcmVjdG9yeUVudHJ5LCBvcHRpb25zOmFueSk6UHJvbWlzZTxEaXJlY3RvcnlFbnRyeT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8RGlyZWN0b3J5RW50cnk+KChyZXNvbHZlLCByZWplY3QpID0+e1xuICAgICAgICAgICAgdGhpcy5nZXRTdWJEaXJlY3RvcnkoZm9sZGVycywgcGFyZW50LCBvcHRpb25zLCAwLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRTdWJEaXJlY3RvcnkoZm9sZGVyczogc3RyaW5nW10sIHBhcmVudERpcmVjdG9yeTogRGlyZWN0b3J5RW50cnksIG9wdGlvbnM6IGFueSAsIGluZGV4OiBudW1iZXIsIHJlc29sdmU6IChkZTogRGlyZWN0b3J5RW50cnkpID0+IHZvaWQsIHJlamVjdDogKGU6IGFueSkgPT4gdm9pZCl7XG4gICAgICAgIGlmKGZvbGRlcnMubGVuZ3RoID4gaW5kZXgpe1xuICAgICAgICAgICAgcGFyZW50RGlyZWN0b3J5LmdldERpcmVjdG9yeShmb2xkZXJzW2luZGV4XSwgb3B0aW9ucywgKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTdWJEaXJlY3RvcnkoZm9sZGVycywgZGlyZWN0b3J5LCBvcHRpb25zLCBpbmRleCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmVzb2x2ZShwYXJlbnREaXJlY3RvcnkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jbGFzcyBOZXR3b3JrSW5mb3JtYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgTmV0d29ya0luZm9ybWF0aW9ue1xuICAgIGdldCBpc0Nvbm5lY3RlZCgpOiBib29sZWFue1xuICAgICAgICBsZXQgY29ubmVjdGlvbiA9ICg8YW55Pm5hdmlnYXRvcikuY29ubmVjdGlvbjtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24udHlwZSAhPSBcIk5PTkVcIiAmJiBjb25uZWN0aW9uLnR5cGUgIT0gXCJub25lXCI7XG4gICAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsICgpID0+IHtcbiAgICB2YXIgZnMgPSBuZXcgRmlsZVN5c3RlbVNlcnZpY2UoKTtcbiAgICB2YXIgZnQgPSBuZXcgRmlsZVRyYW5zZmVyU2VydmljZSgpO1xuICAgIHZhciBuaSA9IG5ldyBOZXR3b3JrSW5mb3JtYXRpb25TZXJ2aWNlKCk7XG5cbiAgICB2YXIgcGFyYW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W21hbmlmZXN0XScpO1xuICAgIGlmKHBhcmFtcyl7XG4gICAgICAgIHZhciBhdXRvdXBkYXRlciA9IG5ldyBBdXRvdXBkYXRlcihmdCwgZnMsIG5pLCBjb3Jkb3ZhLmZpbGUuYXBwbGljYXRpb25EaXJlY3RvcnkgKyAnd3d3JywgcGFyYW1zLmdldEF0dHJpYnV0ZSgnc2VydmVyJykpO1xuICAgICAgICAoPGFueT53aW5kb3cpLnJlcXVlc3RGaWxlU3lzdGVtID0gKDxhbnk+d2luZG93KS5yZXF1ZXN0RmlsZVN5c3RlbSB8fCAoPGFueT53aW5kb3cpLndlYmtpdFJlcXVlc3RGaWxlU3lzdGVtO1xuICAgICAgICAoPGFueT53aW5kb3cpLnJlcXVlc3RGaWxlU3lzdGVtKExvY2FsRmlsZVN5c3RlbS5QRVJTSVNURU5ULCAwLCAoZmlsZVN5c3RlbSk9PiB7XG4gICAgICAgICAgICB2YXIgbmF0aXZlVVJMID0gZmlsZVN5c3RlbS5yb290Lm5hdGl2ZVVSTDtcbiAgICAgICAgICAgICg8YW55PndpbmRvdykubmF0aXZlVVJMID0gbmF0aXZlVVJMO1xuICAgICAgICAgICAgYXV0b3VwZGF0ZXIuYXV0b3VwZGF0ZSgnbXlzJywgcGFyYW1zLmdldEF0dHJpYnV0ZSgnbWFuaWZlc3QnKSwgcGFyYW1zLmdldEF0dHJpYnV0ZSgnc2VydmVyJykgKyAnbWFuaWZlc3QuanNvbicpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTG9hZCB1cGRhdGVkIEFQSycpO1xuICAgICAgICAgICAgICAgICAgICAvLyg8YW55PndpbmRvdykubG9jYXRpb24gPSBuYXRpdmVVUkwgKyAnbXlzL215cy5odG1sJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2FkIGxvY2FsIEFQSycpO1xuICAgICAgICAgICAgICAgICAgICAvLyg8YW55PndpbmRvdykubG9jYXRpb24gPSAnLi9teXMuaHRtbCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgIH0pO1xuICAgIH1cbn0sIGZhbHNlKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
