export class Brands {
  name: string = '';
  imageUrl: string = '';
  stores: Stores[] = [];
}

export class Stores {
  name: string = '';
  address: string = '';
  storeId?: number = 0;
}

export class Product {
  id: number = 0;
  Name: string = '';
}

export class ProductMapped {
  id: number = 0;
  Name: string = '';
  Code: string = '';

}

export class Lokacije {
  city: string = '';
  stores: Stores[] = [];
}

export class CurrentPromotionsFlat {
  brand: string = '';
  address: string = '';
  storeId: number = 0;
  imageUrl: string = '';
  name: string = '';
  time: string = '';
}


