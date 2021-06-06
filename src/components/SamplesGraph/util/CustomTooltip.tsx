const CustomTooltip = ({ active, payload, selectedClasses, palette }: any) => {
  if (active && payload && payload.length) {
    let date: Date = payload[0].payload.date;
    return (
      <div className="custom-tooltip">
        <div className="intro">
          <p>
            Date:{" "}
            {`${date.toDateString()}, ${date.toTimeString().substring(0, 9)}`}
          </p>
        </div>
        <div className="label">
          {payload
            .map((each: any, index: number) => ({
              selectedClass: selectedClasses[index].name,
              value: each.value,
              index: index,
            }))
            .sort((a: any, b: any) => b.value - a.value)
            .slice(0, 5)
            .map(
              (tuple: {
                selectedClass: string;
                value: number;
                index: number;
              }) => (
                <p
                  key={tuple.index}
                  style={{ color: `${palette[tuple.index % palette.length]}` }}
                >{`${tuple.selectedClass} : ${tuple.value.toFixed(5)}`}</p>
              )
            )}
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
