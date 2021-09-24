import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { Box, Checkbox, Field, TextInput } from '@pasha28198/molequle-web-common';
import { useCombobox, useMultipleSelection } from 'downshift';
import { Accordion } from '../../components';

interface Column {
  name: string;
  // value: string | number;
  label: string;
}

interface ColumnGroup {
  key: string;
  fields: Column[];
}

interface ColumnSelectorProps {
  items: ColumnGroup[];
  visibleColumns: any;
  onChange: (columns: (string | number)[]) => void;
}

const isColumnGroupList = (val: ColumnGroup[]): val is ColumnGroup[] => {
  return val.every((item) => item.key && Array.isArray(item.fields));
};

const ColumnSelector: FC<ColumnSelectorProps> = ({ items, visibleColumns, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const normalizedItems = useMemo(() => {
    return isColumnGroupList(items) ? items.flatMap((item) => item.fields) : items;
  }, [items]);
  const { getSelectedItemProps, getDropdownProps, addSelectedItem, removeSelectedItem, selectedItems } =
    useMultipleSelection({
      initialSelectedItems: normalizedItems
        .filter((item) => visibleColumns.includes(item.name))
        .map((item) => item.name),
      onSelectedItemsChange: (changes) => {
        if (changes.selectedItems) {
          onChange(changes.selectedItems);
        }
      },
    });

  const getFilteredItems = useCallback(
    (allItems: Column[]) => allItems.filter((item) => item?.name?.toLowerCase().startsWith(inputValue?.toLowerCase())),
    [inputValue],
  );

  const { getLabelProps, getMenuProps, getInputProps, getComboboxProps, getItemProps, selectItem } = useCombobox({
    isOpen: true,
    inputValue,
    itemToString: (item) => item?.label || '',
    items: getFilteredItems(normalizedItems),
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue || '');
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue('');
            if (selectedItems.includes(selectedItem.name)) {
              removeSelectedItem(selectedItem.name);
            } else {
              addSelectedItem(selectedItem.name);
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
        const isSelected = selectedItems.includes(item.name);
        return (
          <li key={item.name}>
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
              value={item.name}
              defaultChecked={isSelected}
            >
              {item.label || item.name}
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
        <Accordion allowMultiple={true}>
          {groups.map((g) => (
            <Accordion.Item key={g.key} label={g.key} id={`column-selector-group-${g.key}`}>
              {renderItems(g.fields)}
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
      <Box as='ul' p='S' {...getMenuProps()}>
        {isColumnGroupList(items) ? renderGroupList(items) : renderItems(items)}
      </Box>
    </Box>
  );
};

export default ColumnSelector;
