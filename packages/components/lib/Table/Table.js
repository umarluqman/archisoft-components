/* eslint-disable no-nested-ternary */
import React, { memo } from 'react'
import { usePagination, useTable } from 'react-table'
import { Flex, IconButton, chakra, Spinner } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import {
  ChevronsRight,
  ChevronsLeft,
  ChevronRight,
  ChevronLeft,
} from 'react-feather'

import { Circle, SingleRow, StyledTable } from './styles'

const Table = ({
  columns,
  data,
  isLoading,
  emptyDataMessage,
  fetchData,
  controlledPageIndex,
  controlledPageCount,
  controlledPageSize,
  headerRef,
}) => {
  // use this ref to keep track of updating internal pagination table state
  const tablePaginationUpdateRef = React.useRef(false)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      useControlledState: (state) => {
        if (!tablePaginationUpdateRef.current && controlledPageIndex !== null) {
          return { ...state, pageIndex: controlledPageIndex }
        }
        return state
      },
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: controlledPageSize },
      manualPagination: !!controlledPageCount,
      pageCount:
        controlledPageCount ?? Math.ceil(data?.length / controlledPageSize),
      autoResetPage: false,

      stateReducer: (newState, action) => {
        if (action.type === 'gotoPage') {
          tablePaginationUpdateRef.current = true
        }
        /**
         * Can't "return newState", need to return as immutable state
         */
        return { ...newState }
      },
    },
    usePagination
  )

  React.useEffect(() => {
    setPageSize(controlledPageSize)
  }, [controlledPageSize, setPageSize])

  // clear our ref when the data is loaded, after we perform any side effects
  React.useEffect(() => {
    tablePaginationUpdateRef.current = false
  }, [data])

  React.useEffect(() => {
    fetchData({ pageIndex, pageSize })
  }, [fetchData, pageIndex, pageSize])

  return (
    <Flex minH={500} direction="column" justify="space-between">
      <StyledTable {...getTableProps()}>
        <thead ref={headerRef}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => {
                return (
                  <chakra.th
                    textAlign={column?.textAlign ?? 'left'}
                    width={column?.width ?? 'unset'}
                    key={idx}
                  >
                    {column.render('Header')}
                  </chakra.th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.length !== 0 && !isLoading ? (
            page.map(
              (row) =>
                prepareRow(row) || (
                  <React.Fragment key={row.index}>
                    <chakra.tr
                      {...row.getRowProps()}
                      borderRadius={2}
                      fontSize={14}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <chakra.td
                            {...cell.getCellProps()}
                            textAlign={cell.column?.textAlign ?? 'left'}
                          >
                            {cell.render('Cell')}
                          </chakra.td>
                        )
                      })}
                    </chakra.tr>
                  </React.Fragment>
                )
            )
          ) : isLoading ? (
            <SingleRow colSpan={columns.length}>
              <Spinner emptyColor="gray.200" color="blue.500" />
            </SingleRow>
          ) : (
            <SingleRow colSpan={columns.length}>{emptyDataMessage}</SingleRow>
          )}
        </tbody>
      </StyledTable>
      {!(isLoading || data.length === 0) && (
        <Flex justify="flex-end">
          <Flex alignItems="center">
            <chakra.span mr={4}>
              <chakra.strong fontSize="sm">
                Page {pageIndex + 1} / {pageOptions.length || 1}
              </chakra.strong>
            </chakra.span>
            <Flex align="center" color="#333333">
              <IconButton
                variant="ghost"
                aria-label="First page"
                icon={<ChevronsLeft />}
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              />
              <IconButton
                variant="ghost"
                aria-label="Last page"
                icon={<ChevronLeft />}
                onClick={() => {
                  gotoPage(pageIndex - 1)
                }}
                disabled={!canPreviousPage}
                fontSize="1.75rem"
              />
              <Circle>{pageIndex + 1}</Circle>
              <IconButton
                variant="ghost"
                fontSize="1.75rem"
                aria-label="Last page"
                icon={<ChevronRight />}
                onClick={() => {
                  gotoPage(pageIndex + 1)
                }}
                disabled={!canNextPage}
              />
              <IconButton
                variant="ghost"
                aria-label="Last page"
                icon={<ChevronsRight />}
                onClick={() => {
                  gotoPage(pageCount - 1)
                }}
                disabled={!canNextPage}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      no: PropTypes.number,
    })
  ),
  fetchData: PropTypes.func,
  isLoading: PropTypes.bool,
  controlledPageSize: PropTypes.number,
  emptyDataMessage: PropTypes.string,
  controlledPageCount: PropTypes.number,
  headerRef: PropTypes.func,
  controlledPageIndex: PropTypes.number,
  extraColumnInAction: PropTypes.bool,
}

Table.defaultProps = {
  columns: [],
  data: [],
  fetchData: () => {},
  isLoading: false,
  controlledPageSize: 10,
  emptyDataMessage: 'No results found',
  controlledPageCount: 0,
  headerRef: () => {},
  controlledPageIndex: null,
}

export default memo(Table)
