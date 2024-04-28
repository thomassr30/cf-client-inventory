export const hasAccess = (
  userRole: string,
  requiredRoles: string[]
): boolean => {
  // Verifica si el rol del usuario tiene permiso para acceder a la ruta
  return requiredRoles.includes(userRole);
};
