export interface IBooklet {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  bookletFileUrl: string;
  authorId?: number;
  universityId?: number;
  createdAt?: Date;
  editAt?: Date;
}
