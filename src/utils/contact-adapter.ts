/** biome-ignore-all lint/style/noMagicNumbers: <magic numbers> */
export const formatContactCode = (
  contactName: string,
  contactCode: string
): string => {
  if (contactName === 'phone') {
    return formatPhone(contactCode);
  }

  if (
    contactName === 'telegram' ||
    contactName === 'linkedin' ||
    contactName === 'github'
  ) {
    return contactCode;
  }

  if (contactName === 'email') {
    return contactCode;
  }

  return contactCode;
};

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  return `+7(${digits.slice(1, 4)})${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
}
