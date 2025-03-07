"use client"

import { getJamaahMasjid } from "@/helper/getData";
import { useEffect, useState } from "react"
import Checkbox from "./_components/checkbox";
import Thead from "../../_components/thead";
import { updateRole } from "@/helper/postData";

export default function Account() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jamaah, setJamaah] = useState<any[]>();

  const init = async () => {
    const requestJamaah = await getJamaahMasjid(setIsLoading);
    setJamaah(requestJamaah.jamaah);
  }

  const action = async (email: string, role: string) => {
    await updateRole(email, role);
    await init();
  }

  useEffect(() => {
    if(isLoading) {
      init();
    }
  }, [])


  if(!isLoading) 
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Nama', 'Email', 'Status']} />
        <tbody>
          {jamaah?.map((value, index) => {
            return (
              <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                <td className="px-4 py-2 min-w-32 text-center">{value.name}</td>
                <td className="px-4 py-2 min-w-32 text-center">{value.email}</td>
                <td className="px-4 py-2 min-w-32 text-center flex gap-3">
                  {
                    value.admin.status
                      && <div className="flex gap-3">
                          <Checkbox 
                            label="Ketua" 
                            value={value.admin.role}
                            onChange={(e: any) => {
                              if(e.target.checked) {
                                action(value.email, "Ketua")
                              } else {
                                action(value.email, "Jamaah")
                              }
                            }}
                          />
                          <Checkbox 
                            label="Bendahara" 
                            value={value.admin.role}
                            onChange={(e: any) => {
                              if(e.target.checked) {
                                action(value.email, "Bendahara")
                              } else {
                                action(value.email, "Jamaah")
                              }
                            }}
                          />
                          <Checkbox 
                            label="Sekretaris" 
                            value={value.admin.role}
                            onChange={(e: any) => {
                              if(e.target.checked) {
                                action(value.email, "Sekretaris")
                              } else {
                                action(value.email, "Jamaah")
                              }
                            }}
                          />
                          <Checkbox 
                            label="Marbot" 
                            value={value.admin.role}
                            onChange={(e: any) => {
                              if(e.target.checked) {
                                action(value.email, "Marbot")
                              } else {
                                action(value.email, "Jamaah")
                              }
                            }} 
                          />
                    </div>
                  }
                  <Checkbox
                    label="Pengurus"
                    value={value.admin.status ? value.admin.role : "Jamaah"}
                    onChange={(e: any) => {
                      if(e.target.checked) {
                        action(value.email, "Pengurus")
                      } else {
                        action(value.email, "Jamaah")
                      }
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}