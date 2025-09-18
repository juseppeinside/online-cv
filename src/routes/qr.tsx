import { createFileRoute } from '@tanstack/react-router';

const QrPage = () => {
  return (
    <div className="relative text-primary">
      <p>QR Code</p>
    </div>
  );
};

export const Route = createFileRoute('/qr')({
  component: QrPage,
});
