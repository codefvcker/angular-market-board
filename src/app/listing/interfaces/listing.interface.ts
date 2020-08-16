export interface Ilisting {
  title: string;
  price: number;
  description: string;
  isNew: boolean;
  authorId: string;
  photosUrls?: string[];
  categoryId: string;
  cityId: string;
}
