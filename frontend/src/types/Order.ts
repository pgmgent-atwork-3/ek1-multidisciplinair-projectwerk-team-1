type Order = {
  id: string;
  attributes: {
    price: number;
    user: {
      data: {
        id: string;
        attributes: {
          stamnr: string;
          username: string;
        };
      };
    }
    color_ring: {
      size: number;
      price: number;
      amount: number;
    }[];
    inox_ring: {
      size: number;
      price: number;
      amount: number;
    }[];
  }
}