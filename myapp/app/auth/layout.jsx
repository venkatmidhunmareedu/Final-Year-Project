import { Toaster } from "@/components/ui/toaster";

export const metadata = {
    title: "Medivault Auth",
    description: "Authentication",
};

export default function RootLayout({ children }) {
    return (
        <div>
            {children}
            <Toaster />
        </div>
    );
}
