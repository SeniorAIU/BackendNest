import { Inject, Injectable } from '@nestjs/common';
import { Volunteer } from './entities/volunteer.entity';
import { Repository } from 'typeorm';
import { Oppertunity } from 'src/oppertunity/entities/oppertunity.entity';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class VolunteerService {
    constructor(
        @Inject('VOLUNTEER_REPOSITORY')
        private volunteerRepository: Repository<Volunteer>, 
        @Inject('OPPERTUNITY_REPOSITORY')
        private oppertunityRepository: Repository<Oppertunity>,
        @Inject('USER_REPOSITORY') 
        private userRepository: Repository<User>
      ) {}
    
      async getVolunteer() {
        const result = await this.volunteerRepository.find();
        return result;
      }
    
      async createVolunteer(data: any) {
        const oppertunityId = data.oppertunityId
        const usreId = data.userId
        const oppertunity = await this.oppertunityRepository.findOneBy({id:oppertunityId})
        const user = await this.userRepository.findOneBy({id:usreId})
        if(oppertunity.volunteers >= oppertunity.volunteers_target){
            return {message: "you can`t volunteer above oppertunity target", status:500}
        }
        oppertunity.volunteers = oppertunity.volunteers + 1
        await this.oppertunityRepository.save(oppertunity)
        const result = await this.volunteerRepository.save(data);
        user.volunteers = user.volunteers + 1;
        await this.userRepository.save(user)
        return result;
        // return campaign
      }
    
      async findOne(id: string) {
        const result = await this.volunteerRepository.findOneBy({ id });
        console.log(result);
        return result;
      }
    
      findOneby(data: any) {
        return this.volunteerRepository.findBy(data);
      }
    
      update(id: string, updateTransactionDto: any) {
        return this.volunteerRepository.update(id, updateTransactionDto);
      }
    
      delete(id: string) {
        return this.volunteerRepository.delete(id);
      }
}
