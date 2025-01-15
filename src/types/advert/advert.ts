export interface IAdvert {
  id?: number;
  universityId: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  screenDestination: string[];
  websiteUrl?: string;
  bannerSize?: string;
  clickLimit?: number;
  clickLimitByUser?: string;
  showsLimit?: number;
  showsLimitByUser?: number;
  allShows?: number;
  uniqueShows?: number;
  allClicks?: number;
  uniqueClicks?: number;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  editAt?: Date;
  deletedAt?: Date;
  closed?: boolean;
}
