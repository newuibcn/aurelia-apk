/**
 * Created by alexvizcaino on 17/3/16.
 */
import {IFileTransfer, Manifest, IFileSystem, NetworkInformation} from "auto-updater";
import {Autoupdater} from "../../src/core/cordova/auto-update";

var expect = chai.expect;

var mochaAsync = <T>(p:Promise<T>, done, fn:(r:T) => any) => {
    p.then(x => {
        fn(x);
        done();
    }).catch(e => {
        done(e);
    });
}

class FileTransferStub implements IFileTransfer {
    download(src:string, target:string, trustAllHosts?:boolean, options?:any):Promise<boolean> {
        return Promise.resolve(null);
    }
}
class FileSystemStub implements IFileSystem {
    openFile(path:string):Promise<string> {
        return Promise.resolve(null);
    }

    removeFile(path:string):Promise<boolean> {
        return Promise.resolve(null);
    }

    downloadFile(origPath: string, destPath: string): Promise<boolean>{
        return Promise.resolve(null);
    }

    copyDirectory(origPath: string, destPath: string): Promise<boolean>{
        return Promise.resolve(null);
    }

    copyFile(directory: any, entry: any): Promise<boolean>{
        return Promise.resolve(null);
    }
}

var manifest1:Manifest = null;
var manifest2:Manifest = null;
var networkInformation:NetworkInformation = null;

