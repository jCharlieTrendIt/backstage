import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@material-ui/core';

type TAlign = 'left' | 'center' | 'right';

interface TableData {
  [key: string]: any;
}

export interface TableHeader {
  key: string;
  title: string;
  alignHeader?: TAlign;
  alignContent?: TAlign;
  maxWidth?: number;
  render?: (row: any) => React.ReactNode;
}

interface TableProps {
  data: TableData[];
  headers: TableHeader[];
  showPagination?: boolean;
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

export function CustomTable({
  data,
  headers,
  showPagination = false,
  currentPage = 0,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
}: TableProps) {
  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange?.(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onItemsPerPageChange?.(parseInt(event.target.value, 10));
  };

  return (
    <Paper>
      <TableContainer>
        <MuiTable>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableCell
                  key={header.key}
                  align={header.alignHeader ?? 'left'}
                  style={{ maxWidth: header.maxWidth }}
                >
                  {header.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((row: any, rowIndex: number) => (
              <TableRow key={rowIndex}>
                {headers.map(header => (
                  <TableCell
                    key={header.key}
                    align={header.alignContent ?? 'left'}
                    style={{ maxWidth: header.maxWidth }}
                  >
                    {header.render
                      ? header.render(row)
                      : (row as any)[header.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={headers.length} align="center">
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>

      {showPagination && (
        <TablePagination
          component="div"
          count={totalItems}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={itemsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      )}
    </Paper>
  );
}
