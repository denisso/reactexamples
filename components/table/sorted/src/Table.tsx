import React from 'react';
import styles from './Table.module.css';

type DataItem = { [key: string]: string | number };

type Props = {
  thead: string[];
  data: DataItem[];
};

const sort = (
  data: DataItem[],
  key: string,
  dispatch: React.Dispatch<React.SetStateAction<DataItem[]>>,
  // true = asc false = desc
  order: boolean
) => {
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  dispatch(sortedData);
};

const Table: React.FC<Props> = ({ thead, data }) => {
  const [rows, setRows] = React.useState(data);
  const orderRef = React.useRef(true);
  const prevKeyRef = React.useRef('');
  const handleSort = React.useCallback(
    (key: string) => {
      if (prevKeyRef.current === key) {
        orderRef.current = !orderRef.current;
      } else {
        orderRef.current = true;
      }
      sort(rows, key, setRows, orderRef.current);
      prevKeyRef.current = key;
    },
    [rows]
  );

  return (
    <table>
      <thead>
        <tr className={styles.thead}>
          {thead.map((th) => (
            <th key={th} onClick={() => handleSort(th)}>
              {th} ⬍
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, indx) => (
          <tr key={indx}>
            {thead.map((key) => (
              <td key={key}>{row[key] ?? ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
