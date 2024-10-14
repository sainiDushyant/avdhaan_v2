import { FC, useMemo } from 'react';
import Checkbox from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export type ActionType<T> = {
  element: FC<{ data: T; cb?: () => void }>;
  colName?: string;
  actionCb?: () => void;
};

type TableColumnsProps<T> = {
  cols?: T[];
  query: string[];
  showSelect?: boolean;
  customId?: string;
  getLink?: (id: string) => string | { pathname: string; state: object };
  action?: ActionType<T>[];
};

function useGetTableColumns<T>({
  cols,
  query,
  showSelect,
  customId,
  getLink,
  action
}: TableColumnsProps<T>) {
  const id = customId || 'id';

  const columns: ColumnDef<T>[] = useMemo(() => {
    if (!cols || cols.length === 0) return [];

    const initialRow = cols[0] as T[];

    //adding all generic columns
    const genericCols: ColumnDef<T>[] = Object.keys(initialRow)
      .filter((item) => !query.includes(item))
      .map((columnName) => {
        return {
          accessorKey: columnName,
          header: columnName.toUpperCase().split('_').join(' '),
          cell: ({ row }) => {
            const rowVal = String(row.getValue(columnName));
            return <div className="capitalize">{rowVal}</div>;
          }
        };
      });

    //adding select feature
    if (showSelect) {
      genericCols.unshift({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false
      });
    }

    //adding link feature
    if (getLink) {
      const linkFx = getLink;
      genericCols.push({
        accessorKey: `link_${id}`,
        header: '',
        cell: ({ row }) => {
          const rowId = row.getValue(id) as string;
          const linkProps = linkFx(rowId);
          return typeof linkProps === 'string' ? (
            <Link className="link-button tertiary-vee-btn px-2" to={linkProps}>
              Details
            </Link>
          ) : (
            <Link
              className="link-button tertiary-vee-btn px-2"
              to={linkProps.pathname}
              state={linkProps.state}
            >
              Details
            </Link>
          );
        }
      });
    }

    //adding action features
    if (action && action.length > 0) {
      const actionArr: ColumnDef<T>[] = action.map((actionData) => {
        const reactElement = actionData.element;
        const randomKey =
          (Math.random() + 1).toString(36).substring(7) +
          (actionData.colName || '');
        return {
          accessorKey: `${id}_${randomKey}`,
          header: actionData.colName,
          id: actionData.colName || `${id}_${randomKey}`,
          cell: ({ row }) => {
            const allData = row.original;
            return (
              <div className="flex" key={`${id}_${randomKey}`}>
                {reactElement({ data: allData, cb: actionData.actionCb })}
              </div>
            );
          }
        };
      });
      genericCols.push(...actionArr);
    }

    return genericCols;
  }, [cols, showSelect, getLink, action, query, id]);

  return columns;
}

export default useGetTableColumns;
