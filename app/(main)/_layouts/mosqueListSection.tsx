"use client"

import { ListMosque } from "@/interface/mosque";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMosques } from "@/action/mosqueAction";

export default function MosqueListSection() {
    const dispatch = useAppDispatch();
    const {mosques, loading} = useAppSelector((state) => state.mosque);
    const router = useRouter();

    useEffect(() => {
        if(!loading && !mosques) 
          dispatch(fetchMosques('/api/mosques/list'));
    }, [dispatch, loading, mosques])


    if(!loading && mosques && mosques.length > 0) return (
      <div className="bg-white w-screen h-screen max-sm:items-center max-sm:flex sm:h-max p-4 sm:p-16">
        <div className="flex items-center justify-center w-full h-max bg-[#FFF59C] sm:p-8 rounded-3xl">
            <table>
                <thead className="bg-white text-black border-8 border-[#FFF59C]">
                    <tr className="max-sm:text-xs">
                        <th className="px-2 sm:px-6 py-3 border-8 border-[#FFF59C]">NAMA MASJID</th>
                        <th className="px-2 sm:px-6 py-3 border-8 border-[#FFF59C]">LOKASI</th>
                        <th className="px-2 sm:px-6 py-3 border-8 border-[#FFF59C]">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    {mosques!.map((value: ListMosque, index: number) => (
                      <tr 
                        key={index} 
                        onClick={() => {router.push(`/masjid/${value.id}`)}} 
                        className="bg-white border-b-[1px] text-center text-black hover:bg-gray-500 hover:text-white border-8 border-[#FFF59C] text-xs sm:text-sm"
                      >
                        <td className="px-2 sm:px-6 py-3 border-8 border-[#FFF59C]">{value.name}</td>
                        <td className="px-2 sm:px-6 py-3 border-8 border-[#FFF59C]">{value.location}</td>
                        <td className="px-2 sm:px-6 py-3 border-8 border-[#FFF59C]">
                            <button onClick={() => {router.push(`/masjid/${value.id}`)}}>Lihat selengkapnya...</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    );
}