//why di we need this file? if i already have it in layout.tsx on signup folder????
export const metadata = {
    title: "Futbolnet",
    description: "An app for futbol lovers developed by futbol lovers.",
    //adding an image to the top next to the title
    icons: {
        icon: "/futbol.svg",
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    )
}
