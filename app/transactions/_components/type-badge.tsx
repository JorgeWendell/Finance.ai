import { Badge } from '@/app/_components/ui/badge'
import { Transaction, TransactionType } from '@prisma/client'
import { CircleIcon } from 'lucide-react'
import React from 'react'

interface TransactionTypeBadgeProps {
    transation: Transaction 
}

const TransactionTypeBadge = ({transation}: TransactionTypeBadgeProps) => {

    if (transation.type === TransactionType.DEPOSIT) {
        return (
            <Badge className='bg-muted font-bold text-primary hover:bg-muted'>
                <CircleIcon className='mr-2 fill-primary' size={10}  />
                Depósito
            </Badge>
        );        
    }
    if (transation.type === TransactionType.EXPENSE) {
        return (
            <Badge className='font-bold text-danger bg-danger bg-opacity-10'>
                <CircleIcon className='mr-2 fill-primary' size={10}  />
                Despesa
            </Badge>
        );        
    }
        return (
            <Badge className=' font-bold text-white bg-opacity-10 bg-white'>
            <CircleIcon className='mr-2 fill-white' size={10}  />
            Investimento
        </Badge>
        )
}

export default TransactionTypeBadge;
