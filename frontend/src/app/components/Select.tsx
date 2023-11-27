"use client";
import React, { useState } from "react";

const CategoryFilter = () => {
  
  const handleChange = (event: React.FormEvent):void => {
    const value: string = (event.target as HTMLSelectElement).value;
    console.log(value);
    if (value === "none") {
      setProductData(rentableProducts);
    } else {
      setProductData(
        rentableProducts.filter((product: any) => {
          const categorieData = product.attributes.categories.data;
          return (
            categorieData &&
            categorieData.some((entry: any) => entry.attributes.name == value)
          );
        })
      );
    }
  };

  return (
    <div>
      <div className="m-8">
        <h1 className="text-6xl mx-auto my-8">Products</h1>
        <h2 className="text-xl mb-2">Filter on category</h2>
        
      </div>

      {productData.map((product: RentalProduct) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default CategoryFilter;
