import React from 'react';

interface TableColumn {
    key: string;
    label: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
}

interface TableProps {
    columns: TableColumn[];
    data: Record<string, unknown>[];
    loading?: boolean;
    emptyMessage?: string;
    className?: string;
    onRowClick?: (row: Record<string, unknown>) => void;
    pagination?: {
        currentPage: number;
        totalPages: number;
        onPageChange: (page: number) => void;
    };
}

export default function Table({
    columns,
    data,
    loading = false,
    emptyMessage = "No data available",
    className = "",
    onRowClick,
    pagination
}: TableProps) {
    if (loading) {
        return (
            <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
                <div className="p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-foreground/60">Loading...</p>
                </div>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
                <div className="p-8 text-center">
                    <p className="text-foreground/60">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
            {/* Mobile View */}
            <div className="lg:hidden">
                {data.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={`p-4 border-b border-border last:border-b-0 ${onRowClick ? 'cursor-pointer hover:bg-muted/30 transition-colors' : ''
                            }`}
                        onClick={() => onRowClick?.(row)}
                    >
                        {columns.map((column) => (
                            <div key={column.key} className="flex justify-between items-center py-1">
                                <span className="text-sm font-medium text-foreground/60">
                                    {column.label}:
                                </span>
                                <span className="text-sm text-foreground">
                                    {column.render
                                        ? column.render(row[column.key], row)
                                        : (row[column.key] as React.ReactNode)
                                    }
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-muted/30 border-b border-border">
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-6 py-4 text-left text-sm font-semibold text-foreground ${column.width ? column.width : ''
                                        }`}
                                    style={{
                                        textAlign: column.align || 'left',
                                        width: column.width
                                    }}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className={`border-b border-border last:border-b-0 ${onRowClick ? 'cursor-pointer hover:bg-muted/20 transition-colors' : ''
                                    } ${rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}
                                onClick={() => onRowClick?.(row)}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="px-6 py-4 text-sm text-foreground"
                                        style={{ textAlign: column.align || 'left' }}
                                    >
                                        {column.render
                                            ? column.render(row[column.key], row)
                                            : (row[column.key] as React.ReactNode)
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage <= 1}
                            className="p-2 rounded-lg border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="flex items-center space-x-1">
                            {Array.from({ length: Math.min(6, pagination.totalPages) }, (_, i) => {
                                let pageNumber: number;
                                if (pagination.totalPages <= 6) {
                                    pageNumber = i + 1;
                                } else if (pagination.currentPage <= 3) {
                                    pageNumber = i + 1;
                                } else if (pagination.currentPage >= pagination.totalPages - 2) {
                                    pageNumber = pagination.totalPages - 5 + i;
                                } else {
                                    pageNumber = pagination.currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => pagination.onPageChange(pageNumber)}
                                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${pageNumber === pagination.currentPage
                                            ? 'bg-[--color-orange] text-white'
                                            : 'text-foreground hover:bg-muted/50'
                                            }`}
                                    >
                                        {pageNumber.toString().padStart(2, '0')}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage >= pagination.totalPages}
                            className="p-2 rounded-lg border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
