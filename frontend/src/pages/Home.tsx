import { useState, useEffect, useMemo } from "react";
import '../app.css';
import { AxisOptions, Chart } from "react-charts";
import ResizableBox from "../components/ResizableBox";
import FormMobileTimeSteps from "../components/FormMobileTimeSteps";

// Definiere den Typ für die Daten
type ActivityData = {
  primary: Date;        // Datum auf der X-Achse
  secondary: number;    // Y-Achse (z.B. Mobile Time oder Steps)
};

function Home() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        let response = await fetch("http://localhost:5000/activities");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await response.json();

        console.log(data);

        // Daten für Mobile Time und Steps aufbereiten
        const chartData = [
          {
            label: "Mobile Time",
            data: data.activities.map((activity: { date: string | number | Date; mobile_time: any; }) => ({
              primary: new Date(activity.date), // X-Achse (Datum)
              secondary: activity.mobile_time   // Y-Achse (Mobile Time)
            })),
            secondaryAxisId: "mobileTimeAxis" // Zuweisung zu einer bestimmten Y-Achse
          },
          {
            label: "Steps",
            data: data.activities.map((activity: { date: string | number | Date; steps: any; }) => ({
              primary: new Date(activity.date), // X-Achse (Datum)
              secondary: activity.steps         // Y-Achse (Steps)
            })),
            secondaryAxisId: "stepsAxis" // Zuweisung zu einer anderen Y-Achse
          }
        ];

        setActivities(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchActivities();
  }, []);

  // Definiere die X-Achse (Datum)
  const primaryAxis = useMemo<AxisOptions<ActivityData>>(
    () => ({
      getValue: datum => datum.primary,
      scaleType: "time", // Explizit als Zeit-Skala festlegen
      formatters: {
        scale: (date) => new Date(date).toLocaleDateString() // Optional: Datum formatieren
      },
      showGrid: true
    }),
    []
  );

  // Definiere die Y-Achsen für Mobile Time und Steps
  const secondaryAxes = useMemo<AxisOptions<ActivityData>[]>(() => [
    {
      id: "mobileTimeAxis", // Eindeutige ID für die Mobile Time-Achse
      getValue: datum => datum.secondary,
      scaleType: "linear",
      position: "left",  // Links platzieren
      showGrid: true,
      label: "Mobile Time (minutes)" // Achsen-Label
    },
    {
      id: "stepsAxis", // Eindeutige ID für die Steps-Achse
      getValue: datum => datum.secondary,
      scaleType: "linear",
      position: "right", // Rechts platzieren
      showGrid: false,
      label: "Steps" // Achsen-Label
    }
  ], []);

  return (
    <div className="home">
      <h3>Mobile Time and Steps over Time</h3>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       
        {/* Resizable Box with the Chart */}
        <ResizableBox style={{ width: '600px', height: '400px', backgroundColor: 'lightgrey' }}>
          <Chart
            options={{
              data: activities,  // Die Daten für beide Linien
              primaryAxis,
              secondaryAxes     // Beide Achsen (eine links, eine rechts)
            }}
          />
        </ResizableBox>
        <FormMobileTimeSteps />
        

      </div>
    </div>
  );
}

export default Home;
