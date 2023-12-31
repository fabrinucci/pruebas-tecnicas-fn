'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Product } from '../types';

type Props = {
  productsData: Product[];
};

export const FilterProducts = ({ productsData }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const getProductsBySearch = (search: string | null) => {
    if (!search) return productsData;
    return productsData.filter((item) => item.category.includes(search));
  };
  const products = getProductsBySearch(search);
  return (
    <>
      <h2 className='mb-6 text-center font-semibold text-gray-300 text-xl'>
        {products.length === 0
          ? `No se encontraron productos con la búsqueda "${search}"`
          : `Resultados de búsqueda de "${search}": ${products.length}`}
      </h2>

      <ul className='grid grid-cols-1 lg:grid-cols-2'>
        {products.map((item) => (
          <li
            onClick={() => {
              router.push(`items/${item.id}`);
            }}
            className='flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 py-[40px] mx-auto cursor-pointer'
            key={item.id}
          >
            <figure>
              <Image
                className='h-[150px] w-[150px] rounded-full'
                src={item.images[0]}
                alt={item.title}
                height={200}
                width={200}
              />
            </figure>
            <section className='flex flex-col items-center sm:items-stretch max-w-xs gap-3'>
              <h3 className='font-semibold text-lg'>{item.title}</h3>
              <p>{item.description}</p>
              <div className='flex items-center justify-between gap-4 sm:gap-0'>
                <p className='text-2xl font-bold'>{item.price} $</p>
                <span>{item.rating}</span>
              </div>
              <span className='text-sm p-2 w-32 text-center rounded-md bg-gray-600'>
                {item.category}
              </span>
            </section>
          </li>
        ))}
      </ul>
    </>
  );
};
