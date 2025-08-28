import { IsInt, Min, IsOptional, IsString } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsInt()
  @Min(1)
  amount: number;

  @IsOptional()
  @IsString()
  currency?: string;
}