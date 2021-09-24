import React, { FC } from "react";
// @ts-ignore
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, Text } from "recharts";
import styled from "@emotion/styled";

const data = [
  { name: "Jan 1", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Jan 2", uv: 3000, pv: 0, amt: 2210 },
  { name: "Jan 3", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Jan 4", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Jan 5", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jan 6", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jan 7", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Jan 8", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Jan 9", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Jan 10", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Jan 11", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Jan 12", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jan 13", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jan 14", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Jan 15", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Jan 16", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Jan 17", uv: 3000, pv: 1337, amt: 2210 },
  { name: "Jan 18", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Jan 19", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Jan 20", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jan 21", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jan 22", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Jan 23", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Jan 24", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Jan 25", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Jan 26", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Jan 27", uv: 2000, pv: 9800, amt: 2290 },

];

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  height: 25%;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;


const Chart: FC = () => {
  return (
    <Container>
      <ResponsiveContainer width="100%" height="100%" minWidth="720px" debounce={300}>
        <BarChart data={data} margin={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <XAxis
            dataKey="name"
            interval={0}
            axisLine={false}
            tickLine={false}
            tick={(props: any) => {
              return (
                <Text {...props} fill="#2D3958" width={10} textRendering="optimizeSpeed">
                  {props.payload.value.split(' ').join('\n')}
                </Text>
              );
            }}
          />
          <Tooltip cursor={false} />
          <Bar dataKey="pv" fill="#FFC547" radius={100} />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Chart;
