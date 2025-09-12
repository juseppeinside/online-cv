import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import React from 'react';
import { useTranslation } from 'react-i18next';
import CheckCopyIcon from '@/assets/icons/check-copy-ico.svg?react';
import CopyIcon from '@/assets/icons/copy-ico.svg?react';
import Button, { type ButtonProps } from '@/components/button';
import { cn } from '@/lib/utils';

type CopyButtonProps = {
  value: string;
  ariaLabel?: string;
} & ButtonProps;

const CopyButton = ({
  value,
  ariaLabel,
  className,
  ...other
}: CopyButtonProps) => {
  const { i18n } = useTranslation();
  const copyId = `copy-${React.useId()}`;
  const checkId = `copy-button-${React.useId()}`;
  const [pressed, setPressed] = React.useState(false);
  const { contextSafe } = useGSAP();

  const handleCopy = contextSafe(async () => {
    if (pressed) {
      return;
    }

    navigator.clipboard.writeText(value);

    const tl = gsap.timeline();

    tl.to(`#${copyId}`, {
      opacity: 0,
      ease: 'expo.inOut',
      duration: 0.2,
    });
    tl.to(`#${checkId}`, {
      opacity: 1,
      ease: 'expo.inOut',
      duration: 0.2,
    });
    tl.to(
      `#${checkId}`,
      {
        opacity: 0,
        ease: 'expo.inOut',
        duration: 0.2,
      },
      '+=2'
    );
    await tl
      .to(`#${copyId}`, {
        opacity: 1,
        ease: 'expo.inOut',
        duration: 0.2,
      })
      .then(() => setPressed(false));
  });

  return (
    <Button
      aria-label={ariaLabel || i18n.t('copy.button')}
      className={cn('relative w-fit bg-transparent text-inherit', className)}
      disableHover
      onClick={handleCopy}
      {...other}
    >
      <CheckCopyIcon
        aria-hidden
        className="absolute top-0 left-1/2 size-6 text-green-400 opacity-0"
        id={checkId}
      />
      <CopyIcon
        aria-hidden
        className="absolute top-0 left-1/2 size-6"
        id={copyId}
      />
    </Button>
  );
};
export default CopyButton;
