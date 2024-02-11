export * from './gcp';

export interface IStorageService {
    /**
     * Uploads a file to the storage service.
     * @param bucket The bucket or container name where the file will be stored.
     * @param key The key or path under which to store the file.
     * @param body The file content.
     * @param contentType The MIME type of the file being uploaded.
     * @returns A promise that resolves with the URI of the uploaded file.
     */
    uploadFile(bucket: string, key: string, body: string, contentType: string): Promise<{ uri: string }>;

    /**
     * Generates a pre-signed URL for a file for temporary access.
     * @param bucket The bucket or container name where the file is stored.
     * @param key The key or path under which the file is stored.
     * @param expiry The expiration time in seconds for the pre-signed URL.
     * @param operation The operation that the pre-signed URL allows ('put' for upload, 'get' for download).
     * @returns A promise that resolves with the pre-signed URL.
     */
    // generatePresignedUrl(
    //   bucket: string,
    //   key: string,
    //   expiry: number,
    //   operation: "put" | "get"
    // ): Promise<string>;
}
