"use client";
import { UPDATE_REQUEST_STATUS } from "@/lib/mutations/request";
import { RequestItem } from "@/types/RequestItem";
import { useMutation } from "@apollo/client";
import React from "react";
type Answer = "accepted" | "declined";

const RequestListItem = ({ request, handleUpdateRequest }: { request: RequestItem, handleUpdateRequest: (request: RequestItem) => void }) => {
  const [updateRequest, { loading, error }] = useMutation(
    UPDATE_REQUEST_STATUS
  );

  const handleAcceptOrDecline = (request: RequestItem, answer: Answer) => {
    updateRequest({
      variables: {
        updateRequestId: request.id,
        data: {
          status: answer,
        },
      },
    });
    request.attributes.status = answer;
    handleUpdateRequest(request);
  };
  console.log(request);
  return (
    <li key={request.id} className="bg-white border rounded-lg p-4 shadow-lg">
      <div className="font-bold text-lg mb-2">
        {request.attributes.hirer.data.attributes.username}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Product:</span>{" "}
        {request.attributes.product.data.attributes.name}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Amount:</span>{" "}
        {request.attributes.amountRequested}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Status:</span>{" "}
        {request.attributes.status}
      </div>
      { request.attributes.status != "accepted"  && (
      <div className="flex space-x-4">
        <button
          className="btn btn-accept"
          onClick={() => handleAcceptOrDecline(request, "accepted")}
        >
          Accept
        </button>
        <button
          className="btn btn-decline"
          onClick={() => handleAcceptOrDecline(request, "declined")}
        >
          Decline
        </button>
      </div>
      )}
    </li>
  );
};

export default RequestListItem;
