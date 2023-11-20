"use client";
import { RequestItem } from "@/types/RequestItem";
import RequestListItem from "./RequestListItem";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloClient";
import { useState } from "react";

const RequestList = ({ requests }: { requests: RequestItem[]}, ) => {
  const [showPending, setShowPending] = useState(true);
  const [showAccepted, setShowAccepted] = useState(true);
  const [showDeclined, setShowDeclined] = useState(true);
  const [requestsToShow, setRequestsToShow] = useState(requests);

  const toggleSection = (section: string) => {
    switch (section) {
      case "pending":
        setShowPending(!showPending);
        break;
      case "accepted":
        setShowAccepted(!showAccepted);
        break;
      case "declined":
        setShowDeclined(!showDeclined);
        break;
      default:
        break;
    }
  };

  const handleUpdateRequest = (request: RequestItem) => {
    const updatedRequests = requestsToShow.map((r) =>
      r.id === request.id ? request : r
    );
    setRequestsToShow(updatedRequests);
  };

  return (
    <ApolloProvider client={client}>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Request List</h1>
      <div className="mb-4">
        <button className="mb-2" onClick={() => toggleSection("pending")}>
          Toggle Pending Requests
        </button>
        {showPending && (
          <ul className="grid grid-cols-1 gap-4">
            {requests
              .filter((request) => request.attributes.status === "pending")
              .map((request) => (
                <RequestListItem key={request.id} request={request} handleUpdateRequest={handleUpdateRequest} />
              ))}
          </ul>
        )}
      </div>
      <div className="mb-4">
        <button className="mb-2" onClick={() => toggleSection("accepted")}>
          Toggle Accepted Requests
        </button>
        {showAccepted && (
          <ul className="grid grid-cols-1 gap-4">
            {requests
              .filter((request) => request.attributes.status === "accepted")
              .map((request) => (
                <RequestListItem key={request.id} request={request}  handleUpdateRequest={handleUpdateRequest}/>
              ))}
          </ul>
        )}
      </div>
      <div>
        <button className="mb-2" onClick={() => toggleSection("declined")}>
          Toggle Declined Requests
        </button>
        {showDeclined && (
          <ul className="grid grid-cols-1 gap-4">
            {requests
              .filter((request) => request.attributes.status === "declined")
              .map((request) => (
                <RequestListItem key={request.id} request={request} handleUpdateRequest={handleUpdateRequest}/>
              ))}
          </ul>
        )}
      </div>
    </div>
    </ApolloProvider>
  );
};

export default RequestList;
