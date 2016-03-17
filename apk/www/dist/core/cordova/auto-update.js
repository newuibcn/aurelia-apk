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
                window.location = './mys.html';
            }).catch(function () {
                console.log('Load local APK');
                window.location = './mys.html';
            });
        }, function (e) {
            console.log(e);
        });
    }
}, false);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvY29yZG92YS9hdXRvLXVwZGF0ZS5qcyIsImNvcmUvY29yZG92YS9hdXRvLXVwZGF0ZS50cyJdLCJuYW1lcyI6WyJBdXRvdXBkYXRlciIsIkF1dG91cGRhdGVyLmNvbnN0cnVjdG9yIiwiQXV0b3VwZGF0ZXIuYXV0b3VwZGF0ZSIsIkF1dG91cGRhdGVyLmNvcHlNYW5pZmVzdFRvTG9jYWxTdG9yYWdlIiwiQXV0b3VwZGF0ZXIuZG9CYWNrdXAiLCJBdXRvdXBkYXRlci5yZXN0b3JlQmFja3VwIiwiQXV0b3VwZGF0ZXIuY2hlY2tOZXdWZXJzaW9uIiwiQXV0b3VwZGF0ZXIudXBkYXRlRmlsZXMiLCJGaWxlU3lzdGVtU2VydmljZSIsIkZpbGVTeXN0ZW1TZXJ2aWNlLmNvbnN0cnVjdG9yIiwiRmlsZVN5c3RlbVNlcnZpY2Uub3BlbkZpbGUiLCJGaWxlU3lzdGVtU2VydmljZS5yZW1vdmVGaWxlIiwiRmlsZVN5c3RlbVNlcnZpY2UuZG93bmxvYWRGaWxlIiwiRmlsZVN5c3RlbVNlcnZpY2UuY29weUZpbGUiLCJGaWxlU3lzdGVtU2VydmljZS5jb3B5RGlyZWN0b3J5IiwiRmlsZVRyYW5zZmVyU2VydmljZSIsIkZpbGVUcmFuc2ZlclNlcnZpY2UuY29uc3RydWN0b3IiLCJGaWxlVHJhbnNmZXJTZXJ2aWNlLmRvd25sb2FkIiwiRmlsZVRyYW5zZmVyU2VydmljZS5mYWlsIiwiRmlsZVRyYW5zZmVySW1wbCIsIkZpbGVUcmFuc2ZlckltcGwuY29uc3RydWN0b3IiLCJGaWxlVHJhbnNmZXJJbXBsLmRvd25sb2FkIiwiRmlsZVN5c3RlbUltcGwiLCJGaWxlU3lzdGVtSW1wbC5nZXREaXJlY3RvcnkiLCJGaWxlU3lzdGVtSW1wbC5nZXREaXJlY3RvcnlFbnRyaWVzIiwiRmlsZVN5c3RlbUltcGwuZ2V0RmlsZSIsIkZpbGVTeXN0ZW1JbXBsLmdldFBhdGgiLCJGaWxlU3lzdGVtSW1wbC5nZXRTdWJEaXJlY3RvcnkiLCJOZXR3b3JrSW5mb3JtYXRpb25TZXJ2aWNl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LENBQXVCLEtBQXZCLEVBQThCLE9BQU8sWUFBUCxDQUFvQixVQUFwQixDQUE5QixFQUErRCxPQUFPLFlBQVAsQ0FBb0IsUUFBcEIsSUFBZ0MsZUFBaEMsQ0FBL0QsQ0FDSyxJQURMLENBQ1UsWUFBQTtBQUNGLHdCQUFRLEdBQVIsQ0FBWSxrQkFBWixFQURFO0FBRUksdUJBQVEsUUFBUixHQUFtQixZQUFuQixDQUZKO2FBQUEsQ0FEVixDQU1LLEtBTkwsQ0FNVyxZQUFBO0FBQ0gsd0JBQVEsR0FBUixDQUFZLGdCQUFaLEVBREc7QUFFRyx1QkFBUSxRQUFSLEdBQW1CLFlBQW5CLENBRkg7YUFBQSxDQU5YLENBSHNFO1NBQVgsRUFhNUQsVUFBQyxDQUFELEVBQUU7QUFDRCxvQkFBUSxHQUFSLENBQVksQ0FBWixFQURDO1NBQUYsQ0FiRyxDQUhBO0tBQVY7Q0FOcUMsRUEwQnRDLEtBMUJIIiwiZmlsZSI6ImNvcmUvY29yZG92YS9hdXRvLXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xuICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgfSk7XG59O1xuZXhwb3J0IGNsYXNzIEF1dG91cGRhdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihfZmlsZVRyYW5zZmVyLCBfZmlsZVN5c3RlbSwgX25ldHdvcmtJbmZvcm1hdGlvbiwgX3Jvb3REaXJlY3RvcnksIF9zZXJ2ZXJVcmwpIHtcbiAgICAgICAgdGhpcy5fZmlsZVRyYW5zZmVyID0gX2ZpbGVUcmFuc2ZlcjtcbiAgICAgICAgdGhpcy5fZmlsZVN5c3RlbSA9IF9maWxlU3lzdGVtO1xuICAgICAgICB0aGlzLl9uZXR3b3JrSW5mb3JtYXRpb24gPSBfbmV0d29ya0luZm9ybWF0aW9uO1xuICAgICAgICB0aGlzLl9yb290RGlyZWN0b3J5ID0gX3Jvb3REaXJlY3Rvcnk7XG4gICAgICAgIHRoaXMuX3NlcnZlclVybCA9IF9zZXJ2ZXJVcmw7XG4gICAgfVxuICAgIGF1dG91cGRhdGUobG9jYWxTdG9yYWdlRGlyZWN0b3J5LCBsb2NhbE1hbmlmZXN0UGF0aCwgcmVtb3RlTWFuaWZlc3RQYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHlpZWxkIHRoaXMuY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2UodGhpcy5fcm9vdERpcmVjdG9yeSwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5LCBsb2NhbE1hbmlmZXN0UGF0aCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5jaGVja05ld1ZlcnNpb24obG9jYWxNYW5pZmVzdFBhdGgsIHJlbW90ZU1hbmlmZXN0UGF0aCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5kb0JhY2t1cChsb2NhbFN0b3JhZ2VEaXJlY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkIHRoaXMudXBkYXRlRmlsZXModGhpcy5fc2VydmVyVXJsLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5yZXN0b3JlQmFja3VwKGxvY2FsU3RvcmFnZURpcmVjdG9yeSArICctYmFja3VwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMucmVzdG9yZUJhY2t1cCh0aGlzLl9yb290RGlyZWN0b3J5ICsgJy1iYWNrdXAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2Uocm9vdERpcmVjdG9yeSwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5LCBsb2NhbE1hbmlmZXN0UGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxldCBsb2NhbE1hbmlmZXN0Q29udGVudCA9IHlpZWxkIHRoaXMuX2ZpbGVTeXN0ZW0ub3BlbkZpbGUobG9jYWxNYW5pZmVzdFBhdGgpO1xuICAgICAgICAgICAgbGV0IGxvY2FsTWFuaWZlc3QgPSBKU09OLnBhcnNlKGxvY2FsTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgICAgIGxldCBmaWxlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBpbiBsb2NhbE1hbmlmZXN0LmZpbGVzKSB7XG4gICAgICAgICAgICAgICAgZmlsZXMucHVzaChsb2NhbE1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5fZmlsZVN5c3RlbS5kb3dubG9hZEZpbGUocm9vdERpcmVjdG9yeSArICcvJyArIGZpbGVzW2ldLmZpbGVuYW1lLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkgKyAnLycgKyBmaWxlc1tpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgPSB5aWVsZCB0aGlzLl9maWxlU3lzdGVtLmRvd25sb2FkRmlsZShyb290RGlyZWN0b3J5ICsgJy9tYW5pZmVzdC5qc29uJywgbG9jYWxTdG9yYWdlRGlyZWN0b3J5ICsgJy9tYW5pZmVzdC5qc29uJyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZG9CYWNrdXAocGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB5aWVsZCB0aGlzLl9maWxlU3lzdGVtLmNvcHlEaXJlY3RvcnkocGF0aCwgcGF0aCArICctYmFja3VwJyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzdG9yZUJhY2t1cChiYWNrdXBQYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHlpZWxkIHRoaXMuX2ZpbGVTeXN0ZW0uY29weURpcmVjdG9yeShiYWNrdXBQYXRoLCBiYWNrdXBQYXRoLnN1YnN0cigwLCBiYWNrdXBQYXRoLmluZGV4T2YoJy0nKSkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNoZWNrTmV3VmVyc2lvbihsb2NhbFBhdGgsIHJlbW90ZVBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX25ldHdvcmtJbmZvcm1hdGlvbi5pc0Nvbm5lY3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3RlTWFuaWZlc3RDb250ZW50ID0geWllbGQgdGhpcy5fZmlsZVN5c3RlbS5vcGVuRmlsZShyZW1vdGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVNYW5pZmVzdCA9IEpTT04ucGFyc2UocmVtb3RlTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsTWFuaWZlc3RDb250ZW50ID0geWllbGQgdGhpcy5fZmlsZVN5c3RlbS5vcGVuRmlsZShsb2NhbFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsTWFuaWZlc3QgPSBKU09OLnBhcnNlKGxvY2FsTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3RlTWFuaWZlc3QudmVyc2lvbiAhPT0gdGhpcy5sb2NhbE1hbmlmZXN0LnZlcnNpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGVGaWxlcyhzZXJ2ZXIsIGxvY2FsU3RvcmFnZVBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBsZXQgbG9jYWxGaWxlcyA9IFtdO1xuICAgICAgICAgICAgbGV0IHJlbW90ZUZpbGVzID0gW107XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBpbiB0aGlzLmxvY2FsTWFuaWZlc3QuZmlsZXMpIHtcbiAgICAgICAgICAgICAgICBsb2NhbEZpbGVzLnB1c2godGhpcy5sb2NhbE1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGZpbGUgaW4gdGhpcy5yZW1vdGVNYW5pZmVzdC5maWxlcykge1xuICAgICAgICAgICAgICAgIHJlbW90ZUZpbGVzLnB1c2godGhpcy5yZW1vdGVNYW5pZmVzdC5maWxlc1tmaWxlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsZXNUb1JlbW92ZSA9IGxvY2FsRmlsZXMuZmlsdGVyKChsZikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb3VuZHMgPSByZW1vdGVGaWxlcy5maWx0ZXIoKHJmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZi5maWxlbmFtZSA9PSBsZi5maWxlbmFtZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmRzLmxlbmd0aCA9PSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzVG9SZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCB0aGlzLl9maWxlU3lzdGVtLnJlbW92ZUZpbGUobG9jYWxTdG9yYWdlUGF0aCArICcvJyArIGZpbGVzVG9SZW1vdmVbaV0uZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZpbGVzVG9VcGRhdGUgPSByZW1vdGVGaWxlcy5maWx0ZXIoKHJmKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kcyA9IGxvY2FsRmlsZXMuZmlsdGVyKChsZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmYuZmlsZW5hbWUgPT0gbGYuZmlsZW5hbWUgJiYgcmYudmVyc2lvbiAhPSBsZi52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZHMubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlc1RvVXBkYXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5fZmlsZVRyYW5zZmVyLmRvd25sb2FkKHNlcnZlciArIGZpbGVzVG9VcGRhdGVbaV0uZmlsZW5hbWUsIGxvY2FsU3RvcmFnZVBhdGggKyAnLycgKyBmaWxlc1RvVXBkYXRlW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBmaWxlc1RvQWRkID0gcmVtb3RlRmlsZXMuZmlsdGVyKChyZikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb3VuZHMgPSBsb2NhbEZpbGVzLmZpbHRlcigobGYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJmLmZpbGVuYW1lID09IGxmLmZpbGVuYW1lO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZHMubGVuZ3RoID09IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXNUb0FkZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkIHRoaXMuX2ZpbGVUcmFuc2Zlci5kb3dubG9hZChzZXJ2ZXIgKyBmaWxlc1RvQWRkW2ldLmZpbGVuYW1lLCBsb2NhbFN0b3JhZ2VQYXRoICsgJy8nICsgZmlsZXNUb0FkZFtpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuY2xhc3MgRmlsZVN5c3RlbVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB0aGlzLl9mcyA9IG5ldyBGaWxlU3lzdGVtSW1wbCgpO1xuICAgICAgICB0aGlzLl9mdCA9IG5ldyBGaWxlVHJhbnNmZXJTZXJ2aWNlKCk7XG4gICAgfVxuICAgIG9wZW5GaWxlKHBhdGgpIHtcbiAgICAgICAgdGhpcy54aHIub3BlbignR0VUJywgcGF0aCk7XG4gICAgICAgIHRoaXMueGhyLnNlbmQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMueGhyLm9uZXJyb3IgPSAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoJ0Vycm9yIGdldHRpbmcgZmlsZSBmcm9tICcgKyBwYXRoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy54aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueGhyLnN0YXR1cyA9PT0gMCB8fCB0aGlzLnhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnhoci5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QodGhpcy54aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZW1vdmVGaWxlKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZzLmdldEZpbGUocGF0aCwgeyBjcmVhdGU6IGZhbHNlLCBleGNsdXNpdmU6IGZhbHNlIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChmaWxlRW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZUVudHJ5LnJlbW92ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZG93bmxvYWRGaWxlKG9yaWdQYXRoLCBkZXN0UGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnQuZG93bmxvYWQob3JpZ1BhdGgsIGRlc3RQYXRoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29weUZpbGUoZGlyZWN0b3J5LCBlbnRyeSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZW50cnkuY29weVRvKGRpcmVjdG9yeSwgZW50cnkubmFtZSwgKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09IDEyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRmlsZShkaXJlY3RvcnkuZnVsbFBhdGggKyBlbnRyeS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3B5RmlsZShkaXJlY3RvcnksIGVudHJ5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29weURpcmVjdG9yeShvcmlnUGF0aCwgZGVzdFBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBsZXQgZW50cmllcyA9IHlpZWxkIHRoaXMuX2ZzLmdldERpcmVjdG9yeUVudHJpZXMob3JpZ1BhdGgsIHsgY3JlYXRlOiBmYWxzZSwgZXhjbHVzaXZlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIGxldCBkZXN0RGlyZWN0b3J5ID0geWllbGQgdGhpcy5fZnMuZ2V0RGlyZWN0b3J5KGRlc3RQYXRoLCB7IGNyZWF0ZTogdHJ1ZSwgZXhjbHVzaXZlOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIGlmIChlbnRyaWVzICYmIGRlc3REaXJlY3RvcnkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVudHJ5ID0gZW50cmllc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0geWllbGQgdGhpcy5jb3B5RGlyZWN0b3J5KG9yaWdQYXRoICsgJy8nICsgZW50cnkubmFtZSwgZGVzdFBhdGggKyAnLycgKyBlbnRyeS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB5aWVsZCB0aGlzLmNvcHlGaWxlKGRlc3REaXJlY3RvcnksIGVudHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuY2xhc3MgRmlsZVRyYW5zZmVyU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3RyYW5zZmVyID0gbmV3IEZpbGVUcmFuc2ZlckltcGwoKTtcbiAgICB9XG4gICAgZG93bmxvYWQoc3JjLCB0YXJnZXQsIHRydXN0QWxsSG9zdHMsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zZmVyLmRvd25sb2FkKHNyYywgdGFyZ2V0KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmFpbChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuY2xhc3MgRmlsZVRyYW5zZmVySW1wbCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2ZzID0gbmV3IEZpbGVTeXN0ZW1JbXBsKCk7XG4gICAgfVxuICAgIGRvd25sb2FkKHNvdXJjZSwgdGFyZ2V0LCBoZWFkZXJzKSB7XG4gICAgICAgIHZhciB3ID0gd2luZG93O1xuICAgICAgICB2YXIgdHJhbnNmZXIgPSBuZXcgdy5GaWxlVHJhbnNmZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZzLmdldEZpbGUodGFyZ2V0LCB7IGNyZWF0ZTogdHJ1ZSwgZXhjbHVzaXZlOiBmYWxzZSB9KS50aGVuKChmaWxlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRyYW5zZmVyLmRvd25sb2FkKHNvdXJjZSwgZmlsZS5uYXRpdmVVUkwsIChzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodm9pZCAoMCkpO1xuICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGUucmVtb3ZlKCgpID0+IHsgfSwgKCkgPT4geyB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH0sIHRydWUsIGhlYWRlcnMpO1xuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgKDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgKDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5jbGFzcyBGaWxlU3lzdGVtSW1wbCB7XG4gICAgZ2V0RGlyZWN0b3J5KHBhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBhdGgoW3BhdGhdLCBmaWxlU3lzdGVtLnJvb3QsIG9wdGlvbnMpLnRoZW4oKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXREaXJlY3RvcnlFbnRyaWVzKHBhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBhdGgoW3BhdGhdLCBmaWxlU3lzdGVtLnJvb3QsIG9wdGlvbnMpLnRoZW4oKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVhZGVyID0gZGlyZWN0b3J5LmNyZWF0ZVJlYWRlcigpO1xuICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEVudHJpZXMoKGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZW50cmllcyk7XG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRGaWxlKHBhdGgsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZm9sZGVycyA9IHBhdGguc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgZmlsZU5hbWUgPSBmb2xkZXJzW2ZvbGRlcnMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgZm9sZGVycyA9IGZvbGRlcnMuc2xpY2UoMCwgZm9sZGVycy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBhdGgoZm9sZGVycywgZmlsZVN5c3RlbS5yb290LCBvcHRpb25zKS50aGVuKChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5LmdldEZpbGUoZmlsZU5hbWUsIG9wdGlvbnMsIChmaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY3JlYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0UGF0aChmb2xkZXJzLCBwYXJlbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ2V0U3ViRGlyZWN0b3J5KGZvbGRlcnMsIHBhcmVudCwgb3B0aW9ucywgMCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFN1YkRpcmVjdG9yeShmb2xkZXJzLCBwYXJlbnREaXJlY3RvcnksIG9wdGlvbnMsIGluZGV4LCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKGZvbGRlcnMubGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgICAgICAgIHBhcmVudERpcmVjdG9yeS5nZXREaXJlY3RvcnkoZm9sZGVyc1tpbmRleF0sIG9wdGlvbnMsIChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3ViRGlyZWN0b3J5KGZvbGRlcnMsIGRpcmVjdG9yeSwgb3B0aW9ucywgaW5kZXgsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShwYXJlbnREaXJlY3RvcnkpO1xuICAgICAgICB9XG4gICAgfVxufVxuY2xhc3MgTmV0d29ya0luZm9ybWF0aW9uU2VydmljZSB7XG4gICAgZ2V0IGlzQ29ubmVjdGVkKCkge1xuICAgICAgICBsZXQgY29ubmVjdGlvbiA9IG5hdmlnYXRvci5jb25uZWN0aW9uO1xuICAgICAgICByZXR1cm4gY29ubmVjdGlvbi50eXBlICE9IFwiTk9ORVwiICYmIGNvbm5lY3Rpb24udHlwZSAhPSBcIm5vbmVcIjtcbiAgICB9XG59XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsICgpID0+IHtcbiAgICB2YXIgZnMgPSBuZXcgRmlsZVN5c3RlbVNlcnZpY2UoKTtcbiAgICB2YXIgZnQgPSBuZXcgRmlsZVRyYW5zZmVyU2VydmljZSgpO1xuICAgIHZhciBuaSA9IG5ldyBOZXR3b3JrSW5mb3JtYXRpb25TZXJ2aWNlKCk7XG4gICAgdmFyIHBhcmFtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFttYW5pZmVzdF0nKTtcbiAgICBpZiAocGFyYW1zKSB7XG4gICAgICAgIHZhciBhdXRvdXBkYXRlciA9IG5ldyBBdXRvdXBkYXRlcihmdCwgZnMsIG5pLCBjb3Jkb3ZhLmZpbGUuYXBwbGljYXRpb25EaXJlY3RvcnkgKyAnd3d3JywgcGFyYW1zLmdldEF0dHJpYnV0ZSgnc2VydmVyJykpO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEZpbGVTeXN0ZW0gPSB3aW5kb3cucmVxdWVzdEZpbGVTeXN0ZW0gfHwgd2luZG93LndlYmtpdFJlcXVlc3RGaWxlU3lzdGVtO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtKSA9PiB7XG4gICAgICAgICAgICB2YXIgbmF0aXZlVVJMID0gZmlsZVN5c3RlbS5yb290Lm5hdGl2ZVVSTDtcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmVVUkwgPSBuYXRpdmVVUkw7XG4gICAgICAgICAgICBhdXRvdXBkYXRlci5hdXRvdXBkYXRlKCdteXMnLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdtYW5pZmVzdCcpLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdzZXJ2ZXInKSArICdtYW5pZmVzdC5qc29uJylcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvYWQgdXBkYXRlZCBBUEsnKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnLi9teXMuaHRtbCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvYWQgbG9jYWwgQVBLJyk7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy4vbXlzLmh0bWwnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSwgZmFsc2UpO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGFsZXh2aXpjYWlubyBvbiAxMS8zLzE2LlxuICovXG5pbXBvcnQge0lGaWxlVHJhbnNmZXIsIElGaWxlU3lzdGVtLCBUcmFja2VkRmlsZSwgTWFuaWZlc3QsIE5ldHdvcmtJbmZvcm1hdGlvbiwgRmlsZUVudHJ5LCBGaWxlU3lzdGVtLCBEaXJlY3RvcnlFbnRyeSwgRW50cnl9IGZyb20gXCJhdXRvLXVwZGF0ZXJcIjtcblxuZXhwb3J0IGNsYXNzIEF1dG91cGRhdGVye1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZpbGVUcmFuc2ZlcjogSUZpbGVUcmFuc2ZlciwgcHJpdmF0ZSBfZmlsZVN5c3RlbTogSUZpbGVTeXN0ZW0sIHByaXZhdGUgX25ldHdvcmtJbmZvcm1hdGlvbjogTmV0d29ya0luZm9ybWF0aW9uLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3Jvb3REaXJlY3Rvcnk6IHN0cmluZywgcHJpdmF0ZSBfc2VydmVyVXJsOiBzdHJpbmcpe1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBhdXRvdXBkYXRlKGxvY2FsU3RvcmFnZURpcmVjdG9yeTogc3RyaW5nLCBsb2NhbE1hbmlmZXN0UGF0aDogc3RyaW5nLCByZW1vdGVNYW5pZmVzdFBhdGg6IHN0cmluZyk6UHJvbWlzZTx2b2lkPntcbiAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IHRoaXMuY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2UodGhpcy5fcm9vdERpcmVjdG9yeSwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5LCBsb2NhbE1hbmlmZXN0UGF0aCk7XG4gICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLmNoZWNrTmV3VmVyc2lvbihsb2NhbE1hbmlmZXN0UGF0aCwgcmVtb3RlTWFuaWZlc3RQYXRoKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLmRvQmFja3VwKGxvY2FsU3RvcmFnZURpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLnVwZGF0ZUZpbGVzKHRoaXMuX3NlcnZlclVybCwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMucmVzdG9yZUJhY2t1cChsb2NhbFN0b3JhZ2VEaXJlY3RvcnkgKyAnLWJhY2t1cCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlc3RvcmVCYWNrdXAodGhpcy5fcm9vdERpcmVjdG9yeSArICctYmFja3VwJyk7XG4gICAgICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2Uocm9vdERpcmVjdG9yeTogc3RyaW5nLCBsb2NhbFN0b3JhZ2VEaXJlY3Rvcnk6IHN0cmluZywgbG9jYWxNYW5pZmVzdFBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIGxldCBsb2NhbE1hbmlmZXN0Q29udGVudCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0ub3BlbkZpbGUobG9jYWxNYW5pZmVzdFBhdGgpO1xuICAgICAgICBsZXQgbG9jYWxNYW5pZmVzdCA9IDxNYW5pZmVzdD5KU09OLnBhcnNlKGxvY2FsTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgbGV0IGZpbGVzOiBUcmFja2VkRmlsZVtdID0gW107XG5cbiAgICAgICAgZm9yKGxldCBmaWxlIGluIGxvY2FsTWFuaWZlc3QuZmlsZXMpe1xuICAgICAgICAgICAgZmlsZXMucHVzaChsb2NhbE1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLmRvd25sb2FkRmlsZShyb290RGlyZWN0b3J5ICsgJy8nICsgZmlsZXNbaV0uZmlsZW5hbWUsIGxvY2FsU3RvcmFnZURpcmVjdG9yeSArICcvJyArIGZpbGVzW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0uZG93bmxvYWRGaWxlKHJvb3REaXJlY3RvcnkgKyAnL21hbmlmZXN0Lmpzb24nLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkgKyAnL21hbmlmZXN0Lmpzb24nKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZG9CYWNrdXAocGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0uY29weURpcmVjdG9yeShwYXRoLCBwYXRoICsgJy1iYWNrdXAnKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVzdG9yZUJhY2t1cChiYWNrdXBQYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5jb3B5RGlyZWN0b3J5KGJhY2t1cFBhdGgsIGJhY2t1cFBhdGguc3Vic3RyKDAsIGJhY2t1cFBhdGguaW5kZXhPZignLScpKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW90ZU1hbmlmZXN0OiBNYW5pZmVzdDtcbiAgICBwdWJsaWMgbG9jYWxNYW5pZmVzdDogTWFuaWZlc3Q7XG5cbiAgICBwdWJsaWMgYXN5bmMgY2hlY2tOZXdWZXJzaW9uKGxvY2FsUGF0aDogc3RyaW5nLCByZW1vdGVQYXRoOiBzdHJpbmcpOlByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZighdGhpcy5fbmV0d29ya0luZm9ybWF0aW9uLmlzQ29ubmVjdGVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIGxldCByZW1vdGVNYW5pZmVzdENvbnRlbnQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLm9wZW5GaWxlKHJlbW90ZVBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlTWFuaWZlc3QgPSA8TWFuaWZlc3Q+SlNPTi5wYXJzZShyZW1vdGVNYW5pZmVzdENvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGxldCBsb2NhbE1hbmlmZXN0Q29udGVudCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0ub3BlbkZpbGUobG9jYWxQYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsTWFuaWZlc3QgPSA8TWFuaWZlc3Q+SlNPTi5wYXJzZShsb2NhbE1hbmlmZXN0Q29udGVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB2ZXJzaW9ucyBvZiBtYW5pZmVzdHNcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdGVNYW5pZmVzdC52ZXJzaW9uICE9PSB0aGlzLmxvY2FsTWFuaWZlc3QudmVyc2lvbjtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGVGaWxlcyhzZXJ2ZXI6IHN0cmluZywgbG9jYWxTdG9yYWdlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgbGV0IGxvY2FsRmlsZXM6IFRyYWNrZWRGaWxlW10gPSBbXTtcbiAgICAgICAgbGV0IHJlbW90ZUZpbGVzOiBUcmFja2VkRmlsZVtdID0gW107XG4gICAgICAgIGxldCByZXN1bHQ6IGJvb2xlYW47XG5cbiAgICAgICAgZm9yKGxldCBmaWxlIGluIHRoaXMubG9jYWxNYW5pZmVzdC5maWxlcyl7XG4gICAgICAgICAgICBsb2NhbEZpbGVzLnB1c2godGhpcy5sb2NhbE1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGZpbGUgaW4gdGhpcy5yZW1vdGVNYW5pZmVzdC5maWxlcyl7XG4gICAgICAgICAgICByZW1vdGVGaWxlcy5wdXNoKHRoaXMucmVtb3RlTWFuaWZlc3QuZmlsZXNbZmlsZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlsZXMgdG8gYmUgcmVtb3ZlZFxuICAgICAgICBsZXQgZmlsZXNUb1JlbW92ZTogVHJhY2tlZEZpbGVbXSA9IGxvY2FsRmlsZXMuZmlsdGVyKChsZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgIGxldCBmb3VuZHMgPSByZW1vdGVGaWxlcy5maWx0ZXIoKHJmOiBUcmFja2VkRmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZi5maWxlbmFtZSA9PSBsZi5maWxlbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kcy5sZW5ndGggPT0gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGVzVG9SZW1vdmUubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5yZW1vdmVGaWxlKGxvY2FsU3RvcmFnZVBhdGggKyAnLycgKyBmaWxlc1RvUmVtb3ZlW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbGVzIHRvIGJlIHVwZGF0ZWRcbiAgICAgICAgbGV0IGZpbGVzVG9VcGRhdGU6IFRyYWNrZWRGaWxlW10gPSByZW1vdGVGaWxlcy5maWx0ZXIoKHJmOiBUcmFja2VkRmlsZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGZvdW5kcyA9IGxvY2FsRmlsZXMuZmlsdGVyKChsZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmYuZmlsZW5hbWUgPT0gbGYuZmlsZW5hbWUgJiYgcmYudmVyc2lvbiAhPSBsZi52ZXJzaW9uO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZm91bmRzLmxlbmd0aCA+IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlc1RvVXBkYXRlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVUcmFuc2Zlci5kb3dubG9hZChzZXJ2ZXIgKyBmaWxlc1RvVXBkYXRlW2ldLmZpbGVuYW1lLCBsb2NhbFN0b3JhZ2VQYXRoICsgJy8nICsgZmlsZXNUb1VwZGF0ZVtpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaWxlcyB0byBiZSBkb3dubG9hZGVkXG4gICAgICAgIGxldCBmaWxlc1RvQWRkOiBUcmFja2VkRmlsZVtdID0gcmVtb3RlRmlsZXMuZmlsdGVyKChyZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgIGxldCBmb3VuZHMgPSBsb2NhbEZpbGVzLmZpbHRlcigobGY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJmLmZpbGVuYW1lID09IGxmLmZpbGVuYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZm91bmRzLmxlbmd0aCA9PSAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZXNUb0FkZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlVHJhbnNmZXIuZG93bmxvYWQoc2VydmVyICsgZmlsZXNUb0FkZFtpXS5maWxlbmFtZSwgbG9jYWxTdG9yYWdlUGF0aCArICcvJyArIGZpbGVzVG9BZGRbaV0uZmlsZW5hbWUpO1xuICAgICAgICAgICAgaWYoIXJlc3VsdClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY2xhc3MgRmlsZVN5c3RlbVNlcnZpY2UgaW1wbGVtZW50cyBJRmlsZVN5c3RlbXtcbiAgICBwcml2YXRlIHhocjogWE1MSHR0cFJlcXVlc3Q7XG4gICAgcHJpdmF0ZSBfZnM6IEZpbGVTeXN0ZW1JbXBsO1xuICAgIHByaXZhdGUgX2Z0OiBGaWxlVHJhbnNmZXJTZXJ2aWNlO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgLy90aGlzLnhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsICcqJyk7XG4gICAgICAgIC8vdGhpcy54aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgdGhpcy5fZnMgPSBuZXcgRmlsZVN5c3RlbUltcGwoKTtcbiAgICAgICAgdGhpcy5fZnQgPSBuZXcgRmlsZVRyYW5zZmVyU2VydmljZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuRmlsZShwYXRoOnN0cmluZyk6UHJvbWlzZTxzdHJpbmc+e1xuICAgICAgICB0aGlzLnhoci5vcGVuKCdHRVQnLCBwYXRoKTtcbiAgICAgICAgdGhpcy54aHIuc2VuZCgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnhoci5vbmVycm9yID0gKGV2KSA9PntcbiAgICAgICAgICAgICAgICByZWplY3QoJ0Vycm9yIGdldHRpbmcgZmlsZSBmcm9tICcgKyBwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qdGhpcy54aHIub25sb2FkID0gKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueGhyLnJlc3BvbnNlID09IG51bGwgfHwgKHRoaXMueGhyLnN0YXR1cyA8IDIwMCB8fCB0aGlzLnhoci5zdGF0dXMgPj0gMzAwKSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QodGhpcy54aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnhoci5yZXNwb25zZSk7XG4gICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IChldikgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMueGhyLnJlYWR5U3RhdGUgPT0gNCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy54aHIuc3RhdHVzID09PSAwIHx8IHRoaXMueGhyLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy54aHIucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRoaXMueGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlbW92ZUZpbGUocGF0aDpzdHJpbmcpOlByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9mcy5nZXRGaWxlKHBhdGgsIHtjcmVhdGU6ZmFsc2UsIGV4Y2x1c2l2ZTogZmFsc2V9KVxuICAgICAgICAgICAgICAgIC50aGVuKChmaWxlRW50cnk6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmaWxlRW50cnkucmVtb3ZlKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBkb3dubG9hZEZpbGUob3JpZ1BhdGg6IHN0cmluZywgZGVzdFBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAxLiBDaGVjayBpZiBmaWxlIGV4aXN0cyBpbiBvcmlnaW5cbiAgICAgICAgICogMi4gSWYgbm90LCByZXNvbHZlKGZhbHNlKVxuICAgICAgICAgKiAzLiBFbHNlXG4gICAgICAgICAqIDQuIERvd25sb2FkIGluIGRlc3RpbmF0aW9uIGZvbGRlclxuICAgICAgICAgKi9cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZnQuZG93bmxvYWQob3JpZ1BhdGgsIGRlc3RQYXRoKVxuICAgICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvcHlGaWxlKGRpcmVjdG9yeTogRGlyZWN0b3J5RW50cnksIGVudHJ5OiBFbnRyeSk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBlbnRyeS5jb3B5VG8oZGlyZWN0b3J5LCBlbnRyeS5uYW1lLCAoZW50cnk6IEVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXJyb3IuY29kZSA9PSAxMil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRmlsZShkaXJlY3RvcnkuZnVsbFBhdGggKyBlbnRyeS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3B5RmlsZShkaXJlY3RvcnksIGVudHJ5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgY29weURpcmVjdG9yeShvcmlnUGF0aDogc3RyaW5nLCBkZXN0UGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgbGV0IGVudHJpZXM6IEVudHJ5W10gPSBhd2FpdCB0aGlzLl9mcy5nZXREaXJlY3RvcnlFbnRyaWVzKG9yaWdQYXRoLCB7Y3JlYXRlOiBmYWxzZSwgZXhjbHVzaXZlOiBmYWxzZX0pO1xuICAgICAgICBsZXQgZGVzdERpcmVjdG9yeTogRGlyZWN0b3J5RW50cnkgPSBhd2FpdCB0aGlzLl9mcy5nZXREaXJlY3RvcnkoZGVzdFBhdGgsIHtjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2V9KTtcbiAgICAgICAgaWYoZW50cmllcyAmJiBkZXN0RGlyZWN0b3J5KXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgZW50cnkgPSBlbnRyaWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGVudHJ5LmlzRGlyZWN0b3J5KXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY29weURpcmVjdG9yeShvcmlnUGF0aCArICcvJyArIGVudHJ5Lm5hbWUsIGRlc3RQYXRoICsgJy8nICsgZW50cnkubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY29weUZpbGUoZGVzdERpcmVjdG9yeSwgZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZGVjbGFyZSB2YXIgTG9jYWxGaWxlU3lzdGVtO1xuZGVjbGFyZSB2YXIgY29yZG92YTtcbmNsYXNzIEZpbGVUcmFuc2ZlclNlcnZpY2UgaW1wbGVtZW50cyBJRmlsZVRyYW5zZmVye1xuICAgIHByaXZhdGUgX3RyYW5zZmVyOiBhbnk7XG4gICAgcHJpdmF0ZSBfc3lzdGVtOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLl90cmFuc2ZlciA9IG5ldyBGaWxlVHJhbnNmZXJJbXBsKCk7XG4gICAgfVxuXG4gICAgZG93bmxvYWQoc3JjOnN0cmluZywgdGFyZ2V0OnN0cmluZywgdHJ1c3RBbGxIb3N0cz86Ym9vbGVhbiwgb3B0aW9ucz86YW55KTpQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT57XG4gICAgICAgICAgICB0aGlzLl90cmFuc2Zlci5kb3dubG9hZChzcmMsIHRhcmdldClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmYWlsKGUpe1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNsYXNzIEZpbGVUcmFuc2ZlckltcGx7XG4gICAgcHJpdmF0ZSBfZnM6IEZpbGVTeXN0ZW1JbXBsO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5fZnMgPSBuZXcgRmlsZVN5c3RlbUltcGwoKTtcbiAgICB9XG4gICAgZG93bmxvYWQoc291cmNlOiBzdHJpbmcsIHRhcmdldDogc3RyaW5nLCBoZWFkZXJzOiBhbnkpOiBQcm9taXNlPHZvaWQ+e1xuICAgICAgICB2YXIgdyA9IDxhbnk+d2luZG93O1xuICAgICAgICB2YXIgdHJhbnNmZXIgPSBuZXcgdy5GaWxlVHJhbnNmZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZzLmdldEZpbGUodGFyZ2V0LCB7Y3JlYXRlOiB0cnVlLCBleGNsdXNpdmU6IGZhbHNlfSkudGhlbigoZmlsZTogYW55KSA9PntcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PntcbiAgICAgICAgICAgICAgICB0cmFuc2Zlci5kb3dubG9hZChzb3VyY2UsIGZpbGUubmF0aXZlVVJMLCAocykgPT57XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodm9pZCgwKSk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+e1xuICAgICAgICAgICAgICAgICAgICBmaWxlLnJlbW92ZSgoKSA9Pnt9LCAoKSA9Pnt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSwgaGVhZGVycyk7XG4gICAgICAgICAgICB9KS50aGVuKCgpID0+e1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkICgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS50aGVuKCgpID0+e1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgKDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jbGFzcyBGaWxlU3lzdGVtSW1wbHtcbiAgICBnZXREaXJlY3RvcnkocGF0aDogc3RyaW5nLCBvcHRpb25zKTogUHJvbWlzZTxEaXJlY3RvcnlFbnRyeT57XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAoPGFueT53aW5kb3cpLnJlcXVlc3RGaWxlU3lzdGVtKExvY2FsRmlsZVN5c3RlbS5QRVJTSVNURU5ULCAwLCAoZmlsZVN5c3RlbTogRmlsZVN5c3RlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGF0aChbcGF0aF0sIGZpbGVTeXN0ZW0ucm9vdCwgb3B0aW9ucykudGhlbigoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldERpcmVjdG9yeUVudHJpZXMocGF0aDogc3RyaW5nLCBvcHRpb25zKTogUHJvbWlzZTxFbnRyeVtdPntcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtOiBGaWxlU3lzdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXRoKFtwYXRoXSwgZmlsZVN5c3RlbS5yb290LCBvcHRpb25zKS50aGVuKChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWFkZXIgPSBkaXJlY3RvcnkuY3JlYXRlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEVudHJpZXMoKGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVudHJpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRGaWxlKHBhdGg6c3RyaW5nLCBvcHRpb25zKTpQcm9taXNlPEZpbGVFbnRyeT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgKDxhbnk+d2luZG93KS5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW06RmlsZVN5c3RlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBmb2xkZXJzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIHZhciBmaWxlTmFtZSA9IGZvbGRlcnNbZm9sZGVycy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBmb2xkZXJzID0gZm9sZGVycy5zbGljZSgwLCBmb2xkZXJzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGF0aChmb2xkZXJzLCBmaWxlU3lzdGVtLnJvb3QsIG9wdGlvbnMpLnRoZW4oKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcnkuZ2V0RmlsZShmaWxlTmFtZSwgb3B0aW9ucywgKGZpbGU6RmlsZUVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9ucy5jcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0UGF0aChmb2xkZXJzOnN0cmluZ1tdLCBwYXJlbnQ6RGlyZWN0b3J5RW50cnksIG9wdGlvbnM6YW55KTpQcm9taXNlPERpcmVjdG9yeUVudHJ5PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxEaXJlY3RvcnlFbnRyeT4oKHJlc29sdmUsIHJlamVjdCkgPT57XG4gICAgICAgICAgICB0aGlzLmdldFN1YkRpcmVjdG9yeShmb2xkZXJzLCBwYXJlbnQsIG9wdGlvbnMsIDAsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFN1YkRpcmVjdG9yeShmb2xkZXJzOiBzdHJpbmdbXSwgcGFyZW50RGlyZWN0b3J5OiBEaXJlY3RvcnlFbnRyeSwgb3B0aW9uczogYW55ICwgaW5kZXg6IG51bWJlciwgcmVzb2x2ZTogKGRlOiBEaXJlY3RvcnlFbnRyeSkgPT4gdm9pZCwgcmVqZWN0OiAoZTogYW55KSA9PiB2b2lkKXtcbiAgICAgICAgaWYoZm9sZGVycy5sZW5ndGggPiBpbmRleCl7XG4gICAgICAgICAgICBwYXJlbnREaXJlY3RvcnkuZ2V0RGlyZWN0b3J5KGZvbGRlcnNbaW5kZXhdLCBvcHRpb25zLCAoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN1YkRpcmVjdG9yeShmb2xkZXJzLCBkaXJlY3RvcnksIG9wdGlvbnMsIGluZGV4LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXNvbHZlKHBhcmVudERpcmVjdG9yeSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNsYXNzIE5ldHdvcmtJbmZvcm1hdGlvblNlcnZpY2UgaW1wbGVtZW50cyBOZXR3b3JrSW5mb3JtYXRpb257XG4gICAgZ2V0IGlzQ29ubmVjdGVkKCk6IGJvb2xlYW57XG4gICAgICAgIGxldCBjb25uZWN0aW9uID0gKDxhbnk+bmF2aWdhdG9yKS5jb25uZWN0aW9uO1xuICAgICAgICByZXR1cm4gY29ubmVjdGlvbi50eXBlICE9IFwiTk9ORVwiICYmIGNvbm5lY3Rpb24udHlwZSAhPSBcIm5vbmVcIjtcbiAgICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgKCkgPT4ge1xuICAgIHZhciBmcyA9IG5ldyBGaWxlU3lzdGVtU2VydmljZSgpO1xuICAgIHZhciBmdCA9IG5ldyBGaWxlVHJhbnNmZXJTZXJ2aWNlKCk7XG4gICAgdmFyIG5pID0gbmV3IE5ldHdvcmtJbmZvcm1hdGlvblNlcnZpY2UoKTtcblxuICAgIHZhciBwYXJhbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzY3JpcHRbbWFuaWZlc3RdJyk7XG4gICAgaWYocGFyYW1zKXtcbiAgICAgICAgdmFyIGF1dG91cGRhdGVyID0gbmV3IEF1dG91cGRhdGVyKGZ0LCBmcywgbmksIGNvcmRvdmEuZmlsZS5hcHBsaWNhdGlvbkRpcmVjdG9yeSArICd3d3cnLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdzZXJ2ZXInKSk7XG4gICAgICAgICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0gPSAoPGFueT53aW5kb3cpLnJlcXVlc3RGaWxlU3lzdGVtIHx8ICg8YW55PndpbmRvdykud2Via2l0UmVxdWVzdEZpbGVTeXN0ZW07XG4gICAgICAgICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtKT0+IHtcbiAgICAgICAgICAgIHZhciBuYXRpdmVVUkwgPSBmaWxlU3lzdGVtLnJvb3QubmF0aXZlVVJMO1xuICAgICAgICAgICAgKDxhbnk+d2luZG93KS5uYXRpdmVVUkwgPSBuYXRpdmVVUkw7XG4gICAgICAgICAgICBhdXRvdXBkYXRlci5hdXRvdXBkYXRlKCdteXMnLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdtYW5pZmVzdCcpLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdzZXJ2ZXInKSArICdtYW5pZmVzdC5qc29uJylcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2FkIHVwZGF0ZWQgQVBLJyk7XG4gICAgICAgICAgICAgICAgICAgICg8YW55PndpbmRvdykubG9jYXRpb24gPSAnLi9teXMuaHRtbCc7XG4gICAgICAgICAgICAgICAgICAgIC8vKDxhbnk+d2luZG93KS5sb2NhdGlvbiA9IG5hdGl2ZVVSTCArICdteXMvbXlzLmh0bWwnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvYWQgbG9jYWwgQVBLJyk7XG4gICAgICAgICAgICAgICAgICAgICg8YW55PndpbmRvdykubG9jYXRpb24gPSAnLi9teXMuaHRtbCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgIH0pO1xuICAgIH1cbn0sIGZhbHNlKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
