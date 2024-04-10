import { Toaster } from "@/components/ui/toaster";
// import { SuperadminProvider } from "./_context/Superadmincontext";
import { AdminProvider } from "./_context/Admincontext";

export const metadata = {
    title: "Medivault - Admin Dashboard",
    description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
    return (
        <AdminProvider>
            <div>
                {children}
                <Toaster />
            </div>
        </AdminProvider>
    );
}
