"use client"

import Calendar from 'react-calendar';
import { useState, useEffect } from 'react';
import CalendarLabel from './calendarLabel';
import { ListActivities } from '@/interface/activity';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchActivities } from '@/action/activityAction';

interface CalendarElementProps {
  masjid_id?: string | null
};

export default function CalendarElement({ masjid_id }: CalendarElementProps) {
  const dispatch = useAppDispatch();
  const {activities, loading} = useAppSelector((state) => state.activities);
  const [eventMonth, setEventMonth] = useState<ListActivities[]>();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    if(!activities) dispatch(fetchActivities(masjid_id!));
  }, [dispatch])

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 100);

        return () => clearInterval(interval);
    }, []);

    const todayClassList = ({ date }: { date: Date }) => {
        const defaultClass = "border-black items-center text-center py-[10px] border-white border-[5px] text-xs font-bold ";

        if(
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate()
        ) {
            return defaultClass + "bg-[#EBBB20] text-white ";
        } else if(
          activities &&
          activities.find(value => (
            new Date(value.date).getFullYear() === date.getFullYear() &&
            new Date(value.date).getMonth() === date.getMonth() &&
            new Date(value.date).getDate() === date.getDate()
          ))
        ) {
          return defaultClass + "bg-green-900 text-white ";
        } else return defaultClass + "bg-[#FFDE72] hover:bg-[#EBBB20] hover:text-white ";
    }

    const filterEventByMonth = (date: Date) => {
      if(activities && activities.length > 0) {
        const filtered = activities.filter(value => (
          new Date(value.date).getFullYear() === date.getFullYear() &&
          new Date(value.date).getMonth() === date.getMonth()
        ));
        setEventMonth(filtered);
      }
    }

    if(!loading && activities) 
      return (
          <div className="flex flex-col gap-2 items-center justify-center p-5 bg-[#05934a8f] rounded-xl">
              <Calendar 
                  tileClassName={todayClassList}
                  value={new Date()}
                  prevLabel={<CalendarLabel label="<" />}
                  prev2Label={<CalendarLabel label="<<" />}
                  nextLabel={<CalendarLabel label=">" />}
                  next2Label={<CalendarLabel label=">>" />}
                  calendarType='islamic'
                  className="flex flex-col items-center gap-[10px]"
                  onActiveStartDateChange={({ activeStartDate }) => {
                    if (activeStartDate) filterEventByMonth(activeStartDate);
                  }}
              />
              <div className="flex flex-col gap-3">
                {
                  eventMonth && eventMonth.map((value: ListActivities, key: number) => (
                    <a
                      key={key} 
                      className="flex flex-row gap-3 underline underline-offset-2"
                      href={`/kegiatan/${value.id}`}
                    >
                      <p className="text-green-900 font-bold max-sm:text-[9px]">Tanggal {new Date(value.date).getDate()} : {value.name}</p>
                    </a>
                  ))
                }
              </div>
          </div>
      );

}