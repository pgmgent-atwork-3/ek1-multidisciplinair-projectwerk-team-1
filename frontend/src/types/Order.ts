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
    color_ring: JSON;
    inox_ring: JSON;
  }
}