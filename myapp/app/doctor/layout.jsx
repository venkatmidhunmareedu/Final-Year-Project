import { Toaster } from "@/components/ui/toaster";
import { DoctorProvider } from "./_context/Doctorcontext";

export const metadata = {
    title: "Medivault - Doctor Dashboard",
    description: "Doctor Dashboard",
};

export default function RootLayout({ children }) {
    return (
        <DoctorProvider>
            <div>
                {children}
                <Toaster />
            </div>
        </DoctorProvider>
    );
}
