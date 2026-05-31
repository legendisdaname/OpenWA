import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SessionStatus } from '../entities/session.entity';

export class SessionResponseDto {
  @ApiProperty({ example: 'sess_123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'my-bot' })
  name: string;

  @ApiProperty({ enum: SessionStatus, example: SessionStatus.READY })
  status: SessionStatus;

  @ApiPropertyOptional({ example: '628123456789' })
  phone?: string | null;

  @ApiPropertyOptional({ example: 'John Doe' })
  pushName?: string | null;

  @ApiPropertyOptional({ example: '2025-02-02T10:00:00Z' })
  connectedAt?: Date | null;

  @ApiPropertyOptional({ example: '2025-02-02T10:30:00Z' })
  lastActive?: Date | null;

  @ApiProperty({ example: '2025-02-02T09:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-02-02T10:00:00Z' })
  updatedAt: Date;

  @ApiPropertyOptional({ enum: ['qr', 'pairing'], example: 'qr' })
  linkMethod?: 'qr' | 'pairing';

  @ApiPropertyOptional({
    description: 'Phone number for pairing-code linking (digits only)',
    example: '628123456789',
  })
  linkPhoneNumber?: string;
}

export class QRCodeResponseDto {
  @ApiProperty({
    description: 'QR code as data URL',
    example: 'data:image/png;base64,...',
  })
  qrCode: string;

  @ApiProperty({ enum: SessionStatus, example: SessionStatus.QR_READY })
  status: SessionStatus;
}

export class PairingCodeResponseDto {
  @ApiProperty({
    description: '8-character pairing code to enter on your phone',
    example: 'ABCD-EFGH',
  })
  pairingCode: string;

  @ApiProperty({
    description: 'Phone number used for pairing (digits only)',
    example: '628123456789',
  })
  phoneNumber: string;

  @ApiProperty({ enum: SessionStatus, example: SessionStatus.PAIRING_CODE_READY })
  status: SessionStatus;
}
