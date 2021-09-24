import React, {useCallback, useMemo, useRef, useState} from "react";
import { Box, width } from "@pasha28198/molequle-web-common";
import dayjs from "dayjs";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowProps,
  WindowScroller,
} from "react-virtualized";
import { useScrollContext } from "../ScrollProvider";
import ActivityGroup from "./ActivityGroup";

const ActivityList = ({
  activities,
  activeGroup,
  initActivity
}: {
  activities: any;
  activeGroup: string;
    initActivity: any
}): JSX.Element => {
  const { element } = useScrollContext();
  const listRef = useRef<List>(null);
  const [activeDate, setActiveDate] = useState<string>(dayjs(activities?.[0]?.timestamp).format("MMMM D, YYYY h:mm A"))


  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 80,
      }),
    [],
  );

  console.log("halo Activity List :",initActivity)

  const renderRow = useCallback(
    ({ index, key, style, parent }: ListRowProps) => {
      /**
       * only add cards filtered by activeGroup
       */
      const initActivityFiltered = initActivity.find((item: any) => item.name === activeGroup).types[index]
      return (
        initActivityFiltered ? (
          <CellMeasurer key={key} columnIndex={0} rowIndex={index} cache={cache} parent={parent}>
          <Box
            style={style}
            onClick={() => {
              cache.clear(index, 0);
              listRef.current?.recomputeRowHeights?.(index);
            }}
          >
            <ActivityGroup
              day={dayjs(activities?.[index]?.timestamp).format("DD")}
              month={dayjs(activities?.[index]?.timestamp).format("MMM")}
              data={activities?.[index]}
              initActivity={initActivityFiltered}
              activeDate={activeDate}
              setActiveDate={setActiveDate}
              activeGroup={activeGroup}
            />
          </Box>
        </CellMeasurer>
        ) : null
        
      );
    },
    [initActivity, cache],
  );

  return (
    <WindowScroller scrollElement={element || undefined}>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              autoHeight
              tabIndex={null}
              ref={listRef}
              scrollTop={scrollTop}
              height={height}
              width={width}
              deferredMeasurementCache={cache}
              rowHeight={cache.rowHeight}
              rowRenderer={renderRow}
              rowCount={initActivity?.length || 1}
              overscanRowCount={3}
              isScrolling={isScrolling}
              onScroll={onChildScroll}

        
            />
            // <List
            //   autoHeight
            //   tabIndex={null}
            //   ref={listRef}
            //   scrollTop={scrollTop}
            //   height={height}
            //   width={width}
            //   deferredMeasurementCache={cache}
            //   rowHeight={cache.rowHeight}
            //   rowRenderer={renderRow}
            //   rowCount={initActivity?.length}
            //   overscanRowCount={3}
            //   isScrolling={isScrolling}
            //   onScroll={onChildScroll}
            // />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};

export default ActivityList;
