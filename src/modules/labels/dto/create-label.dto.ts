import { ApiProperty } from '@nestjs/swagger';

export class CreateLabelDto {
  @ApiProperty({ example: 'home', description: 'Label name' })
  readonly name: string;

  @ApiProperty({ example: '#ffffff', description: 'Label color' })
  readonly color: string;

  @ApiProperty({ example: true, description: 'Label is default' })
  readonly isDefault?: boolean;
}
