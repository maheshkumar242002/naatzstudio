export type CategoryId = 
  | 'frames'
  | 'gifts'
  | 'posters'
  | 'mobile'
  | 'service'
  | 'albums'
  | 'anime'
  | 'cars';

export type Model3DType = 'frame' | 'car' | 'anime' | 'mug' | 'camera' | 'phone';

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  inStock: boolean;
  description: string;
  features: string[];
  model3DType: Model3DType;
  customizable?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNote?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  customizationDetails: string;
  paymentMethod: 'whatsapp_pay' | 'cod' | 'upi';
}
