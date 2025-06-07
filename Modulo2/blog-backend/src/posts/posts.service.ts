import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Category } from '../categories/category.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    if (!createPostDto) {
      throw new BadRequestException('Datos de post no proporcionados');
    }
    const category = await this.categoryRepository.findOne({ where: { id: createPostDto.categoryId } });
    if (!category) throw new NotFoundException('Categoría no encontrada');

    const post = this.postRepository.create({
      title: createPostDto.title,
      content: createPostDto.content,
      category,
    });
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find({ relations: ['category'] });
  }

  findOne(id: string) {
    return this.postRepository.findOne({ where: { id }, relations: ['category'] });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ where: { id }, relations: ['category'] });
    if (!post) throw new NotFoundException('Post no encontrado');

    if (updatePostDto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: updatePostDto.categoryId } });
      if (!category) throw new NotFoundException('Categoría no encontrada');
      post.category = category;
    }

    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async remove(id: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException('Post no encontrado');
    return this.postRepository.remove(post);
  }

  async findAllPaginated(options: IPaginationOptions): Promise<Pagination<Post>> {
    const queryBuilder = this.postRepository.createQueryBuilder('post');
    queryBuilder.leftJoinAndSelect('post.category', 'category');
    queryBuilder.orderBy('post.createdAt', 'DESC'); // Opcional
    return paginate<Post>(queryBuilder, options);
  }
}