import { createFileRoute } from '@tanstack/react-router';
import QRCode from 'qrcode';
import React from 'react';
import logger from '@/lib/logger';

const QR_SIZE = 240;

const QrPage = () => {
  const [qrDataUrl, setQrDataUrl] = React.useState<string>('');
  const [qrWebsiteUrl, setQrWebsiteUrl] = React.useState<string>('');

  React.useEffect(() => {
    const isDevMode = import.meta.env.VITE_DEV_MODE === 'true';
    document.documentElement.setAttribute(
      'data-dev-mode',
      isDevMode.toString()
    );
  }, []);

  const generateQRCode = React.useCallback(async () => {
    try {
      const qrDataUrlResult = await QRCode.toDataURL(
        import.meta.env.VITE_URL_GITHUB_CV_LINK,
        {
          width: QR_SIZE,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        }
      );
      setQrDataUrl(qrDataUrlResult);
    } catch {
      logger.error('Error generating QR code');
    }
  }, []);

  const generateWebsiteQRCode = React.useCallback(async () => {
    try {
      const qrWebsiteUrlResult = await QRCode.toDataURL(
        import.meta.env.VITE_URL_WEBSITE_LINK,
        {
          width: QR_SIZE,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        }
      );
      setQrWebsiteUrl(qrWebsiteUrlResult);
    } catch {
      logger.error('Error generating website QR code');
    }
  }, []);

  React.useEffect(() => {
    generateQRCode();
    generateWebsiteQRCode();
  }, [generateQRCode, generateWebsiteQRCode]);

  const hdrVideoBase64 =
    'data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAvG1kYXQAAAAfTgEFGkdWStxcTEM/lO/FETzRQ6gD7gAA7gIAA3EYgAAAAEgoAa8iNjAkszOL+e58c//cEe//0TT//scp1n/381P/RWP/zOW4QtxorfVogeh8nQDbQAAAAwAQMCcWUTAAAAMAAAMAAAMA84AAAAAVAgHQAyu+KT35E7gAADFgAAADABLQAAAAEgIB4AiS76MTkNbgAAF3AAAPSAAAABICAeAEn8+hBOTXYAADUgAAHRAAAAPibW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAAAKcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAw10cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAAKcAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAABAAAAAQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAACnAAAAAAABAAAAAAKFbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAABdwAAAD6BVxAAAAAAAMWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABDb3JlIE1lZGlhIFZpZGVvAAAAAixtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAHsc3RibAAAARxzdHNkAAAAAAAAAAEAAAEMaHZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAQABAASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAHVodmNDAQIgAAAAsAAAAAAAPPAA/P36+gAACwOgAAEAGEABDAH//wIgAAADALAAAAMAAAMAPBXAkKEAAQAmQgEBAiAAAAMAsAAAAwAAAwA8oBQgQcCTDLYgV7kWVYC1CRAJAICiAAEACUQBwChkuNBTJAAAAApmaWVsAQAAAAATY29scm5jbHgACQAQAAkAAAAAEHBhc3AAAAABAAAAAQAAABRidHJ0AAAAAAAALPwAACz8AAAAKHN0dHMAAAAAAAAAAwAAAAIAAAPoAAAAAQAAAAEAAAABAAAD6AAAABRzdHNzAAAAAAAAAAEAAAABAAAAEHNkdHAAAAAAIBAQGAAAAChjdHRzAAAAAAAAAAMAAAABAAAAAAAAAAEAAAfQAAAAAgAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAQAAAABAAAAJHN0c3oAAAAAAAAAAAAAAAQAAABvAAAAGQAAABYAAAAWAAAAFHN0Y28AAAAAAAAAAQAAACwAAABhdWR0YQAAAFltZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAACxpbHN0AAAAJKl0b28AAAAcZGF0YQAAAAEAAAAATGF2ZjYwLjMuMTAw';

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-yellow-500 via-purple-500 to-yellow-500 p-4">
      <div className="w-full max-w-4xl">
        <h2 className="h2 mb-4 text-center text-2xl text-white md:text-4xl">
          GitHub{' '}
          <span className="bg-gradient-to-r from-red-500 via-green-500 to-blue-500 bg-clip-text text-3xl text-transparent md:text-5xl">
            HDR
          </span>{' '}
          QR Code
        </h2>

        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
          <div className="relative h-60 w-60 overflow-hidden rounded-lg bg-black shadow-2xl">
            <video
              autoPlay
              className="absolute top-0 left-0 h-full w-full object-cover"
              loop
              muted
              playsInline
              style={{
                background:
                  'linear-gradient(45deg, #fff 0%, #f0f0f0 50%, #fff 100%)',
              }}
            >
              <source src={hdrVideoBase64} type="video/mp4" />
            </video>
            {qrDataUrl && (
              // biome-ignore lint/performance/noImgElement: QR code image overlay
              <img
                alt="QR Code"
                className="absolute top-0 left-0 h-full w-full object-cover mix-blend-multiply"
                height={QR_SIZE}
                src={qrDataUrl}
                width={QR_SIZE}
              />
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center justify-center gap-4">
          <h2 className="h2 text-center text-2xl text-white md:text-4xl">
            Simple QR code to this site
          </h2>
          <div className="relative h-60 w-60 overflow-hidden rounded-lg bg-white shadow-2xl">
            {qrWebsiteUrl && (
              // biome-ignore lint/performance/noImgElement: QR code image
              <img
                alt="Website QR Code"
                className="h-full w-full object-cover"
                height={QR_SIZE}
                src={qrWebsiteUrl}
                width={QR_SIZE}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// biome-ignore lint/suspicious/noExplicitAny: <tanstack router required>
export const Route = createFileRoute('/qr' as any)({
  component: QrPage,
});
