import { Inject, Injectable } from '@nestjs/common';
import { OrgDto, UpdateOrgDto } from 'src/org/dto/org.dto';
import { Repository } from 'typeorm';
import { ORG } from './entities/org.entity';
import * as AWS from 'aws-sdk';

@Injectable()
export class OrgService {
  constructor(
    @Inject('ORG_REPOSITORY')
    private orgRepository: Repository<ORG>,
  ) {}

  AWS_S3_BUCKET = 'demo-nest';
  s3 = new AWS.S3({
    accessKeyId: 'AKIAZQ3DQFRXNNSG6AHA',
    secretAccessKey: '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',
  });

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-west-2',
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
  async uploadFile(file) {
    console.log(file);
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  getUsers(): any {
    return this.orgRepository.find();
  }

  async createUsers(data: OrgDto): Promise<any> {
    const user = await this.orgRepository.save(data);
    return user;
  }

  findOneby(data: any) {
    return this.orgRepository.findBy(data);
  }

  findOne(id: string) {
    return this.orgRepository.findOneBy({ id });
  }

  findOneEmail(email: string) {
    return this.orgRepository.findOneBy({ email });
  }

  update(id: string, updateRoleDto: UpdateOrgDto) {
    return this.orgRepository.update(id, updateRoleDto);
  }

  delete(id: string) {
    return this.orgRepository.delete(id);
  }
}
