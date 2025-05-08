import React from 'react'
interface Column {
    header: string
    accessor: string
    cell?: (value: any) => React.ReactNode
}
interface DataTableProps {
    columns: Column[]
    data: any[]
    onRowClick?: (row: any) => void
    isLoading?: boolean
}
export function DataTable({
    columns,
    data,
    onRowClick,
    isLoading,
}: DataTableProps) {
    if (isLoading) {
        return (
            <div className="bg-gray-800 rounded-lg p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-700 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            onClick={() => onRowClick?.(row)}
                            className={onRowClick ? 'cursor-pointer hover:bg-gray-800' : ''}
                        >
                            {columns.map((column, colIndex) => (

                                <td
                                    key={colIndex}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                                >
                                    {column.cell
                                        ? column.cell(row[column.accessor])
                                        : row[column.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
