//type.ts
export interface ProductProps {
  _id: string;
  _type: string;
  _rev: string;
  _createdAt: string;
  price: number;
  rowprice: number;
  title: string;
  position: string;
  ratings: number;
  description: string;
  slug: {
    current: string;
    _type: string;
  };
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  category: string;
  brand: string;
  isnew: boolean;
  body: any;
  quantity: number;
}
export interface CategoryProps {
  _id: string;
  _type: string;
  _rev: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  image: {
    _type: string;
    asset: {
      _type: string;
      _ref: string;
    };
  };
}
export interface StateProps {
  mojoy: {
    productData: ProductProps[];
    categoryData: CategoryProps[];
    totalAmount: number; // Add totalAmount property
  };
}
