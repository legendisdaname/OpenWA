import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  Matches,
  IsIn,
  ValidateIf,
} from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    description: 'Unique name for the session (alphanumeric and hyphens only)',
    example: 'my-bot',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9-]+$/, {
    message: 'Session name can only contain letters, numbers, and hyphens',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Session configuration options',
    example: { autoReconnect: true },
  })
  @IsOptional()
  config?: Record<string, unknown>;

  // Phase 3: Proxy per session
  @ApiPropertyOptional({
    description: 'Proxy URL for this session (e.g., http://user:pass@proxy.example.com:8080)',
    example: 'http://proxy.example.com:8080',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  proxyUrl?: string;

  @ApiPropertyOptional({
    description: 'Proxy type',
    enum: ['http', 'https', 'socks4', 'socks5'],
    example: 'http',
  })
  @IsOptional()
  @IsIn(['http', 'https', 'socks4', 'socks5'])
  proxyType?: 'http' | 'https' | 'socks4' | 'socks5';

  @ApiPropertyOptional({
    description: 'Link method: QR scan (default) or pairing code via phone number',
    enum: ['qr', 'pairing'],
    default: 'qr',
  })
  @IsOptional()
  @IsIn(['qr', 'pairing'])
  linkMethod?: 'qr' | 'pairing';

  @ApiPropertyOptional({
    description:
      'Phone number for pairing code linking (international format, digits only). Required when linkMethod is pairing.',
    example: '628123456789',
  })
  @ValidateIf(o => o.linkMethod === 'pairing')
  @IsString()
  @Matches(/^[0-9]{8,15}$/, {
    message: 'Phone number must be 8-15 digits in international format (no + or spaces)',
  })
  phoneNumber?: string;
}
