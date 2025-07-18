"use client"

import { useEffect, useState } from "react";
import Thead from "@/app/components/thead";
import { ReportData } from "@/interface/report";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReport } from "@/action/dashboardAction";


export default function Laporan() {
  const {report, loading} = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();
  const params = useParams();
  const [masjid_id, setMasjidId] = useState<string>();

  useEffect(() => {
    if(params?.id) {
      setMasjidId(params.id as string);
    }
  }, [params])

  useEffect(() => {
    if(!loading && !report && masjid_id) {
      dispatch(fetchReport(masjid_id));
    }
  }, [masjid_id, dispatchEvent, loading, report])
  
  if(!loading && report)
    return (
      <div className="flex flex-col gap-5 px-12 w-screen h-[calc(100vh-100px)] items-center justify-center">
        <h1 className="self-start justify-self-start font-bold text-4xl">Laporan Keuangan Masjid</h1>
        <table className="rounded-lg overflow-hidden w-full h-max">
          <Thead labels={['Tanggal', "Sumber Pemasukan/Keterangan Pengeluaran", 'Jumlah']} />
          <tbody>
            {
              report.map((value: ReportData, index: number) => (
                <tr 
                  key={index} 
                  className="bg-yellow-100 hover:bg-yellow-400"
                >
                  <td className="px-4 py-2 min-w-32 text-center">
                    {new Date(value.date).toLocaleDateString('id-ID', { weekday: 'long' })},{" "}
                    {new Date(value.date).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-4 py-2 min-w-32 text-center">{value.description}</td>
                  <td className={`px-4 py-2 min-w-32 text-center ${value.type === "Pemasukan" ? "text-green-500" : "text-red-500"}`}>{value.type === "Pemasukan" ? "+" : "-"} {Number(value.amount).toLocaleString('id-ID')}</td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr className="bg-yellow-400">
              <td colSpan={2} className="text-center font-bold p-2">Total</td>
              <td className="text-center font-bold p-2">
                {
                  Number(report.reduce((acc, curr) => {
                    if(curr.type === "Pemasukan") acc.amount += curr.amount;
                    else acc.amount -= curr.amount;
                    return acc;
                  }, {amount: 0}).amount).toLocaleString('id-ID')
                }
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
}