"use strict";

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

var Autoupdater = function () {
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
                window.location = nativeURL + 'mys/mys.html';
            }).catch(function () {
                console.log('Load local APK');
                window.location = './mys.html';
            });
        }, function (e) {
            console.log(e);
        });
    }
}, false);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvY29yZG92YS9hdXRvLXVwZGF0ZS5qcyIsImNvcmUvY29yZG92YS9hdXRvLXVwZGF0ZS50cyJdLCJuYW1lcyI6WyJBdXRvdXBkYXRlciIsIkF1dG91cGRhdGVyLmNvbnN0cnVjdG9yIiwiQXV0b3VwZGF0ZXIuYXV0b3VwZGF0ZSIsIkF1dG91cGRhdGVyLmNvcHlNYW5pZmVzdFRvTG9jYWxTdG9yYWdlIiwiQXV0b3VwZGF0ZXIuZG9CYWNrdXAiLCJBdXRvdXBkYXRlci5yZXN0b3JlQmFja3VwIiwiQXV0b3VwZGF0ZXIuY2hlY2tOZXdWZXJzaW9uIiwiQXV0b3VwZGF0ZXIudXBkYXRlRmlsZXMiLCJGaWxlU3lzdGVtU2VydmljZSIsIkZpbGVTeXN0ZW1TZXJ2aWNlLmNvbnN0cnVjdG9yIiwiRmlsZVN5c3RlbVNlcnZpY2Uub3BlbkZpbGUiLCJGaWxlU3lzdGVtU2VydmljZS5yZW1vdmVGaWxlIiwiRmlsZVN5c3RlbVNlcnZpY2UuZG93bmxvYWRGaWxlIiwiRmlsZVN5c3RlbVNlcnZpY2UuY29weUZpbGUiLCJGaWxlU3lzdGVtU2VydmljZS5jb3B5RGlyZWN0b3J5IiwiRmlsZVRyYW5zZmVyU2VydmljZSIsIkZpbGVUcmFuc2ZlclNlcnZpY2UuY29uc3RydWN0b3IiLCJGaWxlVHJhbnNmZXJTZXJ2aWNlLmRvd25sb2FkIiwiRmlsZVRyYW5zZmVyU2VydmljZS5mYWlsIiwiRmlsZVRyYW5zZmVySW1wbCIsIkZpbGVUcmFuc2ZlckltcGwuY29uc3RydWN0b3IiLCJGaWxlVHJhbnNmZXJJbXBsLmRvd25sb2FkIiwiRmlsZVN5c3RlbUltcGwiLCJGaWxlU3lzdGVtSW1wbC5nZXREaXJlY3RvcnkiLCJGaWxlU3lzdGVtSW1wbC5nZXREaXJlY3RvcnlFbnRyaWVzIiwiRmlsZVN5c3RlbUltcGwuZ2V0RmlsZSIsIkZpbGVTeXN0ZW1JbXBsLmdldFBhdGgiLCJGaWxlU3lzdGVtSW1wbC5nZXRTdWJEaXJlY3RvcnkiLCJOZXR3b3JrSW5mb3JtYXRpb25TZXJ2aWNl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QixLQUF2QixFQUE4QixPQUFPLFlBQVAsQ0FBb0IsVUFBcEIsQ0FBOUIsRUFBK0QsT0FBTyxZQUFQLENBQW9CLFFBQXBCLElBQWdDLGVBQWhDLENBQS9ELENBQ0ssSUFETCxDQUNVLFlBQUE7QUFDRix3QkFBUSxHQUFSLENBQVksa0JBQVosRUFERTtBQUVJLHVCQUFRLFFBQVIsR0FBbUIsWUFBWSxjQUFaLENBRnZCO2FBQUEsQ0FEVixDQUtLLEtBTEwsQ0FLVyxZQUFBO0FBQ0gsd0JBQVEsR0FBUixDQUFZLGdCQUFaLEVBREc7QUFFRyx1QkFBUSxRQUFSLEdBQW1CLFlBQW5CLENBRkg7YUFBQSxDQUxYLENBSHNFO1NBQVgsRUFZNUQsVUFBQyxDQUFELEVBQUU7QUFDRCxvQkFBUSxHQUFSLENBQVksQ0FBWixFQURDO1NBQUYsQ0FaRyxDQUhBO0tBQVY7Q0FOcUMsRUF5QnRDLEtBekJIIiwiZmlsZSI6ImNvcmUvY29yZG92YS9hdXRvLXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xuICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgfSk7XG59O1xuY2xhc3MgQXV0b3VwZGF0ZXIge1xuICAgIGNvbnN0cnVjdG9yKF9maWxlVHJhbnNmZXIsIF9maWxlU3lzdGVtLCBfbmV0d29ya0luZm9ybWF0aW9uLCBfcm9vdERpcmVjdG9yeSwgX3NlcnZlclVybCkge1xuICAgICAgICB0aGlzLl9maWxlVHJhbnNmZXIgPSBfZmlsZVRyYW5zZmVyO1xuICAgICAgICB0aGlzLl9maWxlU3lzdGVtID0gX2ZpbGVTeXN0ZW07XG4gICAgICAgIHRoaXMuX25ldHdvcmtJbmZvcm1hdGlvbiA9IF9uZXR3b3JrSW5mb3JtYXRpb247XG4gICAgICAgIHRoaXMuX3Jvb3REaXJlY3RvcnkgPSBfcm9vdERpcmVjdG9yeTtcbiAgICAgICAgdGhpcy5fc2VydmVyVXJsID0gX3NlcnZlclVybDtcbiAgICB9XG4gICAgYXV0b3VwZGF0ZShsb2NhbFN0b3JhZ2VEaXJlY3RvcnksIGxvY2FsTWFuaWZlc3RQYXRoLCByZW1vdGVNYW5pZmVzdFBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgdGhpcy5jb3B5TWFuaWZlc3RUb0xvY2FsU3RvcmFnZSh0aGlzLl9yb290RGlyZWN0b3J5LCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnksIGxvY2FsTWFuaWZlc3RQYXRoKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCB0aGlzLmNoZWNrTmV3VmVyc2lvbihsb2NhbE1hbmlmZXN0UGF0aCwgcmVtb3RlTWFuaWZlc3RQYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCB0aGlzLmRvQmFja3VwKGxvY2FsU3RvcmFnZURpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy51cGRhdGVGaWxlcyh0aGlzLl9zZXJ2ZXJVcmwsIGxvY2FsU3RvcmFnZURpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCB0aGlzLnJlc3RvcmVCYWNrdXAobG9jYWxTdG9yYWdlRGlyZWN0b3J5ICsgJy1iYWNrdXAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgdGhpcy5yZXN0b3JlQmFja3VwKHRoaXMuX3Jvb3REaXJlY3RvcnkgKyAnLWJhY2t1cCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobnVsbCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb3B5TWFuaWZlc3RUb0xvY2FsU3RvcmFnZShyb290RGlyZWN0b3J5LCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnksIGxvY2FsTWFuaWZlc3RQYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IGxvY2FsTWFuaWZlc3RDb250ZW50ID0geWllbGQgdGhpcy5fZmlsZVN5c3RlbS5vcGVuRmlsZShsb2NhbE1hbmlmZXN0UGF0aCk7XG4gICAgICAgICAgICBsZXQgbG9jYWxNYW5pZmVzdCA9IEpTT04ucGFyc2UobG9jYWxNYW5pZmVzdENvbnRlbnQpO1xuICAgICAgICAgICAgbGV0IGZpbGVzID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBmaWxlIGluIGxvY2FsTWFuaWZlc3QuZmlsZXMpIHtcbiAgICAgICAgICAgICAgICBmaWxlcy5wdXNoKGxvY2FsTWFuaWZlc3QuZmlsZXNbZmlsZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCB0aGlzLl9maWxlU3lzdGVtLmRvd25sb2FkRmlsZShyb290RGlyZWN0b3J5ICsgJy8nICsgZmlsZXNbaV0uZmlsZW5hbWUsIGxvY2FsU3RvcmFnZURpcmVjdG9yeSArICcvJyArIGZpbGVzW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkIHRoaXMuX2ZpbGVTeXN0ZW0uZG93bmxvYWRGaWxlKHJvb3REaXJlY3RvcnkgKyAnL21hbmlmZXN0Lmpzb24nLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkgKyAnL21hbmlmZXN0Lmpzb24nKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkb0JhY2t1cChwYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHlpZWxkIHRoaXMuX2ZpbGVTeXN0ZW0uY29weURpcmVjdG9yeShwYXRoLCBwYXRoICsgJy1iYWNrdXAnKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXN0b3JlQmFja3VwKGJhY2t1cFBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0geWllbGQgdGhpcy5fZmlsZVN5c3RlbS5jb3B5RGlyZWN0b3J5KGJhY2t1cFBhdGgsIGJhY2t1cFBhdGguc3Vic3RyKDAsIGJhY2t1cFBhdGguaW5kZXhPZignLScpKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2hlY2tOZXdWZXJzaW9uKGxvY2FsUGF0aCwgcmVtb3RlUGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fbmV0d29ya0luZm9ybWF0aW9uLmlzQ29ubmVjdGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZW1vdGVNYW5pZmVzdENvbnRlbnQgPSB5aWVsZCB0aGlzLl9maWxlU3lzdGVtLm9wZW5GaWxlKHJlbW90ZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZU1hbmlmZXN0ID0gSlNPTi5wYXJzZShyZW1vdGVNYW5pZmVzdENvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxNYW5pZmVzdENvbnRlbnQgPSB5aWVsZCB0aGlzLl9maWxlU3lzdGVtLm9wZW5GaWxlKGxvY2FsUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxNYW5pZmVzdCA9IEpTT04ucGFyc2UobG9jYWxNYW5pZmVzdENvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdGVNYW5pZmVzdC52ZXJzaW9uICE9PSB0aGlzLmxvY2FsTWFuaWZlc3QudmVyc2lvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHVwZGF0ZUZpbGVzKHNlcnZlciwgbG9jYWxTdG9yYWdlUGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxldCBsb2NhbEZpbGVzID0gW107XG4gICAgICAgICAgICBsZXQgcmVtb3RlRmlsZXMgPSBbXTtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBmb3IgKGxldCBmaWxlIGluIHRoaXMubG9jYWxNYW5pZmVzdC5maWxlcykge1xuICAgICAgICAgICAgICAgIGxvY2FsRmlsZXMucHVzaCh0aGlzLmxvY2FsTWFuaWZlc3QuZmlsZXNbZmlsZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBpbiB0aGlzLnJlbW90ZU1hbmlmZXN0LmZpbGVzKSB7XG4gICAgICAgICAgICAgICAgcmVtb3RlRmlsZXMucHVzaCh0aGlzLnJlbW90ZU1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBmaWxlc1RvUmVtb3ZlID0gbG9jYWxGaWxlcy5maWx0ZXIoKGxmKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kcyA9IHJlbW90ZUZpbGVzLmZpbHRlcigocmYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJmLmZpbGVuYW1lID09IGxmLmZpbGVuYW1lO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZHMubGVuZ3RoID09IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXNUb1JlbW92ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkIHRoaXMuX2ZpbGVTeXN0ZW0ucmVtb3ZlRmlsZShsb2NhbFN0b3JhZ2VQYXRoICsgJy8nICsgZmlsZXNUb1JlbW92ZVtpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsZXNUb1VwZGF0ZSA9IHJlbW90ZUZpbGVzLmZpbHRlcigocmYpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm91bmRzID0gbG9jYWxGaWxlcy5maWx0ZXIoKGxmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZi5maWxlbmFtZSA9PSBsZi5maWxlbmFtZSAmJiByZi52ZXJzaW9uICE9IGxmLnZlcnNpb247XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kcy5sZW5ndGggPiAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzVG9VcGRhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCB0aGlzLl9maWxlVHJhbnNmZXIuZG93bmxvYWQoc2VydmVyICsgZmlsZXNUb1VwZGF0ZVtpXS5maWxlbmFtZSwgbG9jYWxTdG9yYWdlUGF0aCArICcvJyArIGZpbGVzVG9VcGRhdGVbaV0uZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZpbGVzVG9BZGQgPSByZW1vdGVGaWxlcy5maWx0ZXIoKHJmKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kcyA9IGxvY2FsRmlsZXMuZmlsdGVyKChsZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmYuZmlsZW5hbWUgPT0gbGYuZmlsZW5hbWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kcy5sZW5ndGggPT0gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlc1RvQWRkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5fZmlsZVRyYW5zZmVyLmRvd25sb2FkKHNlcnZlciArIGZpbGVzVG9BZGRbaV0uZmlsZW5hbWUsIGxvY2FsU3RvcmFnZVBhdGggKyAnLycgKyBmaWxlc1RvQWRkW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5jbGFzcyBGaWxlU3lzdGVtU2VydmljZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHRoaXMuX2ZzID0gbmV3IEZpbGVTeXN0ZW1JbXBsKCk7XG4gICAgICAgIHRoaXMuX2Z0ID0gbmV3IEZpbGVUcmFuc2ZlclNlcnZpY2UoKTtcbiAgICB9XG4gICAgb3BlbkZpbGUocGF0aCkge1xuICAgICAgICB0aGlzLnhoci5vcGVuKCdHRVQnLCBwYXRoKTtcbiAgICAgICAgdGhpcy54aHIuc2VuZCgpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy54aHIub25lcnJvciA9IChldikgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdCgnRXJyb3IgZ2V0dGluZyBmaWxlIGZyb20gJyArIHBhdGgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IChldikgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54aHIuc3RhdHVzID09PSAwIHx8IHRoaXMueGhyLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMueGhyLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aGlzLnhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbW92ZUZpbGUocGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnMuZ2V0RmlsZShwYXRoLCB7IGNyZWF0ZTogZmFsc2UsIGV4Y2x1c2l2ZTogZmFsc2UgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGZpbGVFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmaWxlRW50cnkucmVtb3ZlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkb3dubG9hZEZpbGUob3JpZ1BhdGgsIGRlc3RQYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mdC5kb3dubG9hZChvcmlnUGF0aCwgZGVzdFBhdGgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb3B5RmlsZShkaXJlY3RvcnksIGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBlbnRyeS5jb3B5VG8oZGlyZWN0b3J5LCBlbnRyeS5uYW1lLCAoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gMTIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGaWxlKGRpcmVjdG9yeS5mdWxsUGF0aCArIGVudHJ5Lm5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvcHlGaWxlKGRpcmVjdG9yeSwgZW50cnkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb3B5RGlyZWN0b3J5KG9yaWdQYXRoLCBkZXN0UGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxldCBlbnRyaWVzID0geWllbGQgdGhpcy5fZnMuZ2V0RGlyZWN0b3J5RW50cmllcyhvcmlnUGF0aCwgeyBjcmVhdGU6IGZhbHNlLCBleGNsdXNpdmU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgbGV0IGRlc3REaXJlY3RvcnkgPSB5aWVsZCB0aGlzLl9mcy5nZXREaXJlY3RvcnkoZGVzdFBhdGgsIHsgY3JlYXRlOiB0cnVlLCBleGNsdXNpdmU6IGZhbHNlIH0pO1xuICAgICAgICAgICAgaWYgKGVudHJpZXMgJiYgZGVzdERpcmVjdG9yeSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW50cmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW50cnkgPSBlbnRyaWVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB5aWVsZCB0aGlzLmNvcHlEaXJlY3Rvcnkob3JpZ1BhdGggKyAnLycgKyBlbnRyeS5uYW1lLCBkZXN0UGF0aCArICcvJyArIGVudHJ5Lm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHlpZWxkIHRoaXMuY29weUZpbGUoZGVzdERpcmVjdG9yeSwgZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5jbGFzcyBGaWxlVHJhbnNmZXJTZXJ2aWNlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fdHJhbnNmZXIgPSBuZXcgRmlsZVRyYW5zZmVySW1wbCgpO1xuICAgIH1cbiAgICBkb3dubG9hZChzcmMsIHRhcmdldCwgdHJ1c3RBbGxIb3N0cywgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNmZXIuZG93bmxvYWQoc3JjLCB0YXJnZXQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmYWlsKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5jbGFzcyBGaWxlVHJhbnNmZXJJbXBsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZnMgPSBuZXcgRmlsZVN5c3RlbUltcGwoKTtcbiAgICB9XG4gICAgZG93bmxvYWQoc291cmNlLCB0YXJnZXQsIGhlYWRlcnMpIHtcbiAgICAgICAgdmFyIHcgPSB3aW5kb3c7XG4gICAgICAgIHZhciB0cmFuc2ZlciA9IG5ldyB3LkZpbGVUcmFuc2ZlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZnMuZ2V0RmlsZSh0YXJnZXQsIHsgY3JlYXRlOiB0cnVlLCBleGNsdXNpdmU6IGZhbHNlIH0pLnRoZW4oKGZpbGUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdHJhbnNmZXIuZG93bmxvYWQoc291cmNlLCBmaWxlLm5hdGl2ZVVSTCwgKHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2b2lkICgwKSk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5yZW1vdmUoKCkgPT4geyB9LCAoKSA9PiB7IH0pO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSwgaGVhZGVycyk7XG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm9pZCAoMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdm9pZCAoMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmNsYXNzIEZpbGVTeXN0ZW1JbXBsIHtcbiAgICBnZXREaXJlY3RvcnkocGF0aCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RGaWxlU3lzdGVtKExvY2FsRmlsZVN5c3RlbS5QRVJTSVNURU5ULCAwLCAoZmlsZVN5c3RlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGF0aChbcGF0aF0sIGZpbGVTeXN0ZW0ucm9vdCwgb3B0aW9ucykudGhlbigoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGlyZWN0b3J5KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldERpcmVjdG9yeUVudHJpZXMocGF0aCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RGaWxlU3lzdGVtKExvY2FsRmlsZVN5c3RlbS5QRVJTSVNURU5ULCAwLCAoZmlsZVN5c3RlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGF0aChbcGF0aF0sIGZpbGVTeXN0ZW0ucm9vdCwgb3B0aW9ucykudGhlbigoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZWFkZXIgPSBkaXJlY3RvcnkuY3JlYXRlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkRW50cmllcygoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlbnRyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldEZpbGUocGF0aCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RGaWxlU3lzdGVtKExvY2FsRmlsZVN5c3RlbS5QRVJTSVNURU5ULCAwLCAoZmlsZVN5c3RlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBmb2xkZXJzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIHZhciBmaWxlTmFtZSA9IGZvbGRlcnNbZm9sZGVycy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBmb2xkZXJzID0gZm9sZGVycy5zbGljZSgwLCBmb2xkZXJzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGF0aChmb2xkZXJzLCBmaWxlU3lzdGVtLnJvb3QsIG9wdGlvbnMpLnRoZW4oKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcnkuZ2V0RmlsZShmaWxlTmFtZSwgb3B0aW9ucywgKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5jcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRQYXRoKGZvbGRlcnMsIHBhcmVudCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZXRTdWJEaXJlY3RvcnkoZm9sZGVycywgcGFyZW50LCBvcHRpb25zLCAwLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0U3ViRGlyZWN0b3J5KGZvbGRlcnMsIHBhcmVudERpcmVjdG9yeSwgb3B0aW9ucywgaW5kZXgsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoZm9sZGVycy5sZW5ndGggPiBpbmRleCkge1xuICAgICAgICAgICAgcGFyZW50RGlyZWN0b3J5LmdldERpcmVjdG9yeShmb2xkZXJzW2luZGV4XSwgb3B0aW9ucywgKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTdWJEaXJlY3RvcnkoZm9sZGVycywgZGlyZWN0b3J5LCBvcHRpb25zLCBpbmRleCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHBhcmVudERpcmVjdG9yeSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBOZXR3b3JrSW5mb3JtYXRpb25TZXJ2aWNlIHtcbiAgICBnZXQgaXNDb25uZWN0ZWQoKSB7XG4gICAgICAgIGxldCBjb25uZWN0aW9uID0gbmF2aWdhdG9yLmNvbm5lY3Rpb247XG4gICAgICAgIHJldHVybiBjb25uZWN0aW9uLnR5cGUgIT0gXCJOT05FXCIgJiYgY29ubmVjdGlvbi50eXBlICE9IFwibm9uZVwiO1xuICAgIH1cbn1cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgKCkgPT4ge1xuICAgIHZhciBmcyA9IG5ldyBGaWxlU3lzdGVtU2VydmljZSgpO1xuICAgIHZhciBmdCA9IG5ldyBGaWxlVHJhbnNmZXJTZXJ2aWNlKCk7XG4gICAgdmFyIG5pID0gbmV3IE5ldHdvcmtJbmZvcm1hdGlvblNlcnZpY2UoKTtcbiAgICB2YXIgcGFyYW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W21hbmlmZXN0XScpO1xuICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgdmFyIGF1dG91cGRhdGVyID0gbmV3IEF1dG91cGRhdGVyKGZ0LCBmcywgbmksIGNvcmRvdmEuZmlsZS5hcHBsaWNhdGlvbkRpcmVjdG9yeSArICd3d3cnLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdzZXJ2ZXInKSk7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0RmlsZVN5c3RlbSA9IHdpbmRvdy5yZXF1ZXN0RmlsZVN5c3RlbSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEZpbGVTeXN0ZW07XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW0pID0+IHtcbiAgICAgICAgICAgIHZhciBuYXRpdmVVUkwgPSBmaWxlU3lzdGVtLnJvb3QubmF0aXZlVVJMO1xuICAgICAgICAgICAgd2luZG93Lm5hdGl2ZVVSTCA9IG5hdGl2ZVVSTDtcbiAgICAgICAgICAgIGF1dG91cGRhdGVyLmF1dG91cGRhdGUoJ215cycsIHBhcmFtcy5nZXRBdHRyaWJ1dGUoJ21hbmlmZXN0JyksIHBhcmFtcy5nZXRBdHRyaWJ1dGUoJ3NlcnZlcicpICsgJ21hbmlmZXN0Lmpzb24nKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTG9hZCB1cGRhdGVkIEFQSycpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IG5hdGl2ZVVSTCArICdteXMvbXlzLmh0bWwnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2FkIGxvY2FsIEFQSycpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcuL215cy5odG1sJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0sIGZhbHNlKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBhbGV4dml6Y2Fpbm8gb24gMTEvMy8xNi5cbiAqL1xuaW1wb3J0IHtJRmlsZVRyYW5zZmVyLCBJRmlsZVN5c3RlbSwgVHJhY2tlZEZpbGUsIE1hbmlmZXN0LCBOZXR3b3JrSW5mb3JtYXRpb24sIEZpbGVFbnRyeSwgRmlsZVN5c3RlbSwgRGlyZWN0b3J5RW50cnksIEVudHJ5fSBmcm9tIFwiYXV0by11cGRhdGVyXCI7XG5cbmNsYXNzIEF1dG91cGRhdGVye1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZpbGVUcmFuc2ZlcjogSUZpbGVUcmFuc2ZlciwgcHJpdmF0ZSBfZmlsZVN5c3RlbTogSUZpbGVTeXN0ZW0sIHByaXZhdGUgX25ldHdvcmtJbmZvcm1hdGlvbjogTmV0d29ya0luZm9ybWF0aW9uLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3Jvb3REaXJlY3Rvcnk6IHN0cmluZywgcHJpdmF0ZSBfc2VydmVyVXJsOiBzdHJpbmcpe1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBhdXRvdXBkYXRlKGxvY2FsU3RvcmFnZURpcmVjdG9yeTogc3RyaW5nLCBsb2NhbE1hbmlmZXN0UGF0aDogc3RyaW5nLCByZW1vdGVNYW5pZmVzdFBhdGg6IHN0cmluZyk6UHJvbWlzZTx2b2lkPntcbiAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IHRoaXMuY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2UodGhpcy5fcm9vdERpcmVjdG9yeSwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5LCBsb2NhbE1hbmlmZXN0UGF0aCk7XG4gICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLmNoZWNrTmV3VmVyc2lvbihsb2NhbE1hbmlmZXN0UGF0aCwgcmVtb3RlTWFuaWZlc3RQYXRoKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLmRvQmFja3VwKGxvY2FsU3RvcmFnZURpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLnVwZGF0ZUZpbGVzKHRoaXMuX3NlcnZlclVybCwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMucmVzdG9yZUJhY2t1cChsb2NhbFN0b3JhZ2VEaXJlY3RvcnkgKyAnLWJhY2t1cCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlc3RvcmVCYWNrdXAodGhpcy5fcm9vdERpcmVjdG9yeSArICctYmFja3VwJyk7XG4gICAgICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2Uocm9vdERpcmVjdG9yeTogc3RyaW5nLCBsb2NhbFN0b3JhZ2VEaXJlY3Rvcnk6IHN0cmluZywgbG9jYWxNYW5pZmVzdFBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIGxldCBsb2NhbE1hbmlmZXN0Q29udGVudCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0ub3BlbkZpbGUobG9jYWxNYW5pZmVzdFBhdGgpO1xuICAgICAgICBsZXQgbG9jYWxNYW5pZmVzdCA9IDxNYW5pZmVzdD5KU09OLnBhcnNlKGxvY2FsTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgbGV0IGZpbGVzOiBUcmFja2VkRmlsZVtdID0gW107XG5cbiAgICAgICAgZm9yKGxldCBmaWxlIGluIGxvY2FsTWFuaWZlc3QuZmlsZXMpe1xuICAgICAgICAgICAgZmlsZXMucHVzaChsb2NhbE1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLmRvd25sb2FkRmlsZShyb290RGlyZWN0b3J5ICsgJy8nICsgZmlsZXNbaV0uZmlsZW5hbWUsIGxvY2FsU3RvcmFnZURpcmVjdG9yeSArICcvJyArIGZpbGVzW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0uZG93bmxvYWRGaWxlKHJvb3REaXJlY3RvcnkgKyAnL21hbmlmZXN0Lmpzb24nLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkgKyAnL21hbmlmZXN0Lmpzb24nKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZG9CYWNrdXAocGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0uY29weURpcmVjdG9yeShwYXRoLCBwYXRoICsgJy1iYWNrdXAnKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVzdG9yZUJhY2t1cChiYWNrdXBQYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5jb3B5RGlyZWN0b3J5KGJhY2t1cFBhdGgsIGJhY2t1cFBhdGguc3Vic3RyKDAsIGJhY2t1cFBhdGguaW5kZXhPZignLScpKSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbW90ZU1hbmlmZXN0OiBNYW5pZmVzdDtcbiAgICBwdWJsaWMgbG9jYWxNYW5pZmVzdDogTWFuaWZlc3Q7XG5cbiAgICBwdWJsaWMgYXN5bmMgY2hlY2tOZXdWZXJzaW9uKGxvY2FsUGF0aDogc3RyaW5nLCByZW1vdGVQYXRoOiBzdHJpbmcpOlByb21pc2U8Ym9vbGVhbj4ge1xuICAgICAgICBpZighdGhpcy5fbmV0d29ya0luZm9ybWF0aW9uLmlzQ29ubmVjdGVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIGxldCByZW1vdGVNYW5pZmVzdENvbnRlbnQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLm9wZW5GaWxlKHJlbW90ZVBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3RlTWFuaWZlc3QgPSA8TWFuaWZlc3Q+SlNPTi5wYXJzZShyZW1vdGVNYW5pZmVzdENvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGxldCBsb2NhbE1hbmlmZXN0Q29udGVudCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0ub3BlbkZpbGUobG9jYWxQYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsTWFuaWZlc3QgPSA8TWFuaWZlc3Q+SlNPTi5wYXJzZShsb2NhbE1hbmlmZXN0Q29udGVudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB2ZXJzaW9ucyBvZiBtYW5pZmVzdHNcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW1vdGVNYW5pZmVzdC52ZXJzaW9uICE9PSB0aGlzLmxvY2FsTWFuaWZlc3QudmVyc2lvbjtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGVGaWxlcyhzZXJ2ZXI6IHN0cmluZywgbG9jYWxTdG9yYWdlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgbGV0IGxvY2FsRmlsZXM6IFRyYWNrZWRGaWxlW10gPSBbXTtcbiAgICAgICAgbGV0IHJlbW90ZUZpbGVzOiBUcmFja2VkRmlsZVtdID0gW107XG4gICAgICAgIGxldCByZXN1bHQ6IGJvb2xlYW47XG5cbiAgICAgICAgZm9yKGxldCBmaWxlIGluIHRoaXMubG9jYWxNYW5pZmVzdC5maWxlcyl7XG4gICAgICAgICAgICBsb2NhbEZpbGVzLnB1c2godGhpcy5sb2NhbE1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGZpbGUgaW4gdGhpcy5yZW1vdGVNYW5pZmVzdC5maWxlcyl7XG4gICAgICAgICAgICByZW1vdGVGaWxlcy5wdXNoKHRoaXMucmVtb3RlTWFuaWZlc3QuZmlsZXNbZmlsZV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlsZXMgdG8gYmUgcmVtb3ZlZFxuICAgICAgICBsZXQgZmlsZXNUb1JlbW92ZTogVHJhY2tlZEZpbGVbXSA9IGxvY2FsRmlsZXMuZmlsdGVyKChsZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgIGxldCBmb3VuZHMgPSByZW1vdGVGaWxlcy5maWx0ZXIoKHJmOiBUcmFja2VkRmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZi5maWxlbmFtZSA9PSBsZi5maWxlbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kcy5sZW5ndGggPT0gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGVzVG9SZW1vdmUubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5yZW1vdmVGaWxlKGxvY2FsU3RvcmFnZVBhdGggKyAnLycgKyBmaWxlc1RvUmVtb3ZlW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbGVzIHRvIGJlIHVwZGF0ZWRcbiAgICAgICAgbGV0IGZpbGVzVG9VcGRhdGU6IFRyYWNrZWRGaWxlW10gPSByZW1vdGVGaWxlcy5maWx0ZXIoKHJmOiBUcmFja2VkRmlsZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGZvdW5kcyA9IGxvY2FsRmlsZXMuZmlsdGVyKChsZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmYuZmlsZW5hbWUgPT0gbGYuZmlsZW5hbWUgJiYgcmYudmVyc2lvbiAhPSBsZi52ZXJzaW9uO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZm91bmRzLmxlbmd0aCA+IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlc1RvVXBkYXRlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVUcmFuc2Zlci5kb3dubG9hZChzZXJ2ZXIgKyBmaWxlc1RvVXBkYXRlW2ldLmZpbGVuYW1lLCBsb2NhbFN0b3JhZ2VQYXRoICsgJy8nICsgZmlsZXNUb1VwZGF0ZVtpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaWxlcyB0byBiZSBkb3dubG9hZGVkXG4gICAgICAgIGxldCBmaWxlc1RvQWRkOiBUcmFja2VkRmlsZVtdID0gcmVtb3RlRmlsZXMuZmlsdGVyKChyZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgIGxldCBmb3VuZHMgPSBsb2NhbEZpbGVzLmZpbHRlcigobGY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJmLmZpbGVuYW1lID09IGxmLmZpbGVuYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZm91bmRzLmxlbmd0aCA9PSAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZXNUb0FkZC5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlVHJhbnNmZXIuZG93bmxvYWQoc2VydmVyICsgZmlsZXNUb0FkZFtpXS5maWxlbmFtZSwgbG9jYWxTdG9yYWdlUGF0aCArICcvJyArIGZpbGVzVG9BZGRbaV0uZmlsZW5hbWUpO1xuICAgICAgICAgICAgaWYoIXJlc3VsdClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY2xhc3MgRmlsZVN5c3RlbVNlcnZpY2UgaW1wbGVtZW50cyBJRmlsZVN5c3RlbXtcbiAgICBwcml2YXRlIHhocjogWE1MSHR0cFJlcXVlc3Q7XG4gICAgcHJpdmF0ZSBfZnM6IEZpbGVTeXN0ZW1JbXBsO1xuICAgIHByaXZhdGUgX2Z0OiBGaWxlVHJhbnNmZXJTZXJ2aWNlO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgLy90aGlzLnhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsICcqJyk7XG4gICAgICAgIC8vdGhpcy54aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgdGhpcy5fZnMgPSBuZXcgRmlsZVN5c3RlbUltcGwoKTtcbiAgICAgICAgdGhpcy5fZnQgPSBuZXcgRmlsZVRyYW5zZmVyU2VydmljZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcGVuRmlsZShwYXRoOnN0cmluZyk6UHJvbWlzZTxzdHJpbmc+e1xuICAgICAgICB0aGlzLnhoci5vcGVuKCdHRVQnLCBwYXRoKTtcbiAgICAgICAgdGhpcy54aHIuc2VuZCgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnhoci5vbmVycm9yID0gKGV2KSA9PntcbiAgICAgICAgICAgICAgICByZWplY3QoJ0Vycm9yIGdldHRpbmcgZmlsZSBmcm9tICcgKyBwYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qdGhpcy54aHIub25sb2FkID0gKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueGhyLnJlc3BvbnNlID09IG51bGwgfHwgKHRoaXMueGhyLnN0YXR1cyA8IDIwMCB8fCB0aGlzLnhoci5zdGF0dXMgPj0gMzAwKSkge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QodGhpcy54aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnhoci5yZXNwb25zZSk7XG4gICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IChldikgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMueGhyLnJlYWR5U3RhdGUgPT0gNCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy54aHIuc3RhdHVzID09PSAwIHx8IHRoaXMueGhyLnN0YXR1cyA9PT0gMjAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy54aHIucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRoaXMueGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlbW92ZUZpbGUocGF0aDpzdHJpbmcpOlByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9mcy5nZXRGaWxlKHBhdGgsIHtjcmVhdGU6ZmFsc2UsIGV4Y2x1c2l2ZTogZmFsc2V9KVxuICAgICAgICAgICAgICAgIC50aGVuKChmaWxlRW50cnk6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmaWxlRW50cnkucmVtb3ZlKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBkb3dubG9hZEZpbGUob3JpZ1BhdGg6IHN0cmluZywgZGVzdFBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAxLiBDaGVjayBpZiBmaWxlIGV4aXN0cyBpbiBvcmlnaW5cbiAgICAgICAgICogMi4gSWYgbm90LCByZXNvbHZlKGZhbHNlKVxuICAgICAgICAgKiAzLiBFbHNlXG4gICAgICAgICAqIDQuIERvd25sb2FkIGluIGRlc3RpbmF0aW9uIGZvbGRlclxuICAgICAgICAgKi9cblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZnQuZG93bmxvYWQob3JpZ1BhdGgsIGRlc3RQYXRoKVxuICAgICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvcHlGaWxlKGRpcmVjdG9yeTogRGlyZWN0b3J5RW50cnksIGVudHJ5OiBFbnRyeSk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBlbnRyeS5jb3B5VG8oZGlyZWN0b3J5LCBlbnRyeS5uYW1lLCAoZW50cnk6IEVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0sIChlcnJvcjogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZXJyb3IuY29kZSA9PSAxMil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRmlsZShkaXJlY3RvcnkuZnVsbFBhdGggKyBlbnRyeS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb3B5RmlsZShkaXJlY3RvcnksIGVudHJ5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgY29weURpcmVjdG9yeShvcmlnUGF0aDogc3RyaW5nLCBkZXN0UGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgbGV0IGVudHJpZXM6IEVudHJ5W10gPSBhd2FpdCB0aGlzLl9mcy5nZXREaXJlY3RvcnlFbnRyaWVzKG9yaWdQYXRoLCB7Y3JlYXRlOiBmYWxzZSwgZXhjbHVzaXZlOiBmYWxzZX0pO1xuICAgICAgICBsZXQgZGVzdERpcmVjdG9yeTogRGlyZWN0b3J5RW50cnkgPSBhd2FpdCB0aGlzLl9mcy5nZXREaXJlY3RvcnkoZGVzdFBhdGgsIHtjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2V9KTtcbiAgICAgICAgaWYoZW50cmllcyAmJiBkZXN0RGlyZWN0b3J5KXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgZW50cnkgPSBlbnRyaWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGVudHJ5LmlzRGlyZWN0b3J5KXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY29weURpcmVjdG9yeShvcmlnUGF0aCArICcvJyArIGVudHJ5Lm5hbWUsIGRlc3RQYXRoICsgJy8nICsgZW50cnkubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY29weUZpbGUoZGVzdERpcmVjdG9yeSwgZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZGVjbGFyZSB2YXIgTG9jYWxGaWxlU3lzdGVtO1xuZGVjbGFyZSB2YXIgY29yZG92YTtcbmNsYXNzIEZpbGVUcmFuc2ZlclNlcnZpY2UgaW1wbGVtZW50cyBJRmlsZVRyYW5zZmVye1xuICAgIHByaXZhdGUgX3RyYW5zZmVyOiBhbnk7XG4gICAgcHJpdmF0ZSBfc3lzdGVtOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLl90cmFuc2ZlciA9IG5ldyBGaWxlVHJhbnNmZXJJbXBsKCk7XG4gICAgfVxuXG4gICAgZG93bmxvYWQoc3JjOnN0cmluZywgdGFyZ2V0OnN0cmluZywgdHJ1c3RBbGxIb3N0cz86Ym9vbGVhbiwgb3B0aW9ucz86YW55KTpQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT57XG4gICAgICAgICAgICB0aGlzLl90cmFuc2Zlci5kb3dubG9hZChzcmMsIHRhcmdldClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmYWlsKGUpe1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNsYXNzIEZpbGVUcmFuc2ZlckltcGx7XG4gICAgcHJpdmF0ZSBfZnM6IEZpbGVTeXN0ZW1JbXBsO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5fZnMgPSBuZXcgRmlsZVN5c3RlbUltcGwoKTtcbiAgICB9XG4gICAgZG93bmxvYWQoc291cmNlOiBzdHJpbmcsIHRhcmdldDogc3RyaW5nLCBoZWFkZXJzOiBhbnkpOiBQcm9taXNlPHZvaWQ+e1xuICAgICAgICB2YXIgdyA9IDxhbnk+d2luZG93O1xuICAgICAgICB2YXIgdHJhbnNmZXIgPSBuZXcgdy5GaWxlVHJhbnNmZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZzLmdldEZpbGUodGFyZ2V0LCB7Y3JlYXRlOiB0cnVlLCBleGNsdXNpdmU6IGZhbHNlfSkudGhlbigoZmlsZTogYW55KSA9PntcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PntcbiAgICAgICAgICAgICAgICB0cmFuc2Zlci5kb3dubG9hZChzb3VyY2UsIGZpbGUubmF0aXZlVVJMLCAocykgPT57XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodm9pZCgwKSk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+e1xuICAgICAgICAgICAgICAgICAgICBmaWxlLnJlbW92ZSgoKSA9Pnt9LCAoKSA9Pnt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSwgaGVhZGVycyk7XG4gICAgICAgICAgICB9KS50aGVuKCgpID0+e1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkICgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS50aGVuKCgpID0+e1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgKDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jbGFzcyBGaWxlU3lzdGVtSW1wbHtcbiAgICBnZXREaXJlY3RvcnkocGF0aDogc3RyaW5nLCBvcHRpb25zKTogUHJvbWlzZTxEaXJlY3RvcnlFbnRyeT57XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAoPGFueT53aW5kb3cpLnJlcXVlc3RGaWxlU3lzdGVtKExvY2FsRmlsZVN5c3RlbS5QRVJTSVNURU5ULCAwLCAoZmlsZVN5c3RlbTogRmlsZVN5c3RlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGF0aChbcGF0aF0sIGZpbGVTeXN0ZW0ucm9vdCwgb3B0aW9ucykudGhlbigoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldERpcmVjdG9yeUVudHJpZXMocGF0aDogc3RyaW5nLCBvcHRpb25zKTogUHJvbWlzZTxFbnRyeVtdPntcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtOiBGaWxlU3lzdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXRoKFtwYXRoXSwgZmlsZVN5c3RlbS5yb290LCBvcHRpb25zKS50aGVuKChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWFkZXIgPSBkaXJlY3RvcnkuY3JlYXRlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEVudHJpZXMoKGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVudHJpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRGaWxlKHBhdGg6c3RyaW5nLCBvcHRpb25zKTpQcm9taXNlPEZpbGVFbnRyeT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgKDxhbnk+d2luZG93KS5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW06RmlsZVN5c3RlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBmb2xkZXJzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIHZhciBmaWxlTmFtZSA9IGZvbGRlcnNbZm9sZGVycy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBmb2xkZXJzID0gZm9sZGVycy5zbGljZSgwLCBmb2xkZXJzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGF0aChmb2xkZXJzLCBmaWxlU3lzdGVtLnJvb3QsIG9wdGlvbnMpLnRoZW4oKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcnkuZ2V0RmlsZShmaWxlTmFtZSwgb3B0aW9ucywgKGZpbGU6RmlsZUVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9ucy5jcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0UGF0aChmb2xkZXJzOnN0cmluZ1tdLCBwYXJlbnQ6RGlyZWN0b3J5RW50cnksIG9wdGlvbnM6YW55KTpQcm9taXNlPERpcmVjdG9yeUVudHJ5PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxEaXJlY3RvcnlFbnRyeT4oKHJlc29sdmUsIHJlamVjdCkgPT57XG4gICAgICAgICAgICB0aGlzLmdldFN1YkRpcmVjdG9yeShmb2xkZXJzLCBwYXJlbnQsIG9wdGlvbnMsIDAsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFN1YkRpcmVjdG9yeShmb2xkZXJzOiBzdHJpbmdbXSwgcGFyZW50RGlyZWN0b3J5OiBEaXJlY3RvcnlFbnRyeSwgb3B0aW9uczogYW55ICwgaW5kZXg6IG51bWJlciwgcmVzb2x2ZTogKGRlOiBEaXJlY3RvcnlFbnRyeSkgPT4gdm9pZCwgcmVqZWN0OiAoZTogYW55KSA9PiB2b2lkKXtcbiAgICAgICAgaWYoZm9sZGVycy5sZW5ndGggPiBpbmRleCl7XG4gICAgICAgICAgICBwYXJlbnREaXJlY3RvcnkuZ2V0RGlyZWN0b3J5KGZvbGRlcnNbaW5kZXhdLCBvcHRpb25zLCAoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN1YkRpcmVjdG9yeShmb2xkZXJzLCBkaXJlY3RvcnksIG9wdGlvbnMsIGluZGV4LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXNvbHZlKHBhcmVudERpcmVjdG9yeSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNsYXNzIE5ldHdvcmtJbmZvcm1hdGlvblNlcnZpY2UgaW1wbGVtZW50cyBOZXR3b3JrSW5mb3JtYXRpb257XG4gICAgZ2V0IGlzQ29ubmVjdGVkKCk6IGJvb2xlYW57XG4gICAgICAgIGxldCBjb25uZWN0aW9uID0gKDxhbnk+bmF2aWdhdG9yKS5jb25uZWN0aW9uO1xuICAgICAgICByZXR1cm4gY29ubmVjdGlvbi50eXBlICE9IFwiTk9ORVwiICYmIGNvbm5lY3Rpb24udHlwZSAhPSBcIm5vbmVcIjtcbiAgICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgKCkgPT4ge1xuICAgIHZhciBmcyA9IG5ldyBGaWxlU3lzdGVtU2VydmljZSgpO1xuICAgIHZhciBmdCA9IG5ldyBGaWxlVHJhbnNmZXJTZXJ2aWNlKCk7XG4gICAgdmFyIG5pID0gbmV3IE5ldHdvcmtJbmZvcm1hdGlvblNlcnZpY2UoKTtcblxuICAgIHZhciBwYXJhbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzY3JpcHRbbWFuaWZlc3RdJyk7XG4gICAgaWYocGFyYW1zKXtcbiAgICAgICAgdmFyIGF1dG91cGRhdGVyID0gbmV3IEF1dG91cGRhdGVyKGZ0LCBmcywgbmksIGNvcmRvdmEuZmlsZS5hcHBsaWNhdGlvbkRpcmVjdG9yeSArICd3d3cnLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdzZXJ2ZXInKSk7XG4gICAgICAgICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0gPSAoPGFueT53aW5kb3cpLnJlcXVlc3RGaWxlU3lzdGVtIHx8ICg8YW55PndpbmRvdykud2Via2l0UmVxdWVzdEZpbGVTeXN0ZW07XG4gICAgICAgICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtKT0+IHtcbiAgICAgICAgICAgIHZhciBuYXRpdmVVUkwgPSBmaWxlU3lzdGVtLnJvb3QubmF0aXZlVVJMO1xuICAgICAgICAgICAgKDxhbnk+d2luZG93KS5uYXRpdmVVUkwgPSBuYXRpdmVVUkw7XG4gICAgICAgICAgICBhdXRvdXBkYXRlci5hdXRvdXBkYXRlKCdteXMnLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdtYW5pZmVzdCcpLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdzZXJ2ZXInKSArICdtYW5pZmVzdC5qc29uJylcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2FkIHVwZGF0ZWQgQVBLJyk7XG4gICAgICAgICAgICAgICAgICAgICg8YW55PndpbmRvdykubG9jYXRpb24gPSBuYXRpdmVVUkwgKyAnbXlzL215cy5odG1sJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2FkIGxvY2FsIEFQSycpO1xuICAgICAgICAgICAgICAgICAgICAoPGFueT53aW5kb3cpLmxvY2F0aW9uID0gJy4vbXlzLmh0bWwnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICB9KTtcbiAgICB9XG59LCBmYWxzZSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
