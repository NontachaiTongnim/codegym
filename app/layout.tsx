import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import { SettingsProvider, themeInitScript } from "@/lib/settings";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const prompt = Prompt({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CodeGym | ฝึกตรรกะการเขียนโปรแกรม",
  description:
    "ชุดข้อสอบจับเวลาสำหรับฝึกตรรกะการเขียนโปรแกรม: อ่านโค้ด pseudo code ลำดับตัวเลข ตารางผิด SQL และปริศนาเชาว์",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="th"
      data-theme="light"
      className={`${prompt.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-surface-muted text-fg">
        <SettingsProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </SettingsProvider>
      </body>
    </html>
  );
}
