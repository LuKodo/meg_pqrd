import { Fragment, useEffect, useState } from "react";
import { Header } from "@/features/shared/components/Header";
import { TimeMetricsChart } from "@/features/home/components/TimeMetricsChart";
import { ProductMetricsChart } from "@/features/home/components/ProductMetricsChart";
import { useHomeData } from "@/features/home/hooks/useHomeData";
import { useSessionManager } from "@/features/shared/hooks/useSessionManager";
import { DateTime } from "luxon";
import { Card, CardContent } from "@/components/ui";

function Home() {
  const { requests } = useHomeData();
  const { getName } = useSessionManager();
  const [inTime, setInTime] = useState(0);
  const [outTime, setOutTime] = useState(0);
  const [onDanger, setOnDanger] = useState(0);

  useEffect(() => {
    if (requests) {
      setInTime(requests.filter(stat => DateTime.fromJSDate(stat.programed_date) > DateTime.now().plus({ days: 2 })).length);
      setOutTime(requests.filter(stat => DateTime.fromJSDate(stat.programed_date) <= DateTime.now().plus({ days: 2 })).length);
      setOnDanger(requests.filter(stat => DateTime.fromJSDate(stat.programed_date) >= DateTime.now()).length);
    }
  }, [requests]);

  return (
    <Fragment>
      <Header
        title="Tablero Principal"
        subItem="Home"
      />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-3">
            <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 mt-2">
              <Card>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="border border-primary rounded-full">
                        <img
                          src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-6.jpg"
                          className="rounded-full m-1"
                          alt="user1"
                          width="60"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">{getName()}</h3>
                      <span className="text-gray-500 text-sm">
                        Bienvenido - {DateTime.now().toFormat('yyyy-MM-dd')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2">
            <Card className="h-[60vh]">
              <CardContent className="flex flex-col items-start gap-4 transition duration-300 p-8 pb-14">
                <div className="flex items-center gap-2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-panel-top size-5" aria-hidden="true" >
                    <rect width="18" height="7" x="3" y="3" rx="1"></rect>
                    <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                    <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                  </svg>
                  <h2 className="font-medium text-base">Solicitudes X Disponibilidad</h2>
                </div>
                <div className="text-gray-500 text-sm/6 min-w-100">
                  <TimeMetricsChart data={[inTime, outTime, onDanger]} labels={['A Tiempo', 'En Alerta', 'Fuera de Tiempo']} />
                </div>
              </CardContent>
            </Card>

            <Card className="h-[60vh]">
              <CardContent className="flex flex-col items-start gap-4 transition duration-300 p-8 pb-14">
                <div className="flex items-center gap-2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-notebook-pen size-5" aria-hidden="true" >
                    <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"></path>
                    <path d="M2 6h4"></path>
                    <path d="M2 10h4"></path>
                    <path d="M2 14h4"></path>
                    <path d="M2 18h4"></path>
                    <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"></path>
                  </svg>
                  <h2 className="font-medium text-base">Solicitudes X Productos</h2>
                </div>
                <div className="text-gray-500 text-sm/6 max-w-72">
                  <ProductMetricsChart data={[inTime, outTime, onDanger]} labels={['A Tiempo', 'En Alerta', 'Fuera de Tiempo']} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
