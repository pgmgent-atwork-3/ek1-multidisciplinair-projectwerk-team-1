type Product = {
  id: string;
  attributes: {
    image: {
      data: {
        attributes: {
          id: string;
          name: string;
          url: string;
        };
      };
    };
      amountAvailable: number;
      owner: {
        data: {
          id: string;
          attributes: {
            username: string;
          };
        };
      };
    name: string;
    available: boolean;
  };
};
