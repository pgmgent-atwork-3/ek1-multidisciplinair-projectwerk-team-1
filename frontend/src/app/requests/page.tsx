import { getClient } from "@/lib/apolloServerClient";

import { GET_REQUESTS } from "@/lib/queries/requests";
import RequestList from "../components/RequestList";

const Page = async () => {
  const { data } = await getClient().query({
    query: GET_REQUESTS,
    context: {
      fetchOptions: {
        next: { revalidate: 0 },
      },
    },
    variables: {
      filters: {
        product: {
          owner: {
            id: {
              eq: 1,
            },
          },
        },
      },
    },
  });

  return (
    <>
    <RequestList requests={data.requests.data} />
    </>
  )
};

export default Page;
