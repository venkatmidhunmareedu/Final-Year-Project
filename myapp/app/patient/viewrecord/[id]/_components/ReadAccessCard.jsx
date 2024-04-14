import React from 'react'

const ReadAccessCard = (props) => {
    return (
        <div className='px-1 py-1 bg-slate-50 rounded-md border my-2'>
            <div className=''>
                <p>
                    {"Doctor name : " + (props && props.name)}
                </p>
                <p>
                    {
                        "Meta mask address: " + (props && props.address
                        )
                    }
                </p>
            </div>
        </div>
    )
}

export default ReadAccessCard