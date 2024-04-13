import { Toaster } from "@/components/ui/toaster";
import { PatientProvider } from "./_context/Patientcontext";

export const metadata = {
    title: "Medivault - Patient Dashboard",
    description: "Patient Dashboard",
};

export default function RootLayout({ children }) {
    return (
        <PatientProvider>
            <div>
                {children}
                <Toaster />
            </div>
        </PatientProvider>
    );
}
