import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const RolesDecorator = (...roles: string[]) => {
  if (!roles.includes('ADMIN')) {
    roles.push('ADMIN');
  }
  return SetMetadata(ROLES_KEY, roles);
};
