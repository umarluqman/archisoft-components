import { theme } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const Circle = styled.span`
  height: 24px;
  width: 24px;
  font-size: 12px;
  background-color: ${theme.colors.gray[200]};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledTable = styled('table')`
  @media print {
    page-break-inside: avoid;
  }
  border: none;
  margin-bottom: 16px;
  width: 100%;
  table-layout: fixed;
  thead tr:first-of-type {
    display: table-row;
  }

  th,
  td {
    height: 48px;
    border: none;
  }

  th {
    padding: 0 0.5rem;
    font-size: 14px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.9);
  }

  td {
    padding: 0 0.5rem;
    background-color: transparent;
    border-top: 1.2px solid ${theme.colors.gray[200]};
    border-bottom: 1px solid ${theme.colors.gray[200]};
  }

  &.project-table td:first-of-type {
    text-align: left;
  }
`

export const SingleRow = styled.td`
  background-color: #edf2f8 !important;
  font-size: 14px;
  font-weight: 400;
  padding: 1rem;
  text-align: center;
`
