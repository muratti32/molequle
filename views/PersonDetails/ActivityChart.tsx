import React, { FC } from "react";
import ChartistGraph from "react-chartist";
import styled from "@emotion/styled";
/* eslint-disable-next-line */
/* @ts-ignore */
import tooltip from "chartist-plugin-tooltip";

const Container = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ActivityChart: FC = () => {
  const data = {
    labels: [
      "Jan 1",
      "Jan 2",
      "Jan 3",
      "Jan 4",
      "Jan 5",
      "Jan 6",
      "Jan 7",
      "Jan 8",
      "Jan 9",
      "Jan 10",
      "Jan 11",
      "Jan 12",
      "Jan 13",
      "Jan 14",
      "Jan 15",
      "Jan 16",
      "Jan 17",
      "Jan 18",
      "Jan 19",
      "Jan 20",
      "Jan 21",
      "Jan 22",
      "Jan 23",
      "Jan 24",
      "Jan 25",
    ],
    series: [[5, 1, 4, 8, 6, 5, 2, 4, 8, 6, 5, 2, 4, 8, 6, 5, 2, 4, 8, 6, 5, 2, 4, 8, 6]],
  };

  const type = "Bar";
  const options = {
    plugins: [tooltip()],
    high: 7,
    axisX: {
      showGrid: false,
      scaleMinSpace: 100,
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0,
    },
    chartPadding: {
      top: 35,
    },
    seriesBarDistance: 40,
  };

  return (
    <Container>
      {process.browser && (
        <ChartistGraph style={{ color: "#ffc547" }} data={data} options={options} type={type} />
      )}
    </Container>
  );
};

export default ActivityChart;
