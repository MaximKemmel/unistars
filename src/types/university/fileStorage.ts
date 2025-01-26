export interface IFileStorage {
  id?: number;
  cloudFileName?: string;
  originalFileName?: string; //TODO: 255 символов
  bucketName?: string; //TODO: 50 символов
}