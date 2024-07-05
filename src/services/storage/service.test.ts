describe('initalizeStorageService', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.doMock('./local', () => ({
            LocalStorageService: jest.fn().mockImplementation(() => ({
                uploadFile: jest.fn(),
            })),
        }));
        jest.doMock('./gcp', () => ({
            GCPStorageService: jest.fn().mockImplementation(() => ({
                uploadFile: jest.fn(),
            })),
        }));
    });

    it('should return a LocalStorageService instance when the STORAGE_TYPE is local', () => {
        jest.doMock('../../config', () => {
            return {
                __esModule: true,
                STORAGE_TYPE: 'local',
            };
        });
        const { LocalStorageService } = require('./local');
        return import('../../config').then(() => {
            const initalizeStorageService = require('./service').initalizeStorageService;
            initalizeStorageService();

            expect(LocalStorageService).toHaveBeenCalledTimes(1);
        });
    });

    it('should return a GCPStorageService instance when the STORAGE_TYPE is gcp', () => {
        jest.doMock('../../config', () => {
            return {
                __esModule: true,
                STORAGE_TYPE: 'gcp',
            };
        });
        const { GCPStorageService } = require('./gcp');
        return import('../../config').then(() => {
            const initalizeStorageService = require('./service').initalizeStorageService;
            initalizeStorageService();

            expect(GCPStorageService).toHaveBeenCalledTimes(1);
        });
    });

    it('should throw an error when the STORAGE_TYPE is invalid', () => {
        jest.doMock('../../config', () => {
            return {
                __esModule: true,
                STORAGE_TYPE: 'invalid',
            };
        });
        return import('../../config').then(() => {
            const initalizeStorageService = require('./service').initalizeStorageService;
            expect(() => {
                initalizeStorageService();
            }).toThrow('Invalid storage type');
        });
    });
});
