// import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { increment, decrement } from './counterSlice'
import { Button } from '@/components/ui/button'

export default function Counter() {
    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <div className='flex flex-col items-center '>
                    <Button 
                        aria-label='Increment value'
                        onClick={() => dispatch(increment())}
                    >
                        Increment
                    </Button>
                    <span>{count}</span>
                    <Button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                    >
                        Decrement
                    </Button>
                </div>
            </div>
        </div>
    )
}
