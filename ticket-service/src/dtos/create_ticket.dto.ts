import {
  IsString,
  IsNumber,
  IsInt,
  IsOptional,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  public readonly eventOrganizerID!: string;

  @IsString()
  @IsNotEmpty()
  public readonly eventID!: string;

  @IsString()
  @IsNotEmpty()
  public ticketName!: string;

  @IsString()
  @IsNotEmpty()
  public ticketDesc!: string;

  @IsString()
  @IsNotEmpty()
  public ticketType!: string;

  @IsNumber()
  @Min(0)
  public ticketBasePrice!: number;

  @IsInt()
  @Min(1)
  public count!: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  public ticketDiscount?: number;

  constructor(partial: Partial<CreateTicketDto>) {
    Object.assign(this, partial);
  }
}
