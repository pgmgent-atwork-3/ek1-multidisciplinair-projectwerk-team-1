export type RequestItem = {
  id: string;
  attributes: {
    amountRequested: number;
    status: string;
    hirer: {
      data: {
        id: string;
        attributes: {
          username: string;
        };
      };
    };
    product: {
      data: {
        id: string;
        attributes: {
          name: string;
          image: {
            data: {
              attributes: {
                name: string;
                url: string;
              };
            };
          };
        };
      };
    };
    user: {
      data: {
        id: string;
        attributes: {
          username: string;
        };
      };
    };
  };
};
