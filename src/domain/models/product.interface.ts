export interface IProduct {
  productId?: string;
  category: 'BOOKS' | 'COMPUTERS';
  name: string;
  type: 'PHYSICAL' | 'DIGITAL';
  bookDetails?: IBookDetails;
  productDetails?: IProductDetails;
  sku: string;
  description: string;
  price: number;
  brandId: string;
  hitCount: number;
  imageUrl: string;
  smallerImageUrl: string
  lastUpdatedTime: string;
}

export interface IBookDetails {
  isbn: string;
  authors: string;
  language: 'eng';
  genre: string;
  publisher: string;
  year: string;
  pageCount?: Number
}

export interface IProductDetails {
  sku: string;
  brandId: string;
}
