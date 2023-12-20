import React from 'react';

export default function Stat() {
    return <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 text-center">
      <div className="p-4 sm:w-1/4 w-1/2">
        <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">2.7K</h2>
        <p className="leading-relaxed">Items</p>
      </div>
      <div className="p-4 sm:w-1/4 w-1/2">
        <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">1.8K</h2>
        <p className="leading-relaxed">Customers</p>
      </div>
      <div className="p-4 sm:w-1/4 w-1/2">
        <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">35</h2>
        <p className="leading-relaxed">Countries</p>
      </div>
      <div className="p-4 sm:w-1/4 w-1/2">
        <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">4</h2>
        <p className="leading-relaxed">Shipping Services</p>
      </div>
    </div>
  </div>
</section>
}