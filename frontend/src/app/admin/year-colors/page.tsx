"use client";
import Mail from "./mail";
import YearColors from "./year-colors";

const Page = () => {
  return (
    <div className="grid grid-cols-2 my-4 mx-10">
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
