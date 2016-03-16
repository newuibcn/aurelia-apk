System.register(["babel-polyfill"], function (_export) {
    "use strict";

    var __awaiter, Autoupdater, FileSystemService, FileTransferService, FileTransferImpl, FileSystemImpl, NetworkInformationService;

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    return {
        setters: [function (_babelPolyfill) {}],
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

            Autoupdater = (function () {
                function Autoupdater(_fileTransfer, _fileSystem, _networkInformation, _rootDirectory, _serverUrl) {
                    _classCallCheck(this, Autoupdater);

                    this._fileTransfer = _fileTransfer;
                    this._fileSystem = _fileSystem;
                    this._networkInformation = _networkInformation;
                    this._rootDirectory = _rootDirectory;
                    this._serverUrl = _serverUrl;
                }

                _createClass(Autoupdater, [{
                    key: "autoupdate",
                    value: function autoupdate(localStorageDirectory, localManifestPath, remoteManifestPath) {
                        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$2$0() {
                            var result;
                            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                                while (1) switch (context$3$0.prev = context$3$0.next) {
                                    case 0:
                                        context$3$0.next = 2;
                                        return this.copyManifestToLocalStorage(this._rootDirectory, localStorageDirectory, localManifestPath);

                                    case 2:
                                        result = context$3$0.sent;

                                        if (!result) {
                                            context$3$0.next = 40;
                                            break;
                                        }

                                        context$3$0.next = 6;
                                        return this.checkNewVersion(localManifestPath, remoteManifestPath);

                                    case 6:
                                        result = context$3$0.sent;

                                        if (!result) {
                                            context$3$0.next = 39;
                                            break;
                                        }

                                        context$3$0.prev = 8;
                                        context$3$0.next = 11;
                                        return this.doBackup(localStorageDirectory);

                                    case 11:
                                        result = context$3$0.sent;

                                        if (!result) {
                                            context$3$0.next = 25;
                                            break;
                                        }

                                        context$3$0.next = 15;
                                        return this.updateFiles(this._serverUrl, localStorageDirectory);

                                    case 15:
                                        result = context$3$0.sent;

                                        if (!result) {
                                            context$3$0.next = 20;
                                            break;
                                        }

                                        return context$3$0.abrupt("return", Promise.resolve());

                                    case 20:
                                        context$3$0.next = 22;
                                        return this.restoreBackup(localStorageDirectory + '-backup');

                                    case 22:
                                        result = context$3$0.sent;

                                        if (!result) {
                                            context$3$0.next = 25;
                                            break;
                                        }

                                        return context$3$0.abrupt("return", Promise.resolve());

                                    case 25:
                                        context$3$0.next = 37;
                                        break;

                                    case 27:
                                        context$3$0.prev = 27;
                                        context$3$0.t0 = context$3$0["catch"](8);
                                        context$3$0.prev = 29;
                                        context$3$0.next = 32;
                                        return this.restoreBackup(this._rootDirectory + '-backup');

                                    case 32:
                                        context$3$0.next = 37;
                                        break;

                                    case 34:
                                        context$3$0.prev = 34;
                                        context$3$0.t1 = context$3$0["catch"](29);
                                        return context$3$0.abrupt("return", Promise.reject(null));

                                    case 37:
                                        context$3$0.next = 40;
                                        break;

                                    case 39:
                                        return context$3$0.abrupt("return", Promise.resolve());

                                    case 40:
                                        return context$3$0.abrupt("return", Promise.reject(null));

                                    case 41:
                                    case "end":
                                        return context$3$0.stop();
                                }
                            }, callee$2$0, this, [[8, 27], [29, 34]]);
                        }));
                    }
                }, {
                    key: "copyManifestToLocalStorage",
                    value: function copyManifestToLocalStorage(rootDirectory, localStorageDirectory, localManifestPath) {
                        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$2$0() {
                            var localManifestContent, localManifest, files, file, result, i;
                            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                                while (1) switch (context$3$0.prev = context$3$0.next) {
                                    case 0:
                                        context$3$0.next = 2;
                                        return this._fileSystem.openFile(localManifestPath);

                                    case 2:
                                        localManifestContent = context$3$0.sent;
                                        localManifest = JSON.parse(localManifestContent);
                                        files = [];

                                        for (file in localManifest.files) {
                                            files.push(localManifest.files[file]);
                                        }
                                        ;
                                        result = undefined;
                                        i = 0;

                                    case 9:
                                        if (!(i < files.length)) {
                                            context$3$0.next = 18;
                                            break;
                                        }

                                        context$3$0.next = 12;
                                        return this._fileSystem.downloadFile(rootDirectory + '/' + files[i].filename, localStorageDirectory + '/' + files[i].filename);

                                    case 12:
                                        result = context$3$0.sent;

                                        if (result) {
                                            context$3$0.next = 15;
                                            break;
                                        }

                                        return context$3$0.abrupt("return", result);

                                    case 15:
                                        i++;
                                        context$3$0.next = 9;
                                        break;

                                    case 18:
                                        context$3$0.next = 20;
                                        return this._fileSystem.downloadFile(rootDirectory + '/manifest.json', localStorageDirectory + '/manifest.json');

                                    case 20:
                                        result = context$3$0.sent;
                                        return context$3$0.abrupt("return", result);

                                    case 22:
                                    case "end":
                                        return context$3$0.stop();
                                }
                            }, callee$2$0, this);
                        }));
                    }
                }, {
                    key: "doBackup",
                    value: function doBackup(path) {
                        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$2$0() {
                            var result;
                            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                                while (1) switch (context$3$0.prev = context$3$0.next) {
                                    case 0:
                                        context$3$0.next = 2;
                                        return this._fileSystem.copyDirectory(path, path + '-backup');

                                    case 2:
                                        result = context$3$0.sent;
                                        return context$3$0.abrupt("return", result);

                                    case 4:
                                    case "end":
                                        return context$3$0.stop();
                                }
                            }, callee$2$0, this);
                        }));
                    }
                }, {
                    key: "restoreBackup",
                    value: function restoreBackup(backupPath) {
                        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$2$0() {
                            var result;
                            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                                while (1) switch (context$3$0.prev = context$3$0.next) {
                                    case 0:
                                        context$3$0.next = 2;
                                        return this._fileSystem.copyDirectory(backupPath, backupPath.substr(0, backupPath.indexOf('-')));

                                    case 2:
                                        result = context$3$0.sent;
                                        return context$3$0.abrupt("return", result);

                                    case 4:
                                    case "end":
                                        return context$3$0.stop();
                                }
                            }, callee$2$0, this);
                        }));
                    }
                }, {
                    key: "checkNewVersion",
                    value: function checkNewVersion(localPath, remotePath) {
                        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$2$0() {
                            var remoteManifestContent, localManifestContent;
                            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                                while (1) switch (context$3$0.prev = context$3$0.next) {
                                    case 0:
                                        if (this._networkInformation.isConnected) {
                                            context$3$0.next = 4;
                                            break;
                                        }

                                        return context$3$0.abrupt("return", false);

                                    case 4:
                                        context$3$0.prev = 4;
                                        context$3$0.next = 7;
                                        return this._fileSystem.openFile(remotePath);

                                    case 7:
                                        remoteManifestContent = context$3$0.sent;

                                        this.remoteManifest = JSON.parse(remoteManifestContent);
                                        context$3$0.next = 11;
                                        return this._fileSystem.openFile(localPath);

                                    case 11:
                                        localManifestContent = context$3$0.sent;

                                        this.localManifest = JSON.parse(localManifestContent);
                                        return context$3$0.abrupt("return", this.remoteManifest.version !== this.localManifest.version);

                                    case 16:
                                        context$3$0.prev = 16;
                                        context$3$0.t0 = context$3$0["catch"](4);
                                        return context$3$0.abrupt("return", false);

                                    case 19:
                                    case "end":
                                        return context$3$0.stop();
                                }
                            }, callee$2$0, this, [[4, 16]]);
                        }));
                    }
                }, {
                    key: "updateFiles",
                    value: function updateFiles(server, localStoragePath) {
                        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$2$0() {
                            var localFiles, remoteFiles, result, file, filesToRemove, i, filesToUpdate, filesToAdd;
                            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                                while (1) switch (context$3$0.prev = context$3$0.next) {
                                    case 0:
                                        localFiles = [];
                                        remoteFiles = [];
                                        result = undefined;

                                        for (file in this.localManifest.files) {
                                            localFiles.push(this.localManifest.files[file]);
                                        }
                                        for (file in this.remoteManifest.files) {
                                            remoteFiles.push(this.remoteManifest.files[file]);
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
                                            context$3$0.next = 16;
                                            break;
                                        }

                                        context$3$0.next = 10;
                                        return this._fileSystem.removeFile(localStoragePath + '/' + filesToRemove[i].filename);

                                    case 10:
                                        result = context$3$0.sent;

                                        if (result) {
                                            context$3$0.next = 13;
                                            break;
                                        }

                                        return context$3$0.abrupt("return", result);

                                    case 13:
                                        i++;
                                        context$3$0.next = 7;
                                        break;

                                    case 16:
                                        filesToUpdate = remoteFiles.filter(function (rf) {
                                            var founds = localFiles.filter(function (lf) {
                                                return rf.filename == lf.filename && rf.version != lf.version;
                                            });
                                            return founds.length > 0;
                                        });
                                        i = 0;

                                    case 18:
                                        if (!(i < filesToUpdate.length)) {
                                            context$3$0.next = 27;
                                            break;
                                        }

                                        context$3$0.next = 21;
                                        return this._fileTransfer.download(server + filesToUpdate[i].filename, localStoragePath + '/' + filesToUpdate[i].filename);

                                    case 21:
                                        result = context$3$0.sent;

                                        if (result) {
                                            context$3$0.next = 24;
                                            break;
                                        }

                                        return context$3$0.abrupt("return", result);

                                    case 24:
                                        i++;
                                        context$3$0.next = 18;
                                        break;

                                    case 27:
                                        filesToAdd = remoteFiles.filter(function (rf) {
                                            var founds = localFiles.filter(function (lf) {
                                                return rf.filename == lf.filename;
                                            });
                                            return founds.length == 0;
                                        });
                                        i = 0;

                                    case 29:
                                        if (!(i < filesToAdd.length)) {
                                            context$3$0.next = 38;
                                            break;
                                        }

                                        context$3$0.next = 32;
                                        return this._fileTransfer.download(server + filesToAdd[i].filename, localStoragePath + '/' + filesToAdd[i].filename);

                                    case 32:
                                        result = context$3$0.sent;

                                        if (result) {
                                            context$3$0.next = 35;
                                            break;
                                        }

                                        return context$3$0.abrupt("return", result);

                                    case 35:
                                        i++;
                                        context$3$0.next = 29;
                                        break;

                                    case 38:
                                        return context$3$0.abrupt("return", true);

                                    case 39:
                                    case "end":
                                        return context$3$0.stop();
                                }
                            }, callee$2$0, this);
                        }));
                    }
                }]);

                return Autoupdater;
            })();

            FileSystemService = (function () {
                function FileSystemService() {
                    _classCallCheck(this, FileSystemService);

                    this.xhr = new XMLHttpRequest();
                    this._fs = new FileSystemImpl();
                    this._ft = new FileTransferService();
                }

                _createClass(FileSystemService, [{
                    key: "openFile",
                    value: function openFile(path) {
                        var _this = this;

                        this.xhr.open('GET', path);
                        this.xhr.send();
                        return new Promise(function (resolve, reject) {
                            _this.xhr.onerror = function (ev) {
                                reject('Error getting file from ' + path);
                            };
                            _this.xhr.onload = function (ev) {
                                if (_this.xhr.status < 200 || _this.xhr.status >= 300) {
                                    reject(_this.xhr.responseText);
                                }
                                resolve(_this.xhr.response);
                            };
                        });
                    }
                }, {
                    key: "removeFile",
                    value: function removeFile(path) {
                        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$2$0() {
                            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                                var _this2 = this;

                                while (1) switch (context$3$0.prev = context$3$0.next) {
                                    case 0:
                                        return context$3$0.abrupt("return", new Promise(function (resolve, reject) {
                                            _this2._fs.getFile(path, { create: false, exclusive: false }).then(function (fileEntry) {
                                                fileEntry.remove(function () {
                                                    resolve(true);
                                                }, function (e) {
                                                    resolve(false);
                                                });
                                            })["catch"](function (e) {
                                                resolve(false);
                                            });
                                        }));

                                    case 1:
                                    case "end":
                                        return context$3$0.stop();
                                }
                            }, callee$2$0, this);
                        }));
                    }
                }, {
                    key: "downloadFile",
                    value: function downloadFile(origPath, destPath) {
                        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$2$0() {
                            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                                var _this3 = this;

                                while (1) switch (context$3$0.prev = context$3$0.next) {
                                    case 0:
                                        return context$3$0.abrupt("return", new Promise(function (resolve, reject) {
                                            _this3._ft.download(origPath, destPath).then(function (r) {
                                                resolve(r);
                                            })["catch"](function (e) {
                                                resolve(false);
                                            });
                                        }));

                                    case 1:
                                    case "end":
                                        return context$3$0.stop();
                                }
                            }, callee$2$0, this);
                        }));
                    }
                }, {
                    key: "copyFile",
                    value: function copyFile(directory, entry) {
                        return new Promise(function (resolve, reject) {
                            entry.copyTo(directory, entry.name, function (entry) {
                                resolve(true);
                            }, function (error) {
                                resolve(false);
                            });
                        });
                    }
                }, {
                    key: "copyDirectory",
                    value: function copyDirectory(origPath, destPath) {
                        return __awaiter(this, void 0, Promise, regeneratorRuntime.mark(function callee$2$0() {
                            var entries, destDirectory, i, entry, result;
                            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                                while (1) switch (context$3$0.prev = context$3$0.next) {
                                    case 0:
                                        context$3$0.next = 2;
                                        return this._fs.getDirectoryEntries(origPath, { create: false, exclusive: false });

                                    case 2:
                                        entries = context$3$0.sent;
                                        context$3$0.next = 5;
                                        return this._fs.getDirectory(destPath, { create: true, exclusive: false });

                                    case 5:
                                        destDirectory = context$3$0.sent;

                                        if (!(entries && destDirectory)) {
                                            context$3$0.next = 29;
                                            break;
                                        }

                                        i = 0;

                                    case 8:
                                        if (!(i < entries.length)) {
                                            context$3$0.next = 26;
                                            break;
                                        }

                                        entry = entries[i];

                                        if (!entry.isDirectory) {
                                            context$3$0.next = 18;
                                            break;
                                        }

                                        context$3$0.next = 13;
                                        return this.copyDirectory(origPath + '/' + entry.name, destPath + '/' + entry.name);

                                    case 13:
                                        result = context$3$0.sent;

                                        if (result) {
                                            context$3$0.next = 16;
                                            break;
                                        }

                                        return context$3$0.abrupt("return", false);

                                    case 16:
                                        context$3$0.next = 23;
                                        break;

                                    case 18:
                                        context$3$0.next = 20;
                                        return this.copyFile(destDirectory, entry);

                                    case 20:
                                        result = context$3$0.sent;

                                        if (result) {
                                            context$3$0.next = 23;
                                            break;
                                        }

                                        return context$3$0.abrupt("return", false);

                                    case 23:
                                        i++;
                                        context$3$0.next = 8;
                                        break;

                                    case 26:
                                        return context$3$0.abrupt("return", true);

                                    case 29:
                                        return context$3$0.abrupt("return", false);

                                    case 30:
                                    case "end":
                                        return context$3$0.stop();
                                }
                            }, callee$2$0, this);
                        }));
                    }
                }]);

                return FileSystemService;
            })();

            FileTransferService = (function () {
                function FileTransferService() {
                    _classCallCheck(this, FileTransferService);

                    this._transfer = new FileTransferImpl();
                }

                _createClass(FileTransferService, [{
                    key: "download",
                    value: function download(src, target, trustAllHosts, options) {
                        var _this4 = this;

                        return new Promise(function (resolve, reject) {
                            _this4._transfer.download(src, target).then(function () {
                                resolve(true);
                            })["catch"](function (e) {
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
            })();

            FileTransferImpl = (function () {
                function FileTransferImpl() {
                    _classCallCheck(this, FileTransferImpl);

                    this._fs = new FileSystemImpl();
                }

                _createClass(FileTransferImpl, [{
                    key: "download",
                    value: function download(source, target, headers) {
                        var w = window;
                        var transfer = new w.FileTransfer();
                        return this._fs.getFile(target, { create: true, exclusive: false }).then(function (file) {
                            return new Promise(function (resolve, reject) {
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
            })();

            FileSystemImpl = (function () {
                function FileSystemImpl() {
                    _classCallCheck(this, FileSystemImpl);
                }

                _createClass(FileSystemImpl, [{
                    key: "getDirectory",
                    value: function getDirectory(path, options) {
                        var _this5 = this;

                        return new Promise(function (resolve, reject) {
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                                _this5.getPath([path], fileSystem.root, options).then(function (directory) {
                                    resolve(directory);
                                })["catch"](function (error) {
                                    resolve(null);
                                });
                            });
                        });
                    }
                }, {
                    key: "getDirectoryEntries",
                    value: function getDirectoryEntries(path, options) {
                        var _this6 = this;

                        return new Promise(function (resolve, reject) {
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                                _this6.getPath([path], fileSystem.root, options).then(function (directory) {
                                    var reader = directory.createReader();
                                    reader.readEntries(function (entries) {
                                        resolve(entries);
                                    }, function (error) {
                                        resolve(null);
                                    });
                                })["catch"](function (error) {
                                    resolve(null);
                                });
                            });
                        });
                    }
                }, {
                    key: "getFile",
                    value: function getFile(path, options) {
                        var _this7 = this;

                        return new Promise(function (resolve, reject) {
                            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                                var folders = path.split('/');
                                var fileName = folders[folders.length - 1];
                                folders = folders.slice(0, folders.length - 1);
                                _this7.getPath(folders, fileSystem.root, options).then(function (directory) {
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
                        var _this8 = this;

                        return new Promise(function (resolve, reject) {
                            _this8.getSubDirectory(folders, parent, options, 0, resolve, reject);
                        });
                    }
                }, {
                    key: "getSubDirectory",
                    value: function getSubDirectory(folders, parentDirectory, options, index, resolve, reject) {
                        var _this9 = this;

                        if (folders.length > index) {
                            parentDirectory.getDirectory(folders[index], options, function (directory) {
                                index++;
                                _this9.getSubDirectory(folders, directory, options, index, resolve, reject);
                            }, function (error) {
                                reject(error);
                            });
                        } else {
                            resolve(parentDirectory);
                        }
                    }
                }]);

                return FileSystemImpl;
            })();

            NetworkInformationService = (function () {
                function NetworkInformationService() {
                    _classCallCheck(this, NetworkInformationService);
                }

                _createClass(NetworkInformationService, [{
                    key: "isConnected",
                    get: function get() {
                        var connection = navigator.connection;
                        return connection.type != "NONE" && connection.type != "none";
                    }
                }]);

                return NetworkInformationService;
            })();

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
                        })["catch"](function () {
                            console.log('Load local APK');
                            window.location = './mys.html';
                        });
                    }, function (e) {
                        console.log(e);
                    });
                }
            }, false);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvY29yZG92YS9hdXRvLXVwZGF0ZS5qcyIsImNvcmUvY29yZG92YS9hdXRvLXVwZGF0ZS50cyJdLCJuYW1lcyI6WyJBdXRvdXBkYXRlciIsIkF1dG91cGRhdGVyLmNvbnN0cnVjdG9yIiwiQXV0b3VwZGF0ZXIuYXV0b3VwZGF0ZSIsIkF1dG91cGRhdGVyLmNvcHlNYW5pZmVzdFRvTG9jYWxTdG9yYWdlIiwiQXV0b3VwZGF0ZXIuZG9CYWNrdXAiLCJBdXRvdXBkYXRlci5yZXN0b3JlQmFja3VwIiwiQXV0b3VwZGF0ZXIuY2hlY2tOZXdWZXJzaW9uIiwiQXV0b3VwZGF0ZXIudXBkYXRlRmlsZXMiLCJGaWxlU3lzdGVtU2VydmljZSIsIkZpbGVTeXN0ZW1TZXJ2aWNlLmNvbnN0cnVjdG9yIiwiRmlsZVN5c3RlbVNlcnZpY2Uub3BlbkZpbGUiLCJGaWxlU3lzdGVtU2VydmljZS5yZW1vdmVGaWxlIiwiRmlsZVN5c3RlbVNlcnZpY2UuZG93bmxvYWRGaWxlIiwiRmlsZVN5c3RlbVNlcnZpY2UuY29weUZpbGUiLCJGaWxlU3lzdGVtU2VydmljZS5jb3B5RGlyZWN0b3J5IiwiRmlsZVRyYW5zZmVyU2VydmljZSIsIkZpbGVUcmFuc2ZlclNlcnZpY2UuY29uc3RydWN0b3IiLCJGaWxlVHJhbnNmZXJTZXJ2aWNlLmRvd25sb2FkIiwiRmlsZVRyYW5zZmVyU2VydmljZS5mYWlsIiwiRmlsZVRyYW5zZmVySW1wbCIsIkZpbGVUcmFuc2ZlckltcGwuY29uc3RydWN0b3IiLCJGaWxlVHJhbnNmZXJJbXBsLmRvd25sb2FkIiwiRmlsZVN5c3RlbUltcGwiLCJGaWxlU3lzdGVtSW1wbC5nZXREaXJlY3RvcnkiLCJGaWxlU3lzdGVtSW1wbC5nZXREaXJlY3RvcnlFbnRyaWVzIiwiRmlsZVN5c3RlbUltcGwuZ2V0RmlsZSIsIkZpbGVTeXN0ZW1JbXBsLmdldFBhdGgiLCJGaWxlU3lzdGVtSW1wbC5nZXRTdWJEaXJlY3RvcnkiLCJOZXR3b3JrSW5mb3JtYXRpb25TZXJ2aWNl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QkFDVCxFQUFFLFVBQUMsQ0FBQyxFQUFBO0FBQ0QsK0JBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7cUJBQ2pCLENBQUMsQ0FBQztpQkFDTjthQUNKLEVBQUUsS0FBSyxDQUFDLENBQUMiLCJmaWxlIjoiY29yZS9jb3Jkb3ZhL2F1dG8tdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgIGZ1bmN0aW9uIG9uZnVsZmlsbCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKHZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RlcChcIm5leHRcIiwgdm9pZCAwKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJztcbmNsYXNzIEF1dG91cGRhdGVyIHtcbiAgICBjb25zdHJ1Y3RvcihfZmlsZVRyYW5zZmVyLCBfZmlsZVN5c3RlbSwgX25ldHdvcmtJbmZvcm1hdGlvbiwgX3Jvb3REaXJlY3RvcnksIF9zZXJ2ZXJVcmwpIHtcbiAgICAgICAgdGhpcy5fZmlsZVRyYW5zZmVyID0gX2ZpbGVUcmFuc2ZlcjtcbiAgICAgICAgdGhpcy5fZmlsZVN5c3RlbSA9IF9maWxlU3lzdGVtO1xuICAgICAgICB0aGlzLl9uZXR3b3JrSW5mb3JtYXRpb24gPSBfbmV0d29ya0luZm9ybWF0aW9uO1xuICAgICAgICB0aGlzLl9yb290RGlyZWN0b3J5ID0gX3Jvb3REaXJlY3Rvcnk7XG4gICAgICAgIHRoaXMuX3NlcnZlclVybCA9IF9zZXJ2ZXJVcmw7XG4gICAgfVxuICAgIGF1dG91cGRhdGUobG9jYWxTdG9yYWdlRGlyZWN0b3J5LCBsb2NhbE1hbmlmZXN0UGF0aCwgcmVtb3RlTWFuaWZlc3RQYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHlpZWxkIHRoaXMuY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2UodGhpcy5fcm9vdERpcmVjdG9yeSwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5LCBsb2NhbE1hbmlmZXN0UGF0aCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5jaGVja05ld1ZlcnNpb24obG9jYWxNYW5pZmVzdFBhdGgsIHJlbW90ZU1hbmlmZXN0UGF0aCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5kb0JhY2t1cChsb2NhbFN0b3JhZ2VEaXJlY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkIHRoaXMudXBkYXRlRmlsZXModGhpcy5fc2VydmVyVXJsLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5yZXN0b3JlQmFja3VwKGxvY2FsU3RvcmFnZURpcmVjdG9yeSArICctYmFja3VwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMucmVzdG9yZUJhY2t1cCh0aGlzLl9yb290RGlyZWN0b3J5ICsgJy1iYWNrdXAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2Uocm9vdERpcmVjdG9yeSwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5LCBsb2NhbE1hbmlmZXN0UGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxldCBsb2NhbE1hbmlmZXN0Q29udGVudCA9IHlpZWxkIHRoaXMuX2ZpbGVTeXN0ZW0ub3BlbkZpbGUobG9jYWxNYW5pZmVzdFBhdGgpO1xuICAgICAgICAgICAgbGV0IGxvY2FsTWFuaWZlc3QgPSBKU09OLnBhcnNlKGxvY2FsTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgICAgIGxldCBmaWxlcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBpbiBsb2NhbE1hbmlmZXN0LmZpbGVzKSB7XG4gICAgICAgICAgICAgICAgZmlsZXMucHVzaChsb2NhbE1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5fZmlsZVN5c3RlbS5kb3dubG9hZEZpbGUocm9vdERpcmVjdG9yeSArICcvJyArIGZpbGVzW2ldLmZpbGVuYW1lLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkgKyAnLycgKyBmaWxlc1tpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgPSB5aWVsZCB0aGlzLl9maWxlU3lzdGVtLmRvd25sb2FkRmlsZShyb290RGlyZWN0b3J5ICsgJy9tYW5pZmVzdC5qc29uJywgbG9jYWxTdG9yYWdlRGlyZWN0b3J5ICsgJy9tYW5pZmVzdC5qc29uJyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZG9CYWNrdXAocGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB5aWVsZCB0aGlzLl9maWxlU3lzdGVtLmNvcHlEaXJlY3RvcnkocGF0aCwgcGF0aCArICctYmFja3VwJyk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmVzdG9yZUJhY2t1cChiYWNrdXBQYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHlpZWxkIHRoaXMuX2ZpbGVTeXN0ZW0uY29weURpcmVjdG9yeShiYWNrdXBQYXRoLCBiYWNrdXBQYXRoLnN1YnN0cigwLCBiYWNrdXBQYXRoLmluZGV4T2YoJy0nKSkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNoZWNrTmV3VmVyc2lvbihsb2NhbFBhdGgsIHJlbW90ZVBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX25ldHdvcmtJbmZvcm1hdGlvbi5pc0Nvbm5lY3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVtb3RlTWFuaWZlc3RDb250ZW50ID0geWllbGQgdGhpcy5fZmlsZVN5c3RlbS5vcGVuRmlsZShyZW1vdGVQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVNYW5pZmVzdCA9IEpTT04ucGFyc2UocmVtb3RlTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsTWFuaWZlc3RDb250ZW50ID0geWllbGQgdGhpcy5fZmlsZVN5c3RlbS5vcGVuRmlsZShsb2NhbFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvY2FsTWFuaWZlc3QgPSBKU09OLnBhcnNlKGxvY2FsTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3RlTWFuaWZlc3QudmVyc2lvbiAhPT0gdGhpcy5sb2NhbE1hbmlmZXN0LnZlcnNpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGVGaWxlcyhzZXJ2ZXIsIGxvY2FsU3RvcmFnZVBhdGgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBsZXQgbG9jYWxGaWxlcyA9IFtdO1xuICAgICAgICAgICAgbGV0IHJlbW90ZUZpbGVzID0gW107XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgZm9yIChsZXQgZmlsZSBpbiB0aGlzLmxvY2FsTWFuaWZlc3QuZmlsZXMpIHtcbiAgICAgICAgICAgICAgICBsb2NhbEZpbGVzLnB1c2godGhpcy5sb2NhbE1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGZpbGUgaW4gdGhpcy5yZW1vdGVNYW5pZmVzdC5maWxlcykge1xuICAgICAgICAgICAgICAgIHJlbW90ZUZpbGVzLnB1c2godGhpcy5yZW1vdGVNYW5pZmVzdC5maWxlc1tmaWxlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsZXNUb1JlbW92ZSA9IGxvY2FsRmlsZXMuZmlsdGVyKChsZikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb3VuZHMgPSByZW1vdGVGaWxlcy5maWx0ZXIoKHJmKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZi5maWxlbmFtZSA9PSBsZi5maWxlbmFtZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmRzLmxlbmd0aCA9PSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzVG9SZW1vdmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB5aWVsZCB0aGlzLl9maWxlU3lzdGVtLnJlbW92ZUZpbGUobG9jYWxTdG9yYWdlUGF0aCArICcvJyArIGZpbGVzVG9SZW1vdmVbaV0uZmlsZW5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZpbGVzVG9VcGRhdGUgPSByZW1vdGVGaWxlcy5maWx0ZXIoKHJmKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kcyA9IGxvY2FsRmlsZXMuZmlsdGVyKChsZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmYuZmlsZW5hbWUgPT0gbGYuZmlsZW5hbWUgJiYgcmYudmVyc2lvbiAhPSBsZi52ZXJzaW9uO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZHMubGVuZ3RoID4gMDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlc1RvVXBkYXRlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgdGhpcy5fZmlsZVRyYW5zZmVyLmRvd25sb2FkKHNlcnZlciArIGZpbGVzVG9VcGRhdGVbaV0uZmlsZW5hbWUsIGxvY2FsU3RvcmFnZVBhdGggKyAnLycgKyBmaWxlc1RvVXBkYXRlW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBmaWxlc1RvQWRkID0gcmVtb3RlRmlsZXMuZmlsdGVyKChyZikgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBmb3VuZHMgPSBsb2NhbEZpbGVzLmZpbHRlcigobGYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJmLmZpbGVuYW1lID09IGxmLmZpbGVuYW1lO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZHMubGVuZ3RoID09IDA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXNUb0FkZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkIHRoaXMuX2ZpbGVUcmFuc2Zlci5kb3dubG9hZChzZXJ2ZXIgKyBmaWxlc1RvQWRkW2ldLmZpbGVuYW1lLCBsb2NhbFN0b3JhZ2VQYXRoICsgJy8nICsgZmlsZXNUb0FkZFtpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuY2xhc3MgRmlsZVN5c3RlbVNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB0aGlzLl9mcyA9IG5ldyBGaWxlU3lzdGVtSW1wbCgpO1xuICAgICAgICB0aGlzLl9mdCA9IG5ldyBGaWxlVHJhbnNmZXJTZXJ2aWNlKCk7XG4gICAgfVxuICAgIG9wZW5GaWxlKHBhdGgpIHtcbiAgICAgICAgdGhpcy54aHIub3BlbignR0VUJywgcGF0aCk7XG4gICAgICAgIHRoaXMueGhyLnNlbmQoKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMueGhyLm9uZXJyb3IgPSAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoJ0Vycm9yIGdldHRpbmcgZmlsZSBmcm9tICcgKyBwYXRoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnhoci5vbmxvYWQgPSAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy54aHIuc3RhdHVzIDwgMjAwIHx8IHRoaXMueGhyLnN0YXR1cyA+PSAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRoaXMueGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy54aHIucmVzcG9uc2UpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJlbW92ZUZpbGUocGF0aCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnMuZ2V0RmlsZShwYXRoLCB7IGNyZWF0ZTogZmFsc2UsIGV4Y2x1c2l2ZTogZmFsc2UgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGZpbGVFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmaWxlRW50cnkucmVtb3ZlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkb3dubG9hZEZpbGUob3JpZ1BhdGgsIGRlc3RQYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mdC5kb3dubG9hZChvcmlnUGF0aCwgZGVzdFBhdGgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb3B5RmlsZShkaXJlY3RvcnksIGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBlbnRyeS5jb3B5VG8oZGlyZWN0b3J5LCBlbnRyeS5uYW1lLCAoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvcHlEaXJlY3Rvcnkob3JpZ1BhdGgsIGRlc3RQYXRoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgbGV0IGVudHJpZXMgPSB5aWVsZCB0aGlzLl9mcy5nZXREaXJlY3RvcnlFbnRyaWVzKG9yaWdQYXRoLCB7IGNyZWF0ZTogZmFsc2UsIGV4Y2x1c2l2ZTogZmFsc2UgfSk7XG4gICAgICAgICAgICBsZXQgZGVzdERpcmVjdG9yeSA9IHlpZWxkIHRoaXMuX2ZzLmdldERpcmVjdG9yeShkZXN0UGF0aCwgeyBjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2UgfSk7XG4gICAgICAgICAgICBpZiAoZW50cmllcyAmJiBkZXN0RGlyZWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbnRyeSA9IGVudHJpZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0RpcmVjdG9yeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHlpZWxkIHRoaXMuY29weURpcmVjdG9yeShvcmlnUGF0aCArICcvJyArIGVudHJ5Lm5hbWUsIGRlc3RQYXRoICsgJy8nICsgZW50cnkubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0geWllbGQgdGhpcy5jb3B5RmlsZShkZXN0RGlyZWN0b3J5LCBlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmNsYXNzIEZpbGVUcmFuc2ZlclNlcnZpY2Uge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl90cmFuc2ZlciA9IG5ldyBGaWxlVHJhbnNmZXJJbXBsKCk7XG4gICAgfVxuICAgIGRvd25sb2FkKHNyYywgdGFyZ2V0LCB0cnVzdEFsbEhvc3RzLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2Zlci5kb3dubG9hZChzcmMsIHRhcmdldClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZhaWwoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmNsYXNzIEZpbGVUcmFuc2ZlckltcGwge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9mcyA9IG5ldyBGaWxlU3lzdGVtSW1wbCgpO1xuICAgIH1cbiAgICBkb3dubG9hZChzb3VyY2UsIHRhcmdldCwgaGVhZGVycykge1xuICAgICAgICB2YXIgdyA9IHdpbmRvdztcbiAgICAgICAgdmFyIHRyYW5zZmVyID0gbmV3IHcuRmlsZVRyYW5zZmVyKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9mcy5nZXRGaWxlKHRhcmdldCwgeyBjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2UgfSkudGhlbigoZmlsZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zlci5kb3dubG9hZChzb3VyY2UsIGZpbGUubmF0aXZlVVJMLCAocykgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZvaWQgKDApKTtcbiAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBmaWxlLnJlbW92ZSgoKSA9PiB7IH0sICgpID0+IHsgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9LCB0cnVlLCBoZWFkZXJzKTtcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkICgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2b2lkICgwKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuY2xhc3MgRmlsZVN5c3RlbUltcGwge1xuICAgIGdldERpcmVjdG9yeShwYXRoLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXRoKFtwYXRoXSwgZmlsZVN5c3RlbS5yb290LCBvcHRpb25zKS50aGVuKChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkaXJlY3RvcnkpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0RGlyZWN0b3J5RW50cmllcyhwYXRoLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXRoKFtwYXRoXSwgZmlsZVN5c3RlbS5yb290LCBvcHRpb25zKS50aGVuKChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlYWRlciA9IGRpcmVjdG9yeS5jcmVhdGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRFbnRyaWVzKChlbnRyaWVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVudHJpZXMpO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0RmlsZShwYXRoLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGZvbGRlcnMgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGVOYW1lID0gZm9sZGVyc1tmb2xkZXJzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGZvbGRlcnMgPSBmb2xkZXJzLnNsaWNlKDAsIGZvbGRlcnMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXRoKGZvbGRlcnMsIGZpbGVTeXN0ZW0ucm9vdCwgb3B0aW9ucykudGhlbigoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yeS5nZXRGaWxlKGZpbGVOYW1lLCBvcHRpb25zLCAoZmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldFBhdGgoZm9sZGVycywgcGFyZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmdldFN1YkRpcmVjdG9yeShmb2xkZXJzLCBwYXJlbnQsIG9wdGlvbnMsIDAsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRTdWJEaXJlY3RvcnkoZm9sZGVycywgcGFyZW50RGlyZWN0b3J5LCBvcHRpb25zLCBpbmRleCwgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmIChmb2xkZXJzLmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICAgICAgICBwYXJlbnREaXJlY3RvcnkuZ2V0RGlyZWN0b3J5KGZvbGRlcnNbaW5kZXhdLCBvcHRpb25zLCAoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN1YkRpcmVjdG9yeShmb2xkZXJzLCBkaXJlY3RvcnksIG9wdGlvbnMsIGluZGV4LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUocGFyZW50RGlyZWN0b3J5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNsYXNzIE5ldHdvcmtJbmZvcm1hdGlvblNlcnZpY2Uge1xuICAgIGdldCBpc0Nvbm5lY3RlZCgpIHtcbiAgICAgICAgbGV0IGNvbm5lY3Rpb24gPSBuYXZpZ2F0b3IuY29ubmVjdGlvbjtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24udHlwZSAhPSBcIk5PTkVcIiAmJiBjb25uZWN0aW9uLnR5cGUgIT0gXCJub25lXCI7XG4gICAgfVxufVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlcmVhZHknLCAoKSA9PiB7XG4gICAgdmFyIGZzID0gbmV3IEZpbGVTeXN0ZW1TZXJ2aWNlKCk7XG4gICAgdmFyIGZ0ID0gbmV3IEZpbGVUcmFuc2ZlclNlcnZpY2UoKTtcbiAgICB2YXIgbmkgPSBuZXcgTmV0d29ya0luZm9ybWF0aW9uU2VydmljZSgpO1xuICAgIHZhciBwYXJhbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzY3JpcHRbbWFuaWZlc3RdJyk7XG4gICAgaWYgKHBhcmFtcykge1xuICAgICAgICB2YXIgYXV0b3VwZGF0ZXIgPSBuZXcgQXV0b3VwZGF0ZXIoZnQsIGZzLCBuaSwgY29yZG92YS5maWxlLmFwcGxpY2F0aW9uRGlyZWN0b3J5ICsgJ3d3dycsIHBhcmFtcy5nZXRBdHRyaWJ1dGUoJ3NlcnZlcicpKTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RGaWxlU3lzdGVtID0gd2luZG93LnJlcXVlc3RGaWxlU3lzdGVtIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0RmlsZVN5c3RlbTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RGaWxlU3lzdGVtKExvY2FsRmlsZVN5c3RlbS5QRVJTSVNURU5ULCAwLCAoZmlsZVN5c3RlbSkgPT4ge1xuICAgICAgICAgICAgdmFyIG5hdGl2ZVVSTCA9IGZpbGVTeXN0ZW0ucm9vdC5uYXRpdmVVUkw7XG4gICAgICAgICAgICB3aW5kb3cubmF0aXZlVVJMID0gbmF0aXZlVVJMO1xuICAgICAgICAgICAgYXV0b3VwZGF0ZXIuYXV0b3VwZGF0ZSgnbXlzJywgcGFyYW1zLmdldEF0dHJpYnV0ZSgnbWFuaWZlc3QnKSwgcGFyYW1zLmdldEF0dHJpYnV0ZSgnc2VydmVyJykgKyAnbWFuaWZlc3QuanNvbicpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2FkIHVwZGF0ZWQgQVBLJyk7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gbmF0aXZlVVJMICsgJ215cy9teXMuaHRtbCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvYWQgbG9jYWwgQVBLJyk7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy4vbXlzLmh0bWwnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSwgZmFsc2UpO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGFsZXh2aXpjYWlubyBvbiAxMS8zLzE2LlxuICovXG5pbXBvcnQge0lGaWxlVHJhbnNmZXIsIElGaWxlU3lzdGVtLCBUcmFja2VkRmlsZSwgTWFuaWZlc3QsIE5ldHdvcmtJbmZvcm1hdGlvbiwgRmlsZUVudHJ5LCBGaWxlU3lzdGVtLCBEaXJlY3RvcnlFbnRyeSwgRW50cnl9IGZyb20gXCJhdXRvLXVwZGF0ZXJcIjtcbmltcG9ydCAnYmFiZWwtcG9seWZpbGwnO1xuXG5jbGFzcyBBdXRvdXBkYXRlcntcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9maWxlVHJhbnNmZXI6IElGaWxlVHJhbnNmZXIsIHByaXZhdGUgX2ZpbGVTeXN0ZW06IElGaWxlU3lzdGVtLCBwcml2YXRlIF9uZXR3b3JrSW5mb3JtYXRpb246IE5ldHdvcmtJbmZvcm1hdGlvbixcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9yb290RGlyZWN0b3J5OiBzdHJpbmcsIHByaXZhdGUgX3NlcnZlclVybDogc3RyaW5nKXtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgYXV0b3VwZGF0ZShsb2NhbFN0b3JhZ2VEaXJlY3Rvcnk6IHN0cmluZywgbG9jYWxNYW5pZmVzdFBhdGg6IHN0cmluZywgcmVtb3RlTWFuaWZlc3RQYXRoOiBzdHJpbmcpOlByb21pc2U8dm9pZD57XG4gICAgICAgIHZhciByZXN1bHQgPSBhd2FpdCB0aGlzLmNvcHlNYW5pZmVzdFRvTG9jYWxTdG9yYWdlKHRoaXMuX3Jvb3REaXJlY3RvcnksIGxvY2FsU3RvcmFnZURpcmVjdG9yeSwgbG9jYWxNYW5pZmVzdFBhdGgpO1xuICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5jaGVja05ld1ZlcnNpb24obG9jYWxNYW5pZmVzdFBhdGgsIHJlbW90ZU1hbmlmZXN0UGF0aCk7XG4gICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5kb0JhY2t1cChsb2NhbFN0b3JhZ2VEaXJlY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy51cGRhdGVGaWxlcyh0aGlzLl9zZXJ2ZXJVcmwsIGxvY2FsU3RvcmFnZURpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLnJlc3RvcmVCYWNrdXAobG9jYWxTdG9yYWdlRGlyZWN0b3J5ICsgJy1iYWNrdXAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZXN0b3JlQmFja3VwKHRoaXMuX3Jvb3REaXJlY3RvcnkgKyAnLWJhY2t1cCcpO1xuICAgICAgICAgICAgICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobnVsbCk7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGNvcHlNYW5pZmVzdFRvTG9jYWxTdG9yYWdlKHJvb3REaXJlY3Rvcnk6IHN0cmluZywgbG9jYWxTdG9yYWdlRGlyZWN0b3J5OiBzdHJpbmcsIGxvY2FsTWFuaWZlc3RQYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICBsZXQgbG9jYWxNYW5pZmVzdENvbnRlbnQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLm9wZW5GaWxlKGxvY2FsTWFuaWZlc3RQYXRoKTtcbiAgICAgICAgbGV0IGxvY2FsTWFuaWZlc3QgPSA8TWFuaWZlc3Q+SlNPTi5wYXJzZShsb2NhbE1hbmlmZXN0Q29udGVudCk7XG4gICAgICAgIGxldCBmaWxlczogVHJhY2tlZEZpbGVbXSA9IFtdO1xuXG4gICAgICAgIGZvcihsZXQgZmlsZSBpbiBsb2NhbE1hbmlmZXN0LmZpbGVzKXtcbiAgICAgICAgICAgIGZpbGVzLnB1c2gobG9jYWxNYW5pZmVzdC5maWxlc1tmaWxlXSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0uZG93bmxvYWRGaWxlKHJvb3REaXJlY3RvcnkgKyAnLycgKyBmaWxlc1tpXS5maWxlbmFtZSwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5ICsgJy8nICsgZmlsZXNbaV0uZmlsZW5hbWUpO1xuICAgICAgICAgICAgaWYoIXJlc3VsdClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5kb3dubG9hZEZpbGUocm9vdERpcmVjdG9yeSArICcvbWFuaWZlc3QuanNvbicsIGxvY2FsU3RvcmFnZURpcmVjdG9yeSArICcvbWFuaWZlc3QuanNvbicpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBkb0JhY2t1cChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5jb3B5RGlyZWN0b3J5KHBhdGgsIHBhdGggKyAnLWJhY2t1cCcpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZXN0b3JlQmFja3VwKGJhY2t1cFBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLmNvcHlEaXJlY3RvcnkoYmFja3VwUGF0aCwgYmFja3VwUGF0aC5zdWJzdHIoMCwgYmFja3VwUGF0aC5pbmRleE9mKCctJykpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVtb3RlTWFuaWZlc3Q6IE1hbmlmZXN0O1xuICAgIHB1YmxpYyBsb2NhbE1hbmlmZXN0OiBNYW5pZmVzdDtcblxuICAgIHB1YmxpYyBhc3luYyBjaGVja05ld1ZlcnNpb24obG9jYWxQYXRoOiBzdHJpbmcsIHJlbW90ZVBhdGg6IHN0cmluZyk6UHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGlmKCF0aGlzLl9uZXR3b3JrSW5mb3JtYXRpb24uaXNDb25uZWN0ZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgbGV0IHJlbW90ZU1hbmlmZXN0Q29udGVudCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0ub3BlbkZpbGUocmVtb3RlUGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdGVNYW5pZmVzdCA9IDxNYW5pZmVzdD5KU09OLnBhcnNlKHJlbW90ZU1hbmlmZXN0Q29udGVudCk7XG4gICAgICAgICAgICAgICAgbGV0IGxvY2FsTWFuaWZlc3RDb250ZW50ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5vcGVuRmlsZShsb2NhbFBhdGgpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxNYW5pZmVzdCA9IDxNYW5pZmVzdD5KU09OLnBhcnNlKGxvY2FsTWFuaWZlc3RDb250ZW50KTtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHZlcnNpb25zIG9mIG1hbmlmZXN0c1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbW90ZU1hbmlmZXN0LnZlcnNpb24gIT09IHRoaXMubG9jYWxNYW5pZmVzdC52ZXJzaW9uO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHVwZGF0ZUZpbGVzKHNlcnZlcjogc3RyaW5nLCBsb2NhbFN0b3JhZ2VQYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICBsZXQgbG9jYWxGaWxlczogVHJhY2tlZEZpbGVbXSA9IFtdO1xuICAgICAgICBsZXQgcmVtb3RlRmlsZXM6IFRyYWNrZWRGaWxlW10gPSBbXTtcbiAgICAgICAgbGV0IHJlc3VsdDogYm9vbGVhbjtcblxuICAgICAgICBmb3IobGV0IGZpbGUgaW4gdGhpcy5sb2NhbE1hbmlmZXN0LmZpbGVzKXtcbiAgICAgICAgICAgIGxvY2FsRmlsZXMucHVzaCh0aGlzLmxvY2FsTWFuaWZlc3QuZmlsZXNbZmlsZV0pO1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgZmlsZSBpbiB0aGlzLnJlbW90ZU1hbmlmZXN0LmZpbGVzKXtcbiAgICAgICAgICAgIHJlbW90ZUZpbGVzLnB1c2godGhpcy5yZW1vdGVNYW5pZmVzdC5maWxlc1tmaWxlXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaWxlcyB0byBiZSByZW1vdmVkXG4gICAgICAgIGxldCBmaWxlc1RvUmVtb3ZlOiBUcmFja2VkRmlsZVtdID0gbG9jYWxGaWxlcy5maWx0ZXIoKGxmOiBUcmFja2VkRmlsZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGZvdW5kcyA9IHJlbW90ZUZpbGVzLmZpbHRlcigocmY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJmLmZpbGVuYW1lID09IGxmLmZpbGVuYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZm91bmRzLmxlbmd0aCA9PSAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZXNUb1JlbW92ZS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLnJlbW92ZUZpbGUobG9jYWxTdG9yYWdlUGF0aCArICcvJyArIGZpbGVzVG9SZW1vdmVbaV0uZmlsZW5hbWUpO1xuICAgICAgICAgICAgaWYoIXJlc3VsdClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlsZXMgdG8gYmUgdXBkYXRlZFxuICAgICAgICBsZXQgZmlsZXNUb1VwZGF0ZTogVHJhY2tlZEZpbGVbXSA9IHJlbW90ZUZpbGVzLmZpbHRlcigocmY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICBsZXQgZm91bmRzID0gbG9jYWxGaWxlcy5maWx0ZXIoKGxmOiBUcmFja2VkRmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZi5maWxlbmFtZSA9PSBsZi5maWxlbmFtZSAmJiByZi52ZXJzaW9uICE9IGxmLnZlcnNpb247XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZHMubGVuZ3RoID4gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGVzVG9VcGRhdGUubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVRyYW5zZmVyLmRvd25sb2FkKHNlcnZlciArIGZpbGVzVG9VcGRhdGVbaV0uZmlsZW5hbWUsIGxvY2FsU3RvcmFnZVBhdGggKyAnLycgKyBmaWxlc1RvVXBkYXRlW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbGVzIHRvIGJlIGRvd25sb2FkZWRcbiAgICAgICAgbGV0IGZpbGVzVG9BZGQ6IFRyYWNrZWRGaWxlW10gPSByZW1vdGVGaWxlcy5maWx0ZXIoKHJmOiBUcmFja2VkRmlsZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGZvdW5kcyA9IGxvY2FsRmlsZXMuZmlsdGVyKChsZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmYuZmlsZW5hbWUgPT0gbGYuZmlsZW5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZHMubGVuZ3RoID09IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlc1RvQWRkLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVUcmFuc2Zlci5kb3dubG9hZChzZXJ2ZXIgKyBmaWxlc1RvQWRkW2ldLmZpbGVuYW1lLCBsb2NhbFN0b3JhZ2VQYXRoICsgJy8nICsgZmlsZXNUb0FkZFtpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jbGFzcyBGaWxlU3lzdGVtU2VydmljZSBpbXBsZW1lbnRzIElGaWxlU3lzdGVte1xuICAgIHByaXZhdGUgeGhyOiBYTUxIdHRwUmVxdWVzdDtcbiAgICBwcml2YXRlIF9mczogRmlsZVN5c3RlbUltcGw7XG4gICAgcHJpdmF0ZSBfZnQ6IEZpbGVUcmFuc2ZlclNlcnZpY2U7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB0aGlzLl9mcyA9IG5ldyBGaWxlU3lzdGVtSW1wbCgpO1xuICAgICAgICB0aGlzLl9mdCA9IG5ldyBGaWxlVHJhbnNmZXJTZXJ2aWNlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9wZW5GaWxlKHBhdGg6c3RyaW5nKTpQcm9taXNlPHN0cmluZz57XG4gICAgICAgIHRoaXMueGhyLm9wZW4oJ0dFVCcsIHBhdGgpO1xuICAgICAgICB0aGlzLnhoci5zZW5kKCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMueGhyLm9uZXJyb3IgPSAoZXYpID0+e1xuICAgICAgICAgICAgICAgIHJlamVjdCgnRXJyb3IgZ2V0dGluZyBmaWxlIGZyb20gJyArIHBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy54aHIub25sb2FkID0gKGV2KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMueGhyLnN0YXR1cyA8IDIwMCB8fCB0aGlzLnhoci5zdGF0dXMgPj0gMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aGlzLnhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMueGhyLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgcmVtb3ZlRmlsZShwYXRoOnN0cmluZyk6UHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2ZzLmdldEZpbGUocGF0aCwge2NyZWF0ZTpmYWxzZSwgZXhjbHVzaXZlOiBmYWxzZX0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKGZpbGVFbnRyeTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVFbnRyeS5yZW1vdmUoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGRvd25sb2FkRmlsZShvcmlnUGF0aDogc3RyaW5nLCBkZXN0UGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgLyoqXG4gICAgICAgICAqIDEuIENoZWNrIGlmIGZpbGUgZXhpc3RzIGluIG9yaWdpblxuICAgICAgICAgKiAyLiBJZiBub3QsIHJlc29sdmUoZmFsc2UpXG4gICAgICAgICAqIDMuIEVsc2VcbiAgICAgICAgICogNC4gRG93bmxvYWQgaW4gZGVzdGluYXRpb24gZm9sZGVyXG4gICAgICAgICAqL1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9mdC5kb3dubG9hZChvcmlnUGF0aCwgZGVzdFBhdGgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29weUZpbGUoZGlyZWN0b3J5OiBEaXJlY3RvcnlFbnRyeSwgZW50cnk6IEVudHJ5KTogUHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGVudHJ5LmNvcHlUbyhkaXJlY3RvcnksIGVudHJ5Lm5hbWUsIChlbnRyeTogRW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgY29weURpcmVjdG9yeShvcmlnUGF0aDogc3RyaW5nLCBkZXN0UGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgbGV0IGVudHJpZXM6IEVudHJ5W10gPSBhd2FpdCB0aGlzLl9mcy5nZXREaXJlY3RvcnlFbnRyaWVzKG9yaWdQYXRoLCB7Y3JlYXRlOiBmYWxzZSwgZXhjbHVzaXZlOiBmYWxzZX0pO1xuICAgICAgICBsZXQgZGVzdERpcmVjdG9yeTogRGlyZWN0b3J5RW50cnkgPSBhd2FpdCB0aGlzLl9mcy5nZXREaXJlY3RvcnkoZGVzdFBhdGgsIHtjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2V9KTtcbiAgICAgICAgaWYoZW50cmllcyAmJiBkZXN0RGlyZWN0b3J5KXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBlbnRyaWVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBsZXQgZW50cnkgPSBlbnRyaWVzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGVudHJ5LmlzRGlyZWN0b3J5KXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY29weURpcmVjdG9yeShvcmlnUGF0aCArICcvJyArIGVudHJ5Lm5hbWUsIGRlc3RQYXRoICsgJy8nICsgZW50cnkubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuY29weUZpbGUoZGVzdERpcmVjdG9yeSwgZW50cnkpO1xuICAgICAgICAgICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZGVjbGFyZSB2YXIgTG9jYWxGaWxlU3lzdGVtO1xuZGVjbGFyZSB2YXIgY29yZG92YTtcbmNsYXNzIEZpbGVUcmFuc2ZlclNlcnZpY2UgaW1wbGVtZW50cyBJRmlsZVRyYW5zZmVye1xuICAgIHByaXZhdGUgX3RyYW5zZmVyOiBhbnk7XG4gICAgcHJpdmF0ZSBfc3lzdGVtOiBhbnk7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLl90cmFuc2ZlciA9IG5ldyBGaWxlVHJhbnNmZXJJbXBsKCk7XG4gICAgfVxuXG4gICAgZG93bmxvYWQoc3JjOnN0cmluZywgdGFyZ2V0OnN0cmluZywgdHJ1c3RBbGxIb3N0cz86Ym9vbGVhbiwgb3B0aW9ucz86YW55KTpQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT57XG4gICAgICAgICAgICB0aGlzLl90cmFuc2Zlci5kb3dubG9hZChzcmMsIHRhcmdldClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmYWlsKGUpe1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNsYXNzIEZpbGVUcmFuc2ZlckltcGx7XG4gICAgcHJpdmF0ZSBfZnM6IEZpbGVTeXN0ZW1JbXBsO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5fZnMgPSBuZXcgRmlsZVN5c3RlbUltcGwoKTtcbiAgICB9XG4gICAgZG93bmxvYWQoc291cmNlOiBzdHJpbmcsIHRhcmdldDogc3RyaW5nLCBoZWFkZXJzOiBhbnkpOiBQcm9taXNlPHZvaWQ+e1xuICAgICAgICB2YXIgdyA9IDxhbnk+d2luZG93O1xuICAgICAgICB2YXIgdHJhbnNmZXIgPSBuZXcgdy5GaWxlVHJhbnNmZXIoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZzLmdldEZpbGUodGFyZ2V0LCB7Y3JlYXRlOiB0cnVlLCBleGNsdXNpdmU6IGZhbHNlfSkudGhlbigoZmlsZTogYW55KSA9PntcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PntcbiAgICAgICAgICAgICAgICB0cmFuc2Zlci5kb3dubG9hZChzb3VyY2UsIGZpbGUubmF0aXZlVVJMLCAocykgPT57XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodm9pZCgwKSk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+e1xuICAgICAgICAgICAgICAgICAgICBmaWxlLnJlbW92ZSgoKSA9Pnt9LCAoKSA9Pnt9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpXG4gICAgICAgICAgICAgICAgfSwgdHJ1ZSwgaGVhZGVycyk7XG4gICAgICAgICAgICB9KS50aGVuKCgpID0+e1xuICAgICAgICAgICAgICAgIHJldHVybiB2b2lkICgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS50aGVuKCgpID0+e1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgKDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5jbGFzcyBGaWxlU3lzdGVtSW1wbHtcbiAgICBnZXREaXJlY3RvcnkocGF0aDogc3RyaW5nLCBvcHRpb25zKTogUHJvbWlzZTxEaXJlY3RvcnlFbnRyeT57XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAoPGFueT53aW5kb3cpLnJlcXVlc3RGaWxlU3lzdGVtKExvY2FsRmlsZVN5c3RlbS5QRVJTSVNURU5ULCAwLCAoZmlsZVN5c3RlbTogRmlsZVN5c3RlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGF0aChbcGF0aF0sIGZpbGVTeXN0ZW0ucm9vdCwgb3B0aW9ucykudGhlbigoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldERpcmVjdG9yeUVudHJpZXMocGF0aDogc3RyaW5nLCBvcHRpb25zKTogUHJvbWlzZTxFbnRyeVtdPntcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtOiBGaWxlU3lzdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXRoKFtwYXRoXSwgZmlsZVN5c3RlbS5yb290LCBvcHRpb25zKS50aGVuKChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWFkZXIgPSBkaXJlY3RvcnkuY3JlYXRlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkZXIucmVhZEVudHJpZXMoKGVudHJpZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGVudHJpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRGaWxlKHBhdGg6c3RyaW5nLCBvcHRpb25zKTpQcm9taXNlPEZpbGVFbnRyeT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgKDxhbnk+d2luZG93KS5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW06RmlsZVN5c3RlbSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBmb2xkZXJzID0gcGF0aC5zcGxpdCgnLycpO1xuICAgICAgICAgICAgICAgIHZhciBmaWxlTmFtZSA9IGZvbGRlcnNbZm9sZGVycy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBmb2xkZXJzID0gZm9sZGVycy5zbGljZSgwLCBmb2xkZXJzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UGF0aChmb2xkZXJzLCBmaWxlU3lzdGVtLnJvb3QsIG9wdGlvbnMpLnRoZW4oKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcnkuZ2V0RmlsZShmaWxlTmFtZSwgb3B0aW9ucywgKGZpbGU6RmlsZUVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9ucy5jcmVhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0UGF0aChmb2xkZXJzOnN0cmluZ1tdLCBwYXJlbnQ6RGlyZWN0b3J5RW50cnksIG9wdGlvbnM6YW55KTpQcm9taXNlPERpcmVjdG9yeUVudHJ5PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxEaXJlY3RvcnlFbnRyeT4oKHJlc29sdmUsIHJlamVjdCkgPT57XG4gICAgICAgICAgICB0aGlzLmdldFN1YkRpcmVjdG9yeShmb2xkZXJzLCBwYXJlbnQsIG9wdGlvbnMsIDAsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldFN1YkRpcmVjdG9yeShmb2xkZXJzOiBzdHJpbmdbXSwgcGFyZW50RGlyZWN0b3J5OiBEaXJlY3RvcnlFbnRyeSwgb3B0aW9uczogYW55ICwgaW5kZXg6IG51bWJlciwgcmVzb2x2ZTogKGRlOiBEaXJlY3RvcnlFbnRyeSkgPT4gdm9pZCwgcmVqZWN0OiAoZTogYW55KSA9PiB2b2lkKXtcbiAgICAgICAgaWYoZm9sZGVycy5sZW5ndGggPiBpbmRleCl7XG4gICAgICAgICAgICBwYXJlbnREaXJlY3RvcnkuZ2V0RGlyZWN0b3J5KGZvbGRlcnNbaW5kZXhdLCBvcHRpb25zLCAoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICB0aGlzLmdldFN1YkRpcmVjdG9yeShmb2xkZXJzLCBkaXJlY3RvcnksIG9wdGlvbnMsIGluZGV4LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXNvbHZlKHBhcmVudERpcmVjdG9yeSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNsYXNzIE5ldHdvcmtJbmZvcm1hdGlvblNlcnZpY2UgaW1wbGVtZW50cyBOZXR3b3JrSW5mb3JtYXRpb257XG4gICAgZ2V0IGlzQ29ubmVjdGVkKCk6IGJvb2xlYW57XG4gICAgICAgIGxldCBjb25uZWN0aW9uID0gKDxhbnk+bmF2aWdhdG9yKS5jb25uZWN0aW9uO1xuICAgICAgICByZXR1cm4gY29ubmVjdGlvbi50eXBlICE9IFwiTk9ORVwiICYmIGNvbm5lY3Rpb24udHlwZSAhPSBcIm5vbmVcIjtcbiAgICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgKCkgPT4ge1xuICAgIHZhciBmcyA9IG5ldyBGaWxlU3lzdGVtU2VydmljZSgpO1xuICAgIHZhciBmdCA9IG5ldyBGaWxlVHJhbnNmZXJTZXJ2aWNlKCk7XG4gICAgdmFyIG5pID0gbmV3IE5ldHdvcmtJbmZvcm1hdGlvblNlcnZpY2UoKTtcblxuICAgIHZhciBwYXJhbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzY3JpcHRbbWFuaWZlc3RdJyk7XG4gICAgaWYocGFyYW1zKXtcbiAgICAgICAgdmFyIGF1dG91cGRhdGVyID0gbmV3IEF1dG91cGRhdGVyKGZ0LCBmcywgbmksIGNvcmRvdmEuZmlsZS5hcHBsaWNhdGlvbkRpcmVjdG9yeSArICd3d3cnLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdzZXJ2ZXInKSk7XG4gICAgICAgICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0gPSAoPGFueT53aW5kb3cpLnJlcXVlc3RGaWxlU3lzdGVtIHx8ICg8YW55PndpbmRvdykud2Via2l0UmVxdWVzdEZpbGVTeXN0ZW07XG4gICAgICAgICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtKT0+IHtcbiAgICAgICAgICAgIHZhciBuYXRpdmVVUkwgPSBmaWxlU3lzdGVtLnJvb3QubmF0aXZlVVJMO1xuICAgICAgICAgICAgKDxhbnk+d2luZG93KS5uYXRpdmVVUkwgPSBuYXRpdmVVUkw7XG4gICAgICAgICAgICBhdXRvdXBkYXRlci5hdXRvdXBkYXRlKCdteXMnLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdtYW5pZmVzdCcpLCBwYXJhbXMuZ2V0QXR0cmlidXRlKCdzZXJ2ZXInKSArICdtYW5pZmVzdC5qc29uJylcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2FkIHVwZGF0ZWQgQVBLJyk7XG4gICAgICAgICAgICAgICAgICAgICg8YW55PndpbmRvdykubG9jYXRpb24gPSBuYXRpdmVVUkwgKyAnbXlzL215cy5odG1sJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdMb2FkIGxvY2FsIEFQSycpO1xuICAgICAgICAgICAgICAgICAgICAoPGFueT53aW5kb3cpLmxvY2F0aW9uID0gJy4vbXlzLmh0bWwnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICB9KTtcbiAgICB9XG59LCBmYWxzZSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
