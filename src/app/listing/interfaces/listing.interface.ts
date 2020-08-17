export interface Ilisting {
  title: string;
  price: number;
  description: string;
  state: boolean;
  authorId: string;
  photosUrls?: string[];
  categoryId: string;
  cityId: string;
  isVip?: boolean;
}
