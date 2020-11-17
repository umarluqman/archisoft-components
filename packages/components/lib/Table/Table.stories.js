import React from 'react'

import Table from './Table'

export default {
  title: 'Example/Table',
  component: Table,
}

const Template = ({ columns, data, ...args }) => {
  const memoizedColumns = React.useMemo(() => columns, [columns])
  const memoizedData = React.useMemo(() => data, [data])
  return <Table {...args} data={memoizedData} columns={memoizedColumns} />
}

const singleColumn = [
  {
    Header: 'No',
    accessor: 'no',
    width: 10,
  },
  {
    Header: 'Company',
    accessor: 'partner.name',
  },
  {
    Header: 'Endpoint Name',
    accessor: 'name',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Type',
    accessor: 'protocol',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
    textAlign: 'right',
  },
]

const singleData = [
  {
    no: 1,
    partner: {
      name: 'Cyberjaya shop',
    },
    name: 'MY00000D-xslt',
    description: 'xslt transformation',
    protocol: 'FTP',
    amount: 1210,
  },
]

export const Basic = Template.bind({})
Basic.args = {
  columns: singleColumn,
  data: singleData,
}

export const WithLocalPagination = Template.bind({})
WithLocalPagination.args = {
  columns: [...singleColumn],
  data: [
    ...singleData,
    {
      no: 2,
      partner: {
        name: 'Cyberjaya shop',
      },
      name: 'MY00000D-xslt',
      description: 'xslt transformation',
      protocol: 'FTP',
      amount: 1210,
    },
    {
      no: 3,
      partner: {
        name: 'Cyberjaya shop',
      },
      name: 'MY00000D-xslt',
      description: 'xslt transformation',
      protocol: 'FTP',
      amount: 1210,
    },
    {
      no: 4,
      partner: {
        name: 'Cyberjaya shop',
      },
      name: 'MY00000D-xslt',
      description: 'xslt transformation',
      protocol: 'FTP',
      amount: 1210,
    },
    {
      no: 5,
      partner: {
        name: 'Cyberjaya shop',
      },
      name: 'MY00000D-xslt',
      description: 'xslt transformation',
      protocol: 'FTP',
      amount: 1210,
    },
    {
      no: 6,
      partner: {
        name: 'Cyberjaya shop',
      },
      name: 'MY00000D-xslt',
      description: 'xslt transformation',
      protocol: 'FTP',
      amount: 1210,
    },
    {
      no: 7,
      partner: {
        name: 'Cyberjaya shop',
      },
      name: 'MY00000D-xslt',
      description: 'xslt transformation',
      protocol: 'FTP',
      amount: 1210,
    },
    {
      no: 8,
      partner: {
        name: 'Cyberjaya shop',
      },
      name: 'MY00000D-xslt',
      description: 'xslt transformation',
      protocol: 'FTP',
      amount: 1210,
    },
    {
      no: 9,
      partner: {
        name: 'Cyberjaya shop',
      },
      name: 'MY00000D-xslt',
      description: 'xslt transformation',
      protocol: 'FTP',
      amount: 1210,
    },
    {
      no: 10,
      partner: {
        name: 'Cyberjaya shop',
      },
      name: 'MY00000D-xslt',
      description: 'xslt transformation',
      protocol: 'FTP',
      amount: 1210,
    },
    {
      no: 11,
      partner: {
        name: 'Cyberjaya shop',
      },
      name: 'MY00000D-xslt',
      description: 'xslt transformation',
      protocol: 'FTP',
      amount: 1210,
    },
  ],
}

export const NoData = Template.bind({})
NoData.args = {
  columns: singleColumn,
  data: [],
}

export const Loading = Template.bind({})
Loading.args = {
  columns: singleColumn,
  data: singleData,
  isLoading: true,
}
