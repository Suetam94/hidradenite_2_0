import React from 'react';
import Link from "next/link";

interface IDashboardCard {
  title: string;
  description: string;
  route: string;
}

const DashboardCard = ({ title, description, route }: IDashboardCard) => {
  return (
    <div className="bg-white shadow-md rounded-md p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-end">
        <button className="bg-[#2A7CA3] hover:bg-[#7F067F] text-white font-bold py-2 px-4 rounded">
          <Link href={route}>Editar</Link>
        </button>
      </div>
    </div>
  );
};

export default DashboardCard;


