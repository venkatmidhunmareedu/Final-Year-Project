import MaxWidthWrapper from '@/app/_components/MaxWidthWrapper'
import React from 'react'

const page = () => {
    return (
        <div className="h-[70vh] flex justify-center">
            <MaxWidthWrapper>
                <div className="mx-1">
                    <p className="text-center">
                        Welcome Super Admin,
                    </p>
                    <h1>
                        Your Dashboard
                    </h1>
                </div>
            </MaxWidthWrapper>

        </div>
    )
}

export default page