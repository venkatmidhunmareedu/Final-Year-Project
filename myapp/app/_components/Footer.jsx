import Brand from "./Brand"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Footer = () => {
    return (
        <div className="w-screen bg-gray-100 border-t fixed bottom-0 p-5 md:py-5 ">
            <MaxWidthWrapper >
                <div className="flex justify-between items-center w-full">
                    <Brand />
                    <div className="text-sm">
                        &copy; copyright {new Date().getFullYear()}
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}

export default Footer