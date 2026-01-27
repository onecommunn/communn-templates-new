"use client";

export default function PdfViaGoogleViewer({ pdfUrl }: { pdfUrl: string }) {
  const viewer = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`;

  return (
    <div className="w-full h-[80vh] rounded-xl overflow-hidden border bg-background">
      <iframe src={viewer} className="w-full h-full" />
    </div>
  );
}
