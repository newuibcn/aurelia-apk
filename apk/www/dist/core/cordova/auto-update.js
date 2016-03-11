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
                else {
                    return Promise.resolve();
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
            });
        }, function (e) {
            console.log(e);
        });
    }
}, false);
//# sourceMappingURL=auto-update.js.map
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS9jb3Jkb3ZhL2F1dG8tdXBkYXRlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlcyI6WyJjb3JlL2NvcmRvdmEvYXV0by11cGRhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0E7SUFDSSxxQkFBb0IsYUFBNEIsRUFBVSxXQUF3QixFQUFVLG1CQUF1QyxFQUMvRyxjQUFzQixFQUFVLFVBQWtCO1FBRGxELGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBQy9HLG1CQUFjLEdBQWQsY0FBYyxDQUFRO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBUTtJQUN0RSxDQUFDO0lBRVksZ0NBQVUsR0FBdkIsVUFBd0IscUJBQTZCLEVBQUUsaUJBQXlCLEVBQUUsa0JBQTBCOztZQUN4RyxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLHFCQUFxQixFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDbEgsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztnQkFDUCxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDLENBQUM7Z0JBQzNFLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7b0JBQ1AsSUFBRyxDQUFDO3dCQUNBLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQzt3QkFDcEQsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQzs0QkFDUCxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUscUJBQXFCLENBQUMsQ0FBQzs0QkFDeEUsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDO2dDQUNO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ZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsVUFBQyxVQUFVO1lBQ3RFLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3BDLE1BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1lBQ3BDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxlQUFlLENBQUM7aUJBQzFHLElBQUksQ0FBQztnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzFCLE1BQU8sQ0FBQyxRQUFRLEdBQUcsU0FBUyxHQUFHLGNBQWMsQ0FBQztZQUN4RCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUVsQyxDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUMsRUFBRSxVQUFDLENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztBQUNMLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBhbGV4dml6Y2Fpbm8gb24gMTEvMy8xNi5cbiAqL1xuaW1wb3J0IHtJRmlsZVRyYW5zZmVyLCBJRmlsZVN5c3RlbSwgVHJhY2tlZEZpbGUsIE1hbmlmZXN0LCBOZXR3b3JrSW5mb3JtYXRpb24sIEZpbGVFbnRyeSwgRmlsZVN5c3RlbSwgRGlyZWN0b3J5RW50cnksIEVudHJ5fSBmcm9tIFwiYXV0by11cGRhdGVyXCI7XG5cbmNsYXNzIEF1dG91cGRhdGVye1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2ZpbGVUcmFuc2ZlcjogSUZpbGVUcmFuc2ZlciwgcHJpdmF0ZSBfZmlsZVN5c3RlbTogSUZpbGVTeXN0ZW0sIHByaXZhdGUgX25ldHdvcmtJbmZvcm1hdGlvbjogTmV0d29ya0luZm9ybWF0aW9uLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX3Jvb3REaXJlY3Rvcnk6IHN0cmluZywgcHJpdmF0ZSBfc2VydmVyVXJsOiBzdHJpbmcpe1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBhdXRvdXBkYXRlKGxvY2FsU3RvcmFnZURpcmVjdG9yeTogc3RyaW5nLCBsb2NhbE1hbmlmZXN0UGF0aDogc3RyaW5nLCByZW1vdGVNYW5pZmVzdFBhdGg6IHN0cmluZyk6UHJvbWlzZTx2b2lkPntcbiAgICAgICAgdmFyIHJlc3VsdCA9IGF3YWl0IHRoaXMuY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2UodGhpcy5fcm9vdERpcmVjdG9yeSwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5LCBsb2NhbE1hbmlmZXN0UGF0aCk7XG4gICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLmNoZWNrTmV3VmVyc2lvbihsb2NhbE1hbmlmZXN0UGF0aCwgcmVtb3RlTWFuaWZlc3RQYXRoKTtcbiAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLmRvQmFja3VwKGxvY2FsU3RvcmFnZURpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdCl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLnVwZGF0ZUZpbGVzKHRoaXMuX3NlcnZlclVybCwgbG9jYWxTdG9yYWdlRGlyZWN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMucmVzdG9yZUJhY2t1cChsb2NhbFN0b3JhZ2VEaXJlY3RvcnkgKyAnLWJhY2t1cCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnJlc3RvcmVCYWNrdXAodGhpcy5fcm9vdERpcmVjdG9yeSArICctYmFja3VwJyk7XG4gICAgICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChudWxsKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgY29weU1hbmlmZXN0VG9Mb2NhbFN0b3JhZ2Uocm9vdERpcmVjdG9yeTogc3RyaW5nLCBsb2NhbFN0b3JhZ2VEaXJlY3Rvcnk6IHN0cmluZywgbG9jYWxNYW5pZmVzdFBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIGxldCBsb2NhbE1hbmlmZXN0Q29udGVudCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0ub3BlbkZpbGUobG9jYWxNYW5pZmVzdFBhdGgpO1xuICAgICAgICBsZXQgbG9jYWxNYW5pZmVzdCA9IDxNYW5pZmVzdD5KU09OLnBhcnNlKGxvY2FsTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgbGV0IGZpbGVzOiBUcmFja2VkRmlsZVtdID0gW107XG5cbiAgICAgICAgZm9yKGxldCBmaWxlIGluIGxvY2FsTWFuaWZlc3QuZmlsZXMpe1xuICAgICAgICAgICAgZmlsZXMucHVzaChsb2NhbE1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5kb3dubG9hZEZpbGUocm9vdERpcmVjdG9yeSArICcvJyArIGZpbGVzW2ldLmZpbGVuYW1lLCBsb2NhbFN0b3JhZ2VEaXJlY3RvcnkgKyAnLycgKyBmaWxlc1tpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLmRvd25sb2FkRmlsZShyb290RGlyZWN0b3J5ICsgJy9tYW5pZmVzdC5qc29uJywgbG9jYWxTdG9yYWdlRGlyZWN0b3J5ICsgJy9tYW5pZmVzdC5qc29uJyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIGRvQmFja3VwKHBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLmNvcHlEaXJlY3RvcnkocGF0aCwgcGF0aCArICctYmFja3VwJyk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGFzeW5jIHJlc3RvcmVCYWNrdXAoYmFja3VwUGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPntcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0uY29weURpcmVjdG9yeShiYWNrdXBQYXRoLCBiYWNrdXBQYXRoLnN1YnN0cigwLCBiYWNrdXBQYXRoLmluZGV4T2YoJy0nKSkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdGVNYW5pZmVzdDogTWFuaWZlc3Q7XG4gICAgcHVibGljIGxvY2FsTWFuaWZlc3Q6IE1hbmlmZXN0O1xuXG4gICAgcHVibGljIGFzeW5jIGNoZWNrTmV3VmVyc2lvbihsb2NhbFBhdGg6IHN0cmluZywgcmVtb3RlUGF0aDogc3RyaW5nKTpQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAgICAgaWYoIXRoaXMuX25ldHdvcmtJbmZvcm1hdGlvbi5pc0Nvbm5lY3RlZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICBsZXQgcmVtb3RlTWFuaWZlc3RDb250ZW50ID0gYXdhaXQgdGhpcy5fZmlsZVN5c3RlbS5vcGVuRmlsZShyZW1vdGVQYXRoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW90ZU1hbmlmZXN0ID0gPE1hbmlmZXN0PkpTT04ucGFyc2UocmVtb3RlTWFuaWZlc3RDb250ZW50KTtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYWxNYW5pZmVzdENvbnRlbnQgPSBhd2FpdCB0aGlzLl9maWxlU3lzdGVtLm9wZW5GaWxlKGxvY2FsUGF0aCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbE1hbmlmZXN0ID0gPE1hbmlmZXN0PkpTT04ucGFyc2UobG9jYWxNYW5pZmVzdENvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdmVyc2lvbnMgb2YgbWFuaWZlc3RzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVtb3RlTWFuaWZlc3QudmVyc2lvbiAhPT0gdGhpcy5sb2NhbE1hbmlmZXN0LnZlcnNpb247XG4gICAgICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgdXBkYXRlRmlsZXMoc2VydmVyOiBzdHJpbmcsIGxvY2FsU3RvcmFnZVBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIGxldCBsb2NhbEZpbGVzOiBUcmFja2VkRmlsZVtdID0gW107XG4gICAgICAgIGxldCByZW1vdGVGaWxlczogVHJhY2tlZEZpbGVbXSA9IFtdO1xuICAgICAgICBsZXQgcmVzdWx0OiBib29sZWFuO1xuXG4gICAgICAgIGZvcihsZXQgZmlsZSBpbiB0aGlzLmxvY2FsTWFuaWZlc3QuZmlsZXMpe1xuICAgICAgICAgICAgbG9jYWxGaWxlcy5wdXNoKHRoaXMubG9jYWxNYW5pZmVzdC5maWxlc1tmaWxlXSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBmaWxlIGluIHRoaXMucmVtb3RlTWFuaWZlc3QuZmlsZXMpe1xuICAgICAgICAgICAgcmVtb3RlRmlsZXMucHVzaCh0aGlzLnJlbW90ZU1hbmlmZXN0LmZpbGVzW2ZpbGVdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbGVzIHRvIGJlIHJlbW92ZWRcbiAgICAgICAgbGV0IGZpbGVzVG9SZW1vdmU6IFRyYWNrZWRGaWxlW10gPSBsb2NhbEZpbGVzLmZpbHRlcigobGY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICBsZXQgZm91bmRzID0gcmVtb3RlRmlsZXMuZmlsdGVyKChyZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmYuZmlsZW5hbWUgPT0gbGYuZmlsZW5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZHMubGVuZ3RoID09IDA7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBmaWxlc1RvUmVtb3ZlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHRoaXMuX2ZpbGVTeXN0ZW0ucmVtb3ZlRmlsZShsb2NhbFN0b3JhZ2VQYXRoICsgJy8nICsgZmlsZXNUb1JlbW92ZVtpXS5maWxlbmFtZSk7XG4gICAgICAgICAgICBpZighcmVzdWx0KVxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaWxlcyB0byBiZSB1cGRhdGVkXG4gICAgICAgIGxldCBmaWxlc1RvVXBkYXRlOiBUcmFja2VkRmlsZVtdID0gcmVtb3RlRmlsZXMuZmlsdGVyKChyZjogVHJhY2tlZEZpbGUpID0+IHtcbiAgICAgICAgICAgIGxldCBmb3VuZHMgPSBsb2NhbEZpbGVzLmZpbHRlcigobGY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJmLmZpbGVuYW1lID09IGxmLmZpbGVuYW1lICYmIHJmLnZlcnNpb24gIT0gbGYudmVyc2lvbjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kcy5sZW5ndGggPiAwO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZmlsZXNUb1VwZGF0ZS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICByZXN1bHQgPSBhd2FpdCB0aGlzLl9maWxlVHJhbnNmZXIuZG93bmxvYWQoc2VydmVyICsgZmlsZXNUb1VwZGF0ZVtpXS5maWxlbmFtZSwgbG9jYWxTdG9yYWdlUGF0aCArICcvJyArIGZpbGVzVG9VcGRhdGVbaV0uZmlsZW5hbWUpO1xuICAgICAgICAgICAgaWYoIXJlc3VsdClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlsZXMgdG8gYmUgZG93bmxvYWRlZFxuICAgICAgICBsZXQgZmlsZXNUb0FkZDogVHJhY2tlZEZpbGVbXSA9IHJlbW90ZUZpbGVzLmZpbHRlcigocmY6IFRyYWNrZWRGaWxlKSA9PiB7XG4gICAgICAgICAgICBsZXQgZm91bmRzID0gbG9jYWxGaWxlcy5maWx0ZXIoKGxmOiBUcmFja2VkRmlsZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZi5maWxlbmFtZSA9PSBsZi5maWxlbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZvdW5kcy5sZW5ndGggPT0gMDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGZpbGVzVG9BZGQubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgcmVzdWx0ID0gYXdhaXQgdGhpcy5fZmlsZVRyYW5zZmVyLmRvd25sb2FkKHNlcnZlciArIGZpbGVzVG9BZGRbaV0uZmlsZW5hbWUsIGxvY2FsU3RvcmFnZVBhdGggKyAnLycgKyBmaWxlc1RvQWRkW2ldLmZpbGVuYW1lKTtcbiAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNsYXNzIEZpbGVTeXN0ZW1TZXJ2aWNlIGltcGxlbWVudHMgSUZpbGVTeXN0ZW17XG4gICAgcHJpdmF0ZSB4aHI6IFhNTEh0dHBSZXF1ZXN0O1xuICAgIHByaXZhdGUgX2ZzOiBGaWxlU3lzdGVtSW1wbDtcbiAgICBwcml2YXRlIF9mdDogRmlsZVRyYW5zZmVyU2VydmljZTtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHRoaXMuX2ZzID0gbmV3IEZpbGVTeXN0ZW1JbXBsKCk7XG4gICAgICAgIHRoaXMuX2Z0ID0gbmV3IEZpbGVUcmFuc2ZlclNlcnZpY2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb3BlbkZpbGUocGF0aDpzdHJpbmcpOlByb21pc2U8c3RyaW5nPntcbiAgICAgICAgdGhpcy54aHIub3BlbignR0VUJywgcGF0aCk7XG4gICAgICAgIHRoaXMueGhyLnNlbmQoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy54aHIub25lcnJvciA9IChldikgPT57XG4gICAgICAgICAgICAgICAgcmVqZWN0KCdFcnJvciBnZXR0aW5nIGZpbGUgZnJvbSAnICsgcGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnhoci5vbmxvYWQgPSAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy54aHIuc3RhdHVzIDwgMjAwIHx8IHRoaXMueGhyLnN0YXR1cyA+PSAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHRoaXMueGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy54aHIucmVzcG9uc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyByZW1vdmVGaWxlKHBhdGg6c3RyaW5nKTpQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fZnMuZ2V0RmlsZShwYXRoLCB7Y3JlYXRlOmZhbHNlLCBleGNsdXNpdmU6IGZhbHNlfSlcbiAgICAgICAgICAgICAgICAudGhlbigoZmlsZUVudHJ5OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZUVudHJ5LnJlbW92ZSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxuICAgICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgYXN5bmMgZG93bmxvYWRGaWxlKG9yaWdQYXRoOiBzdHJpbmcsIGRlc3RQYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICAvKipcbiAgICAgICAgICogMS4gQ2hlY2sgaWYgZmlsZSBleGlzdHMgaW4gb3JpZ2luXG4gICAgICAgICAqIDIuIElmIG5vdCwgcmVzb2x2ZShmYWxzZSlcbiAgICAgICAgICogMy4gRWxzZVxuICAgICAgICAgKiA0LiBEb3dubG9hZCBpbiBkZXN0aW5hdGlvbiBmb2xkZXJcbiAgICAgICAgICovXG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2Z0LmRvd25sb2FkKG9yaWdQYXRoLCBkZXN0UGF0aClcbiAgICAgICAgICAgICAgICAudGhlbigocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb3B5RmlsZShkaXJlY3Rvcnk6IERpcmVjdG9yeUVudHJ5LCBlbnRyeTogRW50cnkpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZW50cnkuY29weVRvKGRpcmVjdG9yeSwgZW50cnkubmFtZSwgKGVudHJ5OiBFbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBhc3luYyBjb3B5RGlyZWN0b3J5KG9yaWdQYXRoOiBzdHJpbmcsIGRlc3RQYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgICAgICBsZXQgZW50cmllczogRW50cnlbXSA9IGF3YWl0IHRoaXMuX2ZzLmdldERpcmVjdG9yeUVudHJpZXMob3JpZ1BhdGgsIHtjcmVhdGU6IGZhbHNlLCBleGNsdXNpdmU6IGZhbHNlfSk7XG4gICAgICAgIGxldCBkZXN0RGlyZWN0b3J5OiBEaXJlY3RvcnlFbnRyeSA9IGF3YWl0IHRoaXMuX2ZzLmdldERpcmVjdG9yeShkZXN0UGF0aCwge2NyZWF0ZTogdHJ1ZSwgZXhjbHVzaXZlOiBmYWxzZX0pO1xuICAgICAgICBpZihlbnRyaWVzICYmIGRlc3REaXJlY3Rvcnkpe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGVudHJpZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGxldCBlbnRyeSA9IGVudHJpZXNbaV07XG4gICAgICAgICAgICAgICAgaWYoZW50cnkuaXNEaXJlY3Rvcnkpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdGhpcy5jb3B5RGlyZWN0b3J5KG9yaWdQYXRoICsgJy8nICsgZW50cnkubmFtZSwgZGVzdFBhdGggKyAnLycgKyBlbnRyeS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdGhpcy5jb3B5RmlsZShkZXN0RGlyZWN0b3J5LCBlbnRyeSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKCFyZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5kZWNsYXJlIHZhciBMb2NhbEZpbGVTeXN0ZW07XG5kZWNsYXJlIHZhciBjb3Jkb3ZhO1xuY2xhc3MgRmlsZVRyYW5zZmVyU2VydmljZSBpbXBsZW1lbnRzIElGaWxlVHJhbnNmZXJ7XG4gICAgcHJpdmF0ZSBfdHJhbnNmZXI6IGFueTtcbiAgICBwcml2YXRlIF9zeXN0ZW06IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuX3RyYW5zZmVyID0gbmV3IEZpbGVUcmFuc2ZlckltcGwoKTtcbiAgICB9XG5cbiAgICBkb3dubG9hZChzcmM6c3RyaW5nLCB0YXJnZXQ6c3RyaW5nLCB0cnVzdEFsbEhvc3RzPzpib29sZWFuLCBvcHRpb25zPzphbnkpOlByb21pc2U8Ym9vbGVhbj57XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PntcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zZmVyLmRvd25sb2FkKHNyYywgdGFyZ2V0KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZhaWwoZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY2xhc3MgRmlsZVRyYW5zZmVySW1wbHtcbiAgICBwcml2YXRlIF9mczogRmlsZVN5c3RlbUltcGw7XG5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLl9mcyA9IG5ldyBGaWxlU3lzdGVtSW1wbCgpO1xuICAgIH1cbiAgICBkb3dubG9hZChzb3VyY2U6IHN0cmluZywgdGFyZ2V0OiBzdHJpbmcsIGhlYWRlcnM6IGFueSk6IFByb21pc2U8dm9pZD57XG4gICAgICAgIHZhciB3ID0gPGFueT53aW5kb3c7XG4gICAgICAgIHZhciB0cmFuc2ZlciA9IG5ldyB3LkZpbGVUcmFuc2ZlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZnMuZ2V0RmlsZSh0YXJnZXQsIHtjcmVhdGU6IHRydWUsIGV4Y2x1c2l2ZTogZmFsc2V9KS50aGVuKChmaWxlOiBhbnkpID0+e1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+e1xuICAgICAgICAgICAgICAgIHRyYW5zZmVyLmRvd25sb2FkKHNvdXJjZSwgZmlsZS5uYXRpdmVVUkwsIChzKSA9PntcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2b2lkKDApKTtcbiAgICAgICAgICAgICAgICB9LCAoZSkgPT57XG4gICAgICAgICAgICAgICAgICAgIGZpbGUucmVtb3ZlKCgpID0+e30sICgpID0+e30pO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSlcbiAgICAgICAgICAgICAgICB9LCB0cnVlLCBoZWFkZXJzKTtcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZvaWQgKDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLnRoZW4oKCkgPT57XG4gICAgICAgICAgICByZXR1cm4gdm9pZCAoMCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmNsYXNzIEZpbGVTeXN0ZW1JbXBse1xuICAgIGdldERpcmVjdG9yeShwYXRoOiBzdHJpbmcsIG9wdGlvbnMpOiBQcm9taXNlPERpcmVjdG9yeUVudHJ5PntcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0oTG9jYWxGaWxlU3lzdGVtLlBFUlNJU1RFTlQsIDAsIChmaWxlU3lzdGVtOiBGaWxlU3lzdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXRoKFtwYXRoXSwgZmlsZVN5c3RlbS5yb290LCBvcHRpb25zKS50aGVuKChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGlyZWN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0RGlyZWN0b3J5RW50cmllcyhwYXRoOiBzdHJpbmcsIG9wdGlvbnMpOiBQcm9taXNlPEVudHJ5W10+e1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgKDxhbnk+d2luZG93KS5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW06IEZpbGVTeXN0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBhdGgoW3BhdGhdLCBmaWxlU3lzdGVtLnJvb3QsIG9wdGlvbnMpLnRoZW4oKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlYWRlciA9IGRpcmVjdG9yeS5jcmVhdGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRlci5yZWFkRW50cmllcygoZW50cmllcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZW50cmllcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldEZpbGUocGF0aDpzdHJpbmcsIG9wdGlvbnMpOlByb21pc2U8RmlsZUVudHJ5PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAoPGFueT53aW5kb3cpLnJlcXVlc3RGaWxlU3lzdGVtKExvY2FsRmlsZVN5c3RlbS5QRVJTSVNURU5ULCAwLCAoZmlsZVN5c3RlbTpGaWxlU3lzdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGZvbGRlcnMgPSBwYXRoLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGVOYW1lID0gZm9sZGVyc1tmb2xkZXJzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGZvbGRlcnMgPSBmb2xkZXJzLnNsaWNlKDAsIGZvbGRlcnMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQYXRoKGZvbGRlcnMsIGZpbGVTeXN0ZW0ucm9vdCwgb3B0aW9ucykudGhlbigoZGlyZWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yeS5nZXRGaWxlKGZpbGVOYW1lLCBvcHRpb25zLCAoZmlsZTpGaWxlRW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihvcHRpb25zLmNyZWF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRQYXRoKGZvbGRlcnM6c3RyaW5nW10sIHBhcmVudDpEaXJlY3RvcnlFbnRyeSwgb3B0aW9uczphbnkpOlByb21pc2U8RGlyZWN0b3J5RW50cnk+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPERpcmVjdG9yeUVudHJ5PigocmVzb2x2ZSwgcmVqZWN0KSA9PntcbiAgICAgICAgICAgIHRoaXMuZ2V0U3ViRGlyZWN0b3J5KGZvbGRlcnMsIHBhcmVudCwgb3B0aW9ucywgMCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0U3ViRGlyZWN0b3J5KGZvbGRlcnM6IHN0cmluZ1tdLCBwYXJlbnREaXJlY3Rvcnk6IERpcmVjdG9yeUVudHJ5LCBvcHRpb25zOiBhbnkgLCBpbmRleDogbnVtYmVyLCByZXNvbHZlOiAoZGU6IERpcmVjdG9yeUVudHJ5KSA9PiB2b2lkLCByZWplY3Q6IChlOiBhbnkpID0+IHZvaWQpe1xuICAgICAgICBpZihmb2xkZXJzLmxlbmd0aCA+IGluZGV4KXtcbiAgICAgICAgICAgIHBhcmVudERpcmVjdG9yeS5nZXREaXJlY3RvcnkoZm9sZGVyc1tpbmRleF0sIG9wdGlvbnMsIChkaXJlY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3ViRGlyZWN0b3J5KGZvbGRlcnMsIGRpcmVjdG9yeSwgb3B0aW9ucywgaW5kZXgsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJlc29sdmUocGFyZW50RGlyZWN0b3J5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuY2xhc3MgTmV0d29ya0luZm9ybWF0aW9uU2VydmljZSBpbXBsZW1lbnRzIE5ldHdvcmtJbmZvcm1hdGlvbntcbiAgICBnZXQgaXNDb25uZWN0ZWQoKTogYm9vbGVhbntcbiAgICAgICAgbGV0IGNvbm5lY3Rpb24gPSAoPGFueT5uYXZpZ2F0b3IpLmNvbm5lY3Rpb247XG4gICAgICAgIHJldHVybiBjb25uZWN0aW9uLnR5cGUgIT0gXCJOT05FXCIgJiYgY29ubmVjdGlvbi50eXBlICE9IFwibm9uZVwiO1xuICAgIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlcmVhZHknLCAoKSA9PiB7XG4gICAgdmFyIGZzID0gbmV3IEZpbGVTeXN0ZW1TZXJ2aWNlKCk7XG4gICAgdmFyIGZ0ID0gbmV3IEZpbGVUcmFuc2ZlclNlcnZpY2UoKTtcbiAgICB2YXIgbmkgPSBuZXcgTmV0d29ya0luZm9ybWF0aW9uU2VydmljZSgpO1xuXG4gICAgdmFyIHBhcmFtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFttYW5pZmVzdF0nKTtcbiAgICBpZihwYXJhbXMpe1xuICAgICAgICB2YXIgYXV0b3VwZGF0ZXIgPSBuZXcgQXV0b3VwZGF0ZXIoZnQsIGZzLCBuaSwgY29yZG92YS5maWxlLmFwcGxpY2F0aW9uRGlyZWN0b3J5ICsgJ3d3dycsIHBhcmFtcy5nZXRBdHRyaWJ1dGUoJ3NlcnZlcicpKTtcbiAgICAgICAgKDxhbnk+d2luZG93KS5yZXF1ZXN0RmlsZVN5c3RlbSA9ICg8YW55PndpbmRvdykucmVxdWVzdEZpbGVTeXN0ZW0gfHwgKDxhbnk+d2luZG93KS53ZWJraXRSZXF1ZXN0RmlsZVN5c3RlbTtcbiAgICAgICAgKDxhbnk+d2luZG93KS5yZXF1ZXN0RmlsZVN5c3RlbShMb2NhbEZpbGVTeXN0ZW0uUEVSU0lTVEVOVCwgMCwgKGZpbGVTeXN0ZW0pPT4ge1xuICAgICAgICAgICAgdmFyIG5hdGl2ZVVSTCA9IGZpbGVTeXN0ZW0ucm9vdC5uYXRpdmVVUkw7XG4gICAgICAgICAgICAoPGFueT53aW5kb3cpLm5hdGl2ZVVSTCA9IG5hdGl2ZVVSTDtcbiAgICAgICAgICAgIGF1dG91cGRhdGVyLmF1dG91cGRhdGUoJ215cycsIHBhcmFtcy5nZXRBdHRyaWJ1dGUoJ21hbmlmZXN0JyksIHBhcmFtcy5nZXRBdHRyaWJ1dGUoJ3NlcnZlcicpICsgJ21hbmlmZXN0Lmpzb24nKVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvYWQgdXBkYXRlZCBBUEsnKTtcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+d2luZG93KS5sb2NhdGlvbiA9IG5hdGl2ZVVSTCArICdteXMvbXlzLmh0bWwnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xvYWQgbG9jYWwgQVBLJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vKDxhbnk+d2luZG93KS5sb2NhdGlvbiA9ICcuL215cy5odG1sJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgfSk7XG4gICAgfVxufSwgZmFsc2UpOyJdfQ==
