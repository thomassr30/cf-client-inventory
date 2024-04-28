export const formatRut = (value: string) => {
  const cleanedValue = value.replace(/[^\dk]/gi, "");

  if (!cleanedValue) {
    return "";
  }

  let rutBody = cleanedValue.slice(0, -1);
  const rutVerifier = cleanedValue.slice(-1).toUpperCase();

  rutBody = rutBody.replace(/^(\d{1,3})(\d{3})(\d{3})$/, "$1.$2.$3");

  return rutBody + "-" + rutVerifier;
};
