"use client";
import Mail from "./mail";
import YearColors from "./year-colors";

const Page = () => {
  return (
    <div className="container lg grid grid-cols-2 my-6 m-auto">
      <div className="flex justify-center">
        <YearColors />
      </div>
      <div className="flex justify-center">
        <Mail />
      </div>
    </div>
  );
};

export default Page;
