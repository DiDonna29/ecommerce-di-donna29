import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { FileUploadRepository } from './file-upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  controllers: [FileUploadController],
  providers: [FileUploadService, FileUploadRepository],
})
export class FileUploadModule {}
