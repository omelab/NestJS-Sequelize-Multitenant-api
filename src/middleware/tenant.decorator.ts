import { ApiHeader } from '@nestjs/swagger';

export const SwaggerTenantHeader = () =>
  ApiHeader({
    name: 'x-tenant',
    required: true,
    description: 'The tenant ID',
  });
