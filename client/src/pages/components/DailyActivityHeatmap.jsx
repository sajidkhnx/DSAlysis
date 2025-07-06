import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { useQuestions } from "../../QuestionsContext";
import { endOfToday, subDays, format, getMonth, getYear } from "date-fns";

export default function DailyActivityHeatmap() {
  const { questions } = useQuestions();

  const allHistory = questions.flatMap(q => q.solvedHistory || []);
 
  const dateMap = {};
  allHistory.forEach(({ value, date }) => {
    if (value) {
      const day = format(new Date(date), "yyyy-MM-dd");
      dateMap[day] = (dateMap[day] || 0) + 1;
    }
  });
 
  const endDate = endOfToday();
  const startDate = subDays(endDate, 179);
  const values = [];
  let monthLabels = [];
  let lastMonth = null;
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dayStr = format(d, "yyyy-MM-dd");
    values.push({ date: dayStr, count: dateMap[dayStr] || 0 });
    // Add month label if first of month or first day
    if (d.getDate() === 1 || (d.getTime() === startDate.getTime())) {
      monthLabels.push({
        month: format(d, "MMM yyyy"),
        index: values.length - 1
      });
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center mt-8 w-full max-w-2xl mx-auto">
      <h3 className="text-base font-semibold mb-2 text-indigo-700 tracking-tight">Daily Active Status (6 Months)</h3>
      <div className="w-full relative">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={values}
          classForValue={v => {
            if (!v || v.count === 0) return "color-empty";
            if (v.count >= 4) return "color-github-4";
            if (v.count === 3) return "color-github-3";
            if (v.count === 2) return "color-github-2";
            return "color-github-1";
          }}
          tooltipDataAttrs={v => ({
            'data-tip': v.count
              ? `${v.count} solved on ${format(new Date(v.date), "MMMM d, yyyy")}`
              : `No activity on ${format(new Date(v.date), "MMMM d, yyyy")}`
          })}
          showWeekdayLabels={false}
          gutterSize={2}
          horizontal={true}
          style={{ width: '100%', minWidth: 320, maxWidth: 480, margin: '0 auto' }}
        />
        {/* Month labels below heatmap */}
        <div className="flex w-full justify-between mt-2 px-2 text-xs text-gray-500 font-semibold">
          {monthLabels.map((m, idx) => (
            <span key={m.index} style={{ marginLeft: idx === 0 ? `${(m.index / values.length) * 100}%` : undefined }}>
              {m.month}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .react-calendar-heatmap text { font-size: 8px; }
        .color-empty { fill: #ebedf0; }
        .color-github-1 { fill: #a3e635; }
        .color-github-2 { fill: #4ade80; }
        .color-github-3 { fill: #22d3ee; }
        .color-github-4 { fill: #2563eb; }
        .react-calendar-heatmap .react-calendar-heatmap-week > rect { rx: 3px; }
      `}</style>
    </div>
  );
}
