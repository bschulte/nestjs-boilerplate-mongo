export const dtoTemplate = (name: string, className: string) => {
  return `
import { IsString } from 'class-validator';

export class ${className}Dto {
  @IsString()
  field: string;
}
`;
};
