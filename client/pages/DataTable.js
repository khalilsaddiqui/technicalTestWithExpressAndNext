import React from 'react';
import { useTable } from 'react-table';

const DataTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: '1px solid #ddd', borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: '#f2f2f2' }}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} style={{ padding: '8px', border: '1px solid #ddd' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} style={{ backgroundColor: row.index % 2 === 0 ? '#fff' : '#f2f2f2' }}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()} style={{ padding: '8px', border: '1px solid #ddd' }}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
