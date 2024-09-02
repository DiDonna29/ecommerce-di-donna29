import { Injectable } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly FileUploadRepository: FileUploadRepository,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async uploadProductImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) return 'El producto no existe.';

    const uploadedImage = await this.FileUploadRepository.uploadImage(file);
    console.log(uploadedImage);

    await this.productsRepository.update(productId, {
      imgUrl: uploadedImage.secure_url,
    });

    const updateProduct = await this.productsRepository.findOneBy({
      id: productId,
    });

    return updateProduct;
  }
}