describe('auto update fixture', () => {
    beforeEach(() => {
        manifest1 = {
            version: '1.0',
            files: {
                file1: {
                    filename: 'file1',
                    version: '1.0'
                }
            }
        };
        manifest2 = {
            version: '2.0',
            files: {
                file1: {
                    filename: 'file1',
                    version: '2.0'
                }
            }
        };
        networkInformation = {
            isConnected: true
        };
    });

    it("Copy Manifest to Local Storage should call Copy File", done => {
        let fs = new FileSystemStub();
        let stub = sinon.stub(fs, 'downloadFile', (s,t)=> {
            return Promise.resolve(true);
        });
        let openFileStub = sinon.stub(fs, 'openFile', (p) => {
            return Promise.resolve(JSON.stringify(manifest1));
        })
        var sut = new Autoupdater(null, fs, null, '', '');
        mochaAsync(sut.copyManifestToLocalStorage('','',''), done, (res) => {
            expect(stub.called).to.be.true;
            expect(stub.callCount).to.be.eq(2); //one for manifest, one for the file in manifest
            expect(res).to.be.true;
        })
    });

    it("Copy Manifest To Local Storage should return false if cannot copy a file", done => {
        let fs = new FileSystemStub();
        let openFileStub = sinon.stub(fs, 'openFile', (p) => {
            return Promise.resolve(JSON.stringify(manifest1));
        });
        let downloadFileStub = sinon.stub(fs, 'downloadFile');
        downloadFileStub.withArgs('/file1','/file1').returns(Promise.resolve(true));
        downloadFileStub.withArgs('/manifest.json','/manifest.json').returns(Promise.resolve(false));
        var sut = new Autoupdater(null, fs, null, '', '');
        mochaAsync(sut.copyManifestToLocalStorage('','',''), done, (res) => {
            expect(downloadFileStub.callCount).to.be.eq(2); //one for manifest, one for the file in manifest
            expect(res).to.be.false;
        });
    })

    it("Check New Version should return false if versions are equal", done => {
        let fs = new FileSystemStub();
        let stub = sinon.stub(fs, 'openFile', (p) => {
            return Promise.resolve(JSON.stringify(manifest1));
        });
        var sut = new Autoupdater(null, fs, networkInformation, '', '');
        mochaAsync(sut.checkNewVersion('local', 'remote'), done, (res) => {
            expect(res).to.be.false;
            expect(stub.calledTwice).to.be.true;
        });
    });

    it("Check New Version should return true if versions are different", done => {
        let fs = new FileSystemStub();
        let stub = sinon.stub(fs, 'openFile');
        stub.withArgs('remote').returns(Promise.resolve(JSON.stringify(manifest2)));
        stub.withArgs('local').returns(Promise.resolve(JSON.stringify(manifest1)));
        var sut = new Autoupdater(null, fs, networkInformation, '', '');
        mochaAsync(sut.checkNewVersion('local', 'remote'), done, (res) => {
            expect(res).to.be.true;
            expect(stub.calledTwice).to.be.true;
        });
    });

    it("Check New Version should return false if device not connected", done => {
        networkInformation.isConnected = false;
        let fs = new FileSystemStub();
        let stub = sinon.stub(fs, 'openFile');
        var sut = new Autoupdater(null, fs, networkInformation, '', '');
        mochaAsync(sut.checkNewVersion('local', 'remote'), done, (res) => {
            expect(res).to.be.false;
            expect(stub.called).to.be.false;
        })
    });

    it("Check New Version should return false if remote manifest download fails", done => {
        let fs = new FileSystemStub();
        let stub = sinon.stub(fs, 'openFile');
        stub.withArgs('remote').throws('Error');
        stub.withArgs('local').returns(Promise.resolve(JSON.stringify(manifest1)));
        var sut = new Autoupdater(null, fs, networkInformation, '', '');
        mochaAsync(sut.checkNewVersion('local', 'remote'), done, (res) => {
            expect(res).to.be.false;
            expect(stub.calledOnce).to.be.true;
        });
    });

    it("Update files should keep local version of unchanged files", done => {
        let ft = new FileTransferStub();
        let stub = sinon.stub(ft, 'download', (src, trg) => {
            return Promise.resolve(true);
        })
        var sut = new Autoupdater(ft, null, null, '', '');
        sut.localManifest = manifest1;
        manifest2.files.file1.version = '1.0';
        sut.remoteManifest = manifest2;
        mochaAsync(sut.updateFiles('', ''), done, () => {
            expect(stub.called).to.be.false;
        });
    });

    it("Update Files replaces out of date files", done => {
        let ft = new FileTransferStub();
        let fs = new FileSystemStub();
        let stub = sinon.stub(ft, 'download', (src, trg) => {
            return Promise.resolve(true);
        });
        var sut = new Autoupdater(ft, fs, null, '', '');
        sut.localManifest = manifest1;
        sut.remoteManifest = manifest2;
        mochaAsync(sut.updateFiles('', ''), done, () => {
            expect(stub.calledOnce).to.be.true;
        });
    });

    it("Update Files downloads new files", done => {
        let ft = new FileTransferStub();
        let stub = sinon.stub(ft, 'download', (src, trg) => {
            return Promise.resolve(true);
        });
        var sut = new Autoupdater(ft, null, null, '', '');
        sut.localManifest = manifest1;
        manifest2.files.file2 = {
            filename: 'file2',
            version: '1.0'
        };
        manifest2.files.file1.version = '1.0';
        sut.remoteManifest = manifest2;
        mochaAsync(sut.updateFiles('',''), done, () => {
            expect(stub.calledOnce).to.be.true;
        });
    });

    it("Update Files removes deprecated files", done => {
        let ft = new FileTransferStub();
        let fs = new FileSystemStub();
        let stub = sinon.stub(fs, 'removeFile', (src) => {
            return Promise.resolve(true);
        });
        var sut = new Autoupdater(ft, fs, null, '', '');
        manifest1.files.file0 = {
            filename: 'file0',
            version: '1.0'
        };
        sut.localManifest = manifest1;
        manifest2.files.file1.version = '1.0';
        sut.remoteManifest = manifest2;
        mochaAsync(sut.updateFiles('',''), done, () => {
            expect(stub.calledOnce).to.be.true;
        });
    });

    it("Autoupdate doesn't call Update Files if Check New Version is false", done => {
        var sut = new Autoupdater(null, null, null, '', '');
        let copyManifestToLocalStorageStub = sinon.stub(sut, 'copyManifestToLocalStorage', (s,t) => {
            return Promise.resolve(true);
        });
        let checkNewVersionStub = sinon.stub(sut, 'checkNewVersion', (src, trg) => {
            return Promise.resolve(false);
        });
        let updateFilesStub = sinon.stub(sut, 'updateFiles');
        mochaAsync(sut.autoupdate('', '', ''), done, () => {
            expect(copyManifestToLocalStorageStub.called).to.be.true;
            expect(checkNewVersionStub.called).to.be.true;
            expect(updateFilesStub.called).to.be.false;
        });
    });

    it("Autoupdate calls Do Backup if Check New Version is true", done => {
        var sut = new Autoupdater(null, null, null, '', '');
        let copyManifestToLocalStorageStub = sinon.stub(sut, 'copyManifestToLocalStorage', (s,t) => {
            return Promise.resolve(true);
        });
        let checkNewVersionStub = sinon.stub(sut, 'checkNewVersion', (src, trg) => {
            return Promise.resolve(true);
        });
        let doBackupStub = sinon.stub(sut, 'doBackup');
        mochaAsync(sut.autoupdate('', '', ''), done, () => {
            expect(copyManifestToLocalStorageStub.called).to.be.true;
            expect(checkNewVersionStub.called).to.be.true;
            expect(doBackupStub.called).to.be.true;
        });
    });

    it("Autoupdate aborts Update Files and calls Restore Backup if Backup fails", done => {
        var sut = new Autoupdater(null, null, null, '', '');
        let copyManifestToLocalStorageStub = sinon.stub(sut, 'copyManifestToLocalStorage', (s,t) => {
            return Promise.resolve(true);
        });
        let checkNewVersionStub = sinon.stub(sut, 'checkNewVersion', (src, trg) => {
            return Promise.resolve(true);
        });
        let updateFilesStub = sinon.stub(sut, 'updateFiles');
        let doBackupStub = sinon.stub(sut, 'doBackup');
        let restoreBackupStub = sinon.stub(sut, 'restoreBackup');
        doBackupStub.throws('Error');
        mochaAsync(sut.autoupdate('', '', ''), done, () => {
            expect(copyManifestToLocalStorageStub.called).to.be.true;
            expect(checkNewVersionStub.called).to.be.true;
            expect(doBackupStub.called).to.be.true;
            expect(updateFilesStub.called).to.be.false;
            expect(restoreBackupStub.called).to.be.true;
        });
    });

    it("Autoupdate calls Restore Backup when Update Files fails", done => {
        var sut = new Autoupdater(null, null, null, '', '');
        let copyManifestToLocalStorageStub = sinon.stub(sut, 'copyManifestToLocalStorage', (s,t) => {
            return Promise.resolve(true);
        });
        let checkNewVersionStub = sinon.stub(sut, 'checkNewVersion', (src, trg) => {
            return Promise.resolve(true);
        });
        let doBackupStub = sinon.stub(sut, 'doBackup', () => {
            return Promise.resolve(true);
        });
        let restoreBackupStub = sinon.stub(sut, 'restoreBackup');
        let updateFilesStub = sinon.stub(sut, 'updateFiles');
        updateFilesStub.throws('Error');
        mochaAsync(sut.autoupdate('', '', ''), done, () => {
            expect(copyManifestToLocalStorageStub.called).to.be.true;
            expect(checkNewVersionStub.called).to.be.true;
            expect(doBackupStub.called).to.be.true;
            expect(updateFilesStub.called).to.be.true;
            expect(restoreBackupStub.called).to.be.true;
        });
    });

    /*it("Do Backup should return false if directory is not found", done => {
     let fs = new FileSystemStub();
     let stub = sinon.stub(fs, 'openDirectory');
     stub.throws('Error');
     var sut = new Autoupdater(null, fs, null, '', '');
     mochaAsync(sut.doBackup('dist'), done, (res) => {
     expect(res).to.be.false;
     });
     })

     it("Do Backup should call Move Files if directory is found", done => {
     let fs = new FileSystemStub();
     let openDirectoryStub = sinon.stub(fs, 'openDirectory', () => {
     return Promise.resolve(true);
     });
     let moveFilesStub = sinon.stub(fs, 'moveFiles');
     var sut = new Autoupdater(null, fs, null, '', '');
     mochaAsync(sut.doBackup('dist'), done, (res) => {
     expect(openDirectoryStub.called).to.be.true;
     expect(moveFilesStub.called).to.be.true;
     expect(res).to.be.true;
     })
     })

     it("Restore Backup fails if directory is not found", done => {
     let fs = new FileSystemStub();
     let stub = sinon.stub(fs, 'openDirectory');
     stub.throws('Error');
     var sut = new Autoupdater(null, fs, null, '', '');
     mochaAsync(sut.restoreBackup('dist-backup'), done, (res) => {
     expect(res).to.be.false;
     });
     })

     it("Restore Backup should call Move Files if directory is found", done => {
     let fs = new FileSystemStub();
     let openDirectoryStub = sinon.stub(fs, 'openDirectory', () => {
     return Promise.resolve(true);
     });
     let moveFilesStub = sinon.stub(fs, 'moveFiles');
     var sut = new Autoupdater(null, fs, null, '', '');
     mochaAsync(sut.restoreBackup('dist-backup'), done, (res) => {
     expect(openDirectoryStub.called).to.be.true;
     expect(moveFilesStub.called).to.be.true;
     expect(res).to.be.true;
     })
     })*/
});