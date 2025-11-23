"use client";

import { useState } from 'react';
import Table from '@/components/shared/Table';

const mockOrders = [
    {
        id: '#96459761',
        status: 'IN PROGRESS',
        date: 'Dec 30, 2019 07:52',
        total: '$80 (5 Products)',
        action: 'View Details'
    },
    {
        id: '#71667167',
        status: 'COMPLETED',
        date: 'Dec 7, 2019 23:26',
        total: '$70 (4 Products)',
        action: 'View Details'
    },
    {
        id: '#95214362',
        status: 'CANCELED',
        date: 'Dec 7, 2019 23:26',
        total: '$2,300 (2 Products)',
        action: 'View Details'
    },
    {
        id: '#71667167',
        status: 'COMPLETED',
        date: 'Feb 2, 2019 19:28',
        total: '$250 (1 Products)',
        action: 'View Details'
    },
    {
        id: '#51746385',
        status: 'COMPLETED',
        date: 'Dec 30, 2019 07:52',
        total: '$360 (2 Products)',
        action: 'View Details'
    },
    {
        id: '#51746385',
        status: 'CANCELED',
        date: 'Dec 4, 2019 21:42',
        total: '$220 (7 Products)',
        action: 'View Details'
    },
    {
        id: '#67391743',
        status: 'COMPLETED',
        date: 'Feb 2, 2019 19:28',
        total: '$80 (1 Products)',
        action: 'View Details'
    },
    {
        id: '#67391743',
        status: 'COMPLETED',
        date: 'Mar 20, 2019 23:14',
        total: '$160 (1 Products)',
        action: 'View Details'
    },
    {
        id: '#67391743',
        status: 'COMPLETED',
        date: 'Dec 4, 2019 21:42',
        total: '$1,500 (3 Products)',
        action: 'View Details'
    },
    {
        id: '#67391743',
        status: 'COMPLETED',
        date: 'Dec 30, 2019 07:52',
        total: '$1,200 (19 Products)',
        action: 'View Details'
    },
    {
        id: '#67391743',
        status: 'CANCELED',
        date: 'Dec 30, 2019 05:18',
        total: '$1,500 (1 Products)',
        action: 'View Details'
    },
    {
        id: '#67391743',
        status: 'COMPLETED',
        date: 'Dec 30, 2019 07:52',
        total: '$80 (1 Products)',
        action: 'View Details'
    }
];

export default function OrderHistoryPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;
    const totalPages = Math.ceil(mockOrders.length / ordersPerPage);

    const currentOrders = mockOrders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    const columns = [
        {
            key: 'id',
            label: 'ORDER ID',
            width: '20%'
        },
        {
            key: 'status',
            label: 'STATUS',
            width: '15%',
            render: (status: unknown) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'COMPLETED'
                    ? 'bg-success/20 text-success'
                    : status === 'IN PROGRESS'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-danger/20 text-danger'
                    }`}>
                    {status as string}
                </span>
            )
        },
        {
            key: 'date',
            label: 'DATE',
            width: '25%'
        },
        {
            key: 'total',
            label: 'TOTAL',
            width: '20%'
        },
        {
            key: 'action',
            label: 'ACTION',
            width: '20%',
            align: 'center' as const,
            render: () => (
                <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                    View Details →
                </button>
            )
        }
    ];

    const handleRowClick = (order: unknown) => {
        console.log('Order clicked:', order);
        // Navigate to order details
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">ORDER HISTORY</h1>

            <Table
                columns={columns}
                data={currentOrders}
                onRowClick={handleRowClick}
                pagination={{
                    currentPage,
                    totalPages,
                    onPageChange: setCurrentPage
                }}
            />
        </div>
    );
}
