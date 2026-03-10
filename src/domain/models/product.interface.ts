export interface IProduct {
  productId?: string;
  category: 'BOOKS' | 'COMPUTERS';
  brandId?: string; // Deprecated
  name: string;
  type: 'PHYSICAL' | 'DIGITAL';
  bookDetails?: IBookDetails;
  mobileDetails?: IMobileDetails;
  productDetails?: IProductDetails;
  sku?: string; // Deprecated
  description: string;
  price: number;
  hitCount: number;
  imageUrl: string;
  smallImageUrl: string
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

export interface IMobileDetails {
  brandId: string;
  model: string;
  sizeInches: number;
  displayRes: string;
  cpuType: string;
  memoryGB: number;
  storageGB: number;
  batteryMah: number;
  color: string;
  weightGm: number;
}
