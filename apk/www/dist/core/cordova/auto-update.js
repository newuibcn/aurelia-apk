"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var Autoupdater = (function () {
    function Autoupdater(_fileTransfer, _fileSystem, _networkInformation, _rootDirectory, _serverUrl) {
        this._fileTransfer = _fileTransfer;
        this._fileSystem = _fileSystem;
        this._networkInformation = _networkInformation;
        this._rootDirectory = _rootDirectory;
        this._serverUrl = _serverUrl;
    }
    Autoupdater.prototype.autoupdate = function (localStorageDirectory, localManifestPath, remoteManifestPath) {
        return __awaiter(this, void 0, Promise, function* () {
            var result = yield this.copyManifestToLocalStorage(this._rootDirectory, localStorageDirectory, localManifestPath);
            if (result) {
                result = yield this.checkNewVersion(localManifestPath, remoteManifestPath);
                if (result) {
                    try {
                        result = yield this.doBackup(localStorageDirectory);
                        if (result) {
                            result = yield this.updateFiles(this._serverUrl, localStorageDirectory);
                            if (result)
                                return Promise.resolve();
                            else {
                                result = yield this.restoreBackup(localStorageDirectory + '-backup');
                                if (result)
                                    return Promise.resolve();
                            }
                        }
                    }
                    catch (e) {
                        try {
                            yield this.restoreBackup(this._rootDirectory + '-backup');
                        }
                        catch (e) {
                            return Promise.reject(null);
                        }
                    }
                }
            }
            return Promise.reject(null);
        });
    };
    Autoupdater.prototype.copyManifestToLocalStorage = function (rootDirectory, localStorageDirectory, localManifestPath) {
        return __awaiter(this, void 0, Promise, function* () {
            var localManifestContent = yield this._fileSystem.openFile(localManifestPath);
            var localManifest = JSON.parse(localManifestContent);
            var files = [];
            for (var file in localManifest.files) {
                files.push(localManifest.files[file]);
            }
            ;
            var result;
            for (var i = 0; i < files.length; i++) {
                result = yield this._fileSystem.downloadFile(rootDirectory + '/' + files[i].filename, localStorageDirectory + '/' + files[i].filename);
                if (!result)
                    return result;
            }
            result = yield this._fileSystem.downloadFile(rootDirectory + '/manifest.json', localStorageDirectory + '/manifest.json');
            return result;
        });
    };
    Autoupdater.prototype.doBackup = function (path) {
        return __awaiter(this, void 0, Promise, function* () {
            var result = yield this._fileSystem.copyDirectory(path, path + '-backup');
            return result;
        });
    };
    Autoupdater.prototype.restoreBackup = function (backupPath) {
        return __awaiter(this, void 0, Promise, function* () {
            var result = yield this._fileSystem.copyDirectory(backupPath, backupPath.substr(0, backupPath.indexOf('-')));
            return result;
        });
    };
    Autoupdater.prototype.checkNewVersion = function (localPath, remotePath) {
        return __awaiter(this, void 0, Promise, function* () {
            if (!this._networkInformation.isConnected)
                return false;
            else {
                try {
                    var remoteManifestContent = yield this._fileSystem.openFile(remotePath);
                    this.remoteManifest = JSON.parse(remoteManifestContent);
                    var localManifestContent = yield this._fileSystem.openFile(localPath);
                    this.localManifest = JSON.parse(localManifestContent);
                    return this.remoteManifest.version !== this.localManifest.version;
                }
                catch (e) {
                    return false;
                }
            }
        });
    };
    Autoupdater.prototype.updateFiles = function (server, localStoragePath) {
        return __awaiter(this, void 0, Promise, function* () {
            var localFiles = [];
            var remoteFiles = [];
            var result;
            for (var file in this.localManifest.files) {
                localFiles.push(this.localManifest.files[file]);
            }
            for (var file in this.remoteManifest.files) {
                remoteFiles.push(this.remoteManifest.files[file]);
            }
            var filesToRemove = localFiles.filter(function (lf) {
                var founds = remoteFiles.filter(function (rf) {
                    return rf.filename == lf.filename;
                });
                return founds.length == 0;
            });
            for (var i = 0; i < filesToRemove.length; i++) {
                result = yield this._fileSystem.removeFile(localStoragePath + '/' + filesToRemove[i].filename);
                if (!result)
                    return result;
            }
            var filesToUpdate = remoteFiles.filter(function (rf) {
                var founds = localFiles.filter(function (lf) {
                    return rf.filename == lf.filename && rf.version != lf.version;
                });
                return founds.length > 0;
            });
            for (var i = 0; i < filesToUpdate.length; i++) {
                result = yield this._fileTransfer.download(server + filesToUpdate[i].filename, localStoragePath + '/' + filesToUpdate[i].filename);
                if (!result)
                    return result;
            }
            var filesToAdd = remoteFiles.filter(function (rf) {
                var founds = localFiles.filter(function (lf) {
                    return rf.filename == lf.filename;
                });
                return founds.length == 0;
            });
            for (var i = 0; i < filesToAdd.length; i++) {
                result = yield this._fileTransfer.download(server + filesToAdd[i].filename, localStoragePath + '/' + filesToAdd[i].filename);
                if (!result)
                    return result;
            }
            return true;
        });
    };
    return Autoupdater;
}());
var FileSystemService = (function () {
    function FileSystemService() {
        this.xhr = new XMLHttpRequest();
        this._fs = new FileSystemImpl();
        this._ft = new FileTransferService();
    }
    FileSystemService.prototype.openFile = function (path) {
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
    };
    FileSystemService.prototype.removeFile = function (path) {
        return __awaiter(this, void 0, Promise, function* () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this._fs.getFile(path, { create: false, exclusive: false })
                    .then(function (fileEntry) {
                    fileEntry.remove(function () {
                        resolve(true);
                    }, function (e) {
                        resolve(false);
                    });
                })
                    .catch(function (e) {
                    resolve(false);
                });
            });
        });
    };
    FileSystemService.prototype.downloadFile = function (origPath, destPath) {
        return __awaiter(this, void 0, Promise, function* () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this._ft.download(origPath, destPath)
                    .then(function (r) {
                    resolve(r);
                })
                    .catch(function (e) {
                    resolve(false);
                });
            });
        });
    };
    FileSystemService.prototype.copyFile = function (directory, entry) {
        return new Promise(function (resolve, reject) {
            entry.copyTo(directory, entry.name, function (entry) {
                resolve(true);
            }, function (error) {
                resolve(false);
            });
        });
    };
    FileSystemService.prototype.copyDirectory = function (origPath, destPath) {
        return __awaiter(this, void 0, Promise, function* () {
            var entries = yield this._fs.getDirectoryEntries(origPath, { create: false, exclusive: false });
            var destDirectory = yield this._fs.getDirectory(destPath, { create: true, exclusive: false });
            if (entries && destDirectory) {
                for (var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    if (entry.isDirectory) {
                        var result = yield this.copyDirectory(origPath + '/' + entry.name, destPath + '/' + entry.name);
                        if (!result)
                            return false;
                    }
                    else {
                        var result = yield this.copyFile(destDirectory, entry);
                        if (!result)
                            return false;
                    }
                }
                return true;
            }
            else {
                return false;
            }
        });
    };
    return FileSystemService;
}());
var FileTransferService = (function () {
    function FileTransferService() {
        this._transfer = new FileTransferImpl();
    }
    FileTransferService.prototype.download = function (src, target, trustAllHosts, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._transfer.download(src, target)
                .then(function () {
                resolve(true);
            })
                .catch(function (e) {
                resolve(false);
            });
        });
    };
    FileTransferService.prototype.fail = function (e) {
        console.log(e);
        return false;
    };
    return FileTransferService;
}());
var FileTransferImpl = (function () {
    function FileTransferImpl() {
        this._fs = new FileSystemImpl();
    }
    FileTransferImpl.prototype.download = function (source, target, headers) {
        var w = window;
        var transfer = new w.FileTransfer();
        return this._fs.getFile(target, { create: true, exclusive: false }).then(function (file) {
            return new Promise(function (resolve, reject) {
                transfer.download(source, file.nativeURL, function (s) {
                    resolve(void (0));
                }, function (e) {
                    file.remove(function () { }, function () { });
                    reject(e);
                }, true, headers);
            }).then(function () {
                return void (0);
            });
        }).then(function () {
            return void (0);
        });
    };
    return FileTransferImpl;
}());
var FileSystemImpl = (function () {
    function FileSystemImpl() {
    }
    FileSystemImpl.prototype.getDirectory = function (path, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                _this.getPath([path], fileSystem.root, options).then(function (directory) {
                    resolve(directory);
                })
                    .catch(function (error) {
                    resolve(null);
                });
            });
        });
    };
    FileSystemImpl.prototype.getDirectoryEntries = function (path, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                _this.getPath([path], fileSystem.root, options).then(function (directory) {
                    var reader = directory.createReader();
                    reader.readEntries(function (entries) {
                        resolve(entries);
                    }, function (error) {
                        resolve(null);
                    });
                })
                    .catch(function (error) {
                    resolve(null);
                });
            });
        });
    };
    FileSystemImpl.prototype.getFile = function (path, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
                var folders = path.split('/');
                var fileName = folders[folders.length - 1];
                folders = folders.slice(0, folders.length - 1);
                _this.getPath(folders, fileSystem.root, options).then(function (directory) {
                    directory.getFile(fileName, options, function (file) {
                        resolve(file);
                    }, function (e) {
                        if (options.create)
                            reject(e);
                        else {
                            resolve(null);
                        }
                    });
                }, function (e) {
                    reject(e);
                });
            });
        });
    };
    FileSystemImpl.prototype.getPath = function (folders, parent, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getSubDirectory(folders, parent, options, 0, resolve, reject);
        });
    };
    FileSystemImpl.prototype.getSubDirectory = function (folders, parentDirectory, options, index, resolve, reject) {
        var _this = this;
        if (folders.length > index) {
            parentDirectory.getDirectory(folders[index], options, function (directory) {
                index++;
                _this.getSubDirectory(folders, directory, options, index, resolve, reject);
            }, function (error) {
                reject(error);
            });
        }
        else {
            resolve(parentDirectory);
        }
    };
    return FileSystemImpl;
}());
var NetworkInformationService = (function () {
    function NetworkInformationService() {
    }
    Object.defineProperty(NetworkInformationService.prototype, "isConnected", {
        get: function () {
            var connection = navigator.connection;
            return connection.type != "NONE" && connection.type != "none";
        },
        enumerable: true,
        configurable: true
    });
    return NetworkInformationService;
}());
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
            autoupdater.autoupdate('mys', params.getAttribute('manifest'), params.getAttribute('server') + 'manifest.json')
                .then(function () {
                console.log('Load updated APK');
                window.location = nativeURL + 'mys/mys.html';
            })
                .catch(function () {
                console.log('Load local APK');
                window.location = './mys.html';
            });
        }, function (e) {
            console.log(e);
        });
    }
}, false);
//# sourceMappingURL=auto-update.js.map
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS9jb3Jkb3ZhL2F1dG8tdXBkYXRlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlcyI6WyJjb3JlL2NvcmRvdmEvYXV0by11cGRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0E7SUFDSSxxQkFBb0IsYUFBNEIsRUFBVSxXQUF3QixFQUFVLG1CQUF1QyxFQUMvRyxjQUFzQixFQUFVLFVBQWtCO1FBRGxELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBQy9HLG1CQUFjLEdBQWQsY0FBYyxDQUFRO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBUTtJQUN0RSxDQUFDO0lBRVksZ0NBQVUsR0FBdkIsVUFBd0IscUJBQTZCLEVBQUUsaUJBQXlCLEVBQUUsa0JBQTBCOztZQUN4RyxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDbEgsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztnQkFDUCxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDLENBQUM7Z0JBQzNFLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7b0JBQ1AsSUFBRyxDQUFDO3dCQUNBLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQzt3QkFDcEQsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQzs0QkFDUCxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUMsQ0FBQzs0QkFDeEUsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDO2dDQUNO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SSxDQUFDLFNBQVMsQ0FBQztZQUNwQyxNQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUNwQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsZUFBZSxDQUFDO2lCQUMxRyxJQUFJLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUMxQixNQUFPLENBQUMsUUFBUSxHQUFHLFNBQVMsR0FBRyxjQUFjLENBQUM7WUFDeEQsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQztnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ3hCLE1BQU8sQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQyxFQUFFLFVBQUMsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0wsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGFsZXh2aXpjYWlubyBvbiAxMS8zLzE2LlxuICovXG5pbXBvcnQge0lGaWxlVHJhbnNmZXIsIElGaWxlU3lzdGVtLCBUcmFja2VkRmlsZSwgTWFuaWZlc3QsIE5ldHdvcmtJbmZvcm1hdGlvbiwgRmlsZUVudHJ5LCBGaWxlU3lzdGVtLCBEaXJlY3RvcnlFbnRyeSwgRW50cnl9IGZyb20gXCJhdXRvLXVwZGF0ZXJcIjtcblxuY2xhc3MgQXV0b3VwZGF0ZXJ7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZmlsZVRyYW5zZmVyOiBJRmlsZVRyYW5zZmVyLCBwcml2YXRlIF9maWxlU3lzdGVtOiBJRmlsZVN5c3RlbSwgcHJpdmF0ZSBfbmV0d29ya0luZm9ybWF0aW9uOiBOZXR3b3JrSW5mb3JtYXRpb24sXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBfcm9vdERpcmVjdG9yeTogc3RyaW5nLCBwcml2YXRlIF9zZXJ2ZXJVcmw6IHN0cmluZyl7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGF1dG91cGRhdGUobG9jYWxTdG9yYWdlRGlyZWN0b3J5OiBzdHJpbmcsIGxvY2FsTWFuaWZlc3RQYXRoOiBzdHJpbmcsIHJlbW90ZU1hbmlmZXN0UGF0aDogc3RyaW5nKTpQcm9taXNlPHZvaWQ+e1xuICAgICAgICB2YXIgcmVzdWx0ID0gYXdhaXQgdGhpcy5jb3B5TWFuaWZlc3RUb0xvY2FsU3RvcmFnZSh0aGlzLl9yb290RGlyZWN0b3J5LCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnksIGxvY2FsTWFuaWZlc3RQYXRoKTtcbiAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuY2hlY2tOZXdWZXJzaW9uKGxvY2FsTWFuaWZlc3RQYXRoLCByZW1vdGVNYW5pZmVzdFBhdGgpO1xuICAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuZG9CYWNrdXAobG9jYWxTdG9yYWdlRGlyZWN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMudXBkYXRlRmlsZXModGhpcy5fc2VydmVyVXJsLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5yZXN0b3JlQmFja3VwKGxvY2FsU3RvcmFnZURpcmVjdG9yeSArICctYmFja3VwJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucmVzdG9yZUJhY2t1cCh0aGlzLl9yb290RGlyZWN0b3J5ICsgJy1iYWNrdXAnKTtcbiAgICAgICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2Uocm9vdERpcmVjdG9yeTogc3RyaW5nLCBsb2NhbFN0b3JhZ2VEaXJlY3Rvcnk6IHN0cmluZywgbG9jYWxNYW5pZmVzdFBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIGxldCBsb2NhbE1hbmlmZXN0Q29udGVudCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0ub3BlbkZpbGUobG9jYWxNYW5pZmVzdFBhdGgpO1xuICAgICAgICBsZXQgbG9jYWxNYW5pZmVzdCA9IDxNYW5pZmVzdD5KU09OLnBhcnNlKGxvY2FsTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgbGV0IGZpbGVzOiBUcmFja2VkRmlsZVtdID0gW107XG5cbiAgICAgICAgZm9yKGxldCBmaWxlIGluIGxvY2FsTWFuaWZlc3QuZmlsZXMpe1xuICAgICAgICAgICAgZmlsZXMucHVzaChsb2NhbE1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5kb3dubG9hZEZpbGUocm9vdERpcmVjdG9yeSArICcvJyArIGZpbGVzW2ldLmZpbGVuYW1lLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkgKyAnLycgKyBmaWxlc1tpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLmRvd25sb2FkRmlsZShyb290RGlyZWN0b3J5ICsgJy9tYW5pZmVzdC5qc29uJywgbG9jYWxTdG9yYWdlRGlyZWN0b3J5ICsgJy9tYW5pZmVzdC5qc29uJyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGRvQmFja3VwKHBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLmNvcHlEaXJlY3RvcnkocGF0aCwgcGF0aCArICctYmFja3VwJyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlc3RvcmVCYWNrdXAoYmFja3VwUGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0uY29weURpcmVjdG9yeShiYWNrdXBQYXRoLCBiYWNrdXBQYXRoLnN1YnN0cigwLCBiYWNrdXBQYXRoLmluZGV4T2YoJy0nKSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdGVNYW5pZmVzdDogTWFuaWZlc3Q7XG4gICAgcHVibGljIGxvY2FsTWFuaWZlc3Q6IE1hbmlmZXN0O1xuXG4gICAgcHVibGljIGFzeW5jIGNoZWNrTmV3VmVyc2lvbihsb2NhbFBhdGg6IHN0cmluZywgcmVtb3RlUGF0aDogc3RyaW5nKTpQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYoIXRoaXMuX25ldHdvcmtJbmZvcm1hdGlvbi5pc0Nvbm5lY3RlZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBsZXQgcmVtb3RlTWFuaWZlc3RDb250ZW50ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5vcGVuRmlsZShyZW1vdGVQYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZU1hbmlmZXN0ID0gPE1hbmlmZXN0PkpTT04ucGFyc2UocmVtb3RlTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxNYW5pZmVzdENvbnRlbnQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLm9wZW5GaWxlKGxvY2FsUGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbE1hbmlmZXN0ID0gPE1hbmlmZXN0PkpTT04ucGFyc2UobG9jYWxNYW5pZmVzdENvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdmVyc2lvbnMgb2YgbWFuaWZlc3RzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3RlTWFuaWZlc3QudmVyc2lvbiAhPT0gdGhpcy5sb2NhbE1hbmlmZXN0LnZlcnNpb247XG4gICAgICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlRmlsZXMoc2VydmVyOiBzdHJpbmcsIGxvY2FsU3RvcmFnZVBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIGxldCBsb2NhbEZpbGVzOiBUcmFja2VkRmlsZVtdID0gW107XG4gICAgICAgIGxldCByZW1vdGVGaWxlczogVHJhY2tlZEZpbGVbXSA9IFtdO1xuICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuO1xuXG4gICAgICAgIGZvcihsZXQgZmlsZSBpbiB0aGlzLmxvY2FsTWFuaWZlc3QuZmlsZXMpe1xuICAgICAgICAgICAgbG9jYWxGaWxlcy5wdXNoKHRoaXMubG9jYWxNYW5pZmVzdC5maWxlc1tmaWxlXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBmaWxlIGluIHRoaXMucmVtb3RlTWFuaWZlc3QuZmlsZXMpe1xuICAgICAgICAgICAgcmVtb3RlRmlsZXMucHVzaCh0aGlzLnJlbW90ZU1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbGVzIHRvIGJlIHJlbW92ZWRcbiAgICAgICAgbGV0IGZpbGVzVG9SZW1vdmU6IFRyYWNrZWRGaWxlW10gPSBsb2NhbEZpbGVzLmZpbHRlcigobGY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICBsZXQgZm91bmRzID0gcmVtb3RlRmlsZXMuZmlsdGVyKChyZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmYuZmlsZW5hbWUgPT0gbGYuZmlsZW5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZHMubGVuZ3RoID09IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlc1RvUmVtb3ZlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0ucmVtb3ZlRmlsZShsb2NhbFN0b3JhZ2VQYXRoICsgJy8nICsgZmlsZXNUb1JlbW92ZVtpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaWxlcyB0byBiZSB1cGRhdGVkXG4gICAgICAgIGxldCBmaWxlc1RvVXBkYXRlOiBUcmFja2VkRmlsZVtdID0gcmVtb3RlRmlsZXMuZmlsdGVyKChyZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgIGxldCBmb3VuZHMgPSBsb2NhbEZpbGVzLmZpbHRlcigobGY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJmLmZpbGVuYW1lID09IGxmLmZpbGVuYW1lICYmIHJmLnZlcnNpb24gIT0gbGYudmVyc2lvbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kcy5sZW5ndGggPiAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZXNUb1VwZGF0ZS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlVHJhbnNmZXIuZG93bmxvYWQoc2VydmVyICsgZmlsZXNUb1VwZGF0ZVtpXS5maWxlbmFtZSwgbG9jYWxTdG9yYWdlUGF0aCArICcvJyArIGZpbGVzVG9VcGRhdGVbaV0uZmlsZW5hbWUpO1xuICAgICAgICAgICAgaWYoIXJlc3VsdClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlsZXMgdG8gYmUgZG93bmxvYWRlZFxuICAgICAgICBsZXQgZmlsZXNUb0FkZDogVHJhY2tlZEZpbGVbXSA9IHJlbW90ZUZpbGVzLmZpbHRlcigocmY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICBsZXQgZm91bmRzID0gbG9jYWxGaWxlcy5maWx0ZXIoKGxmOiBUcmFja2VkRmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZi5maWxlbmFtZSA9PSBsZi5maWxlbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kcy5sZW5ndGggPT0gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGVzVG9BZGQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVRyYW5zZmVyLmRvd25sb2FkKHNlcnZlciArIGZpbGVzVG9BZGRbaV0uZmlsZW5hbWUsIGxvY2FsU3RvcmFnZVBhdGggKyAnLycgKyBmaWxlc1RvQWRkW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNsYXNzIEZpbGVTeXN0ZW1TZXJ2aWNlIGltcGxlbWVudHMgSUZpbGVTeXN0ZW17XG4gICAgcHJpdmF0ZSB4aHI6IFhNTEh0dHBSZXF1ZXN0O1xuICAgIHByaXZhdGUgX2ZzOiBGaWxlU3lzdGVtSW1wbDtcbiAgICBwcml2YXRlIF9mdDogRmlsZVRyYW5zZmVyU2VydmljZTtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHRoaXMuX2ZzID0gbmV3IEZpbGVTeXN0ZW1JbXBsKCk7XG4gICAgICAgIHRoaXMuX2Z0ID0gbmV3IEZpbGVUcmFuc2ZlclNlcnZpY2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbkZpbGUocGF0aDpzdHJpbmcpOlByb21pc2U8c3RyaW5nPntcbiAgICAgICAgdGhpcy54aHIub3BlbignR0VUJywgcGF0aCk7XG4gICAgICAgIHRoaXMueGhyLnNlbmQoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy54aHIub25lcnJvciA9IChldikgPT57XG4gICAgICAgICAgICAgICAgcmVqZWN0KCdFcnJvciBnZXR0aW5nIGZpbGUgZnJvbSAnICsgcGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnhoci5vbmxvYWQgPSAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy54aHIuc3RhdHVzIDwgMjAwIHx8IHRoaXMueGhyLnN0YXR1cyA+PSAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRoaXMueGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy54aHIucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZW1vdmVGaWxlKHBhdGg6c3RyaW5nKTpQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZnMuZ2V0RmlsZShwYXRoLCB7Y3JlYXRlOmZhbHNlLCBleGNsdXNpdmU6IGZhbHNlfSlcbiAgICAgICAgICAgICAgICAudGhlbigoZmlsZUVudHJ5OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZUVudHJ5LnJlbW92ZSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZG93bmxvYWRGaWxlKG9yaWdQYXRoOiBzdHJpbmcsIGRlc3RQYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICAvKipcbiAgICAgICAgICogMS4gQ2hlY2sgaWYgZmlsZSBleGlzdHMgaW4gb3JpZ2luXG4gICAgICAgICAqIDIuIElmIG5vdCwgcmVzb2x2ZShmYWxzZSlcbiAgICAgICAgICogMy4gRWxzZVxuICAgICAgICAgKiA0LiBEb3dubG9hZCBpbiBkZXN0aW5hdGlvbiBmb2xkZXJcbiAgICAgICAgICovXG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2Z0LmRvd25sb2FkKG9yaWdQYXRoLCBkZXN0UGF0aClcbiAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb3B5RmlsZShkaXJlY3Rvcnk6IERpcmVjdG9yeUVudHJ5LCBlbnRyeTogRW50cnkpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZW50cnkuY29weVRvKGRpcmVjdG9yeSwgZW50cnkubmFtZSwgKGVudHJ5OiBFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBjb3B5RGlyZWN0b3J5KG9yaWdQYXRoOiBzdHJpbmcsIGRlc3RQYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICBsZXQgZW50cmllczogRW50cnlbXSA9IGF3YWl0IHRoaXMuX2ZzLmdldERpcmVjdG9yeUVudHJpZXMob3JpZ1BhdGgsIHtjcmVhdGU6IGZhbHNlLCBleGNsdXNpdmU6IGZhbHNlfSk7XG4gICAgICAgIGxldCBkZXN0RGlyZWN0b3J5OiBEaXJlY3RvcnlFbnRyeSA9IGF3YWl0IHRoaXMuX2ZzLmdldERpcmVjdG9yeShkZXN0UGF0aCwge2NyZWF0ZTogdHJ1ZSwgZXhjbHVzaXZlOiBmYWxzZX0pO1xuICAgICAgICBpZihlbnRyaWVzICYmIGRlc3REaXJlY3Rvcnkpe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBlbnRyeSA9IGVudHJpZXNbaV07XG4gICAgICAgICAgICAgICAgaWYoZW50cnkuaXNEaXJlY3Rvcnkpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdGhpcy5jb3B5RGlyZWN0b3J5KG9yaWdQYXRoICsgJy8nICsgZW50cnkubmFtZSwgZGVzdFBhdGggKyAnLycgKyBlbnRyeS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdGhpcy5jb3B5RmlsZShkZXN0RGlyZWN0b3J5LCBlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5kZWNsYXJlIHZhciBMb2NhbEZpbGVTeXN0ZW07XG5kZWNsYXJlIHZhciBjb3Jkb3ZhO1xuY2xhc3MgRmlsZVRyYW5zZmVyU2VydmljZSBpbXBsZW1lbnRzIElGaWxlVHJhbnNmZXJ7XG4gICAgcHJpdmF0ZSBfdHJhbnNmZXI6IGFueTtcbiAgICBwcml2YXRlIF9zeXN0ZW06IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuX3RyYW5zZmVyID0gbmV3IEZpbGVUcmFuc2ZlckltcGwoKTtcbiAgICB9XG5cbiAgICBkb3dubG9hZChzcmM6c3RyaW5nLCB0YXJnZXQ6c3RyaW5nLCB0cnVzdEFsbEhvc3RzPzpib29sZWFuLCBvcHRpb25zPzphbnkpOlByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PntcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zZmVyLmRvd25sb2FkKHNyYywgdGFyZ2V0KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZhaWwoZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY2xhc3MgRmlsZVRyYW5zZmVySW1wbHtcbiAgICBwcml2YXRlIF9mczogRmlsZVN5c3RlbUltcGw7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLl9mcyA9IG5ldyBGaWxlU3lzdGVtSW1wbCgpO1xuICAgIH1cbiAgICBkb3dubG9hZChzb3VyY2U6IHN0cmluZywgdGFyZ2V0OiBzdHJpbmcsIGhlYWRlcnM6IGFueSk6IFByb21pc2U8dm9pZD57XG4gICAgICAgIHZhciB3ID0gPGFueT53aW5kb3c7XG4gICAgICAgIHZhciB0cmFuc2ZlciA9IG5ldyB3LkZpbGVUcmFuc2ZlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZnMuZ2V0RmlsZSh0YXJnZXQsIHtjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2V9KS50aGVuKChmaWxlOiBhbnkpID0+e1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+e1xuICAgICAgICAgICAgICAgIHRyYW5zZmVyLmRvd25sb2FkKHNvdXJjZSwgZmlsZS5uYXRpdmVVUkwsIChzKSA9PntcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2b2lkKDApKTtcbiAgICAgICAgICAgICAgICB9LCAoZSkgPT57XG4gICAgICAgICAgICAgICAgICAgIGZpbGUucmVtb3ZlKCgpID0+e30sICgpID0+e30pO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgICAgICAgICB9LCB0cnVlLCBoZWFkZXJzKTtcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgKDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT57XG4gICAgICAgICAgICByZXR1cm4gdm9pZCAoMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNsYXNzIEZpbGVTeXN0ZW1JbXBse1xuICAgIGdldERpcmVjdG9yeShwYXRoOiBzdHJpbmcsIG9wdGlvbnMpOiBQcm9taXNlPERpcmVjdG9yeUVudHJ5PntcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtOiBGaWxlU3lzdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXRoKFtwYXRoXSwgZmlsZVN5c3RlbS5yb290LCBvcHRpb25zKS50aGVuKChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGlyZWN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0RGlyZWN0b3J5RW50cmllcyhwYXRoOiBzdHJpbmcsIG9wdGlvbnMpOiBQcm9taXNlPEVudHJ5W10+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgKDxhbnk+d2luZG93KS5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW06IEZpbGVTeXN0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBhdGgoW3BhdGhdLCBmaWxlU3lzdGVtLnJvb3QsIG9wdGlvbnMpLnRoZW4oKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlYWRlciA9IGRpcmVjdG9yeS5jcmVhdGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkRW50cmllcygoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZW50cmllcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldEZpbGUocGF0aDpzdHJpbmcsIG9wdGlvbnMpOlByb21pc2U8RmlsZUVudHJ5PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAoPGFueT53aW5kb3cpLnJlcXVlc3RGaWxlU3lzdGVtKExvY2FsRmlsZVN5c3RlbS5QRVJTSVNURU5ULCAwLCAoZmlsZVN5c3RlbTpGaWxlU3lzdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGZvbGRlcnMgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGVOYW1lID0gZm9sZGVyc1tmb2xkZXJzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGZvbGRlcnMgPSBmb2xkZXJzLnNsaWNlKDAsIGZvbGRlcnMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXRoKGZvbGRlcnMsIGZpbGVTeXN0ZW0ucm9vdCwgb3B0aW9ucykudGhlbigoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yeS5nZXRGaWxlKGZpbGVOYW1lLCBvcHRpb25zLCAoZmlsZTpGaWxlRW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihvcHRpb25zLmNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRQYXRoKGZvbGRlcnM6c3RyaW5nW10sIHBhcmVudDpEaXJlY3RvcnlFbnRyeSwgb3B0aW9uczphbnkpOlByb21pc2U8RGlyZWN0b3J5RW50cnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPERpcmVjdG9yeUVudHJ5PigocmVzb2x2ZSwgcmVqZWN0KSA9PntcbiAgICAgICAgICAgIHRoaXMuZ2V0U3ViRGlyZWN0b3J5KGZvbGRlcnMsIHBhcmVudCwgb3B0aW9ucywgMCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0U3ViRGlyZWN0b3J5KGZvbGRlcnM6IHN0cmluZ1tdLCBwYXJlbnREaXJlY3Rvcnk6IERpcmVjdG9yeUVudHJ5LCBvcHRpb25zOiBhbnkgLCBpbmRleDogbnVtYmVyLCByZXNvbHZlOiAoZGU6IERpcmVjdG9yeUVudHJ5KSA9PiB2b2lkLCByZWplY3Q6IChlOiBhbnkpID0+IHZvaWQpe1xuICAgICAgICBpZihmb2xkZXJzLmxlbmd0aCA+IGluZGV4KXtcbiAgICAgICAgICAgIHBhcmVudERpcmVjdG9yeS5nZXREaXJlY3RvcnkoZm9sZGVyc1tpbmRleF0sIG9wdGlvbnMsIChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3ViRGlyZWN0b3J5KGZvbGRlcnMsIGRpcmVjdG9yeSwgb3B0aW9ucywgaW5kZXgsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJlc29sdmUocGFyZW50RGlyZWN0b3J5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY2xhc3MgTmV0d29ya0luZm9ybWF0aW9uU2VydmljZSBpbXBsZW1lbnRzIE5ldHdvcmtJbmZvcm1hdGlvbntcbiAgICBnZXQgaXNDb25uZWN0ZWQoKTogYm9vbGVhbntcbiAgICAgICAgbGV0IGNvbm5lY3Rpb24gPSAoPGFueT5uYXZpZ2F0b3IpLmNvbm5lY3Rpb247XG4gICAgICAgIHJldHVybiBjb25uZWN0aW9uLnR5cGUgIT0gXCJOT05FXCIgJiYgY29ubmVjdGlvbi50eXBlICE9IFwibm9uZVwiO1xuICAgIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlcmVhZHknLCAoKSA9PiB7XG4gICAgdmFyIGZzID0gbmV3IEZpbGVTeXN0ZW1TZXJ2aWNlKCk7XG4gICAgdmFyIGZ0ID0gbmV3IEZpbGVUcmFuc2ZlclNlcnZpY2UoKTtcbiAgICB2YXIgbmkgPSBuZXcgTmV0d29ya0luZm9ybWF0aW9uU2VydmljZSgpO1xuXG4gICAgdmFyIHBhcmFtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFttYW5pZmVzdF0nKTtcbiAgICBpZihwYXJhbXMpe1xuICAgICAgICB2YXIgYXV0b3VwZGF0ZXIgPSBuZXcgQXV0b3VwZGF0ZXIoZnQsIGZzLCBuaSwgY29yZG92YS5maWxlLmFwcGxpY2F0aW9uRGlyZWN0b3J5ICsgJ3d3dycsIHBhcmFtcy5nZXRBdHRyaWJ1dGUoJ3NlcnZlcicpKTtcbiAgICAgICAgKDxhbnk+d2luZG93KS5yZXF1ZXN0RmlsZVN5c3RlbSA9ICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0gfHwgKDxhbnk+d2luZG93KS53ZWJraXRSZXF1ZXN0RmlsZVN5c3RlbTtcbiAgICAgICAgKDxhbnk+d2luZG93KS5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW0pPT4ge1xuICAgICAgICAgICAgdmFyIG5hdGl2ZVVSTCA9IGZpbGVTeXN0ZW0ucm9vdC5uYXRpdmVVUkw7XG4gICAgICAgICAgICAoPGFueT53aW5kb3cpLm5hdGl2ZVVSTCA9IG5hdGl2ZVVSTDtcbiAgICAgICAgICAgIGF1dG91cGRhdGVyLmF1dG91cGRhdGUoJ215cycsIHBhcmFtcy5nZXRBdHRyaWJ1dGUoJ21hbmlmZXN0JyksIHBhcmFtcy5nZXRBdHRyaWJ1dGUoJ3NlcnZlcicpICsgJ21hbmlmZXN0Lmpzb24nKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvYWQgdXBkYXRlZCBBUEsnKTtcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+d2luZG93KS5sb2NhdGlvbiA9IG5hdGl2ZVVSTCArICdteXMvbXlzLmh0bWwnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvYWQgbG9jYWwgQVBLJyk7XG4gICAgICAgICAgICAgICAgICAgICg8YW55PndpbmRvdykubG9jYXRpb24gPSAnLi9teXMuaHRtbCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgIH0pO1xuICAgIH1cbn0sIGZhbHNlKTsiXX0=
