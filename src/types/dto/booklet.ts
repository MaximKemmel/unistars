export interface IBooklet {
  id: number;
  authorId?: number;
  universityId?: number;
  title?: string;
  bookletFileUrl?: string;
  imageUrl?: string;
  description?: string;
  createdAt?: Date;
  editAt?: Date;
}