import React, { FC, useCallback, useMemo, useRef, useState } from "react";
import { Accordion, Box, Checkbox, Field, TextInput } from "@pasha28198/molequle-web-common";
import { useCombobox, useMultipleSelection } from "downshift";

interface Column {
  label: string;
  value: string | number;
}

interface ColumnGroup {
  label: string;
  items: Column[];
}

interface ColumnSelectorProps {
  items: ColumnGroup[];
  onChange?: (columns: (string | number)[]) => void;
}

const isColumnGroupList = (val: ColumnGroup[]): val is ColumnGroup[] => {
  return val.every((item) => item.label && Array.isArray(item.items));
};

const ColumnSelector: FC<ColumnSelectorProps> = ({ items, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const normalizedItems = useMemo(() => {
    return isColumnGroupList(items) ? items.flatMap((item) => item.items) : items;
  }, [items]);
  const {
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection<string | number>({
    initialSelectedItems: normalizedItems.map((item) => item.value),
    onSelectedItemsChange: (changes) => {
      if (changes.selectedItems) {
        onChange?.(changes.selectedItems);
      }
    },
  });

  const getFilteredItems = useCallback(
    (allItems: Column[]) =>
      allItems.filter((item) => item?.label?.toLowerCase().startsWith(inputValue?.toLowerCase())),
    [inputValue],
  );

  const {
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    selectItem,
  } = useCombobox({
    isOpen: true,
    inputValue,
    itemToString: (item) => item?.label || "",
    items: getFilteredItems(normalizedItems),
    onStateChange: (changes) => {
      switch (changes.type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(changes.inputValue || "");

          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (changes.selectedItem) {
            setInputValue("");
            if (selectedItems.some((item) => item === changes.selectedItem?.value)) {
              removeSelectedItem(changes.selectedItem.value);
            } else {
              addSelectedItem(changes.selectedItem.value);
            }
            selectItem(null!);
          }

          break;
        default:
          break;
      }
    },
  });

  const renderItems = useCallback(
    (options: Column[]) => {
      return getFilteredItems(options).map((item, index) => {
        const isSelected = selectedItems.some((si) => si === item.value);
        return (
          <li key={item.value}>
            <Checkbox
              {...getItemProps({
                item,
                index,
                onBlur: (event) => {
                  if (event.relatedTarget === inputRef.current) {
                    event.target.focus();
                  }
                },
              })}
              value={item.value}
              defaultChecked={isSelected}
            >
              {item.label}
            </Checkbox>
          </li>
        );
      });
    },
    [getFilteredItems, getItemProps, selectedItems],
  );

  const renderGroupList = useCallback(
    (groups: ColumnGroup[]) => {
      return (
        <Accordion allowMultiple={false}>
          {groups.map((g) => (
            <Accordion.Item key={g.label} label={g.label} id={`column-selector-group-${g.label}`}>
              {renderItems(g.items)}
            </Accordion.Item>
          ))}
        </Accordion>
      );
    },
    [renderItems],
  );

  return (
    <Box minw={220}>
      <div {...getComboboxProps()}>
        <Field hasValue={Boolean(inputValue)}>
          <TextInput {...getInputProps(getDropdownProps({ ref: inputRef }))} />
          <Field.Label {...getLabelProps()}>Search Displayed Columns</Field.Label>
        </Field>
      </div>
      <Box as="ul" p="S" {...getMenuProps()}>
        {isColumnGroupList(items) ? renderGroupList(items) : renderItems(items)}
      </Box>
    </Box>
  );
};

export default ColumnSelector;
