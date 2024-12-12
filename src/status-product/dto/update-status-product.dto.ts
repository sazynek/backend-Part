import { PartialType } from '@nestjs/mapped-types';
import { CreateStatusProductDto } from './create-status-product.dto';

export class UpdateStatusProductDto extends PartialType(CreateStatusProductDto) {}
