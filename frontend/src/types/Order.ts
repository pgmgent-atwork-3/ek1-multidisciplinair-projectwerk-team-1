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

type OrderQuery = {
  id: string;
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
  month: number;
  payment: string;
  user: string;
  totaal: number;
  year: number;
}